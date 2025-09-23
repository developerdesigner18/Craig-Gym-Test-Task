import type { Business } from '../types';

export const searchBusinesses = (businesses: Business[], query: string): Business[] => {
  if (!query.trim()) return businesses;
  
  const searchTerm = query.toLowerCase().trim();
  
  // Simple natural language processing for search terms
  const processQuery = (query: string) => {
    const keywords = {
      price: ['cheap', 'affordable', 'expensive', 'budget', 'premium'],
      intensity: ['intense', 'hardcore', 'challenging', 'easy', 'gentle'],
      location: ['near', 'in', 'at', 'around'],
      services: ['sauna', 'pt', 'personal training', 'group classes', 'classes'],
      vibe: ['calm', 'peaceful', 'intense', 'community', 'modern', 'tech', 'flexible']
    };
    
    const detected = {
      isPriceQuery: keywords.price.some(word => query.includes(word)),
      isIntensityQuery: keywords.intensity.some(word => query.includes(word)),
      isLocationQuery: keywords.location.some(word => query.includes(word)),
      isServicesQuery: keywords.services.some(word => query.includes(word)),
      isVibeQuery: keywords.vibe.some(word => query.includes(word))
    };
    
    return detected;
  };
  
  const queryContext = processQuery(searchTerm);
  
  return businesses.filter(business => {
    const basicMatch = 
      business.name.toLowerCase().includes(searchTerm) ||
      business.category.toLowerCase().includes(searchTerm) ||
      business.location.toLowerCase().includes(searchTerm) ||
      business.description.toLowerCase().includes(searchTerm) ||
      business.services.some(service => 
        service.toLowerCase().includes(searchTerm)
      ) ||
      business.vibe.toLowerCase().includes(searchTerm);
    
    // Enhanced matching based on query context
    let contextMatch = false;
    
    if (queryContext.isPriceQuery) {
      if (searchTerm.includes('cheap') || searchTerm.includes('affordable') || searchTerm.includes('budget')) {
        contextMatch = business.price <= 35;
      } else if (searchTerm.includes('expensive') || searchTerm.includes('premium')) {
        contextMatch = business.price >= 50;
      }
    }
    
    if (queryContext.isIntensityQuery) {
      if (searchTerm.includes('intense') || searchTerm.includes('hardcore') || searchTerm.includes('challenging')) {
        contextMatch = business.vibe.includes('Performance & Intensity');
      } else if (searchTerm.includes('gentle') || searchTerm.includes('easy')) {
        contextMatch = business.vibe.includes('Calm & Wellness');
      }
    }
    
    return basicMatch || contextMatch;
  });
};

export const getSearchSuggestions = (businesses: Business[], query: string): string[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  const suggestions = new Set<string>();
  
  businesses.forEach(business => {
    // Add matching business names
    if (business.name.toLowerCase().includes(searchTerm)) {
      suggestions.add(business.name);
    }
    
    // Add matching categories
    if (business.category.toLowerCase().includes(searchTerm)) {
      suggestions.add(business.category);
    }
    
    // Add matching locations
    if (business.location.toLowerCase().includes(searchTerm)) {
      suggestions.add(`${business.category} in ${business.location}`);
    }
    
    // Add matching services
    business.services.forEach(service => {
      if (service.toLowerCase().includes(searchTerm)) {
        suggestions.add(`${business.category} with ${service}`);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, 5);
};