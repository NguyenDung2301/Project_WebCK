import React from 'react';

import { HeroCarousel } from '@/components/user/HeroCarousel';
import { SearchSection } from '@/components/user/SearchSection';
import { CategorySection } from '@/components/user/CategorySection';
import { PromoSection } from '@/components/user/PromoSection';

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

