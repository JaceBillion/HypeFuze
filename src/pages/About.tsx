import { motion } from "motion/react";
import { Code2, Gamepad2, Keyboard, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] mb-8"
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">About Us</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8"
          >
            WE ARE <span className="text-[#ccff00]">HYPEFUZE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 font-light leading-relaxed"
          >
            A tech holding company built on the premise that innovation shouldn't be compromised. We create, broker, and elevate digital experiences.
          </motion.p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold tracking-tight">The HypeFuze Vision</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              At HypeFuze, we believe in the power of connection and creation. Our journey began with a simple idea: to build a tech ecosystem where both creators and entrepreneurs thrive.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Through our web development arm, HypeFuze WebDev, we've launched Argolix—a revolutionary app development broker. We saw a gap in the market where talented developers were consistently low-balled, and visionary entrepreneurs couldn't find reliable talent. Argolix bridges that gap, ensuring fair compensation and exceptional results.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(168,85,247,0.2)_0%,_transparent_70%)]" />
            <div className="relative z-10 text-center space-y-6">
              <div className="w-24 h-24 bg-purple-500/20 rounded-3xl border border-purple-500/30 flex items-center justify-center mx-auto mb-8 overflow-hidden">
                <img src="/Argolix.png" alt="Argolix logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-3xl font-bold text-white">Argolix</h3>
              <p className="text-purple-200/60 font-medium uppercase tracking-widest text-sm">App Development Broker</p>
            </div>
          </motion.div>
        </div>

        {/* Web Apps Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 lg:order-2"
          >
            <h2 className="text-4xl font-bold tracking-tight">Interactive Experiences</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Beyond brokerage, HypeFuze is a powerhouse of web app and game development. We build tools and games that challenge, entertain, and improve our users.
            </p>
            <ul className="space-y-6 mt-8">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/RankReaction.png" alt="RankReaction logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">RankReaction.com</h4>
                  <p className="text-zinc-400">A simple yet addictive web-game designed to gauge and develop your quickness. Compete, rank up, and react faster.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/TypingPacer.png" alt="TypingPacer logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">TypingPacer.com</h4>
                  <p className="text-zinc-400">A dedicated platform allowing users to practice, track, and significantly improve their typing speed and accuracy over time.</p>
                </div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:order-1"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-8 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.15)_0%,_transparent_70%)]" />
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden border border-cyan-500/30">
                  <img src="/RankReaction.png" alt="RankReaction logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-2xl font-bold text-white">Rank Reaction</h3>
              </div>
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-8 relative sm:translate-y-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(249,115,22,0.15)_0%,_transparent_70%)]" />
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden border border-orange-500/30">
                  <img src="/TypingPacer.png" alt="TypingPacer logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-2xl font-bold text-white">Typing Pacer</h3>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
