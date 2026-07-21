# Sisi's Kitchen Catering — PRD

## Original problem statement
Add a floating "Chat on WhatsApp" button visible on every page, wired to open WhatsApp with a pre-filled enquiry message. Then deploy the site publicly.

## Implemented (2026-12)
- `WhatsAppButton.jsx` component (React) — green WhatsApp brand color, official WA icon (inline SVG), fixed bottom-right, hover scale + shadow animation, mobile responsive sizing.
- Mounted globally inside `<BrowserRouter>` in `App.js` so it appears across every route.
- Opens `https://wa.me/919030058654?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20catering%20services.` in a new tab (native app on mobile, WhatsApp Web on desktop).
- data-testid: `whatsapp-float-button`.

## Config
- WhatsApp number: +91 90300 58654
- Pre-filled message: "Hi, I'd like to enquire about catering services."

## Files
- `/app/frontend/src/components/WhatsAppButton.jsx`
- `/app/frontend/src/App.js` (import + mount)
- `/app/frontend/src/App.css` (styles: `.whatsapp-float-btn`, responsive breakpoints)

## Notes / Backlog
- The `/app` workspace currently contains the Emergent React template, not the pulled `sisis_kitchen_catering` GitHub source. Once the real repo content is merged in, the WhatsApp button will still work globally (already mounted at the App root).
- Deployment: user action via Emergent "Deploy" button.

## Next
- Pull actual Sisi's Kitchen pages/content from GitHub repo if needed.
- Deploy via Emergent Deploy.
