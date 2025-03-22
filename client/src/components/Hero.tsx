
import React from 'react';
import Button from './Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-neon-blue/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-purple/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-neon-pink/20 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 md:pr-10 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-neon-blue font-orbitron tracking-wide inline-flex items-center">
                AI-POWERED NFT PLATFORM
                <span className="ml-2 inline-block w-16 h-0.5 bg-gradient-to-r from-neon-blue to-transparent"></span>
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold leading-tight">
                <span className="block">Next-Gen</span>
                <span className="neon-gradient-text">NFT Marketplace</span>
              </h1>
            </div>
            
            <p className="text-lg text-white/80 leading-relaxed">
              Create, collect, and trade AI-generated NFTs with automated social engagement.
              Powered by cutting-edge algorithms to help you discover the most valuable digital assets.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <Button variant="gradient" size="lg">
                Explore Collections
              </Button>
              <Button variant="blue" size="lg">
                Create NFT
              </Button>
            </div>
            
            <div className="flex items-center gap-6 mt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-orbitron text-neon-blue font-bold">10K+</span>
                <span className="text-sm text-white/60">Artworks</span>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-orbitron text-neon-purple font-bold">2.5K+</span>
                <span className="text-sm text-white/60">Artists</span>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-orbitron text-neon-pink font-bold">$25M+</span>
                <span className="text-sm text-white/60">Trading Volume</span>
              </div>
            </div>
          </div>
          
          {/* Featured NFT */}
          <div className="relative animate-float">
            <div className="relative z-10 neon-card hover:scale-[1.02] transition-transform duration-500">
              <div className="neon-card-content p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <div className="w-full h-full bg-gradient-to-br from-neon-blue/30 via-neon-purple/30 to-neon-pink/30 flex items-center justify-center">
                    <span className="text-white/50 font-orbitron">Featured NFT</span>
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="font-orbitron text-lg font-semibold">Cyber Dreamscape #42</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-neon-blue/30"></div>
                      <span className="ml-2 text-sm text-white/70">@neon_creator</span>
                    </div>
                    <div className="text-neon-blue font-orbitron">4.2 ETH</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-neon-blue/20 rounded-full blur-[30px] animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-neon-purple/20 rounded-full blur-[40px] animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
