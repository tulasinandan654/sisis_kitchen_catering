import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: 'What is the minimum guest count?',
    a: 'Our packages start from 50 guests. For smaller intimate gatherings, please contact us on WhatsApp for a custom quote.',
  },
  {
    q: 'Do you offer free delivery?',
    a: 'Yes, we deliver free of charge within a 7 km radius of our Kismatpur, Hyderabad kitchen. A small logistics fee applies for longer distances.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking at least 7 days in advance for smooth planning. For weddings and large events, 3–4 weeks is ideal. Last-minute enquiries are welcome — WhatsApp us and we\'ll do our best.',
  },
  {
    q: 'Can you accommodate dietary restrictions?',
    a: 'Absolutely. We handle vegetarian, non-vegetarian, Jain, satvik, diabetic-friendly and specific allergy requirements. Just mention it when you book.',
  },
  {
    q: 'Do you provide serving staff and equipment?',
    a: 'Yes — professional servers, chafing dishes, disposable plates/cutlery, live counters and setup are available on request. Ask us for a full-service quote.',
  },
  {
    q: 'What are the payment terms?',
    a: 'A 30% advance confirms your booking, with the balance due on the event day. We accept UPI, bank transfer and cash.',
  },
  {
    q: 'Which areas of Hyderabad do you serve?',
    a: 'We cover most of Hyderabad including Kismatpur, Manikonda, Kokapet, Gachibowli, Financial District, Narsingi, Rajendranagar and nearby localities.',
  },
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Everything you need to know before booking</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-orange-200 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  data-testid={`faq-item-${idx}`}
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="text-orange-600 flex-shrink-0 ml-4" size={22} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0 ml-4" size={22} />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center bg-orange-50 rounded-2xl p-8">
          <p className="text-gray-700 mb-4">Still have questions? Chat with us directly.</p>
          <button
            type="button"
            onClick={() =>
              openWhatsApp("Hi, I have a question about your catering services.")
            }
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE57] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            data-testid="faq-whatsapp-cta"
          >
            <MessageCircle size={20} />
            Ask on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
