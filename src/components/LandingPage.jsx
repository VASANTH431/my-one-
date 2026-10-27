import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { soundEffects } from '../utils/audioSystem';

export default function LandingPage({ onEnter, girlfriendName = "Kavya", config }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterClick = () => {
    setIsTransitioning(true);
    soundEffects.playHeartHit();
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden select-none">
      
      {/* Cinematic Ambient Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-[#8C503A]/25 via-[#B76E79]/30 to-[#E5C158]/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#66101F]/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#C2846F]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating 3D Heart Centerpiece */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        
        {/* Heart Container with Gentle Float & Pulsing Aura */}
        <div className="relative mb-8 cursor-pointer group" onClick={handleEnterClick}>
          {/* Glowing Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B76E79] via-[#E8C5C8] to-[#E5C158] opacity-60 blur-2xl animate-pulse-aura transform scale-125" />
          
          {/* Orbiting Sparkles */}
          <div className="absolute -top-3 -right-2 text-[#F3E5AB] animate-bounce">
            <Sparkles className="w-6 h-6 drop-shadow-[0_0_8px_rgba(243,229,171,0.8)]" />
          </div>
          <div className="absolute -bottom-2 -left-3 text-[#FFD1DC] animate-pulse">
            <Heart className="w-5 h-5 fill-[#FFD1DC]" />
          </div>
          <div className="absolute top-1/2 -left-6 text-[#E8C5C8]/80 text-xs font-serif-luxury italic animate-float-gentle">
            ✨ for you
          </div>

          {/* 3D Glassmorphic Heart */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center animate-float-gentle transition-transform duration-500 group-hover:scale-110">
            <svg
              viewBox="0 0 100 90"
              className="w-full h-full drop-shadow-[0_15px_30px_rgba(183,110,121,0.6)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="heartGradient" x1="10%" y1="0%" x2="90%" y2="100%">
                  <stop offset="0%" stopColor="#FFD1DC" />
                  <stop offset="35%" stopColor="#B76E79" />
                  <stop offset="75%" stopColor="#8C503A" />
                  <stop offset="100%" stopColor="#4A0E17" />
                </linearGradient>
                <radialGradient id="highlightGlow" cx="35%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FAD2B8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#B76E79" stopOpacity="0" />
                </radialGradient>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Heart Body */}
              <path
                d="M50 82 C20 58, 2 40, 2 24 C2 10.5, 12.5 2, 26 2 C34.5 2, 44 7.5, 50 16 C56 7.5, 65.5 2, 74 2 C87.5 2, 98 10.5, 98 24 C98 40, 80 58, 50 82 Z"
                fill="url(#heartGradient)"
                stroke="#F3E5AB"
                strokeWidth="1.5"
                strokeOpacity="0.75"
              />

              {/* 3D Highlight Curvature */}
              <path
                d="M50 82 C20 58, 2 40, 2 24 C2 10.5, 12.5 2, 26 2 C34.5 2, 44 7.5, 50 16 C56 7.5, 65.5 2, 74 2 C87.5 2, 98 10.5, 98 24 C98 40, 80 58, 50 82 Z"
                fill="url(#highlightGlow)"
              />

              {/* Delicate Inner Glow Contour */}
              <path
                d="M26 8 C16 8, 8 15, 8 25 C8 38, 22 52, 48 72"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeOpacity="0.5"
              />
            </svg>

            {/* Centered Monogram / Love Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-cursive text-3xl sm:text-4xl text-[#FFFFFF] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                K
              </span>
            </div>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-4 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B76E79]/20 border border-[#E8C5C8]/30 text-xs font-sans-clean tracking-widest uppercase text-[#F3E5AB]">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            A Birthday Love Story
          </div>

          <h1 className="font-cursive text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide leading-[1.3] py-2 overflow-visible text-shimmer-rosegold drop-shadow-[0_4px_20px_rgba(183,110,121,0.5)]">
            {config?.landing?.title || `A Little Universe Made Just for You, ${girlfriendName} ❤️`}
          </h1>

          <p className="font-serif-luxury italic text-base sm:text-xl text-[#FAD2B8] max-w-xl mx-auto opacity-90 leading-relaxed font-light">
            "{config?.landing?.subtitle || 'Some surprises are too special to reveal all at once…'}"
          </p>
        </div>

        {/* Interactive Glowing "Enter My Heart" Button */}
        <div className="mt-10">
          <button
            onClick={handleEnterClick}
            disabled={isTransitioning}
            className={`group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full font-serif-luxury text-base sm:text-lg tracking-wider text-[#FFFFFF] bg-gradient-to-r from-[#8C503A] via-[#B76E79] to-[#8C503A] border border-[#E5C158]/60 shadow-[0_8px_30px_rgba(183,110,121,0.5)] hover:shadow-[0_12px_45px_rgba(229,193,88,0.65)] hover:border-[#F3E5AB] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden ${
              isTransitioning ? 'animate-pulse opacity-80' : ''
            }`}
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            <Heart className="w-5 h-5 text-[#F3E5AB] fill-[#F3E5AB] group-hover:scale-125 transition-transform duration-300" />
            <span className="relative z-10 font-medium">
              {config?.landing?.enterButtonText || "Enter My Heart"}
            </span>
            <ArrowRight className="w-5 h-5 text-[#F3E5AB] group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Romantic hint */}
        <p className="mt-6 text-xs text-[#E8C5C8]/60 font-sans-clean tracking-wider flex items-center justify-center gap-1.5">
          <span>Best experienced with sound on</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E5C158]/80 animate-ping" />
        </p>

      </div>

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-gradient-to-b from-[#B76E79]/30 to-[#4A0E17]/80 backdrop-blur-md flex items-center justify-center animate-fade-in">
          <div className="flex flex-col items-center gap-3 text-center">
            <Heart className="w-16 h-16 text-[#F3E5AB] fill-[#B76E79] animate-ping" />
            <span className="font-cursive text-3xl text-shimmer-gold">Opening my heart for you...</span>
          </div>
        </div>
      )}

    </div>
  );
}
