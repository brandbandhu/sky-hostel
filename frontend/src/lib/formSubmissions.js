import { sendEnquiry } from "../api/client";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY =
  process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || "4ebe6032-6529-4ffa-a83d-37b1c39755d7";
const DEFAULT_EMAIL = "skyhostels3@gmail.com";
const APPS_SCRIPT_DEPLOYMENT_ID = "AKfycbx3Ig4Pddf6lXHcXxxD6bQJpPJTFyTKxC2DrTyNTswv2NmSKjDPg7vOurVqsWhfE4xu";
const GOOGLE_SHEET_WEBHOOK =
  process.env.REACT_APP_GAS_WEB_APP_URL ||
  `https://script.google.com/macros/s/${APPS_SCRIPT_DEPLOYMENT_ID}/exec`;

const normalizeError = (error) => {
  if (!error) return new Error("Unable to submit right now. Please try again.");
  if (error instanceof Error) return error;
  return new Error(String(error));
};

const submitToWeb3Forms = async ({
  name,
  email,
  phone,
  subject,
  message,
  source,
  lookingFor,
  collegeCourse
}) => {
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "Sky Hostels Website",
    subject: subject || "Website Enquiry",
    name: name || "Website Visitor",
    email: email || DEFAULT_EMAIL,
    phone: phone || "",
    message: message || "No message provided.",
    source: source || "website_form",
    looking_for: lookingFor || "",
    college_course: collegeCourse || "",
    botcheck: ""
  };

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Web3Forms submission failed (${response.status}).`);
  }
};

const sendToGoogleSheet = async (payload) => {
  if (!GOOGLE_SHEET_WEBHOOK) return;

  await fetch(GOOGLE_SHEET_WEBHOOK, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });
};

export const getFriendlySupabaseError = (error) => {
  if (!error) return "Unable to submit right now. Please try again.";
  const message = String(error.message || error).trim();
  if (!message) return "Unable to submit right now. Please try again.";
  if (message.toLowerCase().includes("supabase configuration is missing")) {
    return "Form service is updating. Please try again in a moment.";
  }
  if (message.toLowerCase().includes("failed to fetch")) {
    return "Server is unreachable. Please check backend URL and internet connectivity.";
  }
  return message;
};

export const submitLeadForm = async ({ name, email, phone, lookingFor, collegeCourse, source = "home_form" }) => {
  try {
    const subject = `Lead - ${source}`;
    const message = `Lead form submission from ${source}. College/Course: ${collegeCourse || "Not provided"}.`;

    sendToGoogleSheet({
      name: name || "",
      email: email || DEFAULT_EMAIL,
      phone: phone || "",
      collegeCourse: collegeCourse || "",
      collegecourse: collegeCourse || "",
      college_course: collegeCourse || "",
      lookingFor: lookingFor || "",
      lookingfor: lookingFor || "",
      looking_for: lookingFor || "",
      subject,
      message,
      source,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : ""
    }).catch(() => {});

    await submitToWeb3Forms({
      name,
      email: email || DEFAULT_EMAIL,
      phone: phone || "",
      subject,
      message,
      lookingFor: lookingFor || "",
      collegeCourse: collegeCourse || "",
      source
    });

    // Keep backend submission as best effort for DB storage when available.
    sendEnquiry({
      name,
      email: email || DEFAULT_EMAIL,
      phone: phone || "",
      looking_for: lookingFor || "",
      college_course: collegeCourse || "",
      subject,
      message,
      source
    }).catch(() => {});

    return { error: null };
  } catch (error) {
    return { error: normalizeError(error) };
  }
};

export const submitContactForm = async ({ name, email, phone, subject, message, source = "contact_form", lookingFor, collegeCourse }) => {
  try {
    sendToGoogleSheet({
      name: name || "",
      email: email || "",
      phone: phone || "",
      collegeCourse: collegeCourse || "",
      collegecourse: collegeCourse || "",
      college_course: collegeCourse || "",
      lookingFor: lookingFor || "",
      lookingfor: lookingFor || "",
      looking_for: lookingFor || "",
      subject: subject || "",
      message: message || "",
      source,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : ""
    }).catch(() => {});

    await submitToWeb3Forms({
      name,
      email,
      phone,
      subject,
      message,
      source
    });

    // Keep backend submission as best effort for DB storage when available.
    sendEnquiry({
      name,
      email,
      phone,
      subject,
      message,
      looking_for: lookingFor || "",
      source
    }).catch(() => {});

    return { error: null };
  } catch (error) {
    return { error: normalizeError(error) };
  }
};
