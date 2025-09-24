import { useCompare } from '../context/CompareContext';
import { Business } from '../types';


export const useCompareFeature = () => {
  const {
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    showCompareModal,
    setShowCompareModal,
    openCompareModal,
  } = useCompare();

  const isBusinessInCompare = (businessId: number): boolean => {
    return compareItems.some(item => item.id === businessId);
  };

  const canAddToCompare = (): boolean => {
    return compareItems.length < 2;
  };

  const toggleCompare = (business: Business): void => {
    if (isBusinessInCompare(business.id)) {
      removeFromCompare(business.id);
    } else if (canAddToCompare()) {
      addToCompare(business);
    }
  };

  return {
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    showCompareModal,
    setShowCompareModal,
    openCompareModal,
    isBusinessInCompare,
    canAddToCompare,
    toggleCompare,
    compareCount: compareItems.length,
    canCompare: compareItems.length === 2,
  };
};