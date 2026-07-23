import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
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
            {
              icon: Phone,
              title: 'Phone',
              content: ['9030058654', '8121358654']
            },
            {
              icon: Mail,
              title: 'Email',
              content: ['info@sisiskitchen.com']
            },
            {
              icon: MapPin,
              title: 'Location',
              content: ['Shop no 2a, Kismatpur Rd', 'Bharath Nagar Colony', 'Hyderabad, Telangana 500086']
            },
            {
              icon: Clock,
              title: 'Hours',
              content: ['Mon - Sun', '9:00 AM - 9:00 PM', 'Closed on Sundays']
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
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
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map/Info */}
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
                  'Competitive pricing with bulk discounts'
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
