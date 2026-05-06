(function() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioCtx;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  window.SoundFX = {
    playPop: function() {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    },

    playClick: function() {
      initAudio();
      
      // High pitch pop component
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.15);
      // Overdrive the gain to 5.0 (500%) for maximum possible loudness
      gain1.gain.setValueAtTime(5.0, audioCtx.currentTime); 
      gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.15);

      // Chunky low thud component
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.15);
      // Overdrive the gain to 5.0 (500%) for maximum possible loudness
      gain2.gain.setValueAtTime(5.0, audioCtx.currentTime); 
      gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start();
      osc2.stop(audioCtx.currentTime + 0.15);
    },

    playTick: function() {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.02);
    },

    playWoosh: function() {
      initAudio();
      const bufferSize = audioCtx.sampleRate * 0.5;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.2);
      filter.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.5);

      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.2);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      noise.start();
      noise.stop(audioCtx.currentTime + 0.5);
    },

    playSnap: function() {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    },
    
    playSuccess: function() {
      initAudio();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc1.type = 'sine';
      osc2.type = 'triangle';
      
      const now = audioCtx.currentTime;
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.setValueAtTime(659.25, now + 0.1);
      osc1.frequency.setValueAtTime(783.99, now + 0.2);
      osc1.frequency.setValueAtTime(1046.50, now + 0.3);
      
      osc2.frequency.setValueAtTime(261.63, now);
      osc2.frequency.setValueAtTime(329.63, now + 0.1);
      osc2.frequency.setValueAtTime(392.00, now + 0.2);
      osc2.frequency.setValueAtTime(523.25, now + 0.3);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
      gainNode.gain.setValueAtTime(0.1, now + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
    },

    playSlip: function() {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    },

    playBounce: function() {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    },

    playAlarm: function() {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'square';
      
      const now = audioCtx.currentTime;
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.setValueAtTime(1000, now + 0.2);
      osc.frequency.setValueAtTime(800, now + 0.4);
      osc.frequency.setValueAtTime(1000, now + 0.6);

      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.setValueAtTime(0.05, now + 0.8);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.9);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.9);
    },
    playShiver: function() {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sawtooth';
      
      const now = audioCtx.currentTime;
      for (let i = 0; i < 15; i++) {
         osc.frequency.setValueAtTime(300 + (i%2)*100, now + i*0.05);
         gainNode.gain.setValueAtTime(0.05, now + i*0.05);
         gainNode.gain.setValueAtTime(0, now + i*0.05 + 0.02);
      }
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 15*0.05);
    },

    playPour: function() {
      initAudio();
      const bufferSize = audioCtx.sampleRate * 0.8;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      
      const now = audioCtx.currentTime;
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.6); // pitch goes up as it fills
      
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.8);

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      noise.start(now);
      noise.stop(now + 0.8);
    }
  };

  // Auto-instrument UI elements
  document.addEventListener('DOMContentLoaded', () => {
      // Initial interaction to unlock audio
      document.body.addEventListener('mousedown', initAudio, { once: true });
      document.body.addEventListener('touchstart', initAudio, { once: true });

      // Add big satisfying click sounds globally to anything clickable!
      // We use 'click' instead of 'mousedown' here so we can intercept link navigation
      document.body.addEventListener('click', (e) => {
          const target = e.target.closest('button, a, .btn, .notebook-btn, [role="button"]');
          if (target) {
              if (window.SoundFX) SoundFX.playClick();
              
              // If it's a normal link, delay navigation slightly so the sound actually finishes!
              if (target.tagName.toLowerCase() === 'a' && target.href && !target.target && !target.href.startsWith('javascript:')) {
                  e.preventDefault();
                  setTimeout(() => {
                      window.location.href = target.href;
                  }, 150);
              }
          }
      });

      // Add tick sound to sliders (throttle it)
      document.querySelectorAll('input[type="range"]').forEach(slider => {
          let lastTick = 0;
          slider.addEventListener('input', () => {
              const now = Date.now();
              if (now - lastTick > 50) { // Max 20 ticks per second
                  SoundFX.playTick();
                  lastTick = now;
              }
          });
      });
  });
})();
