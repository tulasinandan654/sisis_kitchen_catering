import React from 'react';
import { Phone } from 'lucide-react';

/**
 * Sticky bottom action bar on mobile only — pairs with the floating WhatsApp
 * button (bottom-right). This bar sits full-width above content for quick
 * tap-to-call. Hidden on md+ screens where the header CTA is already visible.
 */
const MobileCallBar: React.FC = () => {
  return (
    <a
      href="tel:9030058654"
      data-testid="mobile-call-bar"
      className="md:hidden fixed bottom-4 left-4 z-40 flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-full shadow-lg font-semibold text-sm active:scale-95 transition-transform"
    >
      <Phone size={18} />
      Call
    </a>
  );
};

export default MobileCallBar;
