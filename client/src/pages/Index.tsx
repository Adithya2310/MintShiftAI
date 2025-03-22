
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import NFTCollections from '@/components/NFTCollections';
import AIFeaturesSection from '@/components/AIFeaturesSection';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <AIFeaturesSection />
      <NFTCollections />
    </MainLayout>
  );
};

export default Index;
