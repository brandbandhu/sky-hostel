import { supabase } from "./supabaseClient";

const missingConfigError = {
  code: "SUPABASE_CONFIG_MISSING",
  message: "Supabase configuration is missing. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY."
};

const isTableMissing = (error) => {
  if (!error) return false;
  if (error.code === "42P01" || error.code === "PGRST205") return true;
  const message = String(error.message || "").toLowerCase();
  return (
    message.includes("could not find the table") ||
    message.includes("relation") && message.includes("does not exist")
  );
};
const isPolicyError = (error) => error?.code === "42501";

export const getFriendlySupabaseError = (error) => {
  if (!error) return "Unable to submit right now. Please try again.";
  if (isPolicyError(error)) {
    return "Database policy blocked this request. Please enable INSERT policy for anon role.";
  }
  if (isTableMissing(error)) {
    return "Database table is missing. Please create required tables in Supabase.";
  }
  return error.message || "Unable to submit right now. Please try again.";
};

export const submitLeadForm = async ({ name, phone, lookingFor, source = "home_form" }) => {
  if (!supabase) return { error: missingConfigError };

  const payload = {
    name,
    phone,
    looking_for: lookingFor,
    created_at: new Date().toISOString()
  };

  const leadInsert = await supabase.from("leads").insert([payload]);
  if (!leadInsert.error) return { error: null };

  if (!isTableMissing(leadInsert.error)) {
    return { error: leadInsert.error };
  }

  const fallbackMessage = `Lead from ${source}. Looking for: ${lookingFor || "Not specified"}.`;
  const fallbackInsert = await supabase.from("contact_messages").insert([
    {
      name,
      email: "lead@skyhostels.local",
      phone,
      subject: `Lead - ${source}`,
      message: fallbackMessage
    }
  ]);

  return { error: fallbackInsert.error || null };
};

export const submitContactForm = async ({ name, email, phone, subject, message }) => {
  if (!supabase) return { error: missingConfigError };

  const contactInsert = await supabase.from("contact_messages").insert([
    {
      name,
      email,
      phone,
      subject,
      message
    }
  ]);

  if (!contactInsert.error) return { error: null };

  if (!isTableMissing(contactInsert.error)) {
    return { error: contactInsert.error };
  }

  const fallbackInsert = await supabase.from("leads").insert([
    {
      name,
      phone,
      looking_for: subject || "Contact Enquiry",
      created_at: new Date().toISOString()
    }
  ]);

  return { error: fallbackInsert.error || null };
};
