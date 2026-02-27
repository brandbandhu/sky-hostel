const resolveBaseUrl = () => {
  const envBaseUrl = (process.env.REACT_APP_BACKEND_URL || '').trim();
  if (envBaseUrl) return envBaseUrl.replace(/\/+$/, '');

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocalhost = host === 'localhost' || host === '127.0.0.1';
    if (isLocalhost) return 'http://localhost:8000';
    return window.location.origin;
  }

  return 'http://localhost:8000';
};

const BASE_URL = resolveBaseUrl();

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

export async function sendEnquiry(formData) {
  const enquiryUrl = `${BASE_URL}/api/enquiry`;
  const response = await fetch(enquiryUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => '');
    throw new Error(responseText || `Failed to submit enquiry (${response.status}) at ${enquiryUrl}`);
  }

  return response.json();
}
