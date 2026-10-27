import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight, RotateCcw, Volume2, ShieldAlert } from 'lucide-react';
import { soundEffects } from '../utils/audioSystem';
import confetti from 'canvas-confetti';

// Hugging Hearts Animation Component (Cute romantic embrace with floating hearts and sparkles)
function HuggingHearts() {
  return (
    <div className="relative w-64 h-56 sm:w-72 sm:h-64 flex items-center justify-center filter drop-shadow-[0_15px_35px_rgba(255,182,193,0.4)]">
      <svg
        viewBox="0 0 240 200"
        className="w-full h-full overflow-visible"
        fill="none"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="hugAura" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#FFB6C1" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#E5C158" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#B76E79" stopOpacity="0" />
          </radialGradient>

          {/* Left Heart (Lover / Warm Crimson Rose) */}
          <linearGradient id="heartLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F3" />
            <stop offset="25%" stopColor="#FF6B8B" />
            <stop offset="70%" stopColor="#C24153" />
            <stop offset="100%" stopColor="#831826" />
          </linearGradient>

          {/* Right Heart (Kavya / Soft Peach Blush Pink) */}
          <linearGradient id="heartRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FFCCD5" />
            <stop offset="60%" stopColor="#FF85A1" />
            <stop offset="100%" stopColor="#D43F62" />
          </linearGradient>

          {/* Soft Shadow */}
          <filter id="hugSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#4A0E17" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Soft Glowing Background Aura */}
        <ellipse cx="120" cy="115" rx="80" ry="55" fill="url(#hugAura)" />

        {/* Sparkles around */}
        <g className="animate-sparkle-1">
          <path d="M 65 57 L 67 63 L 73 65 L 67 67 L 65 73 L 63 67 L 57 65 L 63 63 Z" fill="#F3E5AB" />
        </g>
        <g className="animate-sparkle-2">
          <path d="M 175 52 L 177 58 L 183 60 L 177 62 L 175 68 L 173 62 L 167 60 L 173 58 Z" fill="#FFE899" />
        </g>

        {/* Floating Love Hearts Drifting Up */}
        <g className="animate-float-h1">
          <path
            d="M 118 48 C 114 43 107 44 107 49 C 107 55 118 63 118 63 C 118 63 129 55 129 49 C 129 44 122 43 118 48 Z"
            fill="#FF4D6D"
            stroke="#FFF"
            strokeWidth="0.8"
          />
        </g>
        <g className="animate-float-h2">
          <path
            d="M 132 54 C 129 50 123 51 123 55 C 123 60 132 66 132 66 C 132 66 141 60 141 55 C 141 51 135 50 132 54 Z"
            fill="#E5C158"
            stroke="#FFF"
            strokeWidth="0.8"
          />
        </g>
        <g className="animate-float-h3">
          <path
            d="M 108 58 C 105 54 100 55 100 58 C 100 63 108 68 108 68 C 108 68 116 63 116 58 C 116 55 111 54 108 58 Z"
            fill="#FF85A1"
            stroke="#FFF"
            strokeWidth="0.8"
          />
        </g>

        {/* Left Heart (Lover) */}
        <g className="animate-hug-left" filter="url(#hugSoftShadow)">
          {/* Heart Shape (Center ~ 92, 115) */}
          <path
            d="M 92 152 C 65 132 48 116 48 102 C 48 90 57 82 69 82 C 77 82 85 86 92 93 C 99 86 107 82 115 82 C 127 82 136 90 136 102 C 136 116 119 132 92 152 Z"
            fill="url(#heartLeftGrad)"
            stroke="#E5C158"
            strokeWidth="1.6"
          />
          {/* 3D highlight gloss */}
          <path
            d="M 69 85 C 60 85 53 91 53 100 C 53 105 56 111 62 118 C 60 112 58 105 58 100 C 58 92 63 87 70 87 C 74 87 78 89 82 93 C 78 88 74 85 69 85 Z"
            fill="#FFFFFF"
            opacity="0.45"
          />

          {/* Cute Smiling Eyes (Left Heart) */}
          <path d="M 72 105 Q 77 98 82 105" stroke="#3A0813" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 90 105 Q 95 98 100 105" stroke="#3A0813" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Rosy Blushing Cheeks */}
          <circle cx="71" cy="112" r="5" fill="#FF1E56" opacity="0.45" />
          <circle cx="101" cy="112" r="5" fill="#FF1E56" opacity="0.45" />
          {/* Sweet Smile */}
          <path d="M 83 113 Q 86 117 89 113" stroke="#3A0813" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* Right Heart (Kavya) */}
        <g className="animate-hug-right" filter="url(#hugSoftShadow)">
          {/* Heart Shape (Center ~ 145, 118) */}
          <path
            d="M 145 152 C 120 134 105 119 105 106 C 105 95 113 88 124 88 C 131 88 138 92 145 98 C 152 92 159 88 166 88 C 177 88 185 95 185 106 C 185 119 170 134 145 152 Z"
            fill="url(#heartRightGrad)"
            stroke="#F3E5AB"
            strokeWidth="1.6"
          />
          {/* 3D highlight gloss */}
          <path
            d="M 166 91 C 174 91 180 96 180 104 C 180 109 177 115 172 121 C 174 116 176 110 176 105 C 176 98 171 93 165 93 C 161 93 158 95 155 98 C 158 94 162 91 166 91 Z"
            fill="#FFFFFF"
            opacity="0.55"
          />

          {/* Cute Flower Hairpin on Kavya's Heart */}
          <g transform="translate(168, 86) scale(0.9)">
            <circle cx="-5" cy="0" r="3.5" fill="#FFF" opacity="0.95" />
            <circle cx="5" cy="0" r="3.5" fill="#FFF" opacity="0.95" />
            <circle cx="0" cy="-5" r="3.5" fill="#FFF" opacity="0.95" />
            <circle cx="0" cy="5" r="3.5" fill="#FFF" opacity="0.95" />
            <circle cx="0" cy="0" r="3" fill="#E5C158" />
          </g>

          {/* Cute Smiling Eyes (Kavya) */}
          <path d="M 132 109 Q 137 102 142 109" stroke="#3A0813" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 149 109 Q 154 102 159 109" stroke="#3A0813" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Eyelashes for Kavya */}
          <path d="M 141 104 L 144 101" stroke="#3A0813" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 158 104 L 161 101" stroke="#3A0813" strokeWidth="1.5" strokeLinecap="round" />
          {/* Rosy Blushing Cheeks */}
          <circle cx="130" cy="116" r="5" fill="#FF1E56" opacity="0.5" />
          <circle cx="161" cy="116" r="5" fill="#FF1E56" opacity="0.5" />
          {/* Sweet Smile */}
          <path d="M 143 117 Q 146 121 149 117" stroke="#3A0813" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* Hugging Arms in Front (Warm, Cozy Embrace) */}
        {/* Left Heart's Arm Wrapping around Right Heart */}
        <g className="animate-hug-left">
          <path
            d="M 76 118 C 76 130 96 138 126 134 C 136 132 142 127 141 122 C 140 117 132 118 124 122 C 104 127 86 123 83 116 Z"
            fill="url(#heartLeftGrad)"
            stroke="#E5C158"
            strokeWidth="1.2"
          />
          <ellipse
            cx="134"
            cy="124"
            rx="4.5"
            ry="3.5"
            fill="#FF6B8B"
            stroke="#E5C158"
            strokeWidth="1"
            transform="rotate(-15 134 124)"
          />
        </g>

        {/* Right Heart's Arm Wrapping around Left Heart */}
        <g className="animate-hug-right">
          <path
            d="M 158 120 C 154 130 138 134 112 125 C 105 122 101 117 103 112 C 105 108 111 110 117 114 C 132 121 146 120 152 114 Z"
            fill="url(#heartRightGrad)"
            stroke="#F3E5AB"
            strokeWidth="1.2"
          />
          <ellipse
            cx="107"
            cy="116"
            rx="4"
            ry="3"
            fill="#FFCCD5"
            stroke="#F3E5AB"
            strokeWidth="1"
            transform="rotate(20 107 116)"
          />
        </g>
      </svg>
    </div>
  );
}

export default function BowArrowChallenge({ onComplete, onSkip, girlfriendName = "Kavya", config }) {
  const containerRef = useRef(null);
  const heartRef = useRef(null);

  // Challenge states: 'aiming' | 'flying' | 'hit' | 'cracking' | 'shattered' | 'unlocked'
  const [challengeState, setChallengeState] = useState('aiming');
  const [arrowPos, setArrowPos] = useState({ x: 0, y: 0 }); // offset from bow base
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [arrowFlyProgress, setArrowFlyProgress] = useState(0); // 0 to 1
  const [targetHeartCoords, setTargetHeartCoords] = useState({ x: 0, y: 0 });
  const [bowCoords, setBowCoords] = useState({ x: 0, y: 0 });
  const [bowAngle, setBowAngle] = useState(0); // degrees
  const [shatterFragments, setShatterFragments] = useState([]);

  // Calculate coordinates of Heart and Bow on resize / mount
  const updatePositions = () => {
    if (!heartRef.current || !containerRef.current) return;
    const hRect = heartRef.current.getBoundingClientRect();
    const cRect = containerRef.current.getBoundingClientRect();

    setTargetHeartCoords({
      x: hRect.left + hRect.width / 2 - cRect.left,
      y: hRect.top + hRect.height / 2 - cRect.top
    });

    setBowCoords({
      x: cRect.width / 2,
      y: cRect.height - 130
    });
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  // Generate shatter fragments
  const generateFragments = () => {
    const frags = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = 70 + Math.random() * 140;
      frags.push({
        id: i,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed + 30, // slight downward gravity
        rotation: (Math.random() - 0.5) * 720,
        scale: 0.5 + Math.random() * 0.7,
        color: ['#FFB6C1', '#B76E79', '#E8C5C8', '#E5C158', '#FAD2B8', '#964F59'][i % 6]
      });
    }
    setShatterFragments(frags);
  };

  // Launch Arrow animation
  const shootArrow = () => {
    if (challengeState !== 'aiming') return;
    setChallengeState('flying');
    soundEffects.playWhoosh();

    const startTime = performance.now();
    const duration = 550; // ms

    const animateFlight = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      setArrowFlyProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animateFlight);
      } else {
        // Arrow Hit Heart!
        setChallengeState('hit');
        soundEffects.playHeartHit();

        // Screen crack / glowing crack state
        setTimeout(() => {
          setChallengeState('cracking');
          // Shatter
          setTimeout(() => {
            setChallengeState('shattered');
            soundEffects.playHeartShatter();
            generateFragments();

            // Heart confetti burst
            try {
              confetti({
                particleCount: 50,
                spread: 80,
                origin: { y: 0.38 },
                colors: ['#B76E79', '#E8C5C8', '#E5C158', '#FFB6C1', '#FAD2B8'],
                shapes: ['circle'],
                disableForReducedMotion: true
              });
            } catch (e) {
              // fallback gracefully
            }

            // Reveal unlocked message
            setTimeout(() => {
              setChallengeState('unlocked');
            }, 800);
          }, 600);
        }, 400);
      }
    };

    requestAnimationFrame(animateFlight);
  };

  // Pointer / Touch Handlers for Drag-Aim-Release
  const handlePointerDown = (e) => {
    if (challengeState !== 'aiming') return;
    setIsDragging(true);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    setDragStart({ x: clientX, y: clientY });
  };

  const handlePointerMove = (e) => {
    if (!isDragging || challengeState !== 'aiming') return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;

    // Pulling down/back
    const pullDistance = Math.min(70, Math.max(0, deltaY));
    const pullAngle = Math.max(-35, Math.min(35, deltaX * 0.4));

    setArrowPos({ x: deltaX * 0.3, y: pullDistance });
    setBowAngle(pullAngle);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If dragged back sufficiently, release and shoot!
    if (arrowPos.y > 15 || Math.abs(arrowPos.x) > 15) {
      shootArrow();
    }
    setArrowPos({ x: 0, y: 0 });
    setBowAngle(0);
  };

  // Reset / Replay
  const handleReset = () => {
    setChallengeState('aiming');
    setArrowFlyProgress(0);
    setArrowPos({ x: 0, y: 0 });
    setBowAngle(0);
    setShatterFragments([]);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      className="relative min-h-screen w-full flex flex-col items-center justify-between py-8 px-4 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(circle at 50% 35%, #461623 0%, #2b0b14 45%, #140307 100%)'
      }}
    >
      
      {/* Ambient Bokeh and Warm Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-b from-[#E8C5C8]/20 via-[#B76E79]/25 to-transparent rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-60 h-60 bg-[#8C503A]/20 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute top-16 right-1/4 w-72 h-72 bg-[#E5C158]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Header Bar with Instruction & Skip */}
      <div className="relative z-30 w-full max-w-2xl flex items-center justify-between pt-10 sm:pt-4">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#380e1a]/80 border border-[#E8C5C8]/30 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#E5C158]" />
          <span className="text-xs font-serif-luxury tracking-wider text-[#FAD2B8]">
            Heart Unlock Challenge
          </span>
        </div>

        {/* Skip button for accessibility */}
        <button
          onClick={onSkip}
          className="text-xs font-sans-clean text-[#E8C5C8]/70 hover:text-[#F3E5AB] transition-colors underline underline-offset-4 flex items-center gap-1 cursor-pointer"
        >
          <span>Skip to Celebration</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Challenge Prompt */}
      <div className="relative z-20 text-center max-w-xl mx-auto mt-2 px-2">
        <h2 className="font-cursive text-3xl sm:text-5xl text-shimmer-rosegold mb-2 leading-[1.35] py-2 overflow-visible">
          {config?.arrowChallenge?.message || `${girlfriendName}, one little arrow is all it takes to unlock my heart ❤️`}
        </h2>
        <p className="font-sans-clean text-xs sm:text-sm text-[#FAD2B8]/80 max-w-md mx-auto">
          {challengeState === 'aiming'
            ? (config?.arrowChallenge?.instruction || "Pull back the arrow, aim at the glowing heart, and release! Or tap anywhere to shoot.")
            : (challengeState === 'unlocked' ? "Heart unlocked!" : "Releasing the arrow of love...")}
        </p>
      </div>

      {/* Center Target: The Floating Pink Heart */}
      <div className="relative z-20 flex-1 w-full flex items-center justify-center my-4">
        <div
          ref={heartRef}
          onClick={() => challengeState === 'aiming' && shootArrow()}
          className={`relative cursor-pointer transition-all duration-300 ${
            challengeState === 'aiming' ? 'animate-float-gentle hover:scale-105' : ''
          } ${challengeState === 'hit' ? 'scale-110 rotate-3' : ''}`}
        >
          
          {/* Subtle Outer Glowing Aura */}
          <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-[#FFB6C1]/30 via-[#B76E79]/40 to-[#E5C158]/30 blur-2xl animate-pulse" />

          {/* Render Normal / Cracking Heart */}
          {challengeState !== 'shattered' && challengeState !== 'unlocked' && (
            <div className="relative w-44 h-44 sm:w-56 sm:h-56">
              <svg
                viewBox="0 0 100 90"
                className="w-full h-full filter drop-shadow-[0_15px_35px_rgba(255,182,193,0.5)]"
                fill="none"
              >
                <defs>
                  {/* Soft Peach & Rose-Gold Gradient inspired by reference image */}
                  <linearGradient id="targetHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF0F3" />
                    <stop offset="25%" stopColor="#FFB6C1" />
                    <stop offset="65%" stopColor="#B76E79" />
                    <stop offset="100%" stopColor="#8C503A" />
                  </linearGradient>

                  <radialGradient id="heartSpecular" cx="30%" cy="25%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#FFD1DC" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#B76E79" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Heart Base */}
                <path
                  d="M50 82 C20 58, 2 40, 2 24 C2 10.5, 12.5 2, 26 2 C34.5 2, 44 7.5, 50 16 C56 7.5, 65.5 2, 74 2 C87.5 2, 98 10.5, 98 24 C98 40, 80 58, 50 82 Z"
                  fill="url(#targetHeartGrad)"
                  stroke="#F3E5AB"
                  strokeWidth="1.2"
                />

                {/* 3D Specular Highlight */}
                <path
                  d="M50 82 C20 58, 2 40, 2 24 C2 10.5, 12.5 2, 26 2 C34.5 2, 44 7.5, 50 16 C56 7.5, 65.5 2, 74 2 C87.5 2, 98 10.5, 98 24 C98 40, 80 58, 50 82 Z"
                  fill="url(#heartSpecular)"
                />

                {/* Center Monogram / Heartbeat Symbol */}
                <text
                  x="50"
                  y="48"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="Playfair Display, serif"
                  fontSize="15"
                  fontWeight="bold"
                  opacity="0.85"
                >
                  {girlfriendName}
                </text>

                {/* Realistic Glowing Cracks (Appears upon impact) */}
                {(challengeState === 'hit' || challengeState === 'cracking') && (
                  <g className="animate-pulse">
                    <path
                      d="M50 20 L48 35 L42 45 L52 55 L45 70"
                      stroke="#FFE899"
                      strokeWidth="2"
                      strokeLinecap="round"
                      filter="drop-shadow(0 0 6px #FFE899)"
                    />
                    <path
                      d="M48 35 L58 38 L65 48"
                      stroke="#FFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M42 45 L32 50 L25 45"
                      stroke="#FFE899"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M52 55 L60 62 L68 70"
                      stroke="#FFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </svg>
            </div>
          )}

          {/* Shattered Fragments & Golden Light Burst */}
          {(challengeState === 'shattered' || challengeState === 'unlocked') && (
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Central Light Burst */}
              <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-[#FFF] via-[#F3E5AB] to-[#B76E79] blur-3xl animate-ping opacity-70" />

              {/* Exploded Heart Fragments */}
              {shatterFragments.map((frag) => (
                <div
                  key={frag.id}
                  className="absolute transition-all duration-700 ease-out"
                  style={{
                    transform: `translate(${frag.dx}px, ${frag.dy}px) rotate(${frag.rotation}deg) scale(${frag.scale})`,
                    opacity: challengeState === 'unlocked' ? 0.35 : 1
                  }}
                >
                  <Heart
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    style={{ fill: frag.color, color: '#F3E5AB' }}
                  />
                </div>
              ))}

              {/* Hugging Hearts Animation when Heart is Unlocked */}
              {challengeState === 'unlocked' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 animate-fade-in">
                  <HuggingHearts />
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Unlocked Message Banner (Appears after heart shatter) */}
      {challengeState === 'unlocked' && (
        <div className="relative z-30 max-w-xl mx-auto w-full p-6 sm:p-8 rounded-3xl glass-gold-card text-center animate-fade-in shadow-[0_15px_50px_rgba(74,14,23,0.8)] border border-[#E5C158]/60 my-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E5C158]/20 border border-[#E5C158] mb-3 text-[#F3E5AB] animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>

          <h3 className="font-cursive text-3xl sm:text-4xl text-shimmer-gold mb-3">
            Heart Unlocked ❤️
          </h3>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#FDE2E4] mb-6 leading-relaxed">
            "{config?.arrowChallenge?.unlockedMessage || 'You just unlocked a little piece of my heart… but the best part is still waiting for you.'}"
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onComplete}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-serif-luxury text-base text-[#240C13] bg-gradient-to-r from-[#F3E5AB] via-[#E5C158] to-[#FAD2B8] font-bold shadow-[0_6px_25px_rgba(229,193,88,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Step Into Your Birthday Universe</span>
              <ArrowRight className="w-4 h-4 text-[#240C13]" />
            </button>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3.5 rounded-full font-sans-clean text-xs text-[#E8C5C8] border border-[#E8C5C8]/30 hover:border-[#F3E5AB] hover:text-[#F3E5AB] transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Aim & Shoot Again</span>
            </button>
          </div>
        </div>
      )}

      {/* Flying Arrow In Motion */}
      {challengeState === 'flying' && (
        <div
          className="absolute z-25 pointer-events-none transition-transform"
          style={{
            left: `${bowCoords.x + (targetHeartCoords.x - bowCoords.x) * arrowFlyProgress}px`,
            top: `${bowCoords.y + (targetHeartCoords.y - bowCoords.y) * arrowFlyProgress}px`,
            transform: `translate(-50%, -50%) rotate(${
              Math.atan2(targetHeartCoords.y - bowCoords.y, targetHeartCoords.x - bowCoords.x) * (180 / Math.PI) + 90
            }deg)`
          }}
        >
          {/* Arrow SVG with golden trail */}
          <div className="relative flex flex-col items-center">
            {/* Golden Particle Trail */}
            <div className="w-1 h-20 bg-gradient-to-t from-transparent via-[#E5C158]/50 to-[#FFF] blur-[1px] -mb-2" />
            <svg width="24" height="60" viewBox="0 0 24 60" fill="none">
              {/* Arrow Heart Tip */}
              <path
                d="M12 2 L7 12 C7 15, 12 18, 12 18 C12 18, 17 15, 17 12 Z"
                fill="#FFD1DC"
                stroke="#E5C158"
                strokeWidth="1.5"
              />
              {/* Shaft */}
              <line x1="12" y1="12" x2="12" y2="52" stroke="#E5C158" strokeWidth="2.5" />
              {/* Fletching */}
              <path d="M7 54 L12 46 L17 54" stroke="#B76E79" strokeWidth="2" fill="none" />
              <path d="M8 58 L12 50 L16 58" stroke="#E5C158" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom Bow and Arrow Setup (Aiming / Dragging) */}
      {(challengeState === 'aiming' || isDragging) && (
        <div
          onPointerDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          className="relative z-30 flex flex-col items-center cursor-grab active:cursor-grabbing pb-4"
        >
          {/* Aim Line Guide (Dotted line to target) */}
          {isDragging && (
            <svg
              className="absolute pointer-events-none overflow-visible"
              style={{ bottom: '70px', left: '50%', transform: 'translateX(-50%)' }}
              width="2"
              height="250"
            >
              <line
                x1="1"
                y1="250"
                x2="1"
                y2="0"
                stroke="#F3E5AB"
                strokeWidth="2"
                strokeDasharray="4 6"
                strokeOpacity="0.7"
              />
            </svg>
          )}

          {/* Interactive Bow & Arrow Representation */}
          <div
            className="relative w-36 h-36 flex items-center justify-center transition-transform"
            style={{
              transform: `rotate(${bowAngle}deg)`
            }}
          >
            {/* The Bow Curve */}
            <svg viewBox="0 0 120 80" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <defs>
                <linearGradient id="bowWood" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8C503A" />
                  <stop offset="30%" stopColor="#E5C158" />
                  <stop offset="70%" stopColor="#B76E79" />
                  <stop offset="100%" stopColor="#8C503A" />
                </linearGradient>
              </defs>

              {/* Bow Limbs */}
              <path
                d="M 15 65 Q 60 15 105 65"
                stroke="url(#bowWood)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Bowstring (Bends back when dragging) */}
              <path
                d={`M 15 65 Q 60 ${65 + arrowPos.y * 0.8} 105 65`}
                stroke="#F3E5AB"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>

            {/* The Arrow (Resting on Bowstring) */}
            <div
              className="absolute transition-transform"
              style={{
                transform: `translate(${arrowPos.x}px, ${arrowPos.y}px)`
              }}
            >
              <svg width="22" height="68" viewBox="0 0 22 68" fill="none">
                {/* Arrow Tip */}
                <path
                  d="M11 2 L5 12 C5 15, 11 18, 11 18 C11 18, 17 15, 17 12 Z"
                  fill="#FFD1DC"
                  stroke="#E5C158"
                  strokeWidth="1.5"
                />
                {/* Shaft */}
                <line x1="11" y1="12" x2="11" y2="60" stroke="#F3E5AB" strokeWidth="2.5" />
                {/* Fletching */}
                <path d="M6 62 L11 52 L16 62" stroke="#B76E79" strokeWidth="2" fill="none" />
                <path d="M7 66 L11 57 L15 66" stroke="#E5C158" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* Touch / Click to Shoot Quick Button */}
          <button
            onClick={shootArrow}
            className="mt-1 px-6 py-2 rounded-full bg-[#B76E79]/40 hover:bg-[#B76E79]/70 border border-[#E5C158]/50 text-xs font-serif-luxury text-[#F3E5AB] tracking-wider transition-all shadow-md active:scale-95"
          >
            🏹 Tap or Drag to Release Arrow
          </button>
        </div>
      )}

    </div>
  );
}
