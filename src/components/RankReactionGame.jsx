import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SoundManager } from '../utils/SoundManager';
import { Zap, RotateCcw, Award } from 'lucide-react';

export const RankReactionGame = () => {
  const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, result, early
  const [reactionTime, setReactionTime] = useState(null);
  const [rank, setRank] = useState('');
  const [rankColor, setRankColor] = useState('');
  
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const getRank = (time) => {
    if (time < 180) return { name: 'GODLIKE', color: 'text-[#ccff00] drop-shadow-[0_0_12px_rgba(204,255,0,0.5)]', score: 'Legendary speed!' };
    if (time < 220) return { name: 'DIAMOND', color: 'text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]', score: 'Elite reflexes.' };
    if (time < 260) return { name: 'GOLD', color: 'text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]', score: 'Faster than average.' };
    if (time < 320) return { name: 'SILVER', color: 'text-zinc-300 drop-shadow-[0_0_8px_rgba(228,228,231,0.3)]', score: 'Solid reaction time.' };
    return { name: 'BRONZE', color: 'text-amber-700', score: 'Keep practicing!' };
  };

  const startTest = (e) => {
    e.stopPropagation();
    SoundManager.playClick();
    setGameState('waiting');
    setReactionTime(null);
    
    const randomDelay = Math.random() * 2000 + 1500; // 1.5s to 3.5s delay
    
    timerRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = performance.now();
    }, randomDelay);
  };

  const handleScreenClick = (e) => {
    e.stopPropagation();
    if (gameState === 'waiting') {
      clearTimeout(timerRef.current);
      setGameState('early');
      SoundManager.playClick();
    } else if (gameState === 'ready') {
      const endTime = performance.now();
      const diff = Math.round(endTime - startTimeRef.current);
      setReactionTime(diff);
      
      const r = getRank(diff);
      setRank(r.name);
      setRankColor(r.color);
      setGameState('result');
      SoundManager.playNotification();

      // Trigger premium confetti for top ranks!
      if (r.name === 'GODLIKE' || r.name === 'DIAMOND') {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#ccff00', '#10b981', '#06b6d4']
        });
      }
    }
  };

  const resetGame = (e) => {
    e.stopPropagation();
    SoundManager.playClick();
    setGameState('idle');
    setReactionTime(null);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[220px] flex flex-col justify-between select-none">
      <AnimatePresence mode="wait">
        {gameState === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-4"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <h4 className="text-white font-bold text-sm mb-1">Rank Reaction Speed</h4>
            <p className="text-zinc-500 text-xs mb-4 max-w-[180px]">Test your reflexes against the server latency.</p>
            <button
              onClick={startTest}
              className="px-5 py-2 bg-cyan-500 text-black font-black text-xs rounded-xl hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
            >
              Start Reaction Test
            </button>
          </motion.div>
        )}

        {gameState === 'waiting' && (
          <motion.div 
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleScreenClick}
            className="flex-1 flex flex-col items-center justify-center text-center bg-red-950/20 border border-red-500/20 rounded-2xl cursor-pointer p-4"
          >
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping mb-3" />
            <span className="text-red-400 font-extrabold text-sm uppercase tracking-wider animate-pulse">
              WAIT FOR GREEN...
            </span>
            <span className="text-zinc-650 text-[10px] mt-2">Clicking early disqualifies score</span>
          </motion.div>
        )}

        {gameState === 'ready' && (
          <motion.div 
            key="ready"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleScreenClick}
            className="flex-1 flex flex-col items-center justify-center text-center bg-emerald-950/40 border border-emerald-400/50 rounded-2xl cursor-pointer p-4 shadow-[inset_0_0_30px_rgba(16,185,129,0.2)]"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-400 animate-pulse mb-3" />
            <span className="text-emerald-400 font-black text-xl tracking-wider animate-bounce">
              CLICK NOW!
            </span>
          </motion.div>
        )}

        {gameState === 'early' && (
          <motion.div 
            key="early"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center bg-zinc-900 rounded-2xl p-4"
          >
            <span className="text-amber-500 font-extrabold text-sm uppercase tracking-wider mb-2">
              TOO EARLY!
            </span>
            <p className="text-zinc-500 text-xs mb-4">You clicked before the screen turned green.</p>
            <button
              onClick={startTest}
              className="p-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors"
              aria-label="Retry test"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {gameState === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-4"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Award className="w-5 h-5 text-zinc-400" />
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">Result</span>
            </div>
            
            <span className="font-mono text-3xl font-black text-white mb-1 tabular-nums">
              {reactionTime}
              <span className="text-sm font-medium text-zinc-500 ml-0.5">ms</span>
            </span>

            <span className={`text-lg font-black tracking-widest ${rankColor} mb-1`}>
              {rank}
            </span>
            
            <span className="text-[10px] text-zinc-500 mb-4 italic">
              {getRank(reactionTime).score}
            </span>

            <div className="flex gap-2 justify-center">
              <button
                onClick={startTest}
                className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs rounded-xl hover:text-white hover:bg-zinc-800 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={resetGame}
                className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300 rounded-xl transition-all"
                aria-label="Close game"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
