
import React, { useState, useEffect } from 'react';
import CollectionCard from './CollectionCard';
import Button from './Button';
import CreateCollectionModal from './CreateCollectionModal';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Collection {
  collection_address: string;
  name: string;
  description: string;
  owner_address: string;
  image_url?: string;
  twitter_handle?: string;
}

const NFTCollections = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data, error } = await supabase
          .from('collections')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching collections:', error);
          toast.error("Failed to load collections");
        } else {
          setCollections(data || []);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCollections();
  }, []);
  
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="font-orbitron text-3xl font-bold text-white">
              Top Collections
            </h2>
            <p className="text-white/60 mt-2">
              Explore the hottest NFT collections in our marketplace
            </p>
          </div>
          
          <Button 
            variant="blue" 
            onClick={() => setIsModalOpen(true)}
          >
            Create Collection
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="neon-card animate-pulse">
                <div className="neon-card-content">
                  <div className="aspect-[4/3] rounded-lg bg-white/5 mb-4"></div>
                  <div className="p-2 space-y-2">
                    <div className="h-6 bg-white/5 rounded"></div>
                    <div className="h-10 bg-white/5 rounded"></div>
                    <div className="flex justify-between mt-3">
                      <div className="h-4 w-20 bg-white/5 rounded"></div>
                      <div className="h-4 w-16 bg-white/5 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : collections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <CollectionCard
                key={collection.collection_address}
                id={collection.name.toLowerCase().replace(/\s+/g, '-')}
                name={collection.name}
                description={collection.description}
                itemCount={0} // This will be updated in the Collection component
                thumbnailUrl={collection.image_url}
                ownerAddress={collection.owner_address}
              />
            ))}
          </div>
        ) : (
          <div className="bg-darker-bg/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
            <p className="text-white/60 mb-4">No collections found. Create your first NFT collection!</p>
            <Button 
              variant="gradient" 
              onClick={() => setIsModalOpen(true)}
            >
              Create Collection
            </Button>
          </div>
        )}
        
        <div className="flex justify-center mt-12">
          <Link to="/discover">
            <Button variant="ghost">
              View All Collections
            </Button>
          </Link>
        </div>
      </div>
      
      <CreateCollectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default NFTCollections;
