import React from 'react';
import { ChefHat, Users, Utensils, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Exquisite Catering for Every Occasion
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              From intimate gatherings to grand celebrations, we craft unforgettable culinary experiences with authentic recipes and premium quality.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: ChefHat, text: 'Expert Chefs', label: 'Experienced & Professional' },
                { icon: Users, text: '50+ Guests', label: 'Flexible Portions' },
                { icon: Utensils, text: 'Custom Menus', label: 'Tailored to Your Taste' },
                { icon: Award, text: 'Hygienic', label: 'Fresh & Quality Food' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <Icon className="text-orange-600 mb-2" size={28} />
                    <h3 className="font-semibold text-gray-900 mb-1">{item.text}</h3>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <a
                href="#custom-menu"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Build Your Menu
              </a>
              <a
                href="#packages"
                className="bg-white hover:bg-gray-50 text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Packages
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-300 to-red-400 rounded-2xl h-96 flex items-center justify-center shadow-lg">
            <div className="text-center text-white">
              <ChefHat size={80} className="mx-auto mb-4 opacity-80" />
              <p className="text-2xl font-bold">Premium Catering Services</p>
              <p className="text-sm mt-2 opacity-90">Hyderabad, Telangana</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '500+', label: 'Happy Customers' },
            { number: '50', label: 'Minimum Guests' },
            { number: '7 km', label: 'Free Delivery' }
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
