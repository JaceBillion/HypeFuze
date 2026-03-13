import { motion } from "motion/react";
import { ArrowRight, Code2, Gamepad2, Keyboard, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const companies = [
  {
    name: "Argolix",
    description: "An app development broker bridging the gap between entrepreneurs and developers, ensuring fair compensation and top-tier results.",
    icon: Code2,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    link: "#",
    logoUrl: "/Argolix.png"
  },
  {
    name: "RankReaction.com",
    description: "A competitive web-game designed to gauge and develop your quickness and reaction times. Test your limits.",
    icon: Gamepad2,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    link: "#",
    logoUrl: "/RankReaction.png"
  },
  {
    name: "TypingPacer.com",
    description: "The ultimate platform to practice, track, and improve your typing speed and accuracy. Pace yourself to perfection.",
    icon: Keyboard,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    link: "#",
    logoUrl: "/TypingPacer.png"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(204,255,0,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] mb-8"
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">Tech Holding Company</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8"
          >
            IGNITING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-emerald-400">
              INNOVATION
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 font-light"
          >
            HypeFuze is the catalyst for next-generation web apps, games, and development brokerage. We build the future, fast.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/about"
              className="px-8 py-4 bg-[#ccff00] text-black font-bold rounded-lg hover:bg-[#b3e600] transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Discover Our Vision <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/5 text-white font-bold rounded-lg hover:bg-white/10 border border-white/10 transition-colors w-full sm:w-auto justify-center flex"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-32 bg-zinc-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 md:flex md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                OUR <span className="text-[#ccff00]">ECOSYSTEM</span>
              </h2>
              <p className="text-zinc-400 text-lg">
                From bridging the gap between visionary entrepreneurs and elite developers, to creating addictive web experiences.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`group relative p-8 rounded-3xl bg-black border ${company.border} hover:border-[#ccff00]/50 transition-colors overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-64 h-64 ${company.bg} rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${company.bg} border ${company.border} flex items-center justify-center mb-8 overflow-hidden`}>
                    {/* Replace src with your uploaded logo */}
                    <img src={company.logoUrl} alt={`${company.name} logo`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{company.name}</h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    {company.description}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-500 group-hover:text-[#ccff00] transition-colors">
                      Explore Project
                    </span>
                    <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-[#ccff00] transition-colors group-hover:translate-x-1 transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
