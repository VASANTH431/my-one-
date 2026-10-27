import React, { useState } from 'react';
import { Heart, Sparkles, Gift, Edit3, Check, PartyPopper } from 'lucide-react';
import { soundEffects } from '../utils/audioSystem';
import confetti from 'canvas-confetti';

export default function FinalSurprise({ config, girlfriendName = "Kavya", onSaveConfig }) {
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [isEditingSecret, setIsEditingSecret] = useState(false);

  const initialSurprise = config?.finalSurprise || {
    heading: "Happy Birthday, Kavya ❤️",
    subtext: "You are one of the most beautiful parts of my world, and I hope your day is as wonderful as the happiness you bring into my life.",
    buttonText: "One Last Surprise",
    secretMessageTitle: "My Forever Promise to You",
    secretMessageContent: "Kavya, as you step into another year of your life, I want you to know that my love, loyalty, and care for you will only grow deeper with each passing day. Thank you for being my peace, my joy, and my greatest blessing. Here is to celebrating many more birthdays together. Happy Birthday, my love! ❤️🥂"
  };

  const [surpriseData, setSurpriseData] = useState(initialSurprise);
  const [editContent, setEditContent] = useState(initialSurprise.secretMessageContent);

  // Trigger grand fireworks and confetti burst
  const handleGrandSurprise = () => {
    soundEffects.playFanfare();
    setShowSecretModal(true);

    // Multi-shot fireworks simulation with canvas-confetti
    const end = Date.now() + 2500;
    const colors = ['#E5C158', '#B76E79', '#FFD1DC', '#F3E5AB', '#FFF'];

    (function frame() {
      try {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
      } catch (e) {}

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleSaveSecret = () => {
    const updated = {
      ...surpriseData,
      secretMessageContent: editContent
    };
    setSurpriseData(updated);
    if (onSaveConfig) {
      onSaveConfig({ finalSurprise: updated });
    }
    setIsEditingSecret(false);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 overflow-hidden z-20">
      
      {/* Field of Tiny Sparkling Lights at Bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5c158_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#B76E79]/20 via-[#4A0E17]/30 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-gradient-to-tr from-[#8C503A]/25 via-[#B76E79]/30 to-[#E5C158]/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        
        {/* Floating Rose-Gold 3D Heart */}
        <div className="relative mb-10 cursor-pointer group" onClick={handleGrandSurprise}>
          {/* Pulsing Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B76E79] via-[#E8C5C8] to-[#E5C158] opacity-60 blur-2xl animate-pulse-aura transform scale-125" />
          
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center animate-float-gentle group-hover:scale-110 transition-transform duration-500">
            <svg
              viewBox="0 0 100 90"
              className="w-full h-full drop-shadow-[0_15px_35px_rgba(183,110,121,0.65)]"
              fill="none"
            >
              <defs>
                <linearGradient id="finalHeartGrad" x1="15%" y1="0%" x2="85%" y2="100%">
                  <stop offset="0%" stopColor="#FFF0F3" />
                  <stop offset="30%" stopColor="#B76E79" />
                  <stop offset="70%" stopColor="#8C503A" />
                  <stop offset="100%" stopColor="#4A0E17" />
                </linearGradient>
                <radialGradient id="finalSpecular" cx="35%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                  <stop offset="45%" stopColor="#FAD2B8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#B76E79" stopOpacity="0" />
                </radialGradient>
              </defs>

              <path
                d="M50 82 C20 58, 2 40, 2 24 C2 10.5, 12.5 2, 26 2 C34.5 2, 44 7.5, 50 16 C56 7.5, 65.5 2, 74 2 C87.5 2, 98 10.5, 98 24 C98 40, 80 58, 50 82 Z"
                fill="url(#finalHeartGrad)"
                stroke="#F3E5AB"
                strokeWidth="1.5"
              />

              <path
                d="M50 82 C20 58, 2 40, 2 24 C2 10.5, 12.5 2, 26 2 C34.5 2, 44 7.5, 50 16 C56 7.5, 65.5 2, 74 2 C87.5 2, 98 10.5, 98 24 C98 40, 80 58, 50 82 Z"
                fill="url(#finalSpecular)"
              />

              <text
                x="50"
                y="52"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="Playfair Display, serif"
                fontSize="18"
                fontWeight="bold"
                opacity="0.9"
              >
                K & V
              </text>
            </svg>
          </div>
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-4 px-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E5C158]/20 border border-[#E5C158]/40 text-xs font-serif-luxury tracking-widest uppercase text-[#F3E5AB]">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>The Eternal Chapter</span>
          </div>

          <h2 className="font-cursive text-5xl sm:text-7xl font-bold text-shimmer-gold mb-3 py-3 px-2 leading-[1.35] overflow-visible">
            {surpriseData.heading || `Happy Birthday, ${girlfriendName} ❤️`}
          </h2>

          <p className="font-serif-luxury italic text-base sm:text-xl text-[#FDE2E4] max-w-xl mx-auto leading-relaxed">
            "{surpriseData.subtext || `You are one of the most beautiful parts of my world, and I hope your day is as wonderful as the happiness you bring into my life.`}"
          </p>
        </div>

        {/* "One Last Surprise" Interactive Button */}
        <div className="mt-12">
          <button
            onClick={handleGrandSurprise}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-serif-luxury text-lg tracking-wider text-[#240C13] bg-gradient-to-r from-[#F3E5AB] via-[#E5C158] to-[#FAD2B8] font-bold shadow-[0_10px_35px_rgba(229,193,88,0.55)] hover:scale-105 active:scale-95 transition-all cursor-pointer overflow-hidden"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            <Gift className="w-5 h-5 text-[#240C13] group-hover:rotate-12 transition-transform" />
            <span className="relative z-10">{surpriseData.buttonText || "One Last Surprise"}</span>
            <Sparkles className="w-5 h-5 text-[#240C13] animate-spin" style={{ animationDuration: '4s' }} />
          </button>
        </div>

        {/* Closing Signature */}
        <div className="mt-16 text-center text-[#E8C5C8]/70">
          <p className="font-cursive text-3xl text-shimmer-rosegold">With All My Heart, Today & Always</p>
          <p className="font-sans-clean text-xs uppercase tracking-widest text-[#E8C5C8]/50 mt-1">
            26 December • Made with Love for {girlfriendName}
          </p>
        </div>

      </div>

      {/* Grand Love Certificate & Final Secret Message Modal */}
      {showSecretModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-xl w-full rounded-3xl glass-gold-card p-6 sm:p-10 text-center border-2 border-[#E5C158] shadow-[0_25px_80px_rgba(229,193,88,0.4)]">
            
            {/* Close Button */}
            <button
              onClick={() => setShowSecretModal(false)}
              className="absolute top-4 right-4 text-[#E8C5C8] hover:text-[#FFF] text-xl font-bold cursor-pointer"
            >
              ×
            </button>

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#E5C158] to-[#B76E79] flex items-center justify-center mx-auto mb-4 shadow-lg text-[#240C13] animate-bounce">
              <PartyPopper className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5C158]/20 border border-[#E5C158]/50 text-xs font-serif-luxury text-[#F3E5AB] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>A Forever Vow</span>
            </div>

            <h3 className="font-cursive text-3xl sm:text-5xl text-shimmer-gold mb-3">
              {surpriseData.secretMessageTitle || "My Forever Promise to You"}
            </h3>

            {/* Content or Edit Mode */}
            {!isEditingSecret ? (
              <div className="my-6 p-6 rounded-2xl bg-[#FFFDF7] text-[#331118] border-2 border-[#B76E79]/40 shadow-inner text-left relative">
                <button
                  onClick={() => setIsEditingSecret(true)}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-[#B76E79]/10 text-[#8C503A] hover:text-[#B76E79] transition-all cursor-pointer"
                  title="Edit Final Message"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <p className="font-serif-luxury italic text-base sm:text-lg leading-relaxed text-[#3E1A22] pr-6">
                  "{surpriseData.secretMessageContent}"
                </p>

                <div className="mt-4 pt-3 border-t border-[#B76E79]/20 flex items-center justify-between">
                  <span className="font-serif-luxury text-xs text-[#8C503A]/70 uppercase tracking-wider">
                    Written for {girlfriendName}
                  </span>
                  <span className="font-cursive text-2xl text-[#8C503A]">Yours Forever ❤️</span>
                </div>
              </div>
            ) : (
              <div className="my-6 space-y-3 text-left">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={6}
                  className="w-full p-4 rounded-xl border border-[#E5C158]/50 bg-white/90 text-[#331118] font-serif-luxury text-sm leading-relaxed focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditingSecret(false)}
                    className="px-4 py-2 rounded-full text-xs font-sans-clean text-[#E8C5C8] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSecret}
                    className="px-5 py-2 rounded-full text-xs font-serif-luxury text-[#240C13] bg-[#E5C158] font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Message</span>
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowSecretModal(false)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#B76E79] to-[#8C503A] text-white font-serif-luxury text-sm font-semibold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Seal With Love ❤️
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
