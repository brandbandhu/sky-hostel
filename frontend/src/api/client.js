const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export async function fetchStatusChecks() {
  const response = await fetch(`${BASE_URL}/api/status`);
  if (!response.ok) {
    throw new Error(`Failed to fetch status checks: ${response.status}`);
  }
  return response.json();
}

export async function createStatusCheck(clientName) {
  const response = await fetch(`${BASE_URL}/api/status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_name: clientName }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create status check: ${response.status}`);
  }

  return response.json();
}

export async function sendContactMessage(formData) {
  const response = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Failed to send contact message: ${response.status}`);
  }

  return response.json();
}

