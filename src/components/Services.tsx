import React, { useState } from 'react';
import { Heart, Building, PartyPopper, Coffee, Utensils, Users } from 'lucide-react';
import BookingForm from './BookingForm';

const Services = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const services = [
    {
      icon: Heart,
      title: 'Wedding Catering',
      description: 'Complete wedding catering solutions with traditional and contemporary menus',
      image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Multi-cuisine options', 'Bridal party menus', 'Live counters', 'Traditional setups']
    },
    {
      icon: Building,
      title: 'Corporate Events',
      description: 'Professional catering for business meetings, conferences, and corporate parties',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Business lunches', 'Conference catering', 'Networking events', 'Office parties']
    },
    {
      icon: PartyPopper,
      title: 'Birthday Parties',
      description: 'Fun and delicious catering for birthday celebrations of all ages',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Kids party menus', 'Theme-based food', 'Custom cakes', 'Party decorations']
    },
    {
      icon: Coffee,
      title: 'Social Gatherings',
      description: 'Perfect catering solutions for family reunions, anniversaries, and celebrations',
      image: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Family style service', 'Cultural cuisines', 'Intimate settings', 'Flexible portions']
    },
    {
      icon: Utensils,
      title: 'Religious Functions',
      description: 'Traditional catering for pujas, festivals, and religious ceremonies',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Satvik meals', 'Traditional recipes', 'Religious dietary needs', 'Temple catering']
    },
    {
      icon: Users,
      title: 'Outdoor Events',
      description: 'Mobile catering services for picnics, outdoor parties, and field events',
      image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Mobile kitchen', 'Weather-resistant setup', 'BBQ specialties', 'Field catering']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Catering Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From intimate gatherings to grand celebrations, we provide comprehensive catering solutions 
            tailored to your specific needs and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-amber-600 p-2 rounded-lg">
                  <service.icon className="text-white" size={24} />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setIsBookingFormOpen(true)}
                  className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <BookingForm 
          isOpen={isBookingFormOpen} 
          onClose={() => setIsBookingFormOpen(false)} 
        />
      </div>
    </section>
  );
};

export default Services;