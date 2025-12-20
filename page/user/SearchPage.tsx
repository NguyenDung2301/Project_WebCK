import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchOverlay } from '../../components/user/SearchOverlay';
import { SearchResults } from '../../components/user/SearchResults';
import { FoodItem } from '../../types/common';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    // If navigation state contains a query, show results
    if (location.state && location.state.query) {
      setSearchTerm(location.state.query);
      setShowResults(true);
    } else {
      // Otherwise, reset to initial overlay state
      setSearchTerm('');
      setShowResults(false);
    }
  }, [location.state]);

  const handleSearch = (term: string) => {
    // Navigate with new query to keep URL/History and Header in sync
    navigate('/search', { state: { query: term } });
  };

  const handleProductClick = (item: FoodItem) => {
    navigate(`/product/${item.id}`);
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-[1280px] mx-auto pt-4">
        {!showResults ? (
          <SearchOverlay 
            onSearch={handleSearch}
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
          />
        ) : (
          <SearchResults 
            searchTerm={searchTerm}
            onItemClick={handleProductClick}
            favoriteFoodIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
};