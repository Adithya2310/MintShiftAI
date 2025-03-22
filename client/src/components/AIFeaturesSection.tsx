
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'purple' | 'pink';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, color }) => {
  const colorClasses = {
    blue: 'border-neon-blue/30 hover:border-neon-blue/80 hover:shadow-neon-blue',
    purple: 'border-neon-purple/30 hover:border-neon-purple/80 hover:shadow-neon-purple',
    pink: 'border-neon-pink/30 hover:border-neon-pink/80 hover:shadow-neon-pink',
  };

  const iconColors = {
    blue: 'text-neon-blue',
    purple: 'text-neon-purple',
    pink: 'text-neon-pink',
  };

  return (
    <div 
      className={`relative p-6 bg-darker-bg/80 backdrop-blur-lg rounded-xl border ${colorClasses[color]} hover:transform hover:-translate-y-1 transition-all duration-300`}
    >
      <div className={`${iconColors[color]} text-2xl font-semibold mb-2`}>{icon}</div>
      <h3 className="font-orbitron text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const AIFeaturesSection = () => {
  return (
    <section className="py-24 px-4 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px]"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto z-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="inline-block font-orbitron text-sm text-neon-blue bg-neon-blue/10 px-3 py-1 rounded-full mb-4">
            AI-POWERED
          </h2>
          <h3 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            Next-Gen NFT Features
          </h3>
          <p className="text-white/70">
            MintShift AI leverages cutting-edge artificial intelligence to transform the NFT creation and trading experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="🎨"
            title="AI NFT Generation" 
            description="Describe your vision and our AI creates unique NFT artwork in seconds. No artistic skills required."
            color="blue"
          />
          <FeatureCard 
            icon="🐦"
            title="Auto Tweet Generator" 
            description="Automated social promotions when you mint an NFT, maximizing visibility and engagement."
            color="purple"
          />
          <FeatureCard 
            icon="🤖"
            title="Smart Buyer Assistant" 
            description="AI-powered recommendations help you discover high-potential NFTs based on market trends."
            color="pink"
          />
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
