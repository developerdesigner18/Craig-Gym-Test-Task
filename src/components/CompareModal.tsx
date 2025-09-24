import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { Business } from '../types';


interface CompareRowProps {
  label: string;
  value1: React.ReactNode;
  value2: React.ReactNode;
}

const CompareRow: React.FC<CompareRowProps> = ({ label, value1, value2 }) => (
  <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
    <div className="font-medium text-gray-700">{label}</div>
    <div className="text-center">{value1}</div>
    <div className="text-center">{value2}</div>
  </div>
);

interface BusinessCompareCardProps {
  business: Business;
  colorScheme: 'blue' | 'purple';
}

const BusinessCompareCard: React.FC<BusinessCompareCardProps> = ({ business, colorScheme }) => {
  const bgColor = colorScheme === 'blue' ? 'bg-blue-100' : 'bg-purple-100';
  const textColor = colorScheme === 'blue' ? 'text-blue-800' : 'text-purple-800';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <img
          src={business.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop"}
          alt={business.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
        <p className="text-gray-600">{business.type}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Rating</span>
          <span className="font-medium">⭐ {business.rating || '4.5'}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Price Range</span>
          <span className="font-medium">{business.price || '$$'}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Location</span>
          <span className="font-medium">{business.location || 'Sydney'}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Monthly Price</span>
          <span className="font-medium">${business.monthlyPrice || '89'}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Join Fee</span>
          <span className="font-medium">${business.joinFee || '50'}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Hours</span>
          <span className="font-medium text-sm">{business.hours || '6AM-10PM'}</span>
        </div>
        <div className="py-2">
          <span className="text-gray-600 block mb-2">Amenities</span>
          <div className="flex flex-wrap gap-1">
            {(business.amenities || ['Gym', 'Pool', 'Sauna']).map((amenity, index) => (
              <span key={index} className={`${bgColor} ${textColor} text-xs px-2 py-1 rounded`}>
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



export const CompareModal: React.FC = () => {
  const { compareItems, showCompareModal, setShowCompareModal, clearCompare } = useCompare();

   useEffect(() => {
        // Disable scrolling when modal is open
        if (showCompareModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to remove the added style
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showCompareModal]);

    
  if (!showCompareModal || compareItems.length !== 2) return null;

  const [business1, business2] = compareItems;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Compare Businesses</h2>
            <button
              onClick={() => setShowCompareModal(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close comparison"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BusinessCompareCard business={business1} colorScheme="blue" />
            <BusinessCompareCard business={business2} colorScheme="purple" />
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={clearCompare}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear Comparison
            </button>
            <button
              onClick={() => setShowCompareModal(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};