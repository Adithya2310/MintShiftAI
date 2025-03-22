
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface NFT {
  id: string;
  name: string;
  collection: string;
  description: string;
  price: number;
  imageUrl?: string;
  ownerAddress: string;
}

interface NFTCardProps {
  nft: NFT;
  onBuy: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onBuy }) => {
  return (
    <div className="neon-card hover:transform hover:-translate-y-1 transition-all duration-300">
      <div className="neon-card-content">
        {/* NFT Image */}
        <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20">
          {nft.imageUrl ? (
            <img 
              src={nft.imageUrl} 
              alt={nft.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-orbitron text-white/40">
              {nft.name.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* NFT Info */}
        <div className="p-2">
          <Link to={`/collection/${nft.collection.replace(/\s+/g, '-').toLowerCase()}`} className="text-neon-purple text-xs hover:underline">
            {nft.collection}
          </Link>
          <h3 className="font-orbitron text-lg font-semibold text-white truncate mt-1">{nft.name}</h3>
          <p className="text-white/60 text-sm line-clamp-2 h-10 mb-3">{nft.description}</p>
          
          <div className="flex justify-between items-center mt-3">
            <div className="font-orbitron text-neon-blue">
              <span className="text-xs text-white/50">Price</span>
              <div className="text-lg">{nft.price} ETH</div>
            </div>
            <Button variant="gradient" size="sm" onClick={onBuy}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
