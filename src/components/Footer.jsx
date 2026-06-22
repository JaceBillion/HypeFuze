import React from 'react';
import { Link } from 'react-router-dom';
import { SoundManager } from '../utils/SoundManager';

export const Footer = () => {
  const handleLinkClick = () => {
    SoundManager.playClick();
  };

  return (
    <footer className="bg-black border-t border-white/5 py-12 relative overflow-hidden">
      {/* Background soft lighting glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[#ccff00]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo Brand */}
          <Link 
            to="/" 
            onClick={handleLinkClick}
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center">
              <img src="/HypeFuze.png" alt="HypeFuze Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-black tracking-tight text-white uppercase">
              HYPE<span className="text-[#ccff00] font-bold">FUZE</span>
            </span>
          </Link>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-wider font-semibold text-zinc-500">
            <Link to="/" onClick={handleLinkClick} className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/about" onClick={handleLinkClick} className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/contact" onClick={handleLinkClick} className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link to="/privacy" onClick={handleLinkClick} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" onClick={handleLinkClick} className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Copyright label */}
          <div className="text-zinc-600 text-[10px] tracking-wide font-mono">
            © {new Date().getFullYear()} HypeFuze.com | HypeFuze LLC
          </div>

        </div>
      </div>
    </footer>
  );
};
