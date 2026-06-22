import React from 'react';
import { BookOpen, FileCheck, ShieldAlert, BadgeInfo, Scale } from 'lucide-react';
import { CursorGlowCard } from '../components/CursorGlowCard';

export const Terms = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      icon: FileCheck,
      text: 'By accessing or using HypeFuze.com, our tracking tools, our reaction speed platforms, or any sub-services we operate (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree, please cease using our platforms.'
    },
    {
      title: '2. Use of Services',
      icon: BadgeInfo,
      text: 'You agree to use our Services only for purposes permitted by these Terms and in compliance with local laws, regulations, and web standards. You are responsible for keeping any login or performance records secure and confidential.'
    },
    {
      title: '3. Intellectual Property',
      icon: Scale,
      text: 'All visual layouts, brand identities, custom software components, and code simulations on HypeFuze.com (including Elite400M and SplitStrategy systems) are the exclusive property of HypeFuze LLC and are protected by international trademark and copyright laws.'
    },
    {
      title: '4. Limitation of Liability',
      icon: ShieldAlert,
      text: 'HypeFuze LLC provides all services on an "as is" and "as available" basis. We will not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of or inability to access our gaming widgets, track pacing software, or brokerage networks.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-zinc-400 font-sans pt-32 pb-24 bg-noise">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Legal</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white mb-4">
            Terms of <span className="text-[#ccff00]">Service</span>
          </h1>
          
          <p className="text-xs font-mono text-zinc-550">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-6 text-left">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <CursorGlowCard
                key={idx}
                className="p-6 md:p-8 border-zinc-900 bg-zinc-950/60"
                glowColor="rgba(255, 255, 255, 0.02)"
                borderColor="rgba(255, 255, 255, 0.1)"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <Icon className="w-5 h-5 text-[#ccff00]" />
                  <h2 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                    {sec.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm font-light leading-relaxed text-zinc-400">
                  {sec.text}
                </p>
              </CursorGlowCard>
            );
          })}

          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-[11px] text-zinc-550 italic font-mono">
              If you have any questions about these Terms of Service, please contact us at contact@hypefuze.com.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
