import React from 'react';
import { MapPin, Star, DollarSign, Users, Eye, ArrowUpDown } from 'lucide-react';
import type { Business } from '../types';
import { CompareButton } from './CompareButton';

interface TableViewProps {
  businesses: Business[];
}

const TableView: React.FC<TableViewProps> = ({ businesses }) => {
  const [sortField, setSortField] = React.useState<keyof Business | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Business) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBusinesses = React.useMemo(() => {
    if (!sortField) return businesses;

    return [...businesses].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [businesses, sortField, sortDirection]);

  const getVibeColor = (vibe: string) => {
    const colorMap = {
      'Performance & Intensity': 'bg-red-100 text-red-800',
      'Calm & Wellness': 'bg-green-100 text-green-800',
      'Community & Support': 'bg-blue-100 text-blue-800',
      'Modern & Tech-Forward': 'bg-purple-100 text-purple-800',
      'Flexibility & Lifestyle': 'bg-orange-100 text-orange-800',
    };
    return colorMap[vibe as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colorMap = {
      'Gym': 'bg-blue-600',
      'Yoga': 'bg-green-600',
      'Pilates': 'bg-purple-600',
      'Boxing': 'bg-red-600',
    };
    return colorMap[category as keyof typeof colorMap] || 'bg-gray-600';
  };

  if (businesses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses to compare</h3>
        <p className="text-gray-500">No businesses to display in table view.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Compare Fitness Businesses</h3>
            <p className="text-sm text-gray-600 mt-1">
              Side-by-side comparison of {businesses.length} businesses
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ArrowUpDown className="h-4 w-4" />
            <span>Click columns to sort</span>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden">
        <div className="divide-y divide-gray-200">
          {sortedBusinesses.map((business, index) => (
            <div key={business.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  #{index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <img
                    className="h-8 w-8 rounded-lg object-cover"
                    src={business.image}
                    alt={`${business.name} thumbnail`}
                  />
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{business.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(business.category)}`}>
                      {business.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{business.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-gray-900 font-semibold">
                    <DollarSign className="h-4 w-4" />
                    <span>${business.price}/week</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{business.location}</span>
              </div>

              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getVibeColor(business.vibe)}`}>
                  {business.vibe}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1 text-gray-700 mb-2">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">Services</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {business.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="Fitness businesses comparison table">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                >
                  Business
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                >
                  Category
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('location')}
                  className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                >
                  Location
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                >
                  Price/Week
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Services
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('vibe')}
                  className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                >
                  Vibe
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('rating')}
                  className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                >
                  Rating
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compare
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedBusinesses.map((business, index) => (
              <tr
                key={business.id}
                className={`hover:bg-blue-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                role="row"
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-lg object-cover shadow-sm"
                        src={business.image}
                        alt={`${business.name} facility`}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-900">{business.name}</div>
                      <div className="text-xs text-gray-500 max-w-xs truncate" title={business.description}>
                        {business.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(business.category)}`}>
                    {business.category}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    {business.location}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center text-sm font-bold text-gray-900">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-lg">${business.price}</span>
                    <span className="text-xs text-gray-500 ml-1">/week</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {business.services.slice(0, 3).map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {service}
                      </span>
                    ))}
                    {business.services.length > 3 && (
                      <span
                        className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs font-medium cursor-help"
                        title={business.services.slice(3).join(', ')}
                      >
                        +{business.services.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getVibeColor(business.vibe)}`}>
                    {business.vibe}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-bold text-gray-900">{business.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">/5</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <CompareButton business={business} variant="table" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;