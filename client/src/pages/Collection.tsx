
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import NFTCard from '@/components/NFTCard';
import Button from '@/components/Button';
import MintNFTModal from '@/components/MintNFTModal';
import TwitterConfigModal from '@/components/TwitterConfigModal';
import { Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Collection {
  collection_address: string;
  name: string;
  description: string;
  owner_address: string;
  image_url?: string;
  twitter_handle?: string;
  created_at: string;
}

interface NFT {
  nft_address: string;
  collection_name: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  isListed: boolean;
  minted_at: string;
  owner_address: string;
}

// Database NFT type coming from Supabase
interface DbNFT {
  nft_address: string;
  collection_name: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  islisted: boolean; // Note: lowercase in the database
  minted_at: string;
  owner_address: string;
}

const Collection = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [isTwitterModalOpen, setIsTwitterModalOpen] = useState(false);
  const { toast: uiToast } = useToast();
  
  const [collection, setCollection] = useState<Collection | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollectionAndNFTs = async () => {
      if (!id) return;
      
      try {
        // Convert URL parameter (kebab-case) to potential collection name
        const potentialName = id.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        // First query: exact match on the URL parameter
        let { data: exactMatchData, error: exactMatchError } = await supabase
          .from('collections')
          .select('*')
          .ilike('name', id.replace(/-/g, ' '));
        
        // Second query: try with capitalized words if first query returns no results
        if ((!exactMatchData || exactMatchData.length === 0) && !exactMatchError) {
          const { data: capitalizedData, error: capitalizedError } = await supabase
            .from('collections')
            .select('*')
            .ilike('name', potentialName);
          
          if (!capitalizedError) {
            exactMatchData = capitalizedData;
          } else {
            console.error('Error fetching collection with capitalized name:', capitalizedError);
          }
        }
        
        if (exactMatchError) {
          console.error('Error fetching collection:', exactMatchError);
          toast.error("Failed to load collection");
          setLoading(false);
          return;
        }
        
        if (!exactMatchData || exactMatchData.length === 0) {
          console.log('Collection not found');
          setLoading(false);
          return;
        }
        
        const collectionData = exactMatchData[0] as Collection;
        setCollection(collectionData);
        
        // Fetch NFTs for this collection
        const { data: nftsData, error: nftsError } = await supabase
          .from('nfts')
          .select('*')
          .eq('collection_name', collectionData.name)
          .order('minted_at', { ascending: false });
        
        if (nftsError) {
          console.error('Error fetching NFTs:', nftsError);
          toast.error("Failed to load NFTs");
        } else {
          // Map the database fields to our frontend model
          const mappedNfts: NFT[] = (nftsData as DbNFT[] || []).map(dbNft => ({
            ...dbNft,
            isListed: dbNft.islisted // Map islisted to isListed
          }));
          setNfts(mappedNfts);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCollectionAndNFTs();
  }, [id]);

  const handleBuyNFT = async (nft: NFT) => {
    uiToast({
      title: "Purchase initiated",
      description: `You're purchasing ${nft.name} for ${nft.price} APT`,
    });
    
    // In a real app, this would trigger a blockchain transaction
    // For now, we'll just mark the NFT as sold by updating the owner address
    try {
      const { error } = await supabase
        .from('nfts')
        .update({ islisted: false }) // Use islisted (lowercase) for the database
        .eq('nft_address', nft.nft_address);
      
      if (error) {
        console.error('Error updating NFT:', error);
        toast.error("Failed to complete purchase");
      } else {
        toast.success("Purchase successful!");
        
        // Update the NFT in the local state
        setNfts(prev => prev.map(item => 
          item.nft_address === nft.nft_address ? { ...item, isListed: false } : item
        ));
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("An unexpected error occurred");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="pt-28 pb-16 px-4 min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-white/60">Loading collection...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!collection) {
    return (
      <MainLayout>
        <div className="pt-28 pb-16 px-4 min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-orbitron font-bold mb-4">Collection not found</h2>
            <p className="text-white/60 mb-6">The collection you're looking for doesn't exist or has been removed.</p>
            <Button variant="blue" onClick={() => navigate('/')}>
              Go Back
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          {/* Collection Header */}
          <div className="mb-12 bg-darker-bg/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Collection Avatar */}
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 flex items-center justify-center">
                {collection?.image_url ? (
                  <img 
                    src={collection.image_url} 
                    alt={collection.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-orbitron text-3xl text-white/40">
                    {collection?.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              
              {/* Collection Info */}
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">
                  {collection?.name}
                </h1>
                <p className="text-white/60 mb-4 max-w-2xl">
                  {collection?.description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="text-white/80">
                    <span className="text-sm text-white/50">Items: </span>
                    <span className="font-orbitron">{nfts.length}</span>
                  </div>
                  <div className="text-white/80">
                    <span className="text-sm text-white/50">Owner: </span>
                    <span className="font-orbitron text-neon-blue">
                      {collection?.owner_address.substring(0, 6)}...{collection?.owner_address.substring(collection?.owner_address.length - 4)}
                    </span>
                  </div>
                  {collection?.twitter_handle && (
                    <div className="text-white/80">
                      <span className="text-sm text-white/50">Twitter: </span>
                      <span className="font-orbitron text-neon-purple">{collection.twitter_handle}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  variant="blue" 
                  onClick={() => setIsMintModalOpen(true)}
                >
                  Mint NFT
                </Button>
                <Button 
                  variant="purple" 
                  onClick={() => setIsTwitterModalOpen(true)}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Configure Twitter
                </Button>
              </div>
            </div>
          </div>
          
          {/* NFTs Grid */}
          <div className="mb-6">
            <h2 className="text-2xl font-orbitron font-bold mb-6 text-white">
              NFTs in this Collection
            </h2>
            
            {nfts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nfts.map((nft) => (
                  <NFTCard
                    key={nft.nft_address}
                    nft={{
                      id: nft.nft_address,
                      name: nft.name,
                      collection: nft.collection_name,
                      description: nft.description,
                      price: nft.price,
                      imageUrl: nft.image_url,
                      ownerAddress: nft.owner_address
                    }}
                    onBuy={() => handleBuyNFT(nft)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-darker-bg/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
                <p className="text-white/60 mb-4">No NFTs have been minted in this collection yet.</p>
                <Button 
                  variant="gradient" 
                  onClick={() => setIsMintModalOpen(true)}
                >
                  Mint First NFT
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <MintNFTModal 
        isOpen={isMintModalOpen} 
        onClose={() => setIsMintModalOpen(false)} 
        collectionName={collection?.name || ''}
      />
      
      <TwitterConfigModal 
        isOpen={isTwitterModalOpen} 
        onClose={() => setIsTwitterModalOpen(false)} 
        collectionData={{
          id: collection?.collection_address || '',
          name: collection?.name || '',
          twitterHandle: collection?.twitter_handle
        }}
      />
    </MainLayout>
  );
};

export default Collection;
