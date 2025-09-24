import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Business } from '../types';

interface CompareContextType {
  compareItems: Business[];
  addToCompare: (business: Business) => void;
  removeFromCompare: (businessId: number) => void;
  clearCompare: () => void;
  showCompareModal: boolean;
  setShowCompareModal: (show: boolean) => void;
  openCompareModal: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

interface CompareProviderProps {
  children: ReactNode;
}

export const CompareProvider: React.FC<CompareProviderProps> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<Business[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  const addToCompare = (business: Business) => {
    if (compareItems.length < 2 && !compareItems.find(item => item.id === business.id)) {
      setCompareItems([...compareItems, business]);
    }
  };

  const removeFromCompare = (businessId: number) => {
    setCompareItems(compareItems.filter(item => item.id !== businessId));
  };

  const clearCompare = () => {
    setCompareItems([]);
    setShowCompareModal(false);
  };

  const openCompareModal = () => {
    if (compareItems.length === 2) {
      setShowCompareModal(true);
    }
  };

  const value: CompareContextType = {
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    showCompareModal,
    setShowCompareModal,
    openCompareModal,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = (): CompareContextType => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};