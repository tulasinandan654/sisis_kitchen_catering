import React, { useState, useRef } from 'react';
import { Upload, X, Play, Image, Video, Trash2, Eye, Lock, LogOut } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
  category: string;
}

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('wedding');
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Admin password (in production, this should be more secure)
  const ADMIN_PASSWORD = 'boathouse2024';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowLogin(false);
      setPassword('');
      // Store authentication in sessionStorage (expires when browser closes)
      sessionStorage.setItem('boathouse-admin', 'true');
    } else {
      alert('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('boathouse-admin');
    setIsOpen(false);
  };

  // Check if user was previously authenticated
  React.useEffect(() => {
    const isAdminAuthenticated = sessionStorage.getItem('boathouse-admin');
    if (isAdminAuthenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load media from localStorage
  React.useEffect(() => {
    const savedMedia = localStorage.getItem('boathouse-media');
    if (savedMedia) {
      try {
        const customMedia = JSON.parse(savedMedia);
        setMediaItems(customMedia);
      } catch (error) {
        console.error('Error loading media:', error);
      }
    }
  }, []);

  // Save media to localStorage whenever mediaItems changes
  React.useEffect(() => {
    if (mediaItems.length > 0) {
      localStorage.setItem('boathouse-media', JSON.stringify(mediaItems));
    }
  }, [mediaItems]);

  const categories = [
    { value: 'wedding', label: 'Wedding Catering' },
    { value: 'corporate', label: 'Corporate Events' },
    { value: 'birthday', label: 'Birthday Parties' },
    { value: 'social', label: 'Social Gatherings' },
    { value: 'religious', label: 'Religious Functions' },
    { value: 'outdoor', label: 'Outdoor Events' },
    { value: 'food', label: 'Food Items' },
    { value: 'setup', label: 'Event Setup' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      // Check file size (limit to 10MB for better performance)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Please use files under 10MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const newItem: MediaItem = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: file.type.startsWith('video/') ? 'video' : 'image',
          url: result,
          name: file.name,
          category: selectedCategory
        };
        setMediaItems(prev => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });
    
    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const deleteItem = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  };

  const exportMediaData = () => {
    const dataStr = JSON.stringify(mediaItems, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'media-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importMediaData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (Array.isArray(data)) {
          setMediaItems(data);
          alert('Media data imported successfully!');
        } else {
          alert('Invalid file format. Please select a valid backup file.');
        }
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  // Show login button if not authenticated
  if (!isOpen) {
    return (
      <button
        onClick={() => {
          if (isAuthenticated) {
            setIsOpen(true);
          } else {
            setShowLogin(true);
          }
        }}
        className="fixed bottom-4 right-4 bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg z-40 transition-all duration-200"
        title={isAuthenticated ? "Admin Panel" : "Admin Login"}
      >
        {isAuthenticated ? <Upload size={24} /> : <Lock size={24} />}
      </button>
    );
  }

  // Login Modal
  if (showLogin && !isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setShowLogin(false)}
          className="fixed bottom-4 right-4 bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg z-40"
          title="Close Login"
        >
          <X size={24} />
        </button>
        
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lock className="text-amber-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h2>
              <p className="text-gray-600">Enter admin password to manage media</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Login
                </button>
              </div>
            </form>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Default Password:</strong> boathouse2024
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Change this password in the code for security
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Admin Panel
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Media Management</h2>
              <p className="text-sm text-gray-600">Admin Panel - Manage your gallery content</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
                <span className="text-sm">Logout</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Storage Warning */}
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important: Local Storage</h3>
              <p className="text-yellow-700 text-sm mb-2">
                Your media is stored in your browser's local storage. This means:
              </p>
              <ul className="text-yellow-700 text-sm space-y-1 ml-4">
                <li>• Files are only visible on this browser/device</li>
                <li>• Clearing browser data will delete your media</li>
                <li>• Always backup your data using "Export Data"</li>
                <li>• For permanent storage, consider upgrading to a server solution</li>
              </ul>
            </div>

            {/* Upload Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Files
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Supported formats: JPG, PNG, GIF, MP4, MOV, AVI. Max file size: 10MB per file.
              </p>
              <p className="text-xs text-amber-600">
                Tip: Compress large images for better website performance
              </p>
            </div>

            {/* Data Management */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
              <div className="flex gap-4">
                <button
                  onClick={exportMediaData}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  📥 Export Backup
                </button>
                <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                  📤 Import Backup
                  <input
                    type="file"
                    accept=".json"
                    onChange={importMediaData}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Always backup before making changes!</strong> Export creates a downloadable backup file.
              </p>
            </div>

            {/* Media Grid */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Uploaded Media ({mediaItems.length} items)
              </h3>
              
              {mediaItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Upload size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg mb-2">No media uploaded yet</p>
                  <p className="text-sm">Start by selecting a category and uploading your first image or video!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mediaItems.map((item) => (
                    <div key={item.id} className="relative group bg-gray-100 rounded-lg overflow-hidden">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-800 flex items-center justify-center relative">
                          <video
                            src={item.url}
                            className="w-full h-full object-cover"
                            muted
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="text-white" size={24} />
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setPreviewItem(item)}
                            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <p className="text-xs text-gray-600 truncate">{item.name}</p>
                        <p className="text-xs text-amber-600 capitalize">{item.category}</p>
                        <p className="text-xs text-gray-400">{item.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 bg-black/90 z-60 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            {previewItem.type === 'image' ? (
              <img
                src={previewItem.url}
                alt={previewItem.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            ) : (
              <video
                src={previewItem.url}
                controls
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;