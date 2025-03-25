
import React, { useState } from 'react';
import Button from './Button';
import { useToast } from '@/hooks/use-toast';
import { ImagePlus } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface MintNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectionName: string;
}

const MintNFTModal: React.FC<MintNFTModalProps> = ({ isOpen, onClose, collectionName }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Generate a random NFT address (in a real app, this would come from blockchain interaction)
      const nftAddress = `0x${uuidv4().replace(/-/g, '')}`;
      
      // Insert data into nfts table - IMPORTANT: using islisted (lowercase) for the database column
      const { data, error } = await supabase
        .from('nfts')
        .insert({
          nft_address: nftAddress,
          collection_name: collectionName,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          image_url: formData.imageUrl || '/lovable-uploads/75ed4c38-0b29-41f2-87ce-61def3d8ec32.png', // Default image if not provided
          islisted: true, // Changed from isListed to islisted to match the database column name
          owner_address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' // Default owner address
        })
        .select();
      
      if (error) {
        console.error('Error minting NFT:', error);
        toast({
          title: 'Error minting NFT',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        console.log('NFT minted:', data);
        toast({
          title: "NFT Minted Successfully",
          description: `${formData.name} has been added to ${collectionName}`,
        });
        
        // Reset form and close modal
        setFormData({
          name: '',
          description: '',
          price: '',
          imageUrl: ''
        });
        onClose();
        
        // Reload the page to show the new NFT
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="neon-card w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in relative z-10">
        <div className="neon-card-content p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-orbitron text-xl font-bold text-white">Mint New NFT</h2>
            <button onClick={onClose} className="text-white/70 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                NFT Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue text-white"
                placeholder="Cyber Punk #123"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue text-white resize-none"
                placeholder="A unique cyberpunk character with neon accessories..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                Price (APT)*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue text-white"
                placeholder="1.5"
              />
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue text-white"
                placeholder="https://example.com/image.png"
              />
            </div>
            
            <div className="mt-2 flex items-center justify-center border-2 border-dashed border-white/20 rounded-lg p-6 cursor-pointer hover:border-neon-blue/50 transition-colors">
              <div className="space-y-1 text-center">
                <ImagePlus className="mx-auto h-12 w-12 text-white/30" />
                <div className="flex text-sm text-white/60">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-orbitron text-neon-blue hover:text-neon-blue/80">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-white/40">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            
            <div className="pt-4 flex gap-3 justify-end">
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="gradient" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Minting...' : 'Mint NFT'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MintNFTModal;
