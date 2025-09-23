import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { Business, FilterState, BusinessContextType } from '../types';
import { apiService } from '../services/api';

const initialFilterState: FilterState = {
  category: 'all',
  minPrice: 0,
  maxPrice: 100,
  services: [],
  vibe: 'all',
  search: '',
};

const vibes = [
  'Performance & Intensity',
  'Calm & Wellness',
  'Community & Support',
  'Modern & Tech-Forward',
  'Flexibility & Lifestyle'
];

interface BusinessState {
  businesses: Business[];
  filteredBusinesses: Business[];
  filters: FilterState;
  loading: boolean;
  error: string | null;
  categories: string[];
  allServices: string[];
}

type BusinessAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_BUSINESSES'; payload: Business[] }
  | { type: 'SET_FILTERED_BUSINESSES'; payload: Business[] }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_CATEGORIES'; payload: string[] }
  | { type: 'SET_SERVICES'; payload: string[] };

const businessReducer = (state: BusinessState, action: BusinessAction): BusinessState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_BUSINESSES':
      return { ...state, businesses: action.payload, loading: false, error: null };
    case 'SET_FILTERED_BUSINESSES':
      return { ...state, filteredBusinesses: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialFilterState };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_SERVICES':
      return { ...state, allServices: action.payload };
    default:
      return state;
  }
};

const initialState: BusinessState = {
  businesses: [],
  filteredBusinesses: [],
  filters: initialFilterState,
  loading: false,
  error: null,
  categories: [],
  allServices: [],
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

interface BusinessProviderProps {
  children: ReactNode;
}

export const BusinessProvider: React.FC<BusinessProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(businessReducer, initialState);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const [businessesResponse, categoriesResponse, servicesResponse] = await Promise.all([
          apiService.getBusinesses(),
          apiService.getCategories(),
          apiService.getServices(),
        ]);

        dispatch({ type: 'SET_BUSINESSES', payload: businessesResponse.data });
        dispatch({ type: 'SET_FILTERED_BUSINESSES', payload: businessesResponse.data });
        dispatch({ type: 'SET_CATEGORIES', payload: categoriesResponse.data });
        dispatch({ type: 'SET_SERVICES', payload: servicesResponse.data });
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load businesses data' });
      }
    };

    fetchInitialData();
  }, []);

  // Fetch filtered data when filters change
  useEffect(() => {
    const fetchFilteredBusinesses = async () => {
      if (state.businesses.length === 0) return; // Don't fetch if initial data hasn't loaded
      
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const params: Record<string, string | number> = {};
        
        if (state.filters.category !== 'all') params.category = state.filters.category;
        if (state.filters.minPrice > 0) params.minPrice = state.filters.minPrice;
        if (state.filters.maxPrice < 100) params.maxPrice = state.filters.maxPrice;
        if (state.filters.services.length > 0) params.services = state.filters.services.join(',');
        if (state.filters.vibe !== 'all') params.vibe = state.filters.vibe;
        if (state.filters.search) params.search = state.filters.search;

        const response = await apiService.getBusinesses(params);
        dispatch({ type: 'SET_FILTERED_BUSINESSES', payload: response.data });
      } catch (error) {
        console.error('Failed to fetch filtered businesses:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to filter businesses' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    const timeoutId = setTimeout(fetchFilteredBusinesses, 300); // Debounce API calls
    
    return () => clearTimeout(timeoutId);
  }, [state.filters, state.businesses.length]);

  const setFilters = (newFilters: Partial<FilterState>) => {
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const searchBusinesses = (query: string) => {
    setFilters({ search: query });
  };

  const contextValue: BusinessContextType = {
    businesses: state.businesses,
    filteredBusinesses: state.filteredBusinesses,
    filters: state.filters,
    loading: state.loading,
    error: state.error,
    categories: state.categories,
    allServices: state.allServices,
    vibes,
    setFilters,
    resetFilters,
    searchBusinesses,
  };

  return (
    <BusinessContext.Provider value={contextValue}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessContext = (): BusinessContextType => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return context;
};