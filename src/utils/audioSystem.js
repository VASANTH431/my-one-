// Romantic Audio Engine using Web Audio API + Custom Audio Support
// Generates gentle romantic ambient piano/strings melody and realistic sound effects

let audioCtx = null;
let bgMusicGain = null;
let bgMusicInterval = null;
let isMusicPlaying = false;
let customAudioElement = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle synth note helper
function playChimeNote(freq, time, duration = 1.2, gainValue = 0.15, type = 'sine') {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, time);

  // Soft envelope
  gain.gain.setValueAtTime(0.001, time);
  gain.gain.exponentialRampToValueAtTime(gainValue, time + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(time);
  osc.stop(time + duration + 0.05);
}

// Sound Effects
export const soundEffects = {
  // Arrow release whoosh
  playWhoosh() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.12);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.28);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.28);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  },

  // Heart hit impact
  playHeartHit() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Deep resonant heart thud
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(140, now);
      bassOsc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

      bassGain.gain.setValueAtTime(0.35, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 0.38);

      // Glass shimmer crack
      [587.33, 880, 1174.66].forEach((f, i) => {
        playChimeNote(f, now + 0.02 * i, 0.4, 0.12, 'triangle');
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  },

  // Heart shatter magic chimes
  playHeartShatter() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Ascending crystal arpeggio (C major 9th / F# ethereal)
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        playChimeNote(freq, now + idx * 0.08, 1.8, 0.18, 'sine');
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  },

  // Growing tree magical sparkles
  playTreeSprout() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const pentatonic = [392.00, 440.00, 523.25, 659.25, 783.99, 880.00, 1046.50];
      pentatonic.forEach((freq, idx) => {
        playChimeNote(freq, now + idx * 0.1, 1.5, 0.15, 'sine');
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  },

  // Wax seal crack & letter unfold
  playSealCrack() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Tactile click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.12);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);

      // Sweet bell
      playChimeNote(880, now + 0.08, 1.2, 0.15, 'sine');
    } catch (e) {
      console.warn("Audio error:", e);
    }
  },

  // Make a wish / candle blow
  playCandleBlow() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Soft breath noise
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.Q.value = 3.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.55);

      // Sparkle cascade
      [659.25, 783.99, 987.77, 1318.51, 1567.98].forEach((freq, idx) => {
        playChimeNote(freq, now + 0.35 + idx * 0.1, 1.8, 0.14, 'sine');
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  },

  // Final surprise fanfare
  playFanfare() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const chords = [
        [523.25, 659.25, 783.99],       // C
        [587.33, 739.99, 880.00],       // D
        [659.25, 830.61, 987.77],       // E
        [783.99, 987.77, 1174.66, 1567.98] // G chord with high sparkle
      ];

      chords.forEach((chord, cIdx) => {
        const chordTime = now + cIdx * 0.35;
        chord.forEach(freq => {
          playChimeNote(freq, chordTime, 1.6, 0.12, 'sine');
        });
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }
};

// Procedural Romantic Ambient Soundtrack
// Plays a warm, soothing, looping romantic chord progression with soft piano chime voicing
export const musicPlayer = {
  isPlaying() {
    return isMusicPlaying;
  },

  start(volume = 0.5, customUrl = null) {
    if (isMusicPlaying) return;

    if (customUrl) {
      if (!customAudioElement) {
        customAudioElement = new Audio(customUrl);
        customAudioElement.loop = true;
      } else {
        customAudioElement.src = customUrl;
      }
      customAudioElement.volume = volume;
      customAudioElement.play().catch(e => console.log("User autoplay blocked:", e));
      isMusicPlaying = true;
      return;
    }

    // Procedural ambient romantic music
    const ctx = getAudioContext();
    if (!ctx) return;

    isMusicPlaying = true;
    bgMusicGain = ctx.createGain();
    bgMusicGain.gain.setValueAtTime(volume * 0.35, ctx.currentTime);
    bgMusicGain.connect(ctx.destination);

    // Warm romantic progression in F / D minor:
    // Fmaj7 -> Dm9 -> Bbmaj7 -> C9sus
    const progressions = [
      // Chord 1: Fmaj7 (F3, C4, E4, A4)
      [174.61, 261.63, 329.63, 440.00],
      // Chord 2: Dm9 (D3, A3, F4, C5)
      [146.83, 220.00, 349.23, 523.25],
      // Chord 3: Bbmaj7 (Bb2, F3, D4, A4)
      [116.54, 174.61, 293.66, 440.00],
      // Chord 4: C9sus / Csus4 (C3, G3, D4, F4, G4)
      [130.81, 196.00, 293.66, 349.23, 392.00]
    ];

    let chordIndex = 0;

    const playNextChord = () => {
      if (!isMusicPlaying) return;
      const now = ctx.currentTime;
      const chord = progressions[chordIndex % progressions.length];

      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Warm sine + soft triangle blend
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        // Soft slow piano-like bloom and decay
        const noteTime = now + i * 0.12;
        noteGain.gain.setValueAtTime(0.0001, noteTime);
        noteGain.gain.linearRampToValueAtTime(0.18, noteTime + 0.4);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 3.8);

        osc.connect(noteGain);
        noteGain.connect(bgMusicGain);

        osc.start(noteTime);
        osc.stop(noteTime + 4.0);
      });

      // Occasional high sparkle note
      const melodyNotes = [659.25, 783.99, 880.00, 1046.50, 880.00];
      const melodyFreq = melodyNotes[chordIndex % melodyNotes.length];
      const melodyTime = now + 1.2;

      const melOsc = ctx.createOscillator();
      const melGain = ctx.createGain();
      melOsc.type = 'sine';
      melOsc.frequency.setValueAtTime(melodyFreq, melodyTime);

      melGain.gain.setValueAtTime(0.001, melodyTime);
      melGain.gain.linearRampToValueAtTime(0.1, melodyTime + 0.15);
      melGain.gain.exponentialRampToValueAtTime(0.001, melodyTime + 2.5);

      melOsc.connect(melGain);
      melGain.connect(bgMusicGain);
      melOsc.start(melodyTime);
      melOsc.stop(melodyTime + 2.6);

      chordIndex++;
    };

    playNextChord();
    bgMusicInterval = setInterval(playNextChord, 4000);
  },

  setVolume(vol) {
    if (customAudioElement) {
      customAudioElement.volume = Math.max(0, Math.min(1, vol));
    }
    if (bgMusicGain && audioCtx) {
      bgMusicGain.gain.setValueAtTime(vol * 0.35, audioCtx.currentTime);
    }
  },

  stop() {
    isMusicPlaying = false;
    if (bgMusicInterval) {
      clearInterval(bgMusicInterval);
      bgMusicInterval = null;
    }
    if (customAudioElement) {
      customAudioElement.pause();
    }
  }
};
