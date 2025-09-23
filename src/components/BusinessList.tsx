import React from 'react';
import { AlertCircle, Dumbbell } from 'lucide-react';
import BusinessCard from './BusinessCard';
import TableView from './TableView';
import { useBusinessContext } from '../context/BusinessContext';

interface BusinessListProps {
  viewMode: 'cards' | 'table';
}

const BusinessList: React.FC<BusinessListProps> = ({ viewMode }) => {
  const { filteredBusinesses, loading, error } = useBusinessContext();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading fitness businesses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-600 text-center max-w-md">
          {error}. Please try refreshing the page or check your connection.
        </p>
      </div>
    );
  }

  if (filteredBusinesses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Dumbbell className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses found</h3>
        <p className="text-gray-600 text-center max-w-md">
          Try adjusting your search terms or filters to find more options.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'Business' : 'Businesses'} Found
        </h2>
        <p className="text-gray-600">
          Discover the perfect fitness experience for your lifestyle and goals.
        </p>
      </div>

      <div id="business-content" role="tabpanel">
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <TableView businesses={filteredBusinesses} />
        )}
      </div>
    </div>
  );
};

export default BusinessList;