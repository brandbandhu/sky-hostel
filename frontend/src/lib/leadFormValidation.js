export const sanitizePhone = (value) => String(value || "").replace(/\D/g, "").slice(0, 10);

export const isValidPhone = (value) => /^\d{10}$/.test(String(value || "").trim());

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());

export const getLeadFormError = ({
  name,
  email,
  phone,
  collegeCourse,
  lookingFor
}) => {
  if (!String(name || "").trim()) return "Please enter the student's name.";
  if (!isValidPhone(phone)) return "Please enter a valid 10-digit phone number.";
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  if (!String(collegeCourse || "").trim()) return "Please enter the college/course.";
  if (!String(lookingFor || "").trim()) return "Please select what you are looking for.";
  return "";
};
