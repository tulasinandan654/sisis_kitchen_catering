import React from 'react';
import { Check, Leaf } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

interface Package {
  name: string;
  price: string;
  type: 'veg' | 'non-veg';
  minGuests: number;
  highlights: string[];
  badge?: string;
}

const Packages = () => {
  const packages: Package[] = [
    {
      name: 'Budget Package',
      price: '329',
      type: 'non-veg',
      minGuests: 50,
      badge: 'Popular',
      highlights: [
        'Chicken Dum Biryani',
        'Mixed Veg Curry',
        'Paneer options',
        'Complete accompaniments',
        'Sweet dessert',
        'Free delivery within 7 km'
      ]
    },
    {
      name: 'Silver Package',
      price: '389',
      type: 'non-veg',
      minGuests: 50,
      highlights: [
        'Mutton Dum Biryani',
        'Chicken Curry',
        'Veg Dum Biryani',
        'Paneer specialties',
        'Premium sweets',
        'Full accompaniments'
      ]
    },
    {
      name: 'Premium Package',
      price: '489',
      type: 'non-veg',
      minGuests: 50,
      badge: 'Most Popular',
      highlights: [
        'Welcome Drink',
        'Veg & Non-Veg Starters',
        'Multiple biryani options',
        'Chicken & Mutton Curry',
        'Ice cream included',
        'Premium presentation'
      ]
    },
    {
      name: 'Veg Basic',
      price: '249',
      type: 'veg',
      minGuests: 50,
      highlights: [
        'Veg Dum Biryani',
        'Mixed Veg Curry',
        'Paneer options',
        'Complete side dishes',
        'Sweet dessert',
        'Budget-friendly'
      ]
    },
    {
      name: 'Veg Silver',
      price: '349',
      type: 'veg',
      minGuests: 50,
      highlights: [
        'Welcome Drink',
        'Veg Starter included',
        'Multiple rice varieties',
        'Paneer specialties',
        'Premium sweets',
        'Ice cream dessert'
      ]
    },
    {
      name: 'Veg Premium',
      price: '369',
      type: 'veg',
      minGuests: 50,
      badge: 'Signature',
      highlights: [
        'Welcome Drink',
        'Veg Starter',
        'Poornam & Bobatlu',
        'Multiple rice types',
        'Paneer delicacies',
        'Traditional favorites'
      ]
    }
  ];

  const vegPackages = packages.filter(p => p.type === 'veg');
  const nonVegPackages = packages.filter(p => p.type === 'non-veg');

  const PackageCard = ({ pkg }: { pkg: Package }) => {
    const bgColor = pkg.type === 'veg'
      ? 'from-green-50 to-emerald-50 border-green-200'
      : 'from-orange-50 to-red-50 border-orange-200';
    const accentColor = pkg.type === 'veg' ? 'text-green-600' : 'text-orange-600';
    const buttonColor = pkg.type === 'veg'
      ? 'bg-green-600 hover:bg-green-700'
      : 'bg-orange-600 hover:bg-orange-700';

    return (
      <div className={`bg-gradient-to-br ${bgColor} rounded-xl shadow-lg border-2 overflow-hidden transform hover:scale-105 transition-transform duration-300 relative`}>
        {pkg.badge && (
          <div className={`absolute top-4 right-4 ${accentColor} bg-white px-4 py-1 rounded-full text-sm font-bold`}>
            {pkg.badge}
          </div>
        )}
        <div className="p-8">
          <h3 className={`text-2xl font-bold ${accentColor} mb-2`}>{pkg.name}</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className={`text-4xl font-bold ${accentColor}`}>₹{pkg.price}</span>
            <span className="text-gray-600">/plate</span>
          </div>
          <p className="text-sm text-gray-600 mb-6">Min: {pkg.minGuests} guests</p>

          <div className="space-y-3 mb-8">
            {pkg.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Check className={accentColor} size={20} />
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            data-testid={`package-quote-${pkg.name.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() =>
              openWhatsApp(
                `Hi, I'd like a quote for the ${pkg.name} (₹${pkg.price}/plate). Event date: __, Guests: __.`
              )
            }
            className={`w-full ${buttonColor} text-white py-3 rounded-lg font-semibold transition-colors`}
          >
            Get Quote on WhatsApp
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Catering Packages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully curated packages or build your own custom menu
          </p>
        </div>

        {/* Vegetarian Packages */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Leaf className="text-green-600" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">Vegetarian Packages</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vegPackages.map((pkg, idx) => (
              <PackageCard key={idx} pkg={pkg} />
            ))}
          </div>
        </div>

        {/* Non-Vegetarian Packages */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Leaf className="text-orange-600" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">Non-Vegetarian Packages</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nonVegPackages.map((pkg, idx) => (
              <PackageCard key={idx} pkg={pkg} />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Don't see what you're looking for?</p>
          <a
            href="#custom-menu"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Create Custom Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default Packages;
