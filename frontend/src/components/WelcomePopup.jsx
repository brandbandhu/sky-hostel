import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { toast } from "sonner";
import { getFriendlySupabaseError, submitContactForm } from "../lib/formSubmissions";

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    lookingFor: "",
  });

  useEffect(() => {
    // Always show the popup when the site is loaded or refreshed
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white sm:rounded-3xl">
        <div className="grid md:grid-cols-[1.1fr,1.4fr]">
          {/* Left image panel */}
          <div className="relative h-64 md:h-full">
            <img
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Sky Hostels"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-900/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-sm font-medium text-sky-100 uppercase tracking-[0.2em]">
                Welcome to
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Sky Hostels
              </h2>
              <p className="mt-1 text-sm text-sky-100">
                Premium PG living in the heart of the city.
              </p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="p-6 md:p-8 bg-slate-50">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
              Want a quick call back?
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Share your details and we&apos;ll help you find the perfect room at Sky Hostels.
            </p>

            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { error } = await submitContactForm({
                    name: formData.name,
                    email: "popup@skyhostels.local",
                    phone: formData.phone,
                    subject: `Popup enquiry - ${formData.lookingFor || "Not specified"}`,
                    message: `Popup form enquiry. Looking for: ${
                      formData.lookingFor || "Not specified"
                    }.`,
                    lookingFor: formData.lookingFor || "",
                    source: "welcome_popup"
                  });

                  if (error) {
                    console.error("Supabase popup insert error:", error);
                    throw error;
                  }

                  toast.success("Thanks! We will contact you shortly.");
                  setFormData({ name: "", phone: "", lookingFor: "" });
                  setOpen(false);
                } catch (err) {
                  console.error("Failed to save popup enquiry:", err);
                  toast.error(getFriendlySupabaseError(err));
                }
              }}
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder="For ex. John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  placeholder="+91 00000 00000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Looking for
                </label>
                <select
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  value={formData.lookingFor}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, lookingFor: e.target.value }))
                  }
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="single">Single occupancy</option>
                  <option value="double">Double occupancy</option>
                  <option value="triple">Triple / sharing</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-600 hover:shadow-sky-500/50"
              >
                Submit
              </button>

              <p className="text-[11px] leading-snug text-slate-500 mt-2">
                By sharing your details, you agree to be contacted by Sky Hostels team regarding availability and pricing.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
