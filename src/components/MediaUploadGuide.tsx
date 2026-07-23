import React, { useState } from 'react';
import { X, Upload, Image, Video, Download, Settings } from 'lucide-react';

interface MediaUploadGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const MediaUploadGuide: React.FC<MediaUploadGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Media Upload Guide</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            {/* Quick Start */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Upload className="mr-2 text-amber-600" size={24} />
                Quick Start Guide
              </h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-amber-800 font-medium">
                  Look for the orange upload button (📤) in the bottom-right corner of your website!
                </p>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Click the orange upload button in the bottom-right corner</li>
                <li>Select a category for your media (Wedding, Corporate, etc.)</li>
                <li>Click "Choose Files" and select your images or videos</li>
                <li>Your media will appear in the gallery immediately</li>
                <li>Use "Export Data" to backup your uploads</li>
              </ol>
            </section>

            {/* Supported Formats */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Image className="mr-2 text-amber-600" size={24} />
                Supported File Types
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Images</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• JPG/JPEG (recommended)</li>
                    <li>• PNG (for logos/graphics)</li>
                    <li>• GIF (for animations)</li>
                    <li>• WebP (modern format)</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Videos</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• MP4 (recommended)</li>
                    <li>• MOV (iPhone videos)</li>
                    <li>• AVI (older format)</li>
                    <li>• WebM (web optimized)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Categories */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Settings className="mr-2 text-amber-600" size={24} />
                Media Categories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: 'Wedding Catering', desc: 'Wedding ceremonies, receptions' },
                  { name: 'Corporate Events', desc: 'Business meetings, conferences' },
                  { name: 'Birthday Parties', desc: 'Birthday celebrations, kids parties' },
                  { name: 'Social Gatherings', desc: 'Family reunions, anniversaries' },
                  { name: 'Religious Functions', desc: 'Pujas, festivals, ceremonies' },
                  { name: 'Outdoor Events', desc: 'Picnics, outdoor parties' },
                  { name: 'Food Items', desc: 'Close-up shots of dishes' },
                  { name: 'Event Setup', desc: 'Decorations, table arrangements' }
                ].map((category, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Best Practices */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">📸 Best Practices</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Image Quality</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Use high-resolution images (at least 1200px wide)</li>
                    <li>• Ensure good lighting and clear focus</li>
                    <li>• Compress large files to under 5MB for faster loading</li>
                  </ul>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Video Tips</h4>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Keep videos under 50MB for web compatibility</li>
                    <li>• Use landscape orientation (16:9 ratio)</li>
                    <li>• Ensure stable footage (use tripod if possible)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Management */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Download className="mr-2 text-amber-600" size={24} />
                Backup & Management
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important: Backup Your Media</h4>
                <p className="text-yellow-700 text-sm mb-3">
                  Your uploaded media is stored in your browser. Always backup your data!
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Export Data:</strong> Download a backup file of all your media</p>
                  <p><strong>Import Data:</strong> Restore from a previously saved backup</p>
                  <p><strong>Delete Items:</strong> Hover over media and click the trash icon</p>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">🔧 Troubleshooting</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900">Media not appearing?</h4>
                  <p className="text-sm text-gray-600">Check file format and size. Try refreshing the page.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900">Upload button missing?</h4>
                  <p className="text-sm text-gray-600">Look for the orange button in the bottom-right corner of the page.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-900">Lost your media?</h4>
                  <p className="text-sm text-gray-600">Media is stored locally. Use the import function to restore from backup.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadGuide;