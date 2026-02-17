from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Supabase configuration
SUPABASE_URL = os.environ["SUPABASE_URL"].rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
SUPABASE_TABLE = os.environ.get("SUPABASE_TABLE", "status_checks")
SUPABASE_CONTACT_TABLE = os.environ.get("SUPABASE_CONTACT_TABLE", "contact_messages")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


async def insert_status_check(status_obj: StatusCheck) -> StatusCheck:
    """Insert a status check row into Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/{SUPABASE_TABLE}"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }
    payload = {
        "id": status_obj.id,
        "client_name": status_obj.client_name,
        "timestamp": status_obj.timestamp.isoformat(),
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload, params={"select": "*"})
        response.raise_for_status()

    return status_obj


async def fetch_status_checks() -> List[StatusCheck]:
    """Fetch status checks from Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/{SUPABASE_TABLE}"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
    }
    params = {
        "select": "*",
        "order": "timestamp.desc",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)
        response.raise_for_status()

    data = response.json()
    status_checks: List[StatusCheck] = []
    for row in data:
        # Supabase returns ISO 8601 strings for timestamptz
        ts = row.get("timestamp")
        if isinstance(ts, str):
            row["timestamp"] = datetime.fromisoformat(ts.replace("Z", "+00:00"))
        status_checks.append(StatusCheck(**row))

    return status_checks


class ContactMessage(BaseModel):
    """Represents a contact form submission."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str
    email: str
    phone: str
    subject: str
    message: str


async def insert_contact_message(contact: ContactMessage) -> None:
    """Insert a contact message row into Supabase."""
    url = f"{SUPABASE_URL}/rest/v1/{SUPABASE_CONTACT_TABLE}"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }

    payload = {
        "id": contact.id,
        "name": contact.name,
        "email": contact.email,
        "phone": contact.phone,
        "subject": contact.subject,
        "message": contact.message,
        "created_at": contact.created_at.isoformat(),
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        response.raise_for_status()


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    created = await insert_status_check(status_obj)
    return created

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await fetch_status_checks()
    return status_checks


@api_router.post("/contact", status_code=201)
async def submit_contact_form(input: ContactMessageCreate):
    """Receive contact form submissions and store them in Supabase."""
    contact_dict = input.model_dump()
    contact = ContactMessage(**contact_dict)
    await insert_contact_message(contact)
    return {"success": True}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)