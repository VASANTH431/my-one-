import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, RotateCcw } from 'lucide-react';
import { soundEffects } from '../utils/audioSystem';

export default function LoveLetter({ config, girlfriendName = "Kavya" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedLinesCount, setRevealedLinesCount] = useState(0);

  const letterData = config?.loveLetter || {
    instruction: "Kavya, this letter is written only for you.",
    greeting: "My dearest Kavya,",
    paragraphs: [
      "Your birthday is special to the world, but to me, it is the day someone incredibly precious came into this world.",
      "You bring happiness into my smallest moments and warmth into my heart in ways words cannot fully explain.",
      "I may not always find the perfect words to express everything I feel, but I hope this little surprise reminds you how deeply you are appreciated, how beautiful your presence is, and how much your happiness means to me.",
      "On your special day, I wish you endless smiles, peaceful days, beautiful dreams, and all the love your heart can hold.",
      "Happy Birthday, my love. If I had to choose all over again, I would still choose you. Always and in every little way, you will have a special place in my heart."
    ],
    closing: "With all my love,",
    signature: "Yours ❤️"
  };

  const allLines = [
    letterData.greeting,
    ...letterData.paragraphs,
    `${letterData.closing}\n${letterData.signature}`
  ];

  // Animate typewriter / line-by-line reveal when opened
  useEffect(() => {
    if (!isOpen) {
      setRevealedLinesCount(0);
      return;
    }

    const timer = setInterval(() => {
      setRevealedLinesCount((prev) => {
        if (prev < allLines.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [isOpen, allLines.length]);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    soundEffects.playSealCrack();
    setIsOpen(true);
  };

  const handleRevealAll = () => {
    setRevealedLinesCount(allLines.length);
  };

  return (
    <section className="relative py-24 px-4 w-full max-w-4xl mx-auto z-20">
      
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B76E79]/20 border border-[#E8C5C8]/30 text-xs font-serif-luxury tracking-widest uppercase text-[#F3E5AB] mb-4">
          <Mail className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Handwritten From The Heart</span>
        </div>

        <h3 className="font-cursive text-4xl sm:text-6xl text-shimmer-rosegold mb-2 py-2 leading-[1.35] overflow-visible">
          An Intimate Love Letter
        </h3>
        <p className="font-serif-luxury italic text-xs sm:text-sm text-[#FAD2B8]/80">
          "{letterData.instruction || `Kavya, this letter is written only for you.`}"
        </p>
      </div>

      {/* Main Container */}
      <div className="relative flex flex-col items-center">
        
        {/* State 1: Sealed Romantic Envelope */}
        {!isOpen ? (
          <div
            onClick={handleOpenEnvelope}
            className="group relative cursor-pointer w-full max-w-md h-72 sm:h-80 rounded-2xl bg-gradient-to-br from-[#4A0E17] via-[#350A10] to-[#200408] border-2 border-[#8C503A] shadow-[0_20px_60px_rgba(74,14,23,0.7)] p-6 flex flex-col items-center justify-between transition-all duration-500 hover:scale-105 hover:border-[#E5C158]/80 overflow-hidden"
          >
            {/* Envelope Flap Lines & Shimmer */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <svg width="100%" height="100%">
                <line x1="0" y1="0" x2="50%" y2="55%" stroke="#E5C158" strokeWidth="1.5" />
                <line x1="100%" y1="0" x2="50%" y2="55%" stroke="#E5C158" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Glowing Aura behind Envelope */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#B76E79]/20 to-[#E5C158]/10 opacity-50 group-hover:opacity-80 transition-opacity" />

            {/* Top Prompt */}
            <div className="relative z-10 text-center mt-2">
              <span className="text-[11px] font-serif-luxury uppercase tracking-widest text-[#E8C5C8]/70">
                Sealed with devotion
              </span>
              <p className="font-cursive text-2xl text-[#F3E5AB] mt-1">
                For My Precious {girlfriendName}
              </p>
            </div>

            {/* 3D Wax Seal with Heart */}
            <div className="relative z-20 flex flex-col items-center my-auto">
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#B76E79] via-[#8C503A] to-[#5A3326] border-2 border-[#E5C158] shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {/* Wax drippings / texture */}
                <div className="absolute inset-1 rounded-full border border-[#FFF]/30" />
                <Heart className="w-9 h-9 text-[#F3E5AB] fill-[#E8C5C8] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
              </div>

              <span className="mt-3 text-xs font-serif-luxury text-[#FAD2B8] tracking-wider animate-pulse flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Tap Wax Seal to Break & Open</span>
              </span>
            </div>

            {/* Bottom Filigree */}
            <div className="relative z-10 text-center pb-2">
              <span className="text-[10px] font-sans-clean text-[#E8C5C8]/50 tracking-widest uppercase">
                Private & Confidential • Only For Your Eyes
              </span>
            </div>
          </div>
        ) : (
          /* State 2: Unfolded Parchment Paper Letter */
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#FFFDF7] text-[#331118] p-8 sm:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.7)] border-4 border-[#B76E79]/40 animate-fade-in">
            
            {/* Elegant Double Gold Filigree Borders */}
            <div className="absolute inset-3 border border-[#E5C158]/50 pointer-events-none rounded-2xl" />
            <div className="absolute inset-4 border border-[#B76E79]/20 pointer-events-none rounded-xl" />

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-5 left-5 text-[#B76E79]/50 text-xs font-serif-luxury">✤</div>
            <div className="absolute top-5 right-5 text-[#B76E79]/50 text-xs font-serif-luxury">✤</div>
            <div className="absolute bottom-5 left-5 text-[#B76E79]/50 text-xs font-serif-luxury">✤</div>
            <div className="absolute bottom-5 right-5 text-[#B76E79]/50 text-xs font-serif-luxury">✤</div>

            {/* Top Toolbar */}
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#B76E79]/20 relative z-10">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#B76E79] fill-[#B76E79]" />
                <span className="font-serif-luxury text-xs uppercase tracking-widest text-[#8C503A]">
                  Birthday Letter • 26 December
                </span>
              </div>

              <div className="flex items-center gap-2">
                {revealedLinesCount < allLines.length && (
                  <button
                    onClick={handleRevealAll}
                    className="text-xs font-sans-clean text-[#8C503A] hover:text-[#B76E79] underline cursor-pointer"
                  >
                    Read All Now
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#B76E79]/10 text-[#8C503A] hover:text-[#B76E79] transition-all cursor-pointer"
                  title="Fold and Seal Again"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Letter Content */}
            <div className="space-y-6 relative z-10">
              {/* Salutation */}
              <h4 className="font-cursive text-3xl sm:text-4xl text-[#8C503A] font-bold">
                {letterData.greeting}
              </h4>

              {/* Paragraphs with Line-by-Line Typewriter Reveal */}
              <div className="space-y-5 font-serif-luxury text-base sm:text-lg text-[#3E1A22] leading-relaxed">
                {letterData.paragraphs.map((p, idx) => {
                  const isRevealed = idx + 1 <= revealedLinesCount;
                  return (
                    <p
                      key={idx}
                      className={`transition-all duration-700 ${
                        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                      }`}
                    >
                      {p}
                    </p>
                  );
                })}
              </div>

              {/* Closing Sign-off */}
              <div
                className={`pt-6 border-t border-[#B76E79]/20 text-right transition-all duration-700 ${
                  revealedLinesCount >= allLines.length ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="font-serif-luxury italic text-base text-[#8C503A]">
                  {letterData.closing}
                </p>
                <p className="font-cursive text-3xl sm:text-4xl text-[#B76E79] font-bold mt-1">
                  {letterData.signature}
                </p>
              </div>
            </div>

            {/* Bottom Wax Stamp Icon */}
            <div className="mt-8 pt-4 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#B76E79]/20 flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#B76E79] fill-[#B76E79]" />
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
