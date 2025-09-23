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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  message?: string;
  error?: string;
}