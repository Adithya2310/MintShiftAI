import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { useWallet } from '../contexts/WalletContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { address, connectWallet } = useWallet();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-darker-bg/80 backdrop-blur-xl border-b border-white/10' : 'py-4'
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden">
            <img
              src="/lovable-uploads/75ed4c38-0b29-41f2-87ce-61def3d8ec32.png"
              alt="MintShift Logo"
              className="object-contain w-full h-full"
            />
          </div>
          <span className="font-orbitron font-bold text-2xl text-white">
            Mint<span className="text-neon-blue">Shift</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-orbitron text-sm transition-all duration-300 ${isActive(link.path)
                  ? 'text-neon-blue text-glow-blue'
                  : 'text-white hover:text-neon-blue'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-3">
            {
              address ? (
                <Button variant="ghost" size="sm">
                  Connected
                </Button>
              ):(
                <Button variant="ghost" size="sm" onClick={connectWallet}>
                  Connect Wallet
                </Button>
              )
            }
            {/* <Button variant="gradient" size="sm">
              Create NFT
            </Button> */}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-darker-bg/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${mobileMenuOpen ? 'max-h-[500px] opacity-100 border-opacity-100' : 'max-h-0 opacity-0 border-opacity-0 overflow-hidden'
        }`}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-orbitron text-sm py-2 transition-all duration-300 ${isActive(link.path)
                ? 'text-neon-blue text-glow-blue'
                : 'text-white'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            {
              address ? (
                <Button variant="ghost" fullWidth>
                Connected
              </Button>
              ):(
                <Button variant="ghost" fullWidth onClick={connectWallet}>
                  Connect Wallet
                </Button>
              )
            }
            <Button variant="gradient" fullWidth>
              Create NFT
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
