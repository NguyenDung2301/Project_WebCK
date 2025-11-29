import React from 'react';

import HeroCarousel from '../components/HeroCarousel';
import SearchSection from '../components/SearchSection';
import CategorySection from '../components/CategorySection';
import PromoSection from '../components/PromoSection';

const HomePage: React.FC = () => {
  return (
    <main className="bg-white text-gray-800">
      <HeroCarousel />
      <SearchSection />
      <CategorySection />
      <PromoSection />
    </main>
  );
};

export default HomePage;

