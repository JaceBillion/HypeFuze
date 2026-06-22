import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { CursorGlowCard } from '../components/CursorGlowCard';

export const About = () => {
  const appIcons = [
    { name: 'Elite400M', img: '/Elite400M.png', desc: 'Sprint training dashboard software.', color: 'border-amber-500/20 bg-amber-500/10' },
    { name: 'SplitStrategy', img: '/SplitStrategy.png', desc: 'Bespoke split pacing planner.', color: 'border-emerald-500/20 bg-emerald-500/10' },
    { name: 'RankReaction', img: '/RankReaction.png', desc: 'Latency reaction speed metric test.', color: 'border-cyan-500/20 bg-cyan-500/10' },
    { name: 'TypingPacer', img: '/TypingPacer.png', desc: 'WPM keyboard typing accuracy widget.', color: 'border-orange-500/20 bg-orange-500/10' }
  ];

  return (
    <div className="relative min-h-screen bg-black text-zinc-300 font-sans pt-32 pb-24 bg-noise">
      {/* Visual backdrop details */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-widest uppercase">About Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white mb-6"
          >
            We Are <span className="text-[#ccff00]">HypeFuze</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed"
          >
            An elite technology holding group designing, developing, and publishing proprietary web-applications and high-fidelity systems.
          </motion.p>
        </div>

        {/* Narrative & Mascot Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          
          {/* Narrative Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              The <span className="text-[#ccff00]">HypeFuze</span> Vision
            </h2>
            <p className="text-sm sm:text-base font-light leading-relaxed text-zinc-400">
              At <span className="text-[#ccff00] font-bold">HypeFuze</span>, we are driven by the absolute belief that elite digital tools should be accessible to everyone. Our journey is centered on launching high-performance computation platforms—such as <span className="text-white font-bold">Elite400M</span> and <span className="text-white font-bold">SplitStrategy</span>—that democratize sports science and athletic pacing strategy. We believe that true technological independence begins when athletes, coaches, and creators are equipped with the exact same caliber of analytical modeling tools previously reserved for elite organizations.
            </p>
            <p className="text-sm sm:text-base font-light leading-relaxed text-zinc-400">
              By publishing tools like <span className="text-white font-bold">Elite400M</span> (to plan sprint pace distribution) and <span className="text-white font-bold">SplitStrategy</span> (to model race lap pacing), we empower individuals globally to self-direct their growth, bypass traditional gatekeepers, and claim technical sovereignty over their training and data. While we continue to design and coordinate matching networks like Argolix, our primary passion remains fueling the global movement of decentralized, independent creation.
            </p>
          </motion.div>

          {/* Featured HypeFuze Mascot Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 w-full"
          >
            <CursorGlowCard
              className="p-8 border-[#ccff00]/15 bg-zinc-950/80 min-h-[480px]"
              glowColor="rgba(204, 255, 0, 0.05)"
              borderColor="rgba(204, 255, 0, 0.2)"
            >
              <div className="flex justify-between items-center mb-6 border-b border-[#ccff00]/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-zinc-900 flex items-center justify-center overflow-hidden shrink-0">
                    <img src="/HypeFuze.png" alt="HypeFuze Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs uppercase tracking-wider font-extrabold text-white">HypeFuze</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
              </div>

              {/* Alien Mascot Panel */}
              <div className="bg-black/90 rounded-2xl border border-zinc-900 p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[340px] group shadow-inner">
                {/* Neon Spotlight Behind Mascot */}
                <div className="absolute inset-0 bg-[#ccff00]/5 rounded-full blur-[100px] w-64 h-64 mx-auto my-auto pointer-events-none" />
                
                {/* Dematerializing animated alien */}
                <motion.div
                  animate={{ 
                    opacity: [1, 0.9, 0, 0, 0.9, 1],
                    scale: [1, 1.08, 0.75, 0.75, 1.08, 1],
                    filter: [
                      "drop-shadow(0 10px 20px rgba(204, 255, 0, 0.15)) brightness(1) blur(0px)",
                      "drop-shadow(0 0 45px rgba(204, 255, 0, 0.95)) brightness(2.5) blur(2px)",
                      "drop-shadow(0 0 0px rgba(0,0,0,0)) brightness(0) blur(10px)",
                      "drop-shadow(0 0 0px rgba(0,0,0,0)) brightness(0) blur(10px)",
                      "drop-shadow(0 0 45px rgba(204, 255, 0, 0.95)) brightness(2.5) blur(2px)",
                      "drop-shadow(0 10px 20px rgba(204, 255, 0, 0.15)) brightness(1) blur(0px)"
                    ]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                  className="relative z-10 w-full max-w-[260px] aspect-square flex items-center justify-center"
                >
                  <img 
                    src="/Alien.png" 
                    alt="HypeFuze Alien" 
                    className="max-h-[280px] w-auto object-contain group-hover:scale-105 transition-transform duration-500" 
                  />
                </motion.div>

                {/* Subtitle tag */}
                <div className="relative z-10 mt-6 px-3 py-1 rounded-full bg-[#ccff00]/5 border border-[#ccff00]/10 text-[#ccff00] text-[9px] font-mono tracking-widest uppercase">
                  Technological independence node
                </div>
              </div>
            </CursorGlowCard>
          </motion.div>
        </div>

        {/* Ecosystem Apps Showcase */}
        <section className="border-t border-white/5 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mb-4">
              Interactive Applications
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-light max-w-xl mx-auto">
              Beyond brokerage systems, HypeFuze designs products that challenge, calculate, and scale performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {appIcons.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CursorGlowCard 
                  className="p-6 border-zinc-900 bg-zinc-950/60 flex flex-col justify-between min-h-[180px]"
                  glowColor="rgba(255, 255, 255, 0.03)"
                  borderColor="rgba(255, 255, 255, 0.15)"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center overflow-hidden shrink-0 ${app.color}`}>
                      <img src={app.img} alt={`${app.name} Logo`} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white uppercase text-sm tracking-tight">{app.name}</h4>
                      <p className="text-zinc-500 text-[10px] tracking-wide font-mono mt-0.5">Core Product</p>
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 text-xs font-light text-left mt-6 leading-relaxed">
                    {app.desc}
                  </p>
                </CursorGlowCard>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
