import React from 'react';
import { Dumbbell, Search as SearchIcon } from 'lucide-react';
import { BusinessProvider } from './context/BusinessContext';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import BusinessList from './components/BusinessList';
import ViewToggle from './components/ViewToggle';
import { CompareBar } from './components/CompareBar';
import { CompareModal } from './components/CompareModal';
import { CompareProvider } from './context/CompareContext';

function App() {
  const [viewMode, setViewMode] = React.useState<'cards' | 'table'>('cards');

  return (
    <BusinessProvider>
      <CompareProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                    <Dumbbell className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      GymLink
                    </h1>
                    <p className="text-sm text-gray-600">Find Your Perfect Fitness Match</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Discover Your Perfect
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}Fitness Experience
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Compare fitness businesses across Sydney. Find the perfect gym, yoga studio, or boxing club that matches your vibe, budget, and goals.
              </p>

              {/* Search Bar */}
              <div className="flex justify-center mb-8">
                <SearchBar />
              </div>
            </div>
          </section>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24">
                  <FilterPanel />
                </div>
              </aside>

              {/* Business Listings */}
              <section className="lg:col-span-3">
                <div className="mb-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Browse Businesses</h2>
                    <p className="text-gray-600">Choose your preferred view</p>
                  </div>
                  <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                </div>
                <BusinessList viewMode={viewMode} />
              </section>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                    <Dumbbell className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">GymLink</span>
                </div>
                <p className="text-gray-600 text-center md:text-right">
                  © 2025 GymLink. Connecting you with the perfect fitness experience.
                </p>
              </div>
            </div>
          </footer>
          <CompareBar />
          <CompareModal />
        </div>
      </CompareProvider>
    </BusinessProvider>
  );
}

export default App;