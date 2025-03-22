
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';

const Collections = () => {
  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-8 text-center">
            NFT Collections
          </h1>
          
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 rounded-full bg-neon-blue/20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-darker-bg flex items-center justify-center">
                <svg className="w-12 h-12 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
            </div>
            
            <h2 className="text-xl md:text-2xl font-orbitron font-semibold mb-4 text-white">
              Collections page under construction
            </h2>
            <p className="text-white/70 text-center max-w-md mb-8">
              We're building this page to showcase detailed collection views. Check back soon for the full experience.
            </p>
            
            <Link to="/">
              <Button variant="blue">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Collections;
