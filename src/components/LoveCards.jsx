import React, { useState } from 'react';
import { 
  Sparkles, 
  HeartHandshake, 
  Gem, 
  Sun, 
  Coffee, 
  Crown, 
  Heart, 
  Mail, 
  CheckCircle2, 
  ChevronRight,
  Smile
} from 'lucide-react';
import { soundEffects } from '../utils/audioSystem';

export default function LoveCards({ config, girlfriendName = "Kavya" }) {
  const [flippedCards, setFlippedCards] = useState({});
  const [openedEnvelopes, setOpenedEnvelopes] = useState({});
  const [activeEnvelopeModal, setActiveEnvelopeModal] = useState(null);

  const iconMap = {
    Sparkles: Sparkles,
    HeartHandshake: HeartHandshake,
    Gem: Gem,
    Sun: Sun,
    Coffee: Coffee,
    Crown: Crown
  };

  const littleThings = config?.littleThingsCards || [];
  const openWhen = config?.openWhenEnvelopes || [];

  const handleCardClick = (id) => {
    soundEffects.playHeartHit();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleEnvelopeClick = (envelope) => {
    soundEffects.playSealCrack();
    setOpenedEnvelopes((prev) => ({ ...prev, [envelope.id]: true }));
    setActiveEnvelopeModal(envelope);
  };

  return (
    <section className="relative py-24 px-4 w-full max-w-6xl mx-auto z-20">
      
      {/* ================= SECTION 1: LITTLE THINGS I LOVE ABOUT YOU ================= */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B76E79]/20 border border-[#E8C5C8]/30 text-xs font-serif-luxury tracking-widest uppercase text-[#F3E5AB] mb-4">
          <Heart className="w-3.5 h-3.5 text-[#B76E79] fill-[#B76E79]" />
          <span>Reasons My Heart Chose You</span>
        </div>

        <h3 className="font-cursive text-4xl sm:text-6xl text-shimmer-rosegold mb-3">
          Little Things I Love About You
        </h3>

        <p className="font-sans-clean text-xs sm:text-sm text-[#FAD2B8]/80 leading-relaxed max-w-md mx-auto">
          Out of a million reasons why you mean the world to me, here are six that always make my heart skip a beat. Tap each card to reveal my thoughts.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {littleThings.map((card) => {
          const IconComp = iconMap[card.icon] || Sparkles;
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`group relative rounded-3xl p-6 sm:p-7 glass-panel border border-[#E8C5C8]/30 shadow-[0_10px_35px_rgba(74,14,23,0.4)] cursor-pointer transition-all duration-500 hover:border-[#E5C158] hover:shadow-[0_15px_45px_rgba(183,110,121,0.5)] ${
                isFlipped ? 'bg-gradient-to-br from-[#4A0E17]/90 via-[#350A10] to-[#200408]' : 'hover:-translate-y-1.5'
              }`}
            >
              {/* Glowing Corner Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#B76E79]/30 to-[#E5C158]/30 border border-[#E5C158]/50 flex items-center justify-center text-[#F3E5AB] group-hover:scale-110 transition-transform shadow-inner">
                  <IconComp className="w-6 h-6 text-[#F3E5AB]" />
                </div>

                <div className="text-[11px] font-serif-luxury tracking-widest uppercase text-[#E8C5C8]/70 flex items-center gap-1">
                  <span>{isFlipped ? "Tap to flip back" : "Tap to reveal"}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5C158]" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#F3E5AB] font-semibold mb-1 group-hover:text-shimmer-gold transition-colors">
                {card.title}
              </h4>

              <p className="font-sans-clean text-xs text-[#E8C5C8]/70 italic mb-4">
                {card.subtitle}
              </p>

              {/* Revealed Romantic Thought */}
              <div className={`transition-all duration-500 overflow-hidden ${
                isFlipped ? 'max-h-60 opacity-100 pt-3 border-t border-[#E8C5C8]/20' : 'max-h-20 opacity-90'
              }`}>
                <p className="font-serif-luxury italic text-sm text-[#FDE2E4] leading-relaxed">
                  "{card.text}"
                </p>
              </div>

              {/* Bottom Subtle Shimmer */}
              <div className="mt-4 flex items-center justify-between pt-2">
                <span className="w-10 h-[1px] bg-gradient-to-r from-[#B76E79] to-transparent" />
                <Heart className={`w-3.5 h-3.5 ${isFlipped ? 'text-[#E5C158] fill-[#E5C158]' : 'text-[#B76E79]/40'}`} />
              </div>
            </div>
          );
        })}
      </div>


      {/* ================= SECTION 2: OPEN WHEN YOU NEED A SMILE ================= */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C503A]/20 border border-[#E5C158]/40 text-xs font-serif-luxury tracking-widest uppercase text-[#F3E5AB] mb-4">
          <Smile className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Little Pockets of Comfort</span>
        </div>

        <h3 className="font-cursive text-4xl sm:text-6xl text-shimmer-gold mb-3">
          Open When You Need a Smile
        </h3>

        <p className="font-sans-clean text-xs sm:text-sm text-[#FAD2B8]/80 leading-relaxed max-w-md mx-auto">
          Life has different seasons, but my love for you is steady in all of them. Keep these virtual letters close, and open whichever one you need today.
        </p>
      </div>

      {/* Mini Envelopes Carousel/Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {openWhen.map((env) => {
          const isOpened = !!openedEnvelopes[env.id];

          return (
            <div
              key={env.id}
              onClick={() => handleEnvelopeClick(env)}
              className="group relative rounded-2xl p-5 bg-gradient-to-br from-[#2D0D15] via-[#240C13] to-[#170509] border border-[#E8C5C8]/30 hover:border-[#E5C158] shadow-[0_8px_30px_rgba(74,14,23,0.4)] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(229,193,88,0.3)] flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#B76E79]/20 border border-[#E8C5C8]/40 flex items-center justify-center text-[#F3E5AB]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans-clean uppercase tracking-widest text-[#E8C5C8]/60">
                      Open When...
                    </span>
                    <h5 className="font-serif-luxury text-base text-[#FDE2E4] font-medium group-hover:text-[#F3E5AB] transition-colors">
                      {env.label}
                    </h5>
                  </div>
                </div>

                {isOpened && (
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] mt-1 shrink-0" />
                )}
              </div>

              {/* Envelope Flap Accent */}
              <div className="mt-4 pt-3 border-t border-[#E8C5C8]/15 flex items-center justify-between text-xs font-serif-luxury text-[#E8C5C8]/80">
                <span className="flex items-center gap-1 text-[#FAD2B8]">
                  <Sparkles className="w-3 h-3 text-[#E5C158]" />
                  <span>Click to Unfold</span>
                </span>
                <span className="font-cursive text-base text-[#B76E79]">For {girlfriendName}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Opened "Open When" Envelope */}
      {activeEnvelopeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-lg w-full rounded-3xl glass-gold-card p-6 sm:p-8 text-center border-2 border-[#E5C158]/70 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            
            <button
              onClick={() => setActiveEnvelopeModal(null)}
              className="absolute top-4 right-4 text-[#E8C5C8] hover:text-[#FFF] text-xl font-bold cursor-pointer"
            >
              ×
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5C158]/20 border border-[#E5C158]/50 text-xs font-serif-luxury text-[#F3E5AB] mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>{activeEnvelopeModal.label}</span>
            </div>

            <h4 className="font-cursive text-3xl sm:text-4xl text-shimmer-gold mb-4">
              A Gentle Reminder
            </h4>

            <div className="p-6 rounded-2xl bg-[#FFFDF7] text-[#331118] border-2 border-[#B76E79]/40 shadow-inner text-left space-y-3">
              <p className="font-serif-luxury italic text-base sm:text-lg leading-relaxed text-[#3E1A22]">
                "{activeEnvelopeModal.message}"
              </p>
              <div className="text-right pt-2 border-t border-[#B76E79]/20">
                <span className="font-cursive text-2xl text-[#8C503A]">Always by your side ❤️</span>
              </div>
            </div>

            <button
              onClick={() => setActiveEnvelopeModal(null)}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#B76E79]/40 hover:bg-[#B76E79]/70 border border-[#E8C5C8]/40 text-xs font-serif-luxury text-[#FDE2E4] transition-all cursor-pointer"
            >
              Keep This In My Heart
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
