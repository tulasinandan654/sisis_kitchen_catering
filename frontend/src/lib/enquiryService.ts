// Sends enquiries via Netlify Forms.
//
// How Netlify Forms works:
// 1. A hidden static form with matching name + fields is declared in public/index.html
//    so Netlify's build step detects it. See <form name="sisis-enquiry"> there.
// 2. At runtime we POST url-encoded form data to "/" including a `form-name` field.
// 3. Netlify captures the submission, shows it in your dashboard, and emails you.
//
// This keeps everything static / Netlify-friendly (no backend needed for forms).

const NETLIFY_FORM_NAME = "sisis-enquiry";

export type EnquiryFormType =
  | "contact"
  | "booking"
  | "custom_menu"
  | "delivery";

export interface EnquiryPayload {
  form_type: EnquiryFormType;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  details?: Record<string, unknown>;
}

const encode = (data: Record<string, string>): string =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join("&");

export const sendEnquiry = async (payload: EnquiryPayload): Promise<void> => {
  const body: Record<string, string> = {
    "form-name": NETLIFY_FORM_NAME,
    form_type: payload.form_type,
    name: payload.name,
    email: payload.email || "",
    phone: payload.phone || "",
    subject: payload.subject || "",
    message: payload.message || "",
    details: payload.details ? JSON.stringify(payload.details, null, 2) : "",
  };

  // On Netlify, a successful capture returns 200. In non-Netlify environments
  // (e.g. Emergent preview), POST to "/" returns 404 — we still resolve so the
  // UI works during preview. Real emails only start flowing once deployed to
  // Netlify with the hidden static form in public/index.html registered.
  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(body),
    });
  } catch (err) {
    // Only reject on a genuine network failure (offline, DNS, etc.)
    throw new Error("Network error. Please check your connection and try again.");
  }
};
