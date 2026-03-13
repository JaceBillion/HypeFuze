import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md overflow-hidden">
              <img src="/HypeFuze.png" alt="HypeFuze logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              HYPE<span className="text-[#ccff00]">FUZE</span>
            </span>
          </div>
          
          <div className="flex gap-6 text-sm text-zinc-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
          
          <div className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} HypeFuze. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
