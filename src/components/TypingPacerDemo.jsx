import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, RotateCcw, Activity } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export const TypingPacerDemo = () => {
  const targetText = "Pace yourself to perfection. Build muscle memory and velocity.";
  const [inputVal, setInputVal] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (isFinished) return;

    // Trigger hover sound as a clicky typing feedback!
    SoundManager.playHover();

    if (!isStarted) {
      setIsStarted(true);
      setStartTime(performance.now());
    }

    setInputVal(value);

    // Calculate accuracy
    let errors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== targetText[i]) {
        errors++;
      }
    }
    const currentAccuracy = value.length > 0 ? Math.round(((value.length - errors) / value.length) * 100) : 100;
    setAccuracy(currentAccuracy);

    // Check if finished
    if (value.length >= targetText.length) {
      setIsFinished(true);
      SoundManager.playNotification();
    }
  };

  // Real-time WPM tracker loop
  useEffect(() => {
    if (!isStarted || isFinished || !startTime) return;

    const interval = setInterval(() => {
      const timeElapsedSec = (performance.now() - startTime) / 1000;
      if (timeElapsedSec > 0.5) {
        // Standard WPM: (characters / 5) / minutes
        const words = inputVal.length / 5;
        const minutes = timeElapsedSec / 60;
        setWpm(Math.round(words / minutes));
      }
    }, 250);

    return () => clearInterval(interval);
  }, [isStarted, isFinished, startTime, inputVal]);

  const resetTest = (e) => {
    if (e) e.stopPropagation();
    SoundManager.playClick();
    setInputVal("");
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
  };

  const handleCardClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="w-full h-full min-h-[220px] flex flex-col justify-between cursor-text p-1 select-none"
    >
      {/* Metrics Header */}
      <div className="flex justify-between items-center bg-zinc-900/50 px-3 py-2 rounded-xl border border-zinc-800/40 mb-3 shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span>Live Pacer</span>
        </div>
        
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">WPM:</span>
            <span className="text-orange-400 font-black tabular-nums">{wpm}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">ACC:</span>
            <span className={`font-black tabular-nums ${accuracy < 90 ? 'text-red-400' : 'text-emerald-400'}`}>
              {accuracy}%
            </span>
          </div>
        </div>
      </div>

      {/* Typing visualizer */}
      <div className="flex-1 flex flex-col justify-center mb-3">
        <div className="font-mono text-[11px] leading-relaxed text-left p-3 bg-black/40 rounded-xl border border-white/5 min-h-[68px]">
          {targetText.split("").map((char, index) => {
            let color = "text-zinc-600";
            if (index < inputVal.length) {
              color = inputVal[index] === char ? "text-orange-400 font-bold" : "text-red-400 bg-red-500/10 font-bold";
            }
            return (
              <span key={index} className={`${color} transition-colors duration-100`}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Hidden Text Input & Reset Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={handleInputChange}
          className="flex-1 bg-zinc-950/90 border border-zinc-800 focus:border-orange-500/50 rounded-xl px-3 py-2 text-[11px] text-white focus:outline-none placeholder-zinc-700 transition-colors"
          placeholder="Click here and start typing..."
          disabled={isFinished}
        />
        
        <button
          onClick={resetTest}
          className="p-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-orange-400 rounded-xl transition-all active:scale-95 shrink-0"
          aria-label="Reset test"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Completion Overlay */}
      <AnimatePresence>
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-20 bg-zinc-950/95 flex flex-col items-center justify-center text-center p-4 rounded-3xl"
          >
            <Keyboard className="w-8 h-8 text-orange-400 mb-2 animate-bounce" />
            <h5 className="text-white font-black text-sm">Pacing Completed!</h5>
            <div className="flex gap-4 my-2.5 font-mono text-xs">
              <div>
                <span className="text-zinc-500">Speed: </span>
                <span className="text-orange-400 font-black">{wpm} WPM</span>
              </div>
              <div>
                <span className="text-zinc-500">Accuracy: </span>
                <span className="text-emerald-400 font-black">{accuracy}%</span>
              </div>
            </div>
            <button
              onClick={resetTest}
              className="px-4 py-1.5 bg-orange-500 text-black font-black text-xs rounded-xl hover:bg-orange-400 transition-all hover:scale-105"
            >
              Reset Test
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
