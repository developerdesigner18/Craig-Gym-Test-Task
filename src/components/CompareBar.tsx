import React from 'react';
import { Scale, X } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

export const CompareBar: React.FC = () => {
  const { compareItems, removeFromCompare, clearCompare, openCompareModal } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Scale className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-900">
              Compare ({compareItems.length}/2)
            </span>
            <div className="flex gap-2">
              {compareItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
                  <span className="text-sm font-medium">{item.name}</span>
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    aria-label={`Remove ${item.name} from comparison`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {compareItems.length === 2 && (
              <button
                onClick={openCompareModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Compare Now
              </button>
            )}
            <button
              onClick={clearCompare}
              className="text-gray-600 hover:text-red-600 px-3 py-2 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};