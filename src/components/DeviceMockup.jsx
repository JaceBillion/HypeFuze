import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DeviceMockup = ({ type = 'elite' }) => {
  const [activeTab, setActiveTab] = useState('workout');
  
  // States for Elite400M Mock App
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [splits, setSplits] = useState([
    { label: '100m', time: '11.85s', diff: '-0.2s' },
    { label: '200m', time: '23.40s', diff: '-0.4s' },
    { label: '300m', time: '35.90s', diff: '-0.3s' },
  ]);

  // States for SplitStrategy Mock App
  const [selectedEvent, setSelectedEvent] = useState('400m');
  const [targetTime, setTargetTime] = useState('48.50s');
  const [splitPace, setSplitPace] = useState([
    { segment: '0-100m (Drive)', pace: '11.60s', effort: '95%' },
    { segment: '100-200m (Float)', pace: '11.20s', effort: '85%' },
    { segment: '200-300m (Pace)', pace: '11.80s', effort: '90%' },
    { segment: '300-400m (Kick)', pace: '13.90s', effort: '100%' },
  ]);

  // Elite400M stopwatch loop simulation
  useEffect(() => {
    if (type !== 'elite' || !isRunning) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev >= 44.82) {
          // Completed simulation, reset
          return 0;
        }
        return Number((prev + 0.08).toFixed(2));
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isRunning, type]);

  // Update SplitStrategy calculations on event change
  const handleEventChange = (evt) => {
    setSelectedEvent(evt);
    if (evt === '400m') {
      setTargetTime('48.50s');
      setSplitPace([
        { segment: '0-100m (Drive)', pace: '11.60s', effort: '95%' },
        { segment: '100-200m (Float)', pace: '11.20s', effort: '85%' },
        { segment: '200-300m (Pace)', pace: '11.80s', effort: '90%' },
        { segment: '300-400m (Kick)', pace: '13.90s', effort: '100%' },
      ]);
    } else if (evt === '800m') {
      setTargetTime('1:52.00');
      setSplitPace([
        { segment: '0-200m', pace: '26.80s', effort: '90%' },
        { segment: '200-400m', pace: '27.40s', effort: '80%' },
        { segment: '400-600m', pace: '28.50s', effort: '85%' },
        { segment: '600-800m', pace: '29.30s', effort: '95%' },
      ]);
    } else {
      setTargetTime('52.10s');
      setSplitPace([
        { segment: '0-100m', pace: '12.90s', effort: '90%' },
        { segment: '100-200m', pace: '12.40s', effort: '85%' },
        { segment: '200-300m', pace: '13.00s', effort: '90%' },
        { segment: '300-400m', pace: '13.80s', effort: '95%' },
      ]);
    }
  };

  return (
    <div className="relative mx-auto w-[240px] h-[480px] bg-zinc-950 rounded-[40px] p-2.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/10 select-none group-hover:scale-[1.03] transition-transform duration-500">
      {/* Outer steel edge */}
      <div className="absolute inset-0.5 rounded-[38px] border border-white/5 pointer-events-none" />
      
      {/* Dynamic Island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full ml-auto mr-3" />
      </div>

      {/* Internal screen canvas */}
      <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-black flex flex-col font-sans text-xs text-white">
        
        {/* Top App Header */}
        <div className="pt-7 px-4 pb-2 border-b border-white/5 bg-zinc-900/50 flex justify-between items-center">
          <span className="font-bold tracking-tight text-[10px] text-zinc-400">
            {type === 'elite' ? 'ELITE400M' : 'SPLIT STRATEGY'}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Dynamic App Screens */}
        <div className="flex-1 flex flex-col p-3 overflow-hidden">
          {type === 'elite' ? (
            /* ELITE400M APP SCREEN */
            <div className="flex-1 flex flex-col justify-between">
              {/* Timer visualization */}
              <div className="text-center py-4 bg-zinc-900/40 rounded-2xl border border-white/5">
                <span className="text-[10px] uppercase text-zinc-500 tracking-wider font-semibold block mb-1">
                  Active Sprint
                </span>
                <span className="font-mono text-3xl font-black text-amber-500 tabular-nums">
                  {timer.toFixed(2)}
                  <span className="text-sm font-medium text-zinc-400 ml-0.5">s</span>
                </span>
              </div>

              {/* Lap Splits list */}
              <div className="my-3 space-y-1.5">
                <span className="text-[9px] uppercase text-zinc-500 font-bold tracking-wider">
                  Lap Splits
                </span>
                {splits.map((s, idx) => (
                  <div 
                    key={idx}
                    className="flex justify-between items-center px-2.5 py-2 bg-zinc-900/60 rounded-xl border border-zinc-800/40"
                  >
                    <span className="font-semibold text-zinc-400">{s.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-white">{s.time}</span>
                      <span className="text-[9px] text-emerald-400 font-mono">{s.diff}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Controls */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex-1 py-2 rounded-xl font-bold transition-all text-[11px] ${
                    isRunning 
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                  }`}
                >
                  {isRunning ? 'Pause Coach' : 'Resume Coach'}
                </button>
              </div>
            </div>
          ) : (
            /* SPLITSTRATEGY APP SCREEN */
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              {/* Selector Event */}
              <div className="flex justify-around bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-800/50 mb-3 shrink-0">
                {['400m', '800m', '400mH'].map((evt) => (
                  <button
                    key={evt}
                    onClick={() => handleEventChange(evt)}
                    className={`px-3 py-1 rounded-lg text-[9px] font-bold transition-all ${
                      selectedEvent === evt 
                        ? 'bg-emerald-500 text-black shadow-md' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {evt}
                  </button>
                ))}
              </div>

              {/* Target Split Output */}
              <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-3 text-center mb-3 shrink-0">
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1">
                  Race Objective
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {targetTime}
                </span>
              </div>

              {/* Split strategy schedule list */}
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5 custom-scrollbar">
                {splitPace.map((sp, idx) => (
                  <div 
                    key={idx}
                    className="flex justify-between items-center p-2 bg-zinc-900/60 rounded-xl border border-zinc-800/30"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-white text-[10px]">{sp.segment}</span>
                      <span className="text-[8px] text-zinc-500">Effort: {sp.effort}</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">{sp.pace}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar indicator */}
        <div className="py-2.5 flex items-center justify-center bg-black/40">
          <div className="w-16 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};
