import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Sisi's Kitchen</h3>
            <p className="text-sm mb-4">Premium catering services for all occasions. Creating memorable culinary experiences since 2015.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#packages" className="hover:text-orange-500 transition-colors">Packages</a></li>
              <li><a href="#custom-menu" className="hover:text-orange-500 transition-colors">Custom Menu</a></li>
              <li><a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Cuisine Types</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Vegetarian</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Non-Vegetarian</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Mixed Menu</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Custom Orders</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p>9030058654</p>
                  <p>8121358654</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p>Shop no 2a, Kismatpur Rd</p>
                  <p>Hyderabad, Telangana 500086</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2026 Sisi's Kitchen Catering Services. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
