import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya & Rajesh',
      event: 'Wedding Reception',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Royal Caterers made our wedding day absolutely perfect! The food was exceptional, and every guest complimented the authentic Hyderabadi flavors. Their service was flawless from start to finish.'
    },
    {
      name: 'Vikram Enterprises',
      event: 'Corporate Event',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'We have been using The Boat House Catering for our corporate events. Their professionalism and quality of food never disappoint. Highly recommended for business functions.'
    },
    {
      name: 'Meera Sharma',
      event: 'Birthday Celebration',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Organized my father\'s 60th birthday party and Sisi\'s Kitchen Catering exceeded all expectations. The variety of dishes and the presentation were outstanding. Everyone loved the food!'
    },
    {
      name: 'Arjun & Family',
      event: 'House Warming',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Amazing experience with Sisi\'s Kitchen Catering for our house warming ceremony. They understood our traditional requirements perfectly and delivered authentic food that our guests still talk about.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our catering services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-amber-600 text-sm">{testimonial.event}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 text-amber-200" size={24} />
                <p className="text-gray-700 italic leading-relaxed pl-6">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;