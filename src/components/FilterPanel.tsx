import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { useBusinessContext } from '../context/BusinessContext';

const FilterPanel: React.FC = () => {
  const { 
    filters, 
    setFilters, 
    resetFilters, 
    categories, 
    allServices, 
    vibes,
    filteredBusinesses,
    businesses
  } = useBusinessContext();

  const handleCategoryChange = (category: string) => {
    setFilters({ category });
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: number) => {
    setFilters({ [field]: value });
  };

  const handleServiceToggle = (service: string) => {
    const updatedServices = filters.services.includes(service)
      ? filters.services.filter(s => s !== service)
      : [...filters.services, service];
    setFilters({ services: updatedServices });
  };

  const handleVibeChange = (vibe: string) => {
    setFilters({ vibe });
  };

  const hasActiveFilters = () => {
    return filters.category !== 'all' ||
           filters.minPrice > 0 ||
           filters.maxPrice < 100 ||
           filters.services.length > 0 ||
           filters.vibe !== 'all' ||
           filters.search !== '';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {filteredBusinesses.length} of {businesses.length}
          </span>
        </div>
        {hasActiveFilters() && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Weekly Price Range (${filters.minPrice} - ${filters.maxPrice})
          </label>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Minimum</label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange('minPrice', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Maximum</label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange('maxPrice', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Vibe Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Vibe</label>
          <select
            value={filters.vibe}
            onChange={(e) => handleVibeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Vibes</option>
            {vibes.map(vibe => (
              <option key={vibe} value={vibe}>{vibe}</option>
            ))}
          </select>
        </div>

        {/* Services Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Services</label>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {allServices.map(service => (
              <label key={service} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;