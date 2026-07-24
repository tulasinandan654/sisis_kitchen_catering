import React from 'react';
import { WHATSAPP_NUMBER, buildWhatsAppUrl } from '../lib/whatsapp';

const DEFAULT_MESSAGE = "Hi, I'd like to enquire about catering services.";

const WhatsAppButton: React.FC = () => {
  const href = buildWhatsAppUrl(DEFAULT_MESSAGE);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      data-testid="whatsapp-float-button"
      className="whatsapp-float-btn"
      data-number={WHATSAPP_NUMBER}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="whatsapp-float-icon"
      >
        <path
          fill="#ffffff"
          d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.828 1.23 1.9 2.606 3.4 4.554 4.60 .53.13.746 1.5 2.13 1.5.63 0 2.535-.037 2.535-.94 0-.14-.014-.257-.043-.4-.115-.363-3.264-1.65-3.35-1.65m-3.15 11.407a11.7 11.7 0 0 1-6.63-2.062l-4.72 1.472 1.516-4.482a11.66 11.66 0 0 1-2.106-6.68C4.02 10.244 9.284 5 15.752 5s11.732 5.244 11.732 11.86-5.264 11.752-11.744 11.752m0 0"
        />
        <path
          fill="#ffffff"
          d="M27.032 4.83A15.85 15.85 0 0 0 15.766 0C7.032 0 .002 7.03.002 15.762a15.83 15.83 0 0 0 2.1 7.884L0 32l8.588-2.244a15.75 15.75 0 0 0 7.51 1.913h.005c8.732 0 15.9-7.03 15.9-15.762a15.86 15.86 0 0 0-4.65-11.077M15.752 27.03h-.005a13.1 13.1 0 0 1-6.688-1.833l-.48-.284-4.96 1.298 1.32-4.837-.312-.5a13.12 13.12 0 0 1-2.005-6.988c0-7.245 5.905-13.146 13.14-13.146a13.13 13.13 0 0 1 13.148 13.153c0 7.245-5.9 13.135-13.148 13.135"
        />
      </svg>
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
