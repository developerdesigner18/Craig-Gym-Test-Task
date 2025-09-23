import React from 'react';
import { Grid3X3, Table } from 'lucide-react';

interface ViewToggleProps {
  currentView: 'cards' | 'table';
  onViewChange: (view: 'cards' | 'table') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1" role="tablist" aria-label="View toggle">
      <button
        onClick={() => onViewChange('cards')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          currentView === 'cards'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        role="tab"
        aria-selected={currentView === 'cards'}
        aria-controls="business-content"
      >
        <Grid3X3 className="h-4 w-4" />
        Cards
      </button>
      <button
        onClick={() => onViewChange('table')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          currentView === 'table'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        role="tab"
        aria-selected={currentView === 'table'}
        aria-controls="business-content"
      >
        <Table className="h-4 w-4" />
        Table
      </button>
    </div>
  );
};

export default ViewToggle;