// Utility to build WhatsApp deep links with pre-filled messages.
// Number: +91 90300 58654

export const WHATSAPP_NUMBER = "919030058654";

export const buildWhatsAppUrl = (message: string): string => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

export const openWhatsApp = (message: string) => {
  const url = buildWhatsAppUrl(message);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};
