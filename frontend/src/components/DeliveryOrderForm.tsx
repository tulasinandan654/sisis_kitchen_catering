import React, { useState } from 'react';
import { X, ShoppingCart, User, Phone, Mail, MapPin, Clock, Package, CheckCircle } from 'lucide-react';
import { sendEnquiry } from '../lib/enquiryService';

interface DeliveryOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: {
    name: string;
    price: string;
    category: string;
    cuisine: string;
  };
}

const DeliveryOrderForm: React.FC<DeliveryOrderFormProps> = ({ isOpen, onClose, selectedPackage }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    locality: '',
    numberOfPersons: '',
    deliveryDate: '',
    deliveryTime: '',
    specialInstructions: '',
    paymentMethod: 'cash'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Calculate total amount
    const basePrice = parseInt(selectedPackage?.price.replace('₹', '') || '0');
    const persons = parseInt(formData.numberOfPersons);
    const totalAmount = basePrice * persons;

    try {
      await sendEnquiry({
        form_type: 'delivery',
        name: formData.name,
        email: formData.email || undefined,
        phone: formData.phone,
        subject: `New Delivery Order - ${selectedPackage?.name || 'Package'} (₹${totalAmount})`,
        message: formData.specialInstructions || undefined,
        details: {
          package: selectedPackage?.name,
          cuisine: selectedPackage?.cuisine,
          price_per_person: selectedPackage?.price,
          number_of_persons: formData.numberOfPersons,
          total_amount: totalAmount,
          address: formData.address,
          locality: formData.locality,
          delivery_date: formData.deliveryDate,
          delivery_time: formData.deliveryTime,
          payment_method: formData.paymentMethod,
        },
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          locality: '',
          numberOfPersons: '',
          deliveryDate: '',
          deliveryTime: '',
          specialInstructions: '',
          paymentMethod: 'cash'
        });
      }, 3000);
    } catch (error) {
      console.error('Error sending order:', error);
      alert('There was an error placing your order. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Calculate total amount
  const basePrice = parseInt(selectedPackage?.price.replace('₹', '') || '0');
  const persons = parseInt(formData.numberOfPersons) || 0;
  const totalAmount = basePrice * persons;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Place Delivery Order</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Fill out the form below to place your delivery order. We'll confirm within 1 hour.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Selected Package Display */}
          {selectedPackage && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-2 flex items-center">
                <Package className="mr-2" size={20} />
                Selected Package
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Package:</strong> {selectedPackage.name}</p>
                  <p><strong>Cuisine:</strong> {selectedPackage.cuisine}</p>
                </div>
                <div>
                  <p><strong>Price:</strong> {selectedPackage.price} per person</p>
                  <p><strong>Category:</strong> {selectedPackage.category}</p>
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="mr-2 text-amber-600" size={20} />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="your.email@gmail.com"
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="mr-2 text-amber-600" size={20} />
              Delivery Information
            </h3>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Complete Address *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="House/Flat number, Street name, Landmark..."
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="locality" className="block text-sm font-medium text-gray-700 mb-2">
                  Locality *
                </label>
                <input
                  type="text"
                  id="locality"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="e.g., Kismatpur Road, Bandlaguda"
                />
              </div>
              <div>
                <label htmlFor="numberOfPersons" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Persons *
                </label>
                <input
                  type="number"
                  id="numberOfPersons"
                  name="numberOfPersons"
                  value={formData.numberOfPersons}
                  onChange={handleChange}
                  required
                  min="5"
                  max="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="5-50 persons"
                />
              </div>
            </div>
          </div>

          {/* Delivery Schedule */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="mr-2 text-amber-600" size={20} />
              Delivery Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Date *
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select time slot</option>
                  <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                  <option value="12:00-13:00">12:00 PM - 1:00 PM</option>
                  <option value="13:00-14:00">1:00 PM - 2:00 PM</option>
                  <option value="18:00-19:00">6:00 PM - 7:00 PM</option>
                  <option value="19:00-20:00">7:00 PM - 8:00 PM</option>
                  <option value="20:00-21:00">8:00 PM - 9:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Option *
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="upi">UPI Payment</option>
                  <option value="card">Card Payment</option>
                </select>
              </div>
              {persons > 0 && (
                <div className="flex items-end">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 w-full">
                    <p className="text-sm text-amber-800">
                      <strong>Total Amount: ₹{totalAmount}</strong>
                    </p>
                    <p className="text-xs text-amber-600">
                      {persons} persons × {selectedPackage?.price || '₹0'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="mb-8">
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Any dietary restrictions, delivery instructions, or special requests..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
          >
            {isSubmitted ? (
              <>
                <CheckCircle className="mr-2" size={20} />
                Order Placed Successfully!
              </>
            ) : isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Placing Order...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2" size={20} />
                Place Order
              </>
            )}
          </button>

          {isSubmitted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-center">
                Thank you! Your order has been received. We'll call you within 1 hour to confirm the details and delivery time.
              </p>
            </div>
          )}

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm text-center">
              <strong>Note:</strong> Minimum 3 hours advance notice required. 
              Free delivery for orders above ₹2000. Delivery charges: ₹50 for orders below ₹2000.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryOrderForm;