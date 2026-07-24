import React from 'react';
import { ChefHat, Users, Utensils, Award, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openWhatsApp } from '../lib/whatsapp';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Hyderabad's trusted catering partner
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Exquisite Catering for Every Occasion
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              From intimate gatherings to grand celebrations, we craft
              unforgettable culinary experiences with authentic recipes and
              premium quality.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: ChefHat, text: 'Expert Chefs', label: 'Experienced & Professional' },
                { icon: Users, text: '50+ Guests', label: 'Flexible Portions' },
                { icon: Utensils, text: 'Custom Menus', label: 'Tailored to Your Taste' },
                { icon: Award, text: 'Hygienic', label: 'Fresh & Quality Food' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Icon className="text-orange-600 mb-2" size={28} />
                    <h3 className="font-semibold text-gray-900 mb-1">{item.text}</h3>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    "Hi, I'd like a quick quote for catering. Event: __, Date: __, Guests: __."
                  )
                }
                data-testid="hero-whatsapp-quote"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE57] text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
              >
                <MessageCircle size={20} />
                Get Instant Quote
              </button>
              <Link
                to="/custom-menu"
                data-testid="hero-build-menu"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Build Your Menu
              </Link>
              <a
                href="#packages"
                className="bg-white hover:bg-gray-50 text-orange-600 border-2 border-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View Packages
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
              alt="Authentic Hyderabadi catering spread"
              className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
              loading="eager"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg px-5 py-4 flex items-center gap-3">
              <div className="bg-orange-100 rounded-full p-3">
                <ChefHat className="text-orange-600" size={24} />
              </div>
              <div>
                <div className="font-bold text-gray-900">Premium Catering</div>
                <div className="text-sm text-gray-600">Hyderabad, Telangana</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '500+', label: 'Happy Customers' },
            { number: '50', label: 'Minimum Guests' },
            { number: '7 km', label: 'Free Delivery' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
