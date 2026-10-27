import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Heart, Settings, Sparkles, RotateCcw } from 'lucide-react';
import { musicPlayer } from '../utils/audioSystem';

export default function Navbar({
  currentStage,
  setStage,
  isMusicPlaying,
  setIsMusicPlaying,
  volume,
  setVolume,
  heartRainActive,
  setHeartRainActive,
  onOpenSettings,
  girlfriendName = "Kavya"
}) {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      musicPlayer.stop();
      setIsMusicPlaying(false);
    } else {
      musicPlayer.start(volume);
      setIsMusicPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    musicPlayer.setVolume(newVol);
    if (!isMusicPlaying && newVol > 0) {
      musicPlayer.start(newVol);
      setIsMusicPlaying(true);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Title Pill */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#240C13]/80 backdrop-blur-md border border-[#E8C5C8]/30 shadow-[0_4px_20px_rgba(74,14,23,0.4)]">
          <Heart className="w-4 h-4 text-[#B76E79] fill-[#B76E79] animate-pulse" />
          <span className="font-serif-luxury text-sm tracking-wider text-[#F3E5AB]">
            For {girlfriendName}
          </span>
          {currentStage === 'main' && (
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-[#E8C5C8]/70 border-l border-[#E8C5C8]/30 pl-2">
              26 December
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">

          {/* Quick Stage Jump / Replay (Only if in main stage) */}
          {currentStage === 'main' && (
            <button
              onClick={() => setStage('challenge')}
              title="Replay Heart Challenge"
              className="p-2 rounded-full bg-[#240C13]/80 backdrop-blur-md border border-[#E8C5C8]/30 text-[#E8C5C8] hover:text-[#F3E5AB] hover:border-[#E5C158] transition-all shadow-sm group"
            >
              <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-45" />
            </button>
          )}

          {/* Heart Rain Toggle */}
          <button
            onClick={() => setHeartRainActive(!heartRainActive)}
            title={heartRainActive ? "Pause Falling Hearts" : "Resume Falling Hearts"}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              heartRainActive
                ? 'bg-[#B76E79]/30 border-[#B76E79] text-[#F3E5AB]'
                : 'bg-[#240C13]/80 border-[#E8C5C8]/30 text-[#E8C5C8]/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Music Controller */}
          <div 
            className="relative flex items-center"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              onClick={toggleMusic}
              title={isMusicPlaying ? "Pause Romantic Music" : "Play Romantic Music"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all ${
                isMusicPlaying
                  ? 'bg-[#B76E79]/30 border-[#E5C158]/60 text-[#F3E5AB] shadow-[0_0_15px_rgba(229,193,88,0.3)]'
                  : 'bg-[#240C13]/80 border-[#E8C5C8]/30 text-[#E8C5C8]'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? 'animate-bounce text-[#E5C158]' : ''}`} />
              <span className="text-xs font-sans-clean hidden sm:inline">
                {isMusicPlaying ? 'Music Playing' : 'Play Music'}
              </span>
              {isMusicPlaying ? (
                <Volume2 className="w-3.5 h-3.5 text-[#E5C158]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
              )}
            </button>

            {/* Volume Popover */}
            {showVolumeSlider && (
              <div className="absolute right-0 top-full mt-2 p-3 rounded-2xl bg-[#240C13]/95 backdrop-blur-xl border border-[#E8C5C8]/30 shadow-2xl flex flex-col items-center gap-2 z-50">
                <span className="text-[10px] text-[#E8C5C8] font-sans-clean tracking-wider">
                  VOLUME ({Math.round(volume * 100)}%)
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-[#B76E79] cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
