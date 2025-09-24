import React from 'react';
import { Scale } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { Business } from '../types';

interface CompareButtonProps {
  business: Business;
  variant?: 'card' | 'table';
  className?: string;
}

export const CompareButton: React.FC<CompareButtonProps> = ({ 
  business, 
  variant = 'card',
  className = ''
}) => {
  const { compareItems, addToCompare, removeFromCompare } = useCompare();
  const isInCompare = compareItems.find(item => item.id === business.id);
  const canAddMore = compareItems.length < 2;

  const handleCompareToggle = () => {
    if (isInCompare) {
      removeFromCompare(business.id);
    } else if (canAddMore) {
      addToCompare(business);
    }
  };

  const baseClasses = "p-2 rounded-lg transition-colors";
  const cardClasses = isInCompare
    ? 'bg-blue-600 text-white'
    : canAddMore
    ? 'bg-white/90 text-gray-700 hover:bg-white'
    : 'bg-gray-300 text-gray-500 cursor-not-allowed';

  const tableClasses = isInCompare
    ? 'bg-blue-600 text-white'
    : canAddMore
    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    : 'bg-gray-100 text-gray-400 cursor-not-allowed';

  const variantClasses = variant === 'card' ? cardClasses : tableClasses;

  const title = isInCompare 
    ? 'Remove from compare' 
    : canAddMore 
    ? 'Add to compare' 
    : 'Compare limit reached (2 max)';

  return (
    <button
      onClick={handleCompareToggle}
      disabled={!canAddMore && !isInCompare}
      className={`${baseClasses} ${variantClasses} ${className}`}
      title={title}
      aria-label={title}
    >
      <Scale className="h-4 w-4" />
    </button>
  );
};