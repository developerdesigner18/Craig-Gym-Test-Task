import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useBusinessContext } from '../context/BusinessContext';
import { getSearchSuggestions } from '../utils/search';

const SearchBar: React.FC = () => {
  const { businesses, searchBusinesses, filters } = useBusinessContext();
  const [query, setQuery] = useState(filters.search);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setQuery(filters.search);
  }, [filters.search]);

  useEffect(() => {
    if (query.length > 1 && isTyping) {
      const newSuggestions = getSearchSuggestions(businesses, query);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, businesses, isTyping]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    searchBusinesses(searchQuery);
    setShowSuggestions(false);
    setIsTyping(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsTyping(true);
    
    // Only search immediately if suggestions are not showing
    if (!showSuggestions) {
      searchBusinesses(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setIsTyping(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    searchBusinesses('');
    setShowSuggestions(false);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Search by name, category, location, or try 'cheap yoga in Sydney'..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(suggestions.length > 0)}
          onBlur={() => {
            // Delay hiding suggestions to allow for clicks
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && isTyping && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="flex items-center">
                    <Search className="h-4 w-4 text-gray-400 mr-2" />
                    {suggestion}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;