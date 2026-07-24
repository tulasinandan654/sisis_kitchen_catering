import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle } from 'lucide-react';
import { sendEnquiry } from '../lib/enquiryService';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<
    { type: 'idle' } | { type: 'sending' } | { type: 'success' } | { type: 'error'; msg: string }
  >({ type: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', msg: 'Please fill in all fields.' });
      return;
    }
    setStatus({ type: 'sending' });
    try {
      await sendEnquiry({
        form_type: 'contact',
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        subject: 'Website contact form',
      });
      setStatus({ type: 'success' });
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setStatus({ type: 'error', msg: err?.message || 'Something went wrong.' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions? We're here to help create the perfect catering experience for your event
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Phone, title: 'Phone', content: ['9030058654', '8121358654'] },
            { icon: Mail, title: 'Email', content: ['info@sisiskitchen.com'] },
            {
              icon: MapPin,
              title: 'Location',
              content: ['Shop no 2a, Kismatpur Rd', 'Bharath Nagar Colony', 'Hyderabad, Telangana 500086'],
            },
            {
              icon: Clock,
              title: 'Hours',
              content: ['Mon - Sat', '9:00 AM - 9:00 PM', 'Closed on Sundays'],
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
              >
                <Icon className="text-orange-500 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <div className="space-y-1 text-gray-300 text-sm">
                  {item.content.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form
              className="space-y-4"
              onSubmit={handleSubmit}
              data-testid="contact-form"
              name="sisis-enquiry"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="sisis-enquiry" />
              <input type="hidden" name="form_type" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                data-testid="contact-name"
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                data-testid="contact-email"
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
                data-testid="contact-message"
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />

              {status.type === 'error' && (
                <p className="text-red-400 text-sm" data-testid="contact-error">{status.msg}</p>
              )}
              {status.type === 'success' && (
                <div
                  className="flex items-center gap-2 text-green-400 text-sm"
                  data-testid="contact-success"
                >
                  <CheckCircle size={18} />
                  Thanks! We'll get back to you shortly.
                </div>
              )}

              <button
                type="submit"
                disabled={status.type === 'sending'}
                data-testid="contact-submit"
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-70 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {status.type === 'sending' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending…
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
              <ul className="space-y-4 text-gray-300">
                {[
                  'Expert chefs with years of experience',
                  'Fresh, high-quality ingredients',
                  'Customizable menus for every budget',
                  'Free delivery within 7 km',
                  'Professional service and presentation',
                  'Hygienic food preparation',
                  'Flexible minimum guest count (50+)',
                  'Competitive pricing with bulk discounts',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
