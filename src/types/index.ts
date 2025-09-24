export interface Business {
  id: number;
  name: string;
  category: string;
  location: string;
  price: number;
  services: string[];
  vibe: string;
  description: string;
  rating: number;
  image: string;
  type: string;
  reviews?: number;
  amenities?: string[];
  hours?: string;
  monthlyPrice?: number;
  joinFee?: number;
  memberCapacity?: number;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  services: string[];
  vibe: string;
  search: string;
}

export interface BusinessContextType {
  businesses: Business[];
  filteredBusinesses: Business[];
  filters: FilterState;
  loading: boolean;
  error: string | null;
  categories: string[];
  allServices: string[];
  vibes: string[];
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  searchBusinesses: (query: string) => void;
}

export interface CompareContextType {
  compareItems: Business[];
  addToCompare: (business: Business) => void;
  removeFromCompare: (businessId: number) => void;
  clearCompare: () => void;
  showCompareModal: boolean;
  setShowCompareModal: (show: boolean) => void;
  openCompareModal: () => void;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  message?: string;
  error?: string;
}