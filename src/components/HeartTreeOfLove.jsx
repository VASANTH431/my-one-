import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Heart, Sparkles, Sprout, RotateCcw } from 'lucide-react';
import { soundEffects } from '../utils/audioSystem';
import confetti from 'canvas-confetti';

export default function HeartTreeOfLove({ config, girlfriendName = "Kavya" }) {
  // Animation state: 'idle' | 'growing' | 'bloomed'
  const [treeState, setTreeState] = useState('idle');
  const [growProgress, setGrowProgress] = useState(0); // 0 to 1
  const [activeHeartNote, setActiveHeartNote] = useState(null);
  const animFrameRef = useRef(null);

  // Love messages from config
  const notes = config?.treeNotes || [
    { id: '1', title: 'Extraordinary Days', text: 'You make my ordinary days extraordinary. Just hearing your laugh turns everything around.', color: '#FF4D6D' },
    { id: '2', title: 'My Favourite View', text: 'Your smile is my favourite view in the entire world. It carries all the warmth I ever need.', color: '#FF758F' },
    { id: '3', title: 'Every Little Moment', text: 'Every little moment with you matters to me — from late-night conversations to quiet silences.', color: '#FFD166' },
    { id: '4', title: 'My Hardest Goodbye', text: 'You are my favourite hello and my hardest goodbye. Time always flies when I am with you.', color: '#FFAA00' },
    { id: '5', title: 'I Would Still Choose You', text: 'No matter how many times I meet you, in every universe and lifetime, I would still choose you.', color: '#FF8FA3' },
    { id: '6', title: 'Safe Haven', text: 'Being with you feels like home. You are my calm in every storm and my biggest cheerleader.', color: '#FFB3C1' },
    { id: '7', title: 'Endless Muse', text: 'Your kindness, grace, and bright spirit inspire me every single day. I adore you, Kavya.', color: '#FFCCD5' }
  ];

  // Palette matching the reference image 2: rich pinks, hot pinks, soft yellows, champagne, peach, blush
  const leafColors = [
    '#FF4D6D', '#FF758F', '#FF8FA3', '#FFB3C1', '#FFCCD5',
    '#C9184A', '#E05780', '#FF5A79', '#FF3366', '#FF85A1',
    '#FFD166', '#FFB703', '#FFE29A', '#F4A261', '#FF9F80',
    '#FFAF96', '#FFD8BE', '#FFFFFF', '#FFF0F3', '#FF6B8B'
  ];

  // Generate ~580 dense heart leaves distributed across the entire heart canopy and branches
  const heartLeaves = useMemo(() => {
    const list = [];
    const count = 580;
    const cx = 300;
    const cy = 195;

    // Deterministic pseudo-random sequence for consistent beauty
    let seed = 42;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < count; i++) {
      let x, y;

      if (i < 360) {
        // Pass 1: Heart volume interior
        const t = random() * Math.PI * 2;
        const r = Math.pow(random(), 0.52) * 0.96 + 0.03;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        x = cx + r * 11.4 * hx + (random() - 0.5) * 16;
        y = cy + r * 9.6 * hy + (random() - 0.5) * 16;
      } else if (i < 480) {
        // Pass 2: Outer heart perimeter & top lobes
        const t = random() * Math.PI * 2;
        const r = 0.78 + random() * 0.22;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        x = cx + r * 11.5 * hx + (random() - 0.5) * 12;
        y = cy + r * 9.6 * hy + (random() - 0.5) * 12;
      } else {
        // Pass 3: Dense branch & cleavage blanketing
        const t = (random() - 0.5) * Math.PI;
        const progress = random();
        const branchSide = random() < 0.5 ? -1 : 1;
        const branchX = cx + branchSide * Math.pow(progress, 0.8) * 130 + (random() - 0.5) * 24;
        const branchY = 350 - progress * 175 + (random() - 0.5) * 24;
        x = branchX;
        y = branchY;
      }

      // Scale & rotation
      const size = 12 + random() * 16; // 12px to 28px
      const rotation = (random() - 0.5) * 65; // subtle tilt

      // Bloom delay: starts from bottom/center branching outward
      const distFromCenter = Math.hypot(x - cx, y - 260);
      const bloomDelay = 0.7 + (distFromCenter / 200) * 1.5 + random() * 0.9; // seconds

      const color = leafColors[Math.floor(random() * leafColors.length)];
      const noteIndex = i % notes.length;

      list.push({
        id: i,
        x,
        y,
        size,
        rotation,
        color,
        bloomDelay,
        note: notes[noteIndex],
        isClickable: i % 25 === 0 // special interactive notes
      });
    }

    // Sort by bloom delay so they render with nice z-layering
    return list.sort((a, b) => a.bloomDelay - b.bloomDelay);
  }, []);

  // Falling petal hearts (matching Image 2)
  const fallingPetals = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 18 + (i * 7) + (Math.random() * 5),
      delay: i * 0.7,
      duration: 4.5 + (i % 4) * 1.2,
      size: 11 + (i % 3) * 4,
      color: leafColors[i % leafColors.length]
    }));
  }, []);

  // Continuous Growth Animation on Click
  const handleStartGrow = () => {
    if (treeState === 'growing') return;

    setTreeState('growing');
    setGrowProgress(0);
    soundEffects.playTreeSprout();

    const startTime = performance.now();
    const totalDuration = 3800; // 3.8 seconds complete growth

    const step = (now) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / totalDuration);
      setGrowProgress(p);

      if (p < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setTreeState('bloomed');
        try {
          confetti({
            particleCount: 55,
            spread: 75,
            origin: { y: 0.55 },
            colors: ['#FF4D6D', '#FFB703', '#FF8FA3', '#FFD166', '#FFCCD5']
          });
        } catch (e) {}
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const handleReset = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setTreeState('idle');
    setGrowProgress(0);
    setActiveHeartNote(null);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Calculate branch draw progress (branches finish growing before hearts finish blooming)
  // 0 to 0.55 of total time is trunk & branches growth
  const branchProgress = Math.min(1, growProgress / 0.55);

  return (
    <section className="relative py-20 px-4 w-full max-w-6xl xl:max-w-7xl mx-auto z-20">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B76E79]/20 border border-[#E8C5C8]/30 text-xs font-serif-luxury tracking-widest uppercase text-[#F3E5AB] mb-3">
          <Sprout className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Blooming Love Tree</span>
        </div>

        <h3 className="font-cursive text-4xl sm:text-6xl text-shimmer-rosegold mb-2">
          The Heart Tree of Love
        </h3>

        <p className="font-sans-clean text-xs sm:text-sm text-[#FAD2B8]/80 leading-relaxed max-w-lg mx-auto">
          {treeState === 'idle' && 'Click "Start Grow" below to watch our love tree branch out and bloom into a heart of blossoms.'}
          {treeState === 'growing' && 'Growing our little universe... branches reaching, hearts blooming ❤️'}
          {treeState === 'bloomed' && 'Our love tree has fully bloomed! Click the glowing hearts to read love notes.'}
        </p>
      </div>

      {/* Tree + Note Side-by-Side Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-10">

        {/* Main Tree Container — Soft Warm Peach and Champagne Background matching Image 2 */}
        <div className="w-full lg:flex-1 relative rounded-3xl p-4 sm:p-8 shadow-[0_25px_80px_rgba(74,14,23,0.55)] border-2 border-[#E5C158]/50 overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, #FFF6EE 0%, #FEEADB 35%, #FAD9CA 70%, #ECC5B4 100%)'
          }}
        >
        
        {/* Soft Golden Bokeh Glow behind Heart Canopy */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[320px] sm:h-[450px] bg-gradient-to-tr from-[#FFD166]/35 via-[#FF8FA3]/30 to-[#FFF]/50 rounded-full blur-[70px] pointer-events-none" />
        
        {/* Falling Petals (Continuous animation like Image 2) */}
        {(treeState === 'growing' || treeState === 'bloomed') && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {fallingPetals.map((petal) => (
              <div
                key={petal.id}
                className="absolute"
                style={{
                  left: `${petal.left}%`,
                  top: '-30px',
                  animation: `fallGentle ${petal.duration}s ease-in-out infinite`,
                  animationDelay: `${petal.delay}s`
                }}
              >
                <Heart
                  className="w-3.5 h-3.5 opacity-75"
                  style={{ fill: petal.color, color: petal.color }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Tree SVG Visualization Area */}
        <div className="relative w-full max-w-2xl mx-auto h-[440px] sm:h-[540px] flex items-center justify-center">
          
          <svg viewBox="0 0 600 560" className="w-full h-full overflow-visible select-none">
            <defs>
              {/* Slender Bark Gradient */}
              <linearGradient id="barkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A222F" />
                <stop offset="50%" stopColor="#3B1824" />
                <stop offset="100%" stopColor="#250C15" />
              </linearGradient>

              {/* Heart Leaf Defs */}
              <g id="heartShape">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </g>

              {/* Branch drop shadow */}
              <filter id="branchShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#250C15" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Ground Soil Shadow */}
            <ellipse cx="300" cy="535" rx="50" ry="8" fill="#5A3326" opacity="0.3" filter="blur(3px)" />

            {/* ================= 1. TRUNK & BRANCHES ================= */}
            {/* Trunk and branches are revealed as branchProgress advances */}
            <g filter="url(#branchShadow)">
              
              {/* Slender Trunk rising from bottom center (matching Image 2) */}
              <path
                d="M 300 535 C 302 475, 306 415, 300 355"
                stroke="url(#barkGrad)"
                strokeWidth="7.5"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: 200 * (1 - branchProgress),
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />

              {/* Trunk Base Gentle Curve */}
              <path
                d="M 296 535 C 298 480, 300 420, 298 360"
                stroke="#4A222F"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />

              {/* Left Main Branch Structure framing the heart */}
              <path
                d="M 300 355 C 275 300, 235 240, 205 180"
                stroke="url(#barkGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 250,
                  strokeDashoffset: 250 * (1 - Math.max(0, (branchProgress - 0.2) / 0.8)),
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />
              {/* Left Sub-Branch 1 (Lower Outer) */}
              <path
                d="M 245 255 C 205 230, 165 190, 145 145"
                stroke="url(#barkGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: 200 * (1 - Math.max(0, (branchProgress - 0.35) / 0.65)),
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />
              {/* Left Sub-Branch 2 (Upper Outer tip) */}
              <path
                d="M 205 180 C 185 145, 175 110, 180 80"
                stroke="url(#barkGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 150,
                  strokeDashoffset: 150 * (1 - Math.max(0, (branchProgress - 0.5) / 0.5)),
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />
              {/* Left Sub-Branch 3 (Upper Inner lobe) */}
              <path
                d="M 235 200 C 230 155, 235 115, 250 85"
                stroke="url(#barkGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 150,
                  strokeDashoffset: 150 * (1 - Math.max(0, (branchProgress - 0.45) / 0.55)),
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />

              {/* Right Main Branch Structure framing the heart */}
              <path
                d="M 300 355 C 325 300, 365 240, 395 180"
                stroke="url(#barkGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 250,
                  strokeDashoffset: 250 * (1 - Math.max(0, (branchProgress - 0.2) / 0.8)),
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />
              {/* Right Sub-Branch 1 (Lower Outer) */}
              <path
                d="M 355 255 C 395 230, 435 190, 455 145"
                stroke="url(#barkGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: 200 * (1 - Math.max(0, (branchProgress - 0.35) / 0.65)),
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />
              {/* Right Sub-Branch 2 (Upper Outer tip) */}
              <path
                d="M 395 180 C 415 145, 425 110, 420 80"
                stroke="url(#barkGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 150,
                  strokeDashoffset: 150 * (1 - Math.max(0, (branchProgress - 0.5) / 0.5)),
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />
              {/* Right Sub-Branch 3 (Upper Inner lobe) */}
              <path
                d="M 365 200 C 370 155, 365 115, 350 85"
                stroke="url(#barkGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 150,
                  strokeDashoffset: 150 * (1 - Math.max(0, (branchProgress - 0.45) / 0.55)),
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />

              {/* Center Upward Branches (cleavage of the heart) */}
              <path
                d="M 300 355 C 298 290, 292 230, 290 170 C 290 140, 296 115, 300 95"
                stroke="url(#barkGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: 280,
                  strokeDashoffset: 280 * (1 - Math.max(0, (branchProgress - 0.3) / 0.7)),
                  transition: 'stroke-dashoffset 0.1s linear'
                }}
              />

              {/* Delicate Twigs extending to outer heart perimeter */}
              <path d="M 170 160 L 140 130" stroke="url(#barkGrad)" strokeWidth="1.8" strokeLinecap="round" opacity={branchProgress > 0.6 ? 1 : 0} />
              <path d="M 195 125 L 180 100" stroke="url(#barkGrad)" strokeWidth="1.8" strokeLinecap="round" opacity={branchProgress > 0.7 ? 1 : 0} />
              <path d="M 430 160 L 460 130" stroke="url(#barkGrad)" strokeWidth="1.8" strokeLinecap="round" opacity={branchProgress > 0.6 ? 1 : 0} />
              <path d="M 405 125 L 420 100" stroke="url(#barkGrad)" strokeWidth="1.8" strokeLinecap="round" opacity={branchProgress > 0.7 ? 1 : 0} />
            </g>

            {/* ================= 2. DENSE HEART CANOPY (MATCHING IMAGE 2) ================= */}
            <g id="heartLeavesLayer">
              {heartLeaves.map((leaf) => {
                // Determine whether this heart has bloomed based on elapsed progress
                // growProgress goes 0 -> 1 over 3.8s
                const currentTimeSec = growProgress * 3.8;
                const isBloomed = treeState === 'bloomed' || (treeState === 'growing' && currentTimeSec >= leaf.bloomDelay);

                // Spring scale interpolation
                let scale = 0;
                if (isBloomed) {
                  const bloomAge = currentTimeSec - leaf.bloomDelay;
                  if (bloomAge < 0.25) {
                    // Pop / spring overshoot
                    scale = (bloomAge / 0.25) * 1.18;
                  } else if (bloomAge < 0.45) {
                    scale = 1.18 - ((bloomAge - 0.25) / 0.2) * 0.18;
                  } else {
                    scale = 1.0;
                  }
                }

                if (!isBloomed && treeState !== 'bloomed') return null;

                const baseScale = (leaf.size / 24) * (scale || 1);

                return (
                  <g
                    key={leaf.id}
                    transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rotation}) scale(${baseScale}) translate(-12, -12)`}
                    onClick={() => {
                      soundEffects.playHeartHit();
                      setActiveHeartNote(leaf.note);
                    }}
                    className={`cursor-pointer transition-transform duration-300 hover:scale-130 ${
                      leaf.isClickable ? 'filter drop-shadow-[0_0_6px_rgba(255,209,102,0.8)]' : ''
                    }`}
                  >
                    {/* Heart Petal */}
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill={leaf.color}
                      stroke={leaf.isClickable ? "#FFFFFF" : leaf.color}
                      strokeWidth={leaf.isClickable ? "1.5" : "0.5"}
                      opacity={leaf.isClickable ? "1" : "0.92"}
                    />
                    {/* Subtle Highlight Reflection */}
                    <circle cx="8" cy="7" r="1.5" fill="#FFFFFF" opacity="0.6" />
                  </g>
                );
              })}
            </g>

          </svg>

          {/* ================= 3. ROMANTIC MESSAGE CARD (MATCHING IMAGE 2 LOWER-LEFT) ================= */}
          <div
            className={`absolute bottom-6 left-4 sm:left-8 max-w-xs p-4 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#FFCCD5]/80 shadow-[0_10px_30px_rgba(74,14,23,0.15)] transition-all duration-700 pointer-events-auto ${
              treeState === 'bloomed' || growProgress > 0.4
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <p className="font-serif-luxury text-[11px] uppercase tracking-wider text-[#8C503A]/80 font-medium">
              made for you, by hand
            </p>
            <h4 className="font-cursive text-3xl sm:text-4xl text-[#B71C1C] font-bold my-0.5 leading-none drop-shadow-[0_1px_3px_rgba(255,100,130,0.3)]">
              I love you
            </h4>
            <p className="font-serif-luxury text-xs text-[#5A3326] mt-1 font-light italic">
              and every ordinary day with you, {girlfriendName}
            </p>
          </div>

        </div>

        {/* ================= 4. THE SINGLE "START GROW" BUTTON ================= */}
        {/* As explicitly requested: "add only one buttton start grow if it clicked the animation gets strated" */}
        <div className="mt-4 flex flex-col items-center justify-center relative z-30">
          
          {treeState === 'idle' && (
            <button
              onClick={handleStartGrow}
              className="group relative px-9 py-4 rounded-full font-serif-luxury text-base sm:text-lg text-[#240C13] bg-gradient-to-r from-[#F3E5AB] via-[#E5C158] to-[#FAD2B8] font-bold shadow-[0_8px_30px_rgba(229,193,88,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer overflow-hidden border border-[#FFF]"
            >
              {/* Shimmer light effect */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              <Sprout className="w-5 h-5 text-[#240C13] group-hover:rotate-12 transition-transform" />
              <span>Start Grow</span>
              <Heart className="w-5 h-5 text-[#B71C1C] fill-[#B71C1C] animate-pulse" />
            </button>
          )}

          {treeState === 'growing' && (
            <div className="px-8 py-3.5 rounded-full font-serif-luxury text-sm text-[#240C13] bg-gradient-to-r from-[#FFE29A] to-[#FFCCD5] border border-white font-semibold flex items-center gap-2.5 shadow-md animate-pulse">
              <Sparkles className="w-4 h-4 text-[#B71C1C] animate-spin" />
              <span>Growing Our Love... ✨</span>
            </div>
          )}

          {treeState === 'bloomed' && (
            <div className="flex items-center gap-3 animate-fade-in">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full text-xs font-sans-clean text-[#5A3326] bg-white/70 hover:bg-white border border-[#E8C5C8] hover:border-[#B76E79] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#B76E79]" />
                <span>Grow Again</span>
              </button>
              <span className="text-xs font-serif-luxury text-[#8C503A] italic">
                Tap the blooming hearts to read love notes ❤️
              </span>
            </div>
          )}

        </div>

      </div>

        {/* Romantic Tree Dedication Quote Note on Right Side of the Tree */}
        <div className="w-full lg:w-[360px] xl:w-[420px] p-6 sm:p-8 rounded-3xl glass-panel border border-[#E5C158]/50 text-center shadow-[0_15px_45px_rgba(74,14,23,0.55)] relative overflow-hidden group hover:border-[#E5C158] transition-all self-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5C158]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#B76E79]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/40 text-xs font-serif-luxury tracking-widest uppercase text-[#F3E5AB] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158] animate-spin" style={{ animationDuration: '6s' }} />
              <span>Our Growing Love</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158] animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <p className="font-serif-luxury italic text-base sm:text-xl text-[#FDE2E4] leading-relaxed max-w-sm mb-4">
              “Just like this tree grows with time, may our love grow deeper, stronger, and more beautiful with every passing day, forever and always. 🌳❤️✨”
            </p>

            <div className="mt-2 flex items-center justify-center gap-2 text-xs font-sans-clean text-[#E8C5C8]/70">
              <Heart className="w-3 h-3 text-[#B76E79] fill-[#B76E79]" />
              <span>Forever Rooted in My Heart, {girlfriendName}</span>
            </div>
          </div>
        </div>

      </div>
      {activeHeartNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-md w-full rounded-3xl glass-gold-card p-6 sm:p-8 text-center border-2 border-[#E5C158]/70 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            
            <button
              onClick={() => setActiveHeartNote(null)}
              className="absolute top-4 right-4 text-[#E8C5C8] hover:text-[#FFF] text-xl font-bold cursor-pointer"
            >
              ×
            </button>

            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#E5C158] flex items-center justify-center mx-auto mb-4 shadow-md text-white">
              <Heart className="w-6 h-6 fill-white" />
            </div>

            <h4 className="font-cursive text-3xl text-shimmer-gold mb-3">
              {activeHeartNote.title}
            </h4>

            <p className="font-serif-luxury italic text-base sm:text-lg text-[#FDE2E4] leading-relaxed mb-6">
              "{activeHeartNote.text}"
            </p>

            <div className="pt-2 border-t border-[#E8C5C8]/20 flex items-center justify-between text-xs font-sans-clean text-[#E8C5C8]/70">
              <span>A blooming memory for {girlfriendName}</span>
              <button
                onClick={() => setActiveHeartNote(null)}
                className="px-4 py-1.5 rounded-full bg-[#B76E79]/40 hover:bg-[#B76E79]/70 text-[#F3E5AB] font-medium transition-all"
              >
                Close Note
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Keyframe animation for falling petals */}
      <style>{`
        @keyframes fallGentle {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(220px) translateX(25px) rotate(180deg);
            opacity: 0.75;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(480px) translateX(-15px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

    </section>
  );
}
