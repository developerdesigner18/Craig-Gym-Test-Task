import React from 'react';
import { MapPin, Star, DollarSign, Users } from 'lucide-react';
import type { Business } from '../types';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
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

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Business Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{business.rating}</span>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(business.category)}`}>
            {business.category}
          </span>
        </div>
      </div>

      {/* Business Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {business.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {business.description}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{business.location}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm font-semibold">${business.price}/week</span>
          </div>
        </div>

        {/* Vibe Badge */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getVibeColor(business.vibe)}`}>
            {business.vibe}
          </span>
        </div>

        {/* Services */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Users className="h-4 w-4" />
            Services
          </h4>
          <div className="flex flex-wrap gap-1">
            {business.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
              >
                {service}
              </span>
            ))}
            {business.services.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                +{business.services.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          View Details
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;