// Sends enquiries to the FastAPI backend at /api/enquiry
// Backend URL always comes from REACT_APP_BACKEND_URL (CRA env)

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

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

export interface EnquiryResponse {
  id: string;
  created_at: string;
}

export const sendEnquiry = async (
  payload: EnquiryPayload
): Promise<EnquiryResponse> => {
  const res = await fetch(`${API}/enquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail = "Failed to submit enquiry";
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch (_) {
      /* ignore */
    }
    throw new Error(detail);
  }

  return res.json();
};
