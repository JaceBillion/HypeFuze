import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldAlert, Cpu, ArrowUpRight } from 'lucide-react';
import { CursorGlowCard } from '../components/CursorGlowCard';
import { DeviceMockup } from '../components/DeviceMockup';
import { RankReactionGame } from '../components/RankReactionGame';
import { TypingPacerDemo } from '../components/TypingPacerDemo';
import { SoundManager } from '../utils/SoundManager';

export const Home = () => {
  const [particles, setParticles] = useState([]);

  // Generate particles on client-side to prevent SSR mismatch
  useEffect(() => {
    const generated = Array.from({ length: 250 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      // Pre-warm distribution: start particles at random distances from the center
      const radius = Math.random() * 700 + 20;
      const distance = Math.random() * 250 + 100;
      return {
        id: i,
        size: Math.random() * 2 + 1,
        startX: Math.cos(angle) * radius,
        startY: Math.sin(angle) * radius,
        endX: Math.cos(angle) * (radius + distance),
        endY: Math.sin(angle) * (radius + distance),
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 0.2 // Starts immediately
      };
    });
    setParticles(generated);
  }, []);

  const handleMouseEnterButton = () => {
    SoundManager.playHover();
  };

  const handleButtonClick = () => {
    SoundManager.playClick();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black bg-noise">
      
      {/* Dynamic Background Spotlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Lines Backdrop */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-40" />

      {/* Particle Space field animation - fixed to h-screen to center behind hero title */}
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        >
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="absolute bg-white rounded-full"
              style={{ width: p.size, height: p.size }}
              initial={{ x: p.startX, y: p.startY, opacity: 0.3, scale: 0.5 }}
              animate={{ 
                x: [p.startX, p.endX], 
                y: [p.startY, p.endY], 
                opacity: [0.3, 0.7, 0], 
                scale: [0.5, 1.2, 0.5] 
              }}
              transition={{ 
                duration: p.duration, 
                repeat: Infinity, 
                delay: p.delay, 
                ease: "linear" 
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Tag Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <Cpu className="w-3.5 h-3.5" />
              </motion.div>
              <span className="text-[10px] font-bold tracking-widest uppercase">
                Software Development Studio
              </span>
            </motion.div>

            {/* H1 Main Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6 uppercase"
            >
              <span className="text-white">HYPE</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-emerald-400 text-neon-glow">
                FUZE
              </span>
            </motion.h1>

            {/* H2 Subtitle */}
            <motion.h2 
              variants={itemVariants}
              className="text-lg sm:text-2xl font-black tracking-[0.2em] text-white/95 uppercase mb-8 font-mono"
            >
              Igniting Innovation
            </motion.h2>

            {/* Paragraph Description */}
            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
            >
              We design, engineer, and launch elite digital tools, gaming systems, and high-performance workout pacing software. Built for execution.
            </motion.p>

            {/* Call to Actions */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              <Link
                to="/about"
                onClick={handleButtonClick}
                onMouseEnter={handleMouseEnterButton}
                className="group px-8 py-4 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#b3e600] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto shadow-[0_10px_20px_rgba(204,255,0,0.15)]"
              >
                Discover Our Vision
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                to="/contact"
                onClick={handleButtonClick}
                onMouseEnter={handleMouseEnterButton}
                className="px-8 py-4 bg-zinc-950 border border-white/10 hover:border-white/20 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-900 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto flex justify-center"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ECOSYSTEM SECTION */}
        <section className="py-24 border-t border-white/5 relative">
          
          {/* Section titles */}
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase mb-4">
                Our <span className="text-[#ccff00]">Ecosystem</span>
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base font-light leading-relaxed">
                Explore our catalog of custom-engineered athletic workout split calculations, latency reaction tools, and venture-developer matching systems.
              </p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* ELITE400M CARD */}
            <CursorGlowCard 
              className="lg:col-span-2 md:col-span-2 col-span-1 min-h-[460px]"
              contentClass="flex flex-col sm:flex-row gap-8 justify-between p-8"
              glowColor="rgba(245, 158, 11, 0.08)"
              borderColor="rgba(245, 158, 11, 0.3)"
              borderClass="border-amber-500/20"
            >
              <div className="flex-[1.3] flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl border border-amber-500/20 bg-amber-500/10 flex items-center justify-center mb-8 overflow-hidden">
                    <img src="/Elite400M.png" alt="Elite400M Logo" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white mb-3 tracking-tight">Elite400M</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    The premier 400-meter sprint training application. Plan race split distributions, track critical workouts, and execute tactical pace strategies built directly for sprinters and athletic coaches.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-8">
                  <a 
                    href="https://elite400m.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => SoundManager.playClick()}
                    className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 group-hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    Visit Website
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Phone Image Mockup */}
              <div className="relative z-10 flex-1 flex items-center justify-center -mt-4 sm:mt-0 overflow-hidden h-[260px] sm:h-full min-h-[220px]">
                <motion.div
                  whileHover={{ y: -8, scale: 1.05, rotate: -1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src="/Elite400MPhone.png"
                    alt="Elite400M App mockup"
                    className="max-h-[280px] sm:max-h-[300px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  />
                </motion.div>
              </div>
            </CursorGlowCard>

            {/* SPLITSTRATEGY CARD */}
            <CursorGlowCard 
              className="lg:col-span-2 md:col-span-2 col-span-1 min-h-[460px]"
              contentClass="flex flex-col sm:flex-row gap-8 justify-between p-8"
              glowColor="rgba(16, 185, 129, 0.08)"
              borderColor="rgba(16, 185, 129, 0.3)"
              borderClass="border-emerald-500/20"
            >
              <div className="flex-[1.3] flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center mb-8 overflow-hidden">
                    <img src="/SplitStrategy.png" alt="SplitStrategy Logo" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white mb-3 tracking-tight">SplitStrategy</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    Plan your race pacing before stepping foot on the track. Select your target distance, configure lap objectives, and generate event-specific segment paces designed to yield peak track performance.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-8">
                  <a 
                    href="https://splitstrategy.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => SoundManager.playClick()}
                    className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 group-hover:text-emerald-400 flex items-center gap-1 transition-colors"
                  >
                    Visit Website
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Phone Image Mockup */}
              <div className="relative z-10 flex-1 flex items-center justify-center -mt-4 sm:mt-0 overflow-hidden h-[260px] sm:h-full min-h-[220px]">
                <motion.div
                  whileHover={{ y: -8, scale: 1.05, rotate: -1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src="/SplitStrategyPhone.png"
                    alt="SplitStrategy App mockup"
                    className="max-h-[280px] sm:max-h-[300px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  />
                </motion.div>
              </div>
            </CursorGlowCard>

            {/* LORDAR-1009 CARD */}
            <CursorGlowCard 
              className="lg:col-span-2 md:col-span-2 col-span-1 min-h-[460px] sm:min-h-[360px]"
              contentClass="flex flex-col sm:flex-row gap-8 justify-between p-8"
              glowColor="rgba(255, 159, 67, 0.08)"
              borderColor="rgba(255, 159, 67, 0.3)"
              borderClass="border-amber-500/20"
            >
              <div className="flex-[1.3] flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl border border-amber-500/20 bg-amber-500/10 flex items-center justify-center mb-8 overflow-hidden">
                    <img src="/LordARIcon.png" alt="LordAR-1009 Logo" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white mb-3 tracking-tight">LordAR-1009</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed font-sans">
                    The warmth of 1970s analog soul — the glide leads, the rubber-band funk bass, and the string-machine shimmer — reborn as a premium synthesizer instrument plugin for your studio. Works natively in AU, VST3, and Standalone.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-8">
                  <a 
                    href="https://lordar1009.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => SoundManager.playClick()}
                    className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 group-hover:text-amber-400 flex items-center gap-1 transition-colors"
                  >
                    Visit Website
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Synthesizer Panel Mockup */}
              <div className="relative z-10 flex-1 flex items-center justify-center -mt-4 sm:mt-0 overflow-hidden h-[260px] sm:h-full min-h-[220px]">
                <motion.div
                  whileHover={{ y: -8, scale: 1.05, rotate: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src="/LordARPanel.png"
                    alt="LordAR-1009 Control Panel"
                    className="max-h-[280px] sm:max-h-[300px] w-auto object-contain rounded-lg border border-[#4a3b2c] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  />
                </motion.div>
              </div>
            </CursorGlowCard>

            {/* RANKREACTION CARD (PLAYABLE WIDGET) */}
            <CursorGlowCard 
              className="lg:col-span-1 md:col-span-2 col-span-1 min-h-[360px]"
              contentClass="flex flex-col justify-between p-6"
              glowColor="rgba(6, 182, 212, 0.08)"
              borderColor="rgba(6, 182, 212, 0.3)"
              borderClass="border-cyan-500/20"
              tilt={false} /* Disable tilt so playable game can be clicked accurately */
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl border border-cyan-500/20 bg-cyan-500/10 flex items-center justify-center overflow-hidden">
                    <img src="/RankReaction.png" alt="RankReaction Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[8px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono px-2 py-0.5 rounded-full uppercase font-black">
                    Interactive
                  </span>
                </div>
                
                <h3 className="text-lg font-black uppercase text-white mb-2 tracking-tight">RankReaction</h3>
                <p className="text-zinc-500 text-xs font-light leading-relaxed mb-4">
                  A competitive gaming engine designed to evaluate, rank, and improve reaction latencies. Test your limits.
                </p>
                <div className="mb-4">
                  <a 
                    href="https://rankreaction.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => SoundManager.playClick()}
                    className="inline-flex items-center gap-1 text-[10px] uppercase font-extrabold tracking-wider text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    Visit Website
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Reaction Game Widget */}
              <div className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-900 flex-1">
                <RankReactionGame />
              </div>
            </CursorGlowCard>

            {/* TYPINGPACER CARD (PLAYABLE WIDGET) */}
            <CursorGlowCard 
              className="lg:col-span-1 md:col-span-2 col-span-1 min-h-[360px]"
              contentClass="flex flex-col justify-between p-6"
              glowColor="rgba(249, 115, 22, 0.08)"
              borderColor="rgba(249, 115, 22, 0.3)"
              borderClass="border-orange-500/20"
              tilt={false} /* Disable tilt so inputs can be typing-focused easily */
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl border border-orange-500/20 bg-orange-500/10 flex items-center justify-center overflow-hidden">
                    <img src="/TypingPacer.png" alt="TypingPacer Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[8px] bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono px-2 py-0.5 rounded-full uppercase font-black">
                    Interactive
                  </span>
                </div>

                <h3 className="text-lg font-black uppercase text-white mb-2 tracking-tight">TypingPacer</h3>
                <p className="text-zinc-500 text-xs font-light leading-relaxed mb-4">
                  The ultimate web tool to test, record, and scale keyboard typing accuracy and WPM pace intervals.
                </p>
                <div className="mb-4">
                  <a 
                    href="https://typingpacer.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => SoundManager.playClick()}
                    className="inline-flex items-center gap-1 text-[10px] uppercase font-extrabold tracking-wider text-zinc-400 hover:text-orange-400 transition-colors"
                  >
                    Visit Website
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Typing Test Widget */}
              <div className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-900 flex-1">
                <TypingPacerDemo />
              </div>
            </CursorGlowCard>

            {/* ARGOLIX CARD */}
            <CursorGlowCard 
              className="lg:col-span-2 md:col-span-2 col-span-1 min-h-[360px]"
              contentClass="flex flex-col sm:flex-row gap-8 justify-between p-8"
              glowColor="rgba(168, 85, 247, 0.08)"
              borderColor="rgba(168, 85, 247, 0.3)"
              borderClass="border-purple-500/20"
            >
              <div className="flex-[1.3] flex flex-col justify-between h-full">
                <div>
                  <div className="w-14 h-14 rounded-2xl border border-purple-500/20 bg-purple-500/10 flex items-center justify-center mb-8 overflow-hidden">
                    <img src="/Argolix.png" alt="Argolix Logo" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white mb-3 tracking-tight">Argolix</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    Bridging developers and visionary entrepreneurs. Argolix manages contracts, secures escrow verification, and coordinates product delivery milestones to ensure top-tier dev results.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-8">
                  <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                    Under Development
                  </span>
                </div>
              </div>

              {/* Go code editor visualization */}
              <div className="flex-1 flex items-center justify-center min-h-[160px] sm:min-h-0">
                <div className="w-full h-full max-w-[280px] bg-zinc-950/95 border border-purple-500/20 p-4 rounded-2xl shadow-xl font-mono text-[10px] text-zinc-400 select-none">
                  <div className="flex items-center gap-1.5 border-b border-purple-500/10 pb-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    <span className="text-[8px] text-zinc-600 ml-1 font-mono">broker_engine.go</span>
                  </div>
                  <div className="space-y-1 text-left font-mono">
                    <p><span className="text-zinc-700">1</span> <span className="text-purple-400">package</span> main</p>
                    <p><span className="text-zinc-700">2</span> </p>
                    <p><span className="text-zinc-700">3</span> <span className="text-[#ccff00]">func</span> Connect() &#123;</p>
                    <p><span className="text-zinc-700">4</span> &nbsp;&nbsp;dev := MatchElite()</p>
                    <p><span className="text-zinc-700">5</span> &nbsp;&nbsp;client := GetVision()</p>
                    <p><span className="text-zinc-700">6</span> &nbsp;&nbsp;EscrowVerify(dev, client)</p>
                    <p><span className="text-zinc-700">7</span> &#125;</p>
                  </div>
                </div>
              </div>
            </CursorGlowCard>

          </div>
        </section>

      </div>
    </div>
  );
};
