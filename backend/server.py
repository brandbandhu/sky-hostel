from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx
from email.message import EmailMessage
import smtplib


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Supabase configuration
SUPABASE_URL = os.environ["SUPABASE_URL"].rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
SUPABASE_TABLE = os.environ.get("SUPABASE_TABLE", "status_checks")
SUPABASE_CONTACT_TABLE = os.environ.get("SUPABASE_CONTACT_TABLE", "contact_messages")
NOTIFICATION_EMAIL_TO = os.environ.get("NOTIFICATION_EMAIL_TO", "skyhostels3@gmail.com")
SMTP_HOST = os.environ.get("SMTP_HOST", "").strip()
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USERNAME = os.environ.get("SMTP_USERNAME", "").strip()
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "").strip()
SMTP_FROM_EMAIL = os.environ.get("SMTP_FROM_EMAIL", SMTP_USERNAME or "no-reply@skyhostels.local").strip()
SMTP_USE_TLS = os.environ.get("SMTP_USE_TLS", "true").strip().lower() in {"1", "true", "yes"}
TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID", "").strip()
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN", "").strip()
TWILIO_WHATSAPP_FROM = os.environ.get("TWILIO_WHATSAPP_FROM", "").strip()
TWILIO_WHATSAPP_TO = os.environ.get("TWILIO_WHATSAPP_TO", "whatsapp:+919130888003").strip()

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


class EnquiryCreate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: Optional[str] = None
    looking_for: Optional[str] = None
    source: Optional[str] = "website_form"


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


def _clean(value: Optional[str]) -> str:
    return str(value or "").strip()


def _ensure_whatsapp_recipient(phone_value: str) -> str:
    phone_value = phone_value.strip()
    if not phone_value:
        return ""
    return phone_value if phone_value.startswith("whatsapp:") else f"whatsapp:{phone_value}"


def _create_contact_message_from_enquiry(input_data: EnquiryCreate) -> ContactMessage:
    name = _clean(input_data.name) or "Website Visitor"
    email = _clean(str(input_data.email) if input_data.email else "") or "no-email@skyhostels.local"
    phone = _clean(input_data.phone)
    subject = _clean(input_data.subject) or "Website Enquiry"
    message = _clean(input_data.message) or "No message provided."
    looking_for = _clean(input_data.looking_for)
    source = _clean(input_data.source) or "website_form"

    metadata_lines = []
    if looking_for:
        metadata_lines.append(f"Looking For: {looking_for}")
    metadata_lines.append(f"Source: {source}")

    full_message = f"{message}\n\n" + "\n".join(metadata_lines)
    return ContactMessage(
        name=name,
        email=email,
        phone=phone,
        subject=subject,
        message=full_message,
    )


def _build_enquiry_summary(contact: ContactMessage) -> str:
    return (
        f"New enquiry received\n"
        f"Name: {contact.name}\n"
        f"Email: {contact.email}\n"
        f"Phone: {contact.phone or 'Not provided'}\n"
        f"Subject: {contact.subject}\n"
        f"Message:\n{contact.message}\n"
        f"Created At (UTC): {contact.created_at.isoformat()}"
    )


def _send_email_notification(contact: ContactMessage) -> dict:
    if not (SMTP_HOST and SMTP_USERNAME and SMTP_PASSWORD and NOTIFICATION_EMAIL_TO):
        logger.warning("Email notification skipped: SMTP configuration is incomplete.")
        return {"sent": False, "reason": "smtp_not_configured"}

    summary = _build_enquiry_summary(contact)
    email_message = EmailMessage()
    email_message["Subject"] = f"[Sky Hostels] {contact.subject}"
    email_message["From"] = SMTP_FROM_EMAIL
    email_message["To"] = NOTIFICATION_EMAIL_TO
    email_message.set_content(summary)

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as smtp:
            if SMTP_USE_TLS:
                smtp.starttls()
            smtp.login(SMTP_USERNAME, SMTP_PASSWORD)
            smtp.send_message(email_message)
        return {"sent": True}
    except Exception as exc:
        logger.exception("Failed to send enquiry email notification: %s", exc)
        return {"sent": False, "reason": "smtp_send_failed"}


async def _send_whatsapp_notification(contact: ContactMessage) -> dict:
    if not (TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN and TWILIO_WHATSAPP_FROM):
        logger.warning("WhatsApp notification skipped: Twilio configuration is incomplete.")
        return {"sent": False, "reason": "twilio_not_configured"}

    to_number = _ensure_whatsapp_recipient(TWILIO_WHATSAPP_TO)
    from_number = _ensure_whatsapp_recipient(TWILIO_WHATSAPP_FROM)
    if not to_number or not from_number:
        return {"sent": False, "reason": "invalid_whatsapp_number"}

    twilio_url = f"https://api.twilio.com/2010-04-01/Accounts/{TWILIO_ACCOUNT_SID}/Messages.json"
    payload = {
        "From": from_number,
        "To": to_number,
        "Body": _build_enquiry_summary(contact),
    }

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.post(
                twilio_url,
                data=payload,
                auth=(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN),
            )
            response.raise_for_status()
        return {"sent": True}
    except Exception as exc:
        logger.exception("Failed to send enquiry WhatsApp notification: %s", exc)
        return {"sent": False, "reason": "twilio_send_failed"}


async def _process_enquiry_submission(input_data: EnquiryCreate) -> dict:
    contact = _create_contact_message_from_enquiry(input_data)
    await insert_contact_message(contact)

    email_result = _send_email_notification(contact)
    whatsapp_result = await _send_whatsapp_notification(contact)
    return {
        "success": True,
        "notifications": {
            "email": email_result,
            "whatsapp": whatsapp_result,
        },
    }


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
    return await _process_enquiry_submission(
        EnquiryCreate(
            name=input.name,
            email=input.email,
            phone=input.phone,
            subject=input.subject,
            message=input.message,
            source="contact_form",
        )
    )


@api_router.post("/enquiry", status_code=201)
async def submit_enquiry(input: EnquiryCreate):
    """Receive any website enquiry submission, store it, and notify via email/WhatsApp."""
    return await _process_enquiry_submission(input)

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
