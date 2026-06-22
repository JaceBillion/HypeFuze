import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { SoundManager } from '../utils/SoundManager';

export const CursorGlowCard = ({
  children,
  className = '',
  contentClass = '',
  borderClass = 'border-zinc-800/80',
  bgClass = 'bg-zinc-950/80',
  glowColor = 'rgba(204, 255, 0, 0.08)',
  borderColor = 'rgba(204, 255, 0, 0.35)',
  tilt = true,
  onClick
}) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for tilt animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid tilt physics
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position relative to card center (normalized between -0.5 and 0.5)
    const px = (e.clientX - rect.left) / width;
    const py = (e.clientY - rect.top) / height;
    
    x.set(px - 0.5);
    y.set(py - 0.5);

    // CSS spotlight position
    const cx = px * 100;
    const cy = py * 100;
    cardRef.current.style.setProperty('--mouse-x', `${cx}%`);
    cardRef.current.style.setProperty('--mouse-y', `${cy}%`);
  };

  const handlePointerEnter = () => {
    setHovered(true);
    SoundManager.playHover();
  };

  const handlePointerLeave = () => {
    setHovered(false);
    // Reset tilt variables
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    SoundManager.playClick();
    if (onClick) onClick(e);
  };

  const content = (
    <div className="relative h-full w-full">
      {/* Dynamic spotlight layer */}
      <div 
        className="reveal-glow"
        style={{
          background: `radial-gradient(circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor} 0%, rgba(16, 185, 129, 0.02) 45%, transparent 80%)`,
          opacity: hovered ? 1 : 0
        }}
      />
      
      {/* Dynamic border highlight */}
      <div 
        className="reveal-border"
        style={{
          background: `radial-gradient(circle 180px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${borderColor} 0%, rgba(16, 185, 129, 0.1) 50%, transparent 100%)`,
          opacity: hovered ? 1 : 0
        }}
      />
      
      {/* Content wrapper */}
      <div className={`relative z-10 h-full w-full ${contentClass}`}>
        {children}
      </div>
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={`reveal-card ${bgClass} border ${borderClass} rounded-3xl transition-colors duration-500 overflow-hidden ${className}`}
    >
      {content}
    </motion.div>
  );
};
