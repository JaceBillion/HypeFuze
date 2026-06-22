import React from 'react';
import { Shield, Eye, Lock, Globe } from 'lucide-react';
import { CursorGlowCard } from '../components/CursorGlowCard';

export const Privacy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      icon: Eye,
      text: 'HypeFuze LLC ("we," "us," or "our") collects information to provide better services to all our users. We collect personal details that you provide via our contact forms (such as your name and email address) as well as analytical variables reflecting how you interact with our applications and gaming services.'
    },
    {
      title: '2. How We Use Information',
      icon: Globe,
      text: 'We use the information we collect to operate, manage, and scale our applications and brokerage platforms. This includes analyzing site usage to debug system latency, sending product updates or responses to inquiry messages, and defending HypeFuze and our users against security vulnerabilities.'
    },
    {
      title: '3. Information Security',
      icon: Lock,
      text: 'We work hard to protect HypeFuze and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We restrict access to personal data to HypeFuze employees, contractors, and agents who require that information in order to operate and develop our platforms.'
    },
    {
      title: '4. Cooperation & Compliance',
      icon: Shield,
      text: 'We regularly audit our compliance with our Privacy Policy. When we receive formal written complaints, we contact the person who made the complaint to follow up. We cooperate with appropriate regulatory authorities, including local data protection bodies, to resolve any complaints regarding the transfer of personal data.'
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
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Legal</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white mb-4">
            Privacy <span className="text-[#ccff00]">Policy</span>
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
              If you have any questions about this Privacy Policy, please contact us at contact@hypefuze.com.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
