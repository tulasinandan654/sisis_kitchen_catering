import React from 'react';
import { Shield, Award, MapPin, Clock, Users, ChefHat } from 'lucide-react';

const badges = [
  {
    icon: Users,
    title: '500+ Events',
    subtitle: 'Delivered flawlessly',
  },
  {
    icon: ChefHat,
    title: 'Expert Chefs',
    subtitle: 'Authentic Hyderabadi cuisine',
  },
  {
    icon: Shield,
    title: 'Hygiene First',
    subtitle: 'Fresh ingredients, safe kitchens',
  },
  {
    icon: Award,
    title: '4.9★ Rated',
    subtitle: 'Loved by customers',
  },
  {
    icon: MapPin,
    title: 'Free Delivery',
    subtitle: 'Within 7 km of Hyderabad',
  },
  {
    icon: Clock,
    title: 'Same-day Response',
    subtitle: 'Quick quotes on WhatsApp',
  },
];

const TrustBadges: React.FC = () => {
  return (
    <section className="py-14 bg-orange-50 border-y border-orange-100" data-testid="trust-badges">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-orange-100 p-3 rounded-full mb-3">
                  <Icon className="text-orange-600" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{b.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{b.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
