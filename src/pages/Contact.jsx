import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CursorGlowCard } from '../components/CursorGlowCard';
import { SoundManager } from '../utils/SoundManager';
import confetti from 'canvas-confetti';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [submitState, setSubmitState] = useState('idle'); // idle, submitting, success, error
  const [botcheck, setBotcheck] = useState(false);

  const handleInputChange = (field, val) => {
    // Sound feedback: soft key click
    SoundManager.playHover();
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (submitState === 'submitting') return;
    
    SoundManager.playClick();
    
    if (botcheck) {
      setSubmitState('success');
      return;
    }

    setSubmitState('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '47d6603c-02db-4260-9eeb-5298556d6f16',
          name: formData.name,
          email: formData.contact,
          message: formData.message,
          subject: 'New Contact Form Submission - HypeFuze Rebuild',
          from_name: 'HypeFuze Studio'
        })
      });
      
      const json = await response.json();

      if (json.success) {
        setSubmitState('success');
        SoundManager.playNotification();
        setFormData({ name: '', contact: '', message: '' });
        
        confetti({
          particleCount: 60,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#ccff00', '#10b981']
        });
      } else {
        console.error('Submission failed:', json);
        setSubmitState('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitState('error');
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-zinc-300 font-sans pt-32 pb-24 bg-noise">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Copy and Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-12 text-left"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00]">
                <Mail className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Contact Us</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-white leading-none">
                Let's <span className="text-[#ccff00]">Connect</span>
              </h1>
              
              <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-md">
                Whether you're looking for high-performance track-pacing software, latency test customization, or escrow broker dev connections, our team is standing by.
              </p>
            </div>

            {/* Email Contact Card */}
            <div className="p-6 rounded-2xl bg-zinc-950/60 border border-white/5 flex items-center gap-5 hover:border-[#ccff00]/30 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#ccff00]" />
              </div>
              <div>
                <h3 className="text-xs uppercase font-extrabold text-white tracking-wider mb-1">Email Us Directly</h3>
                <a 
                  href="mailto:contact@hypefuze.com" 
                  onClick={() => SoundManager.playClick()}
                  className="text-sm font-mono text-zinc-400 hover:text-[#ccff00] transition-colors"
                >
                  contact@hypefuze.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Web3Forms Contact Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 w-full relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(204,255,0,0.03)_0%,_transparent_75%)] pointer-events-none" />
            
            <CursorGlowCard
              className="p-8 md:p-12 border-zinc-900 bg-zinc-950/80"
              glowColor="rgba(204, 255, 0, 0.04)"
              borderColor="rgba(204, 255, 0, 0.25)"
              tilt={false}
            >
              <form onSubmit={handleFormSubmit} className="space-y-6 relative overflow-hidden text-left">
                
                {/* Bot check honeypot */}
                <input 
                  type="checkbox" 
                  name="botcheck" 
                  className="hidden" 
                  style={{ display: 'none' }} 
                  checked={botcheck} 
                  onChange={e => setBotcheck(e.target.checked)} 
                />

                {/* Success Screen Overlay */}
                <AnimatePresence>
                  {submitState === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 bg-zinc-950 flex flex-col items-center justify-center text-center p-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Message Dispatched</h3>
                      <p className="text-zinc-500 text-xs sm:text-sm font-light max-w-xs leading-relaxed">
                        We have logged your transmission. Our brokerage team will follow up within 12 hours.
                      </p>
                      <button
                        onClick={() => {
                          SoundManager.playClick();
                          setSubmitState('idle');
                        }}
                        className="mt-6 px-6 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider rounded-xl hover:text-white transition-all"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Screen Overlay */}
                <AnimatePresence>
                  {submitState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 bg-zinc-950 flex flex-col items-center justify-center text-center p-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Transmission Fail</h3>
                      <p className="text-zinc-500 text-xs sm:text-sm font-light max-w-xs leading-relaxed">
                        An error occurred while connecting to the submission node. Please try again.
                      </p>
                      <button
                        onClick={() => {
                          SoundManager.playClick();
                          setSubmitState('idle');
                        }}
                        className="mt-6 px-6 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider rounded-xl hover:text-white transition-all"
                      >
                        Retry Submission
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name Input Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="w-full bg-black/60 border border-zinc-800/80 focus:border-[#ccff00]/50 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ccff00]/30 transition-all placeholder-zinc-700"
                    placeholder="e.g. John Doe"
                  />
                </div>

                {/* Contact Info Field */}
                <div className="space-y-2">
                  <label htmlFor="contact" className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact"
                    required
                    value={formData.contact}
                    onChange={e => handleInputChange('contact', e.target.value)}
                    className="w-full bg-black/60 border border-zinc-800/80 focus:border-[#ccff00]/50 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ccff00]/30 transition-all placeholder-zinc-700"
                    placeholder="e.g. john@company.com"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => handleInputChange('message', e.target.value)}
                    className="w-full bg-black/60 border border-zinc-800/80 focus:border-[#ccff00]/50 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#ccff00]/30 transition-all resize-none placeholder-zinc-700"
                    placeholder="Specify project details, athletic coaching inquiry, or game suggestions..."
                  />
                </div>

                {/* Action Submit Button */}
                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="w-full py-4 bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-[#b3e600] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(204,255,0,0.1)] cursor-pointer"
                >
                  {submitState === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sending Transmission...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Message</span>
                    </>
                  )}
                </button>

              </form>
            </CursorGlowCard>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};
