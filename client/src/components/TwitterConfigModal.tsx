
import React, { useState } from 'react';
import Button from './Button';
import { useToast } from '@/hooks/use-toast';
import { Twitter } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface CollectionData {
  id: string;
  name: string;
  twitterHandle?: string;
  [key: string]: any;
}

interface TwitterConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectionData: CollectionData;
}

const TwitterConfigModal: React.FC<TwitterConfigModalProps> = ({ 
  isOpen, 
  onClose, 
  collectionData 
}) => {
  const [formData, setFormData] = useState({
    twitter_handle: collectionData.twitterHandle?.replace('@', '') || '',
    api_key: '',
    api_secret: '',
    access_token: '',
    access_secret: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.twitter_handle) {
      toast({
        title: "Error",
        description: "Twitter handle is required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update Twitter configuration in collections table
      const { error } = await supabase
        .from('collections')
        .update({
          twitter_handle: `@${formData.twitter_handle.replace('@', '')}`,
          api_key: formData.api_key || null,
          api_secret: formData.api_secret || null,
          access_token: formData.access_token || null,
          access_secret: formData.access_secret || null
        })
        .eq('name', collectionData.name);
      
      if (error) {
        console.error('Error updating Twitter configuration:', error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        console.log('Twitter configuration updated');
        toast({
          title: "Twitter Configuration Saved",
          description: "Your Twitter settings have been updated",
        });
        
        onClose();
        
        // Reload the page to reflect the changes
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
            <h2 className="font-orbitron text-xl font-bold text-white">Twitter Configuration</h2>
            <button onClick={onClose} className="text-white/70 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6 p-4 rounded-lg bg-neon-purple/10 border border-neon-purple/30">
            <div className="flex items-center text-neon-purple mb-2">
              <Twitter className="h-5 w-5 mr-2" />
              <span className="font-orbitron font-semibold">Automatic Twitter Posts</span>
            </div>
            <p className="text-white/70 text-sm">
              Configure Twitter API credentials to automatically post when new NFTs are minted in your collection.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="twitter_handle" className="block text-sm font-medium text-white/70 mb-1 font-orbitron">
                Twitter Handle*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-white/50">@</span>
                </div>
                <input
                  type="text"
                  id="twitter_handle"
                  name="twitter_handle"
                  value={formData.twitter_handle}
                  onChange={handleChange}
                  required
                  className="w-full pl-8 px-3 py-2 bg-darker-bg border border-white/20 rounded-md focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple text-white"
                  placeholder="yourtwittername"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
                  placeholder="••••••••"
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
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
                  placeholder="••••••••"
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
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="pt-4 flex gap-3 justify-end">
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="purple" type="submit" disabled={isSubmitting}>
                <Twitter className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Configuration'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwitterConfigModal;
