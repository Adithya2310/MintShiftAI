
import React from 'react';
import { Link } from 'react-router-dom';

interface CollectionCardProps {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  thumbnailUrl?: string;
  ownerAddress: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  id,
  name,
  description,
  itemCount,
  thumbnailUrl,
  ownerAddress
}) => {
  return (
    <Link to={`/collection/${id}`} className="block">
      <div className="neon-card hover:transform hover:-translate-y-1 transition-all duration-300">
        <div className="neon-card-content">
          {/* Thumbnail */}
          <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20">
            {thumbnailUrl ? (
              <img 
                src={thumbnailUrl} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-orbitron text-white/40">
                {name.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          
          {/* Collection Info */}
          <div className="p-2">
            <h3 className="font-orbitron text-lg font-semibold text-white truncate">{name}</h3>
            <p className="text-white/60 text-sm line-clamp-2 h-10 mb-2">{description}</p>
            
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <span className="text-xs text-white/50">by</span>
                <span className="ml-1 text-xs text-neon-blue">
                  {ownerAddress.substring(0, 6)}...{ownerAddress.substring(ownerAddress.length - 4)}
                </span>
              </div>
              <div className="font-orbitron text-neon-purple text-sm">{itemCount} items</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
