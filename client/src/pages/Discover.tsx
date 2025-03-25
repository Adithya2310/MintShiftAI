
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import NFTCard from '@/components/NFTCard';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

interface Collection {
  collection_address: string;
  name: string;
  description: string;
  owner_address: string;
  image_url?: string;
  twitter_handle?: string;
  created_at: string;
}

const Discover = () => {
  const [activeTab, setActiveTab] = useState('nfts');
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast: uiToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch NFTs
        const { data: nftsData, error: nftsError } = await supabase
          .from('nfts')
          .select('*')
          .eq('islisted', true) // Note: using islisted (lowercase) for the database query
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
        
        // Fetch collections
        const { data: collectionsData, error: collectionsError } = await supabase
          .from('collections')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (collectionsError) {
          console.error('Error fetching collections:', collectionsError);
          toast.error("Failed to load collections");
        } else {
          setCollections(collectionsData as Collection[] || []);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

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
        
        // Remove the NFT from the local state since it's no longer listed
        setNfts(prev => prev.filter(item => item.nft_address !== nft.nft_address));
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <MainLayout>
      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-orbitron font-bold text-white mb-8">Discover</h1>
          
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-white/10 pb-2">
            <button
              className={`font-orbitron font-medium px-4 py-2 transition-colors ${
                activeTab === 'nfts' 
                  ? 'text-neon-blue border-b-2 border-neon-blue' 
                  : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setActiveTab('nfts')}
            >
              NFTs
            </button>
            <button
              className={`font-orbitron font-medium px-4 py-2 transition-colors ${
                activeTab === 'collections' 
                  ? 'text-neon-blue border-b-2 border-neon-blue' 
                  : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setActiveTab('collections')}
            >
              Collections
            </button>
          </div>
          
          {/* Loading state */}
          {loading && (
            <div className="py-20 flex justify-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
          )}
          
          {/* NFTs Tab */}
          {!loading && activeTab === 'nfts' && (
            <>
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
                <div className="bg-darker-bg/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center my-12">
                  <p className="text-white/60">No NFTs are currently listed for sale.</p>
                </div>
              )}
            </>
          )}
          
          {/* Collections Tab */}
          {!loading && activeTab === 'collections' && (
            <>
              {collections.length > 0 ? (
                <div className="neon-card overflow-hidden animate-fade-in">
                  <div className="neon-card-content p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-white/70 font-orbitron">Collection</TableHead>
                          <TableHead className="text-white/70 font-orbitron">Description</TableHead>
                          <TableHead className="text-white/70 font-orbitron">Owner</TableHead>
                          <TableHead className="text-white/70 font-orbitron text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {collections.map((collection) => (
                          <TableRow key={collection.collection_address}>
                            <TableCell className="font-orbitron text-white">
                              {collection.name}
                              {collection.twitter_handle && (
                                <div className="text-xs text-neon-purple mt-1">{collection.twitter_handle}</div>
                              )}
                            </TableCell>
                            <TableCell className="text-white/70 max-w-xs truncate">
                              {collection.description}
                            </TableCell>
                            <TableCell className="text-neon-blue">
                              {collection.owner_address.substring(0, 6)}...{collection.owner_address.substring(collection.owner_address.length - 4)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Link to={`/collection/${collection.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                <Button variant="blue" size="sm">View</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="bg-darker-bg/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center my-12">
                  <p className="text-white/60">No collections found.</p>
                </div>
              )}
            </>
          )}
          
        </div>
      </div>
    </MainLayout>
  );
};

export default Discover;
