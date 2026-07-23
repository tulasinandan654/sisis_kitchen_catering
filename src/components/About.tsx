import React from 'react';
import { CheckCircle, Heart, Users, Clock } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Passionate Chefs',
      description: 'Our expert culinary team brings passion and creativity to every dish'
    },
    {
      icon: Users,
      title: 'Personalized Service',
      description: 'Dedicated event coordinators ensure your celebration is flawless'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assured',
      description: 'Premium ingredients and rigorous quality standards in every meal'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'Punctual service and seamless execution for all your events'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Crafting Culinary Excellence Since
              <span className="text-amber-600"> 2019</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Sisi's Kitchen Catering Services is Hyderabad's trusted catering service, specializing in authentic 
              Indian cuisine and contemporary fusion dishes. We understand that food is the heart of 
              every celebration, and we're committed to making your special moments truly memorable.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              From traditional Hyderabadi biryanis to modern continental cuisine, our diverse menu 
              caters to all tastes and dietary requirements. Our experienced team handles everything 
              from intimate family gatherings to grand wedding receptions with equal dedication and attention to detail.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <feature.icon className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Professional chef cooking"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Elegant food presentation"
                className="rounded-lg shadow-lg mt-8"
              />
              <img
                src="https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Catering setup"
                className="rounded-lg shadow-lg -mt-8"
              />
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Wedding catering"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-lg shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;