import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  wallet: any;
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);

  const getAptosWallet = () => {
    if ('aptos' in window) {
      return window.aptos;
    } else {
      window.open('https://petra.app/', '_blank');
    }
  };

  useEffect(() => {
    setWallet(getAptosWallet());
  }, []);

  const connectWallet = async () => {
    try {
      const response = await wallet.connect();
      const account = await wallet.account();
      setAddress(account.address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
  };

  return (
    <WalletContext.Provider value={{ wallet, address, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 