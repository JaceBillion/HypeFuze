import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Code2 } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export const Navbar = () => {
  const location = useLocation();
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setMuted(SoundManager.isMuted());
  }, []);

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    const nextState = SoundManager.toggleMute();
    setMuted(nextState);
    if (!nextState) {
      SoundManager.playClick();
    }
  };

  const handleLinkClick = () => {
    SoundManager.playClick();
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/75 backdrop-blur-xl border-b border-white/5 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo Brand */}
          <Link 
            to="/" 
            onClick={handleLinkClick}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <img 
                src="/HypeFuze.png" 
                alt="HypeFuze Logo" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
            
            <span className="text-lg font-black tracking-tight text-white flex items-center">
              HYPE<span className="text-[#ccff00] font-bold">FUZE</span>
            </span>
          </Link>

          {/* Nav items list */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-1.5 bg-zinc-950/80 p-1.5 rounded-full border border-white/5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `relative px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-300 isolate ${
                        isActive ? 'text-black' : 'text-zinc-100 hover:text-[#ccff00]'
                      }`
                    }
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-[#ccff00] rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    {item.name}
                  </NavLink>
                );
              })}
            </div>

            {/* Audio Synthesis Settings Toggler */}
            <button
              onClick={handleMuteToggle}
              className="p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white transition-all active:scale-95 flex items-center justify-center"
              aria-label={muted ? 'Enable sound effects' : 'Mute sound effects'}
            >
              {muted ? (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#ccff00] animate-pulse" />
              )}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};
