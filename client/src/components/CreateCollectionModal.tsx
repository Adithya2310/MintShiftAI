
import React, { useState } from 'react';
import Button from './Button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    owner_address: '',
    twitter_handle: '',
    api_key: '',
    api_secret: '',
    access_token: '',
    access_secret: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate a random collection address (in a real app, this would come from blockchain interaction)
      const collectionAddress = `0x${uuidv4().replace(/-/g, '')}`;
      
      // Insert data into collections table
      const { data, error } = await supabase
        .from('collections')
        .insert({
          collection_address: collectionAddress,
          name: formData.name,
          description: formData.description,
          owner_address: formData.owner_address || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // Default if not provided
          image_url: null, // Will be updated later if needed
          twitter_handle: formData.twitter_handle ? `@${formData.twitter_handle.replace('@', '')}` : null,
          api_key: formData.api_key || null,
          api_secret: formData.api_secret || null,
          access_token: formData.access_token || null,
          access_secret: formData.access_secret || null
        })
        .select();
      
      if (error) {
        console.error('Error creating collection:', error);
        toast({
          title: 'Error creating collection',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        console.log('Collection created:', data);
        toast({
          title: 'Collection created',
          description: `${formData.name} has been created successfully!`
        });
        // Reset form and close modal
        setFormData({
          name: '',
          description: '',
          owner_address: '',
          twitter_handle: '',
          api_key: '',
          api_secret: '',
          access_token: '',
          access_secret: ''
        });
        onClose();
        
        // Reload the page to show the new collection
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
            <h2 className="font-orbitron text-xl font-bold text-white">Create Collection</h2>
            <button onClick={onClose} className="text-white/70 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                Collection Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue text-white"
                placeholder="Cyber Punks"
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
                placeholder="A collection of unique cyberpunk characters..."
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="owner_address" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                Wallet Address*
              </label>
              <input
                type="text"
                id="owner_address"
                name="owner_address"
                value={formData.owner_address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue text-white"
                placeholder="0x000..."
              />
            </div>
            
            <div className="border-t border-white/10 pt-4 mt-4">
              <h3 className="font-orbitron text-md font-semibold mb-3 text-neon-purple">Twitter Integration</h3>
              <p className="text-white/60 text-sm mb-4">Connect your Twitter account to automatically post when new NFTs are minted in your collection.</p>
              
              <div>
                <label htmlFor="twitter_handle" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                  Twitter Handle
                </label>
                <input
                  type="text"
                  id="twitter_handle"
                  name="twitter_handle"
                  value={formData.twitter_handle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple text-white"
                  placeholder="@your_twitter"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="api_key" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                    API Key
                  </label>
                  <input
                    type="password"
                    id="api_key"
                    name="api_key"
                    value={formData.api_key}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple text-white"
                  />
                </div>
                <div>
                  <label htmlFor="api_secret" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                    API Secret
                  </label>
                  <input
                    type="password"
                    id="api_secret"
                    name="api_secret"
                    value={formData.api_secret}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple text-white"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="access_token" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                    Access Token
                  </label>
                  <input
                    type="password"
                    id="access_token"
                    name="access_token"
                    value={formData.access_token}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple text-white"
                  />
                </div>
                <div>
                  <label htmlFor="access_secret" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                    Access Secret
                  </label>
                  <input
                    type="password"
                    id="access_secret"
                    name="access_secret"
                    value={formData.access_secret}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex gap-3 justify-end">
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="gradient" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Collection'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionModal;
