import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Download } from 'lucide-react';

interface MenuPackage {
  name: string;
  price: string;
  type: 'veg' | 'non-veg';
  minMembers: number;
  features: string[];
  highlights: string[];
  items: MenuItem[];
  terms: string[];
  discount: boolean;
}

interface MenuItem {
  category: string;
  items: string[];
}

const MenuDetails = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const vegPackages: MenuPackage[] = [
    {
      name: 'Basic Package',
      price: '249',
      type: 'veg',
      minMembers: 50,
      discount: true,
      features: ['Vegetarian only', 'Perfect for office events', 'Budget-friendly'],
      highlights: [
        'Veg Dum Biryani',
        'Mixed Veg Curry',
        'Paneer options',
        'Welcome Drink',
        'Ice Cream'
      ],
      items: [
        {
          category: 'Main Courses',
          items: [
            'Veg Dum Biryani / Bagara Rice / Jeera Rice / Any Flavoured Rice',
            'Mixed Veg curry / Vankai Masala / Aloo gobi Masala / Any masala curry',
            'Paneer Curry (Paneer Butter Masala / Kadai Paneer)'
          ]
        },
        {
          category: 'Starters & Sides',
          items: [
            'Bhindi Fry/Dondakaya Fry / Cabbage Pakoda Fry',
            'White Rice',
            'Roti / Naan'
          ]
        },
        {
          category: 'Dal & Soups',
          items: [
            'Palak Dal/Tomato Dal / Dal Tadka / Dal Fry/Mango Dal',
            'Sambar / Rasam / Pachi pulusu'
          ]
        },
        {
          category: 'Accompaniments',
          items: [
            'Tomato pachadi / Gongura Pachadi / Dosakaya pachadi / Any other roti pachadi',
            'Papad',
            'Curd',
            'Raitha',
            'Mirchi ka salan',
            'Onion Lemon Salad'
          ]
        },
        {
          category: 'Desserts & Beverages',
          items: [
            'Double ka meetha / Gulab Jamun / Kala Jamun / Kaddu ka kheer / Qurbani ka meetha / Gajar ka halwa',
            'Ice cream - Vanila / Strawberry / Butterscotch',
            'Water'
          ]
        }
      ],
      terms: [
        'Price includes food, service, disposables and water',
        'Extra plates to be charged extra',
        'Host has to arrange tables and garbage bin',
        'Transportation free within 7 km',
        '80% amount should be paid while booking the event',
        'Remaining 20% should be paid on the day of event',
        'Discount for more members available'
      ]
    },
    {
      name: 'Silver Package',
      price: '349',
      type: 'veg',
      minMembers: 50,
      discount: true,
      features: ['Vegetarian with starters', 'Premium presentation', 'Welcome drink included'],
      highlights: [
        'Welcome Drink',
        'Veg Starter included',
        'Multiple rice varieties',
        'Paneer options',
        'Premium Sweets'
      ],
      items: [
        {
          category: 'Welcome',
          items: ['Welcome Drink: Lemon juice / Orange Drink / Water melon juice / Fruit Punch / Other']
        },
        {
          category: 'Starters',
          items: ['Veg Manchuria / Gobi 65 / Aloo 65 / Veg Shanghai Roll / Paneer starter']
        },
        {
          category: 'Main Courses',
          items: [
            'Veg Dum Biryani / Bagara Rice / Jeera Rice / Any Flavoured Rice',
            'Paneer Curry / Mixed Veg curry / Vankai Masala / Aloo gobi Masala / Any masala curry',
            'White Rice'
          ]
        },
        {
          category: 'Dal & Soups',
          items: [
            'Palak Dal/Tomato Dal / Dal Tadka / Dal Fry/Mango Dal',
            'Sambar / Rasam / Pachi pulusu'
          ]
        },
        {
          category: 'Side Dishes',
          items: [
            'Bhindi Fry/Dondakaya Fry / Cabbage Pakoda Fry',
            'Roti / Naan / Poori'
          ]
        },
        {
          category: 'Accompaniments',
          items: [
            'Tomato pachadi / Gongura Pachadi / Dosakaya pachadi / Any Roti Pachadi',
            'Papad',
            'Curd',
            'Raitha',
            'Mirchi ka salan',
            'Onion Lemon Salad'
          ]
        },
        {
          category: 'Desserts',
          items: [
            'Double ka Meetha / Gulab Jamun / Kala Jamun / Kaddu ka kheer / Qurbani ka Meetha / Gajar ka Halwa',
            'Ice Cream - Vanila / Strawberry / Butterscotch'
          ]
        }
      ],
      terms: [
        'Price includes food, service, disposables and water',
        'Extra plates to be charged extra',
        'Host has to arrange tables and garbage bin',
        'Transportation free within 7 km',
        '80% amount should be paid while booking',
        'Remaining 20% on the day of event',
        'Discount for more members'
      ]
    },
    {
      name: 'Traditional Package',
      price: '369',
      type: 'veg',
      minMembers: 50,
      discount: true,
      features: ['Authentic Hyderabadi cuisine', 'Traditional favorites', 'Special preparations'],
      highlights: [
        'Welcome Drink',
        'Veg Starter included',
        'Lemon Rice / Tamarind Rice',
        'Poornam / Bobatlu / Mirchi Bajji',
        'Ice Cream'
      ],
      items: [
        {
          category: 'Welcome & Starters',
          items: [
            'Welcome Drink: Lemon juice / Orange Drink / Water melon juice / Fruit Punch / Other',
            'Veg Manchuria / Gobi 65 / Aloo 65 / Veg Shanghai Roll / Paneer starter'
          ]
        },
        {
          category: 'Rice Varieties',
          items: [
            'Veg Dum Biryani / Bagara Rice / Jeera Rice / Any Flavoured Rice',
            'Lemon Rice / Tamarind Rice'
          ]
        },
        {
          category: 'Traditional Specialties',
          items: [
            'Poornam / Bobatlu / Mirchi Bajji',
            'Paneer Curry / Mixed Veg curry / Vankai Masala / Aloo gobi Masala / Any masala curry'
          ]
        },
        {
          category: 'Breads & Sides',
          items: [
            'Roti / Naan',
            'Bhindi Fry/Dondakaya Fry / Cabbage Pakoda Fry'
          ]
        },
        {
          category: 'Dal & Soups',
          items: [
            'Palak Dal/Tomato Dal / Dal Tadka / Dal Fry/Mango Dal',
            'Sambar / Rasam / Pachi pulusu'
          ]
        },
        {
          category: 'Accompaniments',
          items: [
            'Tomato pachadi / Gongura Pachadi / Dosakaya pachadi / Any Roti Pachadi',
            'Papad',
            'Curd',
            'Raitha',
            'Mirchi ka salan',
            'Onion Lemon Salad'
          ]
        },
        {
          category: 'Desserts',
          items: [
            'Double ka Meetha / Gulab Jamun / Kala Jamun / Kaddu ka kheer / Qurbani ka Meetha / Gajar ka Halwa',
            'Ice Cream - Vanila / Strawberry / Butterscotch'
          ]
        }
      ],
      terms: [
        'Price includes food, service, disposables and water',
        'Extra plates to be charged extra',
        'Host has to arrange tables and garbage bin',
        'Transportation free within 7 km',
        '80% advance payment at booking',
        '20% payment on event day',
        'Bulk discounts available'
      ]
    }
  ];

  const nonVegPackages: MenuPackage[] = [
    {
      name: 'Budget Package',
      price: '329',
      type: 'non-veg',
      minMembers: 50,
      discount: true,
      features: ['Non-vegetarian option', 'Economy-friendly', 'Generous portions'],
      highlights: [
        'Chicken Dum Biryani',
        'Chicken Curry',
        'Mixed Veg options',
        'Complete meal',
        'Affordable pricing'
      ],
      items: [
        {
          category: 'Main Non-Veg',
          items: [
            'Chicken Dum Biryani',
            'Chicken Curry'
          ]
        },
        {
          category: 'Vegetarian Curries',
          items: [
            'Mixed Veg curry / Vankai Masala / Aloo gobi Masala / Any masala curry',
            'Bhindi Fry/Dondakaya Fry / Cabbage Pakoda Fry'
          ]
        },
        {
          category: 'Rice & Breads',
          items: [
            'White Rice',
            'Roti / Naan'
          ]
        },
        {
          category: 'Dal & Soups',
          items: [
            'Palak Dal/Tomato Dal / Dal Tadka / Dal Fry/Mango Dal',
            'Sambar / Rasam / Pachi pulusu'
          ]
        },
        {
          category: 'Accompaniments',
          items: [
            'Tomato pachadi / Gongura Pachadi / Dosakaya pachadi / Any other roti pachadi',
            'Papad',
            'Curd',
            'Raitha',
            'Mirchi ka salan',
            'Onion Lemon Salad'
          ]
        },
        {
          category: 'Desserts & Beverages',
          items: [
            'Double ka meetha / Gulab Jamun / Kala Jamun / Kaddu ka kheer',
            'Water'
          ]
        }
      ],
      terms: [
        'Minimum members: 50',
        'Price includes food, service, disposables and water',
        'Extra plates charged separately',
        'Host to arrange tables and garbage bin',
        'Free transportation within 7 km',
        '80% at booking, 20% on event day',
        'Discounts available for larger groups'
      ]
    },
    {
      name: 'Basic Package',
      price: '389',
      type: 'non-veg',
      minMembers: 50,
      discount: true,
      features: ['Mixed veg & non-veg', 'Mutton specialty', 'Complete feast'],
      highlights: [
        'Mutton Dum Biryani',
        'Chicken Curry',
        'Paneer options',
        'Premium sweets',
        'Multiple sides'
      ],
      items: [
        {
          category: 'Main Non-Veg Courses',
          items: [
            'Mutton Dum Biryani',
            'Chicken Curry'
          ]
        },
        {
          category: 'Vegetarian Curries',
          items: [
            'Paneer Curry / Mixed Veg curry / Vankai Masala / Aloo gobi Masala / Any masala curry',
            'Bhindi Fry/Dondakaya Fry / Cabbage Pakoda Fry'
          ]
        },
        {
          category: 'Rice & Breads',
          items: [
            'White Rice',
            'Roti / Naan'
          ]
        },
        {
          category: 'Dal & Soups',
          items: [
            'Palak Dal/Tomato Dal / Dal Tadka / Dal Fry/Mango Dal',
            'Sambar / Rasam / Pachi pulusu'
          ]
        },
        {
          category: 'Accompaniments',
          items: [
            'Tomato pachadi / Gongura Pachadi / Dosakaya pachadi / Any other roti pachadi',
            'Papad',
            'Curd',
            'Raitha',
            'Mirchi ka salan',
            'Onion Lemon Salad'
          ]
        },
        {
          category: 'Desserts',
          items: [
            'Double ka meetha / Gulab Jamun / Kala Jamun / Kaddu ka kheer',
            'Water'
          ]
        }
      ],
      terms: [
        'Minimum members: 50',
        'Price includes food, service, and disposables',
        'Transportation free within 7 km',
        'Extra plates charged at applicable rates',
        'Host arranges tables and waste management',
        '80% booking amount, 20% on event day',
        'Group discounts available'
      ]
    },
    {
      name: 'Silver Package',
      price: '489',
      type: 'non-veg',
      minMembers: 50,
      discount: true,
      features: ['Premium non-veg selection', 'Multiple starters', 'Welcome drink & ice cream'],
      highlights: [
        'Welcome Drink',
        'Veg & Non-Veg Starters',
        'Mutton Dum Biryani',
        'Chicken Curry',
        'Veg Dum Biryani',
        'Premium Sweets'
      ],
      items: [
        {
          category: 'Welcome & Starters',
          items: [
            'Welcome Drink: Lemon juice / Orange Drink / Water melon juice / Fruit Punch / Other',
            'Veg Starter - 1',
            'Non Veg Starter - 1'
          ]
        },
        {
          category: 'Main Non-Veg Courses',
          items: [
            'Mutton Dum Biryani',
            'Chicken Curry'
          ]
        },
        {
          category: 'Main Veg Courses',
          items: [
            'Veg Dum Biryani',
            'Paneer Curry / Mixed Veg curry / Vankai Masala / Aloo gobi Masala / Any masala curry'
          ]
        },
        {
          category: 'Breads & Sides',
          items: [
            'Roti / Naan',
            'Bhindi Fry/Dondakaya Fry / Cabbage Pakoda Fry',
            'White Rice'
          ]
        },
        {
          category: 'Dal & Soups',
          items: [
            'Palak Dal/Tomato Dal / Dal Tadka / Dal Fry/Mango Dal',
            'Sambar / Rasam / Pachi pulusu'
          ]
        },
        {
          category: 'Accompaniments',
          items: [
            'Tomato pachadi / Gongura Pachadi / Dosakaya pachadi / Any other roti pachadi',
            'Papad',
            'Curd',
            'Raitha',
            'Mirchi ka salan',
            'Onion Lemon Salad'
          ]
        },
        {
          category: 'Desserts',
          items: [
            'Double ka meetha / Gulab Jamun / Kala Jamun / Kaddu ka kheer / Qurbani ka meeta / Gajar ka halwa',
            'Ice cream - Vanila / Strawberry / Butterscotch'
          ]
        }
      ],
      terms: [
        'Minimum members: 50',
        'Price includes food, service, and disposables',
        'Free transportation within 7 km',
        'Extra plates charged separately',
        'Host provides tables and waste bins',
        '80% advance booking payment',
        '20% balance on event day',
        'Bulk discounts for larger groups'
      ]
    },
    {
      name: 'Platinum Non-Veg Package',
      price: '699',
      type: 'non-veg',
      minMembers: 300,
      discount: true,
      features: ['45+ menu items', 'Multiple live counters', 'Premium preparations', 'Suitable for 300+ guests'],
      highlights: [
        'Welcome Drink',
        'Soup course',
        'Multiple starters',
        'Sea food options',
        'Multiple biryani varieties',
        'Premium live counters',
        'Fresh fruit counter',
        'Sweet station'
      ],
      items: [
        {
          category: 'Welcome & Appetizers',
          items: [
            'Welcome Drink (Any 1) - Lemon Juice / Watermelon / Fruit Punch / Soft Drink',
            'Soup - Veg Manchow / Sweet Corn',
            'Veg Starter (Any 1) - Veg Manchuria / Gobi 65 / Aloo 65 / Paneer Starter',
            'Sea Food Starter (Any 1) - Fish Fry / Fish 65 / Chilli Fish / Prawns Fry'
          ]
        },
        {
          category: 'Main Course - Biryani',
          items: [
            'Chicken Dum Biryani / Mutton Dum Biryani'
          ]
        },
        {
          category: 'Main Curries',
          items: [
            'Chicken Curry / Mutton Curry',
            'Paneer Curry (Paneer Butter Masala / Kadai Paneer)',
            'Veg Curry (Mixed Veg / Vankaya Masala / Aloo Gobi Masala / Any Masala Curry)'
          ]
        },
        {
          category: 'Rice & Breads',
          items: [
            'White Rice',
            'Roti / Naan'
          ]
        },
        {
          category: 'Dal & Soups',
          items: [
            'Dal (Palak Dal / Tomato Dal / Dal Tadka / Dal Fry / Mango Dal)',
            'Sambar / Rasam / Pachi Pulusu'
          ]
        },
        {
          category: 'Premium Live Pani Puri Chaat Counter',
          items: [
            '8 varieties of Pani Puri available',
            'Live counter included in package'
          ]
        },
        {
          category: 'Accompaniments',
          items: [
            'Pachadi (Tomato / Gongura / Dosakaya / Any Roti Pachadi)',
            'Papad',
            'Curd',
            'Raita',
            'Mirchi ka Salan',
            'Green Salad - 5 Varieties'
          ]
        },
        {
          category: 'Desserts & Sweets',
          items: [
            'Sweet (Any 2) - Double ka Meetha / Gulab Jamun / Kala Jamun / Kaddu ka Kheer / Qurbani ka Meetha / Gajar Halwa',
            'Ice Cream (Any 2) - Vanilla / Strawberry / Butterscotch',
            'Sweet Pan'
          ]
        }
      ],
      terms: [
        'Minimum 300+ guests',
        '45+ menu items including live counters and condiments',
        'Transportation extra',
        'Price includes food, service, and disposables',
        'Host arranges tables and waste bins',
        'Extra plates charged separately',
        '80% advance payment at booking',
        '20% balance on event day',
        'Additional upgrade options: Dosa Counter, Bobatlu, Pasta Station, Sweet Station, Candy Counter'
      ]
    }
  ];

  return (
    <section id="menus" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Detailed Menu Packages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive menu options with detailed ingredients and customization options
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <button
              onClick={() => setSelectedPackage(null)}
              className={`px-6 py-3 font-medium transition-all ${
                selectedPackage === null || selectedPackage?.startsWith('veg')
                  ? 'text-white'
                  : 'text-gray-600'
              }`}
            >
              Vegetarian Packages
            </button>
            <button
              onClick={() => setSelectedPackage('non-veg-budget')}
              className={`px-6 py-3 font-medium transition-all border-l border-gray-200 ${
                selectedPackage?.startsWith('non-veg')
                  ? 'text-white'
                  : 'text-gray-600'
              }`}
            >
              Non-Vegetarian Packages
            </button>
          </div>
        </div>

        {/* Display appropriate packages */}
        {!selectedPackage || selectedPackage.startsWith('veg') ? (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Vegetarian Packages</h3>
            {vegPackages.map((pkg, idx) => (
              <PackageCard
                key={idx}
                package={pkg}
                isOpen={selectedPackage === `veg-${idx}`}
                onToggle={() => setSelectedPackage(selectedPackage === `veg-${idx}` ? null : `veg-${idx}`)}
                expandedSection={expandedSection}
                onSectionToggle={setExpandedSection}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Non-Vegetarian Packages</h3>
            {nonVegPackages.map((pkg, idx) => (
              <PackageCard
                key={idx}
                package={pkg}
                isOpen={selectedPackage === `non-veg-${idx}`}
                onToggle={() => setSelectedPackage(selectedPackage === `non-veg-${idx}` ? null : `non-veg-${idx}`)}
                expandedSection={expandedSection}
                onSectionToggle={setExpandedSection}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface PackageCardProps {
  package: MenuPackage;
  isOpen: boolean;
  onToggle: () => void;
  expandedSection: string | null;
  onSectionToggle: (section: string | null) => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, isOpen, onToggle, expandedSection, onSectionToggle }) => {
  const bgColor = pkg.type === 'veg' ? 'from-green-50 to-emerald-50' : 'from-orange-50 to-red-50';
  const accentColor = pkg.type === 'veg' ? 'text-green-700' : 'text-red-700';
  const buttonColor = pkg.type === 'veg' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700';

  return (
    <div className={`bg-gradient-to-r ${bgColor} rounded-xl border-2 ${pkg.type === 'veg' ? 'border-green-200' : 'border-orange-200'} overflow-hidden shadow-lg`}>
      <button
        onClick={onToggle}
        className="w-full p-6 text-left transition-all hover:shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className={`text-2xl font-bold ${accentColor} mb-2`}>{pkg.name}</h3>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="font-semibold">Price: ₹{pkg.price}/plate</span>
              <span className="font-semibold">Min: {pkg.minMembers} guests</span>
              {pkg.discount && <span className="bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">Bulk Discounts</span>}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${pkg.type === 'veg' ? 'bg-green-100' : 'bg-orange-100'}`}>
            {isOpen ? (
              <ChevronUp className={accentColor} size={24} />
            ) : (
              <ChevronDown className={accentColor} size={24} />
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 border-t-2 border-gray-200">
          {/* Highlights */}
          <div className="mb-6">
            <h4 className={`text-lg font-semibold ${accentColor} mb-3`}>Menu Highlights</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {pkg.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${pkg.type === 'veg' ? 'bg-green-600' : 'bg-orange-600'}`}></div>
                  <span className="text-gray-700 text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="mb-6">
            <h4 className={`text-lg font-semibold ${accentColor} mb-3`}>Complete Menu</h4>
            <div className="space-y-3">
              {pkg.items.map((section, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => onSectionToggle(expandedSection === section.category ? null : section.category)}
                    className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between transition-colors"
                  >
                    <h5 className={`font-semibold ${accentColor}`}>{section.category}</h5>
                    {expandedSection === section.category ? (
                      <ChevronUp className={accentColor} size={20} />
                    ) : (
                      <ChevronDown className={accentColor} size={20} />
                    )}
                  </button>
                  {expandedSection === section.category && (
                    <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                      <ul className="space-y-2">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex gap-3 text-sm text-gray-700">
                            <span className={`${pkg.type === 'veg' ? 'text-green-600' : 'text-orange-600'} font-bold flex-shrink-0`}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Terms */}
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <h4 className={`text-lg font-semibold ${accentColor} mb-3`}>Terms & Conditions</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pkg.terms.map((term, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-600">
                  <span className={`${pkg.type === 'veg' ? 'text-green-600' : 'text-orange-600'} font-bold flex-shrink-0`}>✓</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Download & Book */}
          <div className="flex gap-3">
            <button className={`flex-1 ${buttonColor} text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2`}>
              <Download size={20} />
              Download Menu PDF
            </button>
            <button className={`flex-1 ${buttonColor} text-white py-3 px-4 rounded-lg font-semibold transition-colors`}>
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDetails;
