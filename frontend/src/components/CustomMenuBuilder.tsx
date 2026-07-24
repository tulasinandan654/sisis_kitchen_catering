import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Phone, Mail, Calendar, Users } from 'lucide-react';
import { sendEnquiry } from '../lib/enquiryService';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  vegetarian: boolean;
  description?: string;
}

interface SelectedItem extends MenuItem {
  quantity: number;
}

const CustomMenuBuilder = () => {
  const [cuisineType, setCuisineType] = useState<'veg' | 'non-veg' | 'mixed'>('veg');
  const [selectedItems, setSelectedItems] = useState<Map<string, SelectedItem>>(new Map());
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(50);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const menuItems: MenuItem[] = [
    { id: 's1', name: 'Veg Manchuria', category: 'Starters', price: 50, vegetarian: true },
    { id: 's2', name: 'Gobi 65', category: 'Starters', price: 45, vegetarian: true },
    { id: 's3', name: 'Paneer Starter', category: 'Starters', price: 60, vegetarian: true },
    { id: 's4', name: 'Chicken 65', category: 'Starters', price: 55, vegetarian: false },
    { id: 's5', name: 'Fish Fry', category: 'Starters', price: 65, vegetarian: false },
    { id: 's6', name: 'Prawns Fry', category: 'Starters', price: 75, vegetarian: false },
    { id: 'm1', name: 'Mixed Veg Curry', category: 'Main Curries', price: 40, vegetarian: true },
    { id: 'm2', name: 'Paneer Butter Masala', category: 'Main Curries', price: 55, vegetarian: true },
    { id: 'm3', name: 'Aloo Gobi Masala', category: 'Main Curries', price: 35, vegetarian: true },
    { id: 'm4', name: 'Chicken Curry', category: 'Main Curries', price: 50, vegetarian: false },
    { id: 'm5', name: 'Mutton Curry', category: 'Main Curries', price: 70, vegetarian: false },
    { id: 'm6', name: 'Fish Curry', category: 'Main Curries', price: 65, vegetarian: false },
    { id: 'b1', name: 'Veg Dum Biryani', category: 'Biryani', price: 60, vegetarian: true },
    { id: 'b2', name: 'Chicken Dum Biryani', category: 'Biryani', price: 70, vegetarian: false },
    { id: 'b3', name: 'Mutton Dum Biryani', category: 'Biryani', price: 90, vegetarian: false },
    { id: 'b4', name: 'Bagara Rice', category: 'Biryani', price: 50, vegetarian: true },
    { id: 'br1', name: 'Roti', category: 'Breads', price: 3, vegetarian: true },
    { id: 'br2', name: 'Naan', category: 'Breads', price: 5, vegetarian: true },
    { id: 'br3', name: 'Paratha', category: 'Breads', price: 6, vegetarian: true },
    { id: 'd1', name: 'Palak Dal', category: 'Dal & Soups', price: 30, vegetarian: true },
    { id: 'd2', name: 'Tomato Dal', category: 'Dal & Soups', price: 28, vegetarian: true },
    { id: 'd3', name: 'Sambar', category: 'Dal & Soups', price: 35, vegetarian: true },
    { id: 'd4', name: 'Rasam', category: 'Dal & Soups', price: 32, vegetarian: true },
    { id: 'a1', name: 'Raita', category: 'Accompaniments', price: 15, vegetarian: true },
    { id: 'a2', name: 'Curd', category: 'Accompaniments', price: 12, vegetarian: true },
    { id: 'a3', name: 'Papad', category: 'Accompaniments', price: 8, vegetarian: true },
    { id: 'a4', name: 'Mirchi ka Salan', category: 'Accompaniments', price: 20, vegetarian: true },
    { id: 'a5', name: 'Onion Salad', category: 'Accompaniments', price: 10, vegetarian: true },
    { id: 'de1', name: 'Gulab Jamun', category: 'Desserts', price: 35, vegetarian: true },
    { id: 'de2', name: 'Double Ka Meetha', category: 'Desserts', price: 40, vegetarian: true },
    { id: 'de3', name: 'Ice Cream', category: 'Desserts', price: 30, vegetarian: true },
    { id: 'bev1', name: 'Welcome Drink', category: 'Beverages', price: 20, vegetarian: true },
    { id: 'bev2', name: 'Water', category: 'Beverages', price: 5, vegetarian: true },
  ];

  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  const filteredItems = menuItems.filter(item => {
    if (cuisineType === 'veg') return item.vegetarian;
    if (cuisineType === 'non-veg') return !item.vegetarian;
    return true;
  });

  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = filteredItems.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const toggleItem = (item: MenuItem) => {
    const newSelected = new Map(selectedItems);
    if (newSelected.has(item.id)) {
      newSelected.delete(item.id);
    } else {
      newSelected.set(item.id, { ...item, quantity: 1 });
    }
    setSelectedItems(newSelected);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const newSelected = new Map(selectedItems);
    const item = newSelected.get(itemId);
    if (item) {
      if (quantity <= 0) {
        newSelected.delete(itemId);
      } else {
        newSelected.set(itemId, { ...item, quantity });
      }
      setSelectedItems(newSelected);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const selectedItemsArray = Array.from(selectedItems.values()).map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity
      }));

      await sendEnquiry({
        form_type: 'custom_menu',
        name: formData.customerName,
        email: formData.customerEmail || undefined,
        phone: formData.customerPhone || undefined,
        subject: `Custom Menu Request - ${formData.eventName || 'Event'}`,
        message: formData.specialRequests || undefined,
        details: {
          event_name: formData.eventName,
          event_date: formData.eventDate,
          guest_count: guestCount,
          cuisine_type: cuisineType,
          selected_items: selectedItemsArray,
        },
      });

      setSubmitMessage('Menu request submitted successfully! We will contact you soon with a quotation.');
      setFormData({
        eventName: '',
        eventDate: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        specialRequests: ''
      });
      setSelectedItems(new Map());
      setGuestCount(50);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Error submitting request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="custom-menu" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Build Your Custom Menu</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select items you want to include in your event menu. We'll send you a personalised quote based on your selections and guest count.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Cuisine Type</h3>
              <div className="flex gap-4">
                {[
                  { value: 'veg', label: 'Vegetarian' },
                  { value: 'non-veg', label: 'Non-Vegetarian' },
                  { value: 'mixed', label: 'Mixed' }
                ].map(type => (
                  <button
                    key={type.value}
                    onClick={() => {
                      setCuisineType(type.value as 'veg' | 'non-veg' | 'mixed');
                      setSelectedItems(new Map());
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                      cuisineType === type.value
                        ? 'bg-orange-100 border-orange-600 text-orange-600'
                        : 'bg-white border-gray-200 text-gray-600'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(groupedItems).map(([category, items]) => (
                items.length > 0 && (
                  <div key={category} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <h4 className="text-lg font-bold text-gray-900">{category}</h4>
                      {expandedCategory === category ? (
                        <ChevronUp className="text-gray-600" size={24} />
                      ) : (
                        <ChevronDown className="text-gray-600" size={24} />
                      )}
                    </button>

                    {expandedCategory === category && (
                      <div className="px-6 pb-6 border-t border-gray-200 space-y-3">
                        {items.map(item => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-start gap-3 flex-1">
                              <input
                                type="checkbox"
                                id={item.id}
                                checked={selectedItems.has(item.id)}
                                onChange={() => toggleItem(item)}
                                className="mt-1 w-5 h-5 cursor-pointer rounded border-gray-300"
                              />
                              <div className="flex-1">
                                <label htmlFor={item.id} className="text-gray-900 font-semibold cursor-pointer block">
                                  {item.name}
                                </label>
                              </div>
                            </div>

                            {selectedItems.has(item.id) && (
                              <div className="ml-4 flex items-center gap-2 bg-white rounded-lg border border-gray-300 px-2 py-1">
                                <button
                                  onClick={() => updateQuantity(item.id, (selectedItems.get(item.id)?.quantity || 1) - 1)}
                                  className="px-2 py-1 text-gray-600 hover:text-gray-900"
                                >
                                  −
                                </button>
                                <span className="w-8 text-center font-semibold text-gray-900">
                                  {selectedItems.get(item.id)?.quantity || 1}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, (selectedItems.get(item.id)?.quantity || 1) + 1)}
                                  className="px-2 py-1 text-gray-600 hover:text-gray-900"
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 space-y-4 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900">Event Details</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Event Name *
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  placeholder="e.g., Wedding, Birthday"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Users size={16} className="inline mr-2" />
                  Guest Count
                </label>
                <input
                  type="number"
                  min="50"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Math.max(50, parseInt(e.target.value) || 50))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <hr className="my-4" />

              <h3 className="text-lg font-bold text-gray-900">Your Details</h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any dietary restrictions or preferences?"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              {submitMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  submitMessage.includes('successfully')
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || selectedItems.size === 0}
                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  selectedItems.size === 0 || isSubmitting
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700 text-white'
                }`}
              >
                <Check size={20} />
                {isSubmitting ? 'Submitting...' : 'Submit Menu Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomMenuBuilder;
