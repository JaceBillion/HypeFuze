let audioCtx = null;
let isMuted = typeof window !== 'undefined' ? localStorage.getItem('hypefuze_sound') === 'false' : true;

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export const SoundManager = {
  isMuted: () => isMuted,
  
  toggleMute: () => {
    isMuted = !isMuted;
    localStorage.setItem('hypefuze_sound', (!isMuted).toString());
    return isMuted;
  },
  
  playClick: () => {
    if (isMuted) return;
    try {
      initAudioContext();
      const now = audioCtx.currentTime;
      
      // Create oscillator and gain nodes
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      
      // Premium hardware click: rapid sweep from 1100Hz to 400Hz in 40ms
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      
      // Gain envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  },

  playHover: () => {
    if (isMuted) return;
    try {
      initAudioContext();
      const now = audioCtx.currentTime;
      
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      
      // High-pitched, ultra-soft focal hover tick: 2000Hz to 1700Hz in 20ms
      osc.frequency.setValueAtTime(2000, now);
      osc.frequency.exponentialRampToValueAtTime(1700, now + 0.02);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.015, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.025);
    } catch (e) {
      // Quiet fail to avoid cluttering console on fast mouse movements
    }
  },
  
  playNotification: () => {
    if (isMuted) return;
    try {
      initAudioContext();
      const now = audioCtx.currentTime;
      
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc1.type = 'sine';
      osc2.type = 'sine';
      
      // Dual-tone chime: 880Hz (A5) and 1320Hz (E6)
      osc1.frequency.setValueAtTime(880, now);
      osc2.frequency.setValueAtTime(1320, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc1.start(now);
      osc2.start(now);
      
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }
};
