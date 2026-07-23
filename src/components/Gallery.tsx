import React, { useState, useEffect } from 'react';
import { X, Play, Filter } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
  category: string;
}

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Default gallery images (fallback when no custom media is uploaded)
  const defaultImages = [
    {
      id: 'default-1',
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Wedding catering setup with elegant decorations',
      category: 'wedding'
    },
    {
      id: 'default-2',
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Traditional Indian thali with various dishes',
      category: 'food'
    },
    {
      id: 'default-3',
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Professional chef preparing gourmet food',
      category: 'food'
    },
    {
      id: 'default-4',
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Elegant food presentation on white plates',
      category: 'food'
    },
    {
      id: 'default-5',
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Catering buffet setup with multiple dishes',
      category: 'setup'
    },
    {
      id: 'default-6',
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Wedding reception dining setup',
      category: 'wedding'
    },
    {
      id: 'default-7',
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Corporate catering for business lunch',
      category: 'corporate'
    },
    {
      id: 'default-8',
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Birthday party catering with colorful setup',
      category: 'birthday'
    },
    {
      id: 'default-9',
      type: 'image' as const,
      url: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800',
      name: 'Family gathering catering with traditional dishes',
      category: 'social'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'wedding', label: 'Wedding Catering' },
    { value: 'corporate', label: 'Corporate Events' },
    { value: 'birthday', label: 'Birthday Parties' },
    { value: 'social', label: 'Social Gatherings' },
    { value: 'religious', label: 'Religious Functions' },
    { value: 'outdoor', label: 'Outdoor Events' },
    { value: 'food', label: 'Food Items' },
    { value: 'setup', label: 'Event Setup' }
  ];

  useEffect(() => {
    // Load custom media from localStorage
    const savedMedia = localStorage.getItem('boathouse-media');
    if (savedMedia) {
      try {
        const customMedia = JSON.parse(savedMedia);
        // Show custom media first, then default images
        setMediaItems([...customMedia, ...defaultImages]);
      } catch (error) {
        console.error('Error loading custom media:', error);
        setMediaItems(defaultImages);
      }
    } else {
      setMediaItems(defaultImages);
    }
  }, []);

  // Listen for storage changes (when admin uploads new media)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedMedia = localStorage.getItem('boathouse-media');
      if (savedMedia) {
        try {
          const customMedia = JSON.parse(savedMedia);
          setMediaItems([...customMedia, ...defaultImages]);
        } catch (error) {
          console.error('Error loading updated media:', error);
        }
      }
    };

    // Also listen for direct updates to localStorage
    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === 'boathouse-media') {
        handleStorageChange();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage', handleStorageUpdate);
    
    // Check for updates every 2 seconds (for same-tab updates)
    const interval = setInterval(handleStorageChange, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage', handleStorageUpdate);
      clearInterval(interval);
    };
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of beautifully catered events and exquisite culinary creations
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <Filter className="text-amber-600 mr-2" size={20} />
            <span className="text-lg font-semibold text-gray-900">Filter by Category</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                } border border-gray-200`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedItem(item)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="relative w-full h-64 bg-gray-900">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-3">
                      <Play className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 w-full">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-amber-200 capitalize">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No media found for the selected category.</p>
          </div>
        )}

        {/* Modal for enlarged view */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  className="max-w-full max-h-full object-contain rounded-lg"
                  autoPlay
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                <p className="font-medium">{selectedItem.name}</p>
                <p className="text-sm text-amber-200 capitalize">{selectedItem.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;