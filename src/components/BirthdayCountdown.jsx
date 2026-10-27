import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, Heart, Gift, Flame, PartyPopper } from 'lucide-react';
import { soundEffects } from '../utils/audioSystem';
import confetti from 'canvas-confetti';

export default function BirthdayCountdown({ girlfriendName = "Kavya", config }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isTodayBirthday, setIsTodayBirthday] = useState(false);
  const [forcePreviewBirthday, setForcePreviewBirthday] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Calculate time remaining to 26 December (Indian Standard Time)
  useEffect(() => {
    const calculateTime = () => {
      // Get current date in IST
      const now = new Date();
      // IST offset is UTC+5.5 hours
      const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const currentYear = istTime.getFullYear();
      
      const bMonth = config?.birthdayMonth ? config.birthdayMonth - 1 : 11; // 11 is Dec (0-indexed)
      const bDay = config?.birthdayDay || 26;

      // Check if today is the birthday
      const isToday = (istTime.getMonth() === bMonth && istTime.getDate() === bDay);
      setIsTodayBirthday(isToday);

      // Determine target date
      let targetDate = new Date(currentYear, bMonth, bDay, 0, 0, 0);

      // If today is past Dec 26 23:59:59, roll over to next year
      const endOfBirthday = new Date(currentYear, bMonth, bDay, 23, 59, 59);
      if (istTime.getTime() > endOfBirthday.getTime()) {
        targetDate = new Date(currentYear + 1, bMonth, bDay, 0, 0, 0);
      }

      const diff = targetDate.getTime() - istTime.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config]);

  const activeBirthday = isTodayBirthday || forcePreviewBirthday;

  // Trigger confetti when birthday celebration is active
  useEffect(() => {
    if (activeBirthday) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E5C158', '#B76E79', '#FFD1DC', '#F3E5AB']
        });
      } catch (e) {}
    }
  }, [activeBirthday]);

  // Handle Blow Candle
  const handleBlowCandles = () => {
    if (candlesBlown) return;
    soundEffects.playCandleBlow();
    setCandlesBlown(true);

    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#E5C158', '#B76E79', '#FFF', '#FFB6C1']
      });
    } catch (e) {}
  };

  const handleOpenWishModal = () => {
    setShowWishModal(true);
    setCandlesBlown(false);
  };

  return (
    <section className="relative py-20 px-4 w-full max-w-5xl mx-auto z-20">
      
      {/* Background card styling */}
      <div className="relative rounded-3xl p-6 sm:p-10 glass-panel border border-[#E8C5C8]/30 shadow-[0_20px_60px_rgba(74,14,23,0.5)] overflow-hidden">
        
        {/* Glow corner highlights */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5C158]/15 rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B76E79]/20 rounded-full blur-[70px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">

          {/* Header Title */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B76E79]/20 border border-[#E8C5C8]/30 text-xs font-serif-luxury tracking-wider text-[#FAD2B8] uppercase mb-3">
            <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Counting Down Every Second</span>
          </div>

          <h3 className="font-cursive text-3xl sm:text-5xl text-shimmer-rosegold mb-2 py-2 leading-[1.35] overflow-visible">
            {activeBirthday ? "Today Is Your Special Day! 🎉" : "Countdown to 26 December"}
          </h3>

          <p className="font-sans-clean text-xs sm:text-sm text-[#FAD2B8]/80 max-w-lg mb-8">
            {activeBirthday
              ? `The happiest day of the year is here. Today the world was blessed with ${girlfriendName}! ❤️`
              : `Every second bringing us closer to celebrating the most wonderful person in the world.`}
          </p>

          {/* Normal Countdown View (When not birthday) */}
          {!activeBirthday ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-2xl mb-8">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-2xl glass-gold-card flex flex-col items-center justify-center border border-[#E8C5C8]/30 transition-transform hover:scale-105"
                >
                  <span className="font-display text-3xl sm:text-5xl font-bold text-shimmer-gold drop-shadow-[0_2px_10px_rgba(229,193,88,0.4)]">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="font-serif-luxury text-xs sm:text-sm uppercase tracking-widest text-[#E8C5C8] mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            /* Celebration Card on 26 December */
            <div className="my-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#8C503A]/40 via-[#B76E79]/40 to-[#8C503A]/40 border-2 border-[#E5C158] shadow-[0_0_35px_rgba(229,193,88,0.4)] max-w-xl w-full text-center animate-pulse">
              <PartyPopper className="w-12 h-12 text-[#E5C158] mx-auto mb-2 animate-bounce" />
              <h4 className="font-display text-2xl sm:text-3xl text-[#F3E5AB] font-bold">
                HAPPY BIRTHDAY, KAVYA!
              </h4>
              <p className="font-serif-luxury text-sm text-[#FDE2E4] mt-2 italic">
                "May your day be filled with endless laughter, boundless love, and unforgettable memories!"
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Make a Birthday Wish button */}
            <button
              onClick={handleOpenWishModal}
              className="px-8 py-3.5 rounded-full font-serif-luxury text-sm sm:text-base text-[#240C13] bg-gradient-to-r from-[#F3E5AB] via-[#E5C158] to-[#FAD2B8] font-bold shadow-[0_8px_25px_rgba(229,193,88,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#240C13]" />
              <span>Make a Birthday Wish</span>
            </button>

            {/* Preview Birthday Toggle (Helps test 26 Dec mode) */}
            <button
              onClick={() => setForcePreviewBirthday(!forcePreviewBirthday)}
              className="px-4 py-2.5 rounded-full text-xs font-sans-clean text-[#E8C5C8]/80 hover:text-[#F3E5AB] border border-[#E8C5C8]/30 hover:border-[#E5C158] transition-all flex items-center gap-1.5 cursor-pointer bg-[#240C13]/50"
            >
              <Gift className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>{forcePreviewBirthday ? "Show Normal Countdown" : "Preview 26 Dec Mode"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Birthday Wish Modal with Blowable Candles */}
      {showWishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-lg w-full rounded-3xl glass-gold-card p-6 sm:p-8 text-center border-2 border-[#E5C158]/70 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            
            {/* Close Button */}
            <button
              onClick={() => setShowWishModal(false)}
              className="absolute top-4 right-4 text-[#E8C5C8] hover:text-[#FFF] text-xl font-bold cursor-pointer"
            >
              ×
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5C158]/20 border border-[#E5C158]/50 text-xs font-serif-luxury text-[#F3E5AB] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Special Wish for {girlfriendName}</span>
            </div>

            <h3 className="font-cursive text-3xl sm:text-4xl text-shimmer-gold mb-2">
              {candlesBlown ? "Your Wish Has Been Sent to the Stars! ✨" : "Make a Secret Birthday Wish"}
            </h3>

            {/* Interactive Birthday Cake with Candles */}
            <div className="my-6 flex flex-col items-center">
              <div
                onClick={handleBlowCandles}
                className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 p-4 rounded-2xl ${
                  !candlesBlown ? 'animate-float-gentle' : ''
                }`}
                title="Tap to blow out the candles!"
              >
                {/* Cake SVG */}
                <svg width="140" height="110" viewBox="0 0 140 110" fill="none">
                  {/* Candle 1 */}
                  <rect x="42" y="30" width="6" height="25" rx="3" fill="#FFF" stroke="#E5C158" />
                  {/* Candle 2 (Center) */}
                  <rect x="67" y="24" width="6" height="31" rx="3" fill="#FFF" stroke="#E5C158" />
                  {/* Candle 3 */}
                  <rect x="92" y="30" width="6" height="25" rx="3" fill="#FFF" stroke="#E5C158" />

                  {/* Flames (If not blown) */}
                  {!candlesBlown ? (
                    <g className="animate-pulse">
                      <path d="M45 18 Q42 24 45 28 Q48 24 45 18 Z" fill="#FFB703" filter="drop-shadow(0 0 4px #FFD166)" />
                      <path d="M70 12 Q67 18 70 22 Q73 18 70 12 Z" fill="#FFB703" filter="drop-shadow(0 0 6px #FFD166)" />
                      <path d="M95 18 Q92 24 95 28 Q98 24 95 18 Z" fill="#FFB703" filter="drop-shadow(0 0 4px #FFD166)" />
                    </g>
                  ) : (
                    /* Smoke wisps after blowing */
                    <g opacity="0.6" className="animate-fade-in">
                      <path d="M45 28 Q40 20 44 14" stroke="#E8C5C8" strokeWidth="1.5" fill="none" />
                      <path d="M70 22 Q74 15 69 8" stroke="#E8C5C8" strokeWidth="1.5" fill="none" />
                      <path d="M95 28 Q90 20 96 14" stroke="#E8C5C8" strokeWidth="1.5" fill="none" />
                    </g>
                  )}

                  {/* Cake Top Layer */}
                  <rect x="30" y="55" width="80" height="24" rx="6" fill="#B76E79" />
                  <path d="M30 65 Q40 70 50 65 Q60 70 70 65 Q80 70 90 65 Q100 70 110 65" stroke="#FFF" strokeWidth="3" fill="none" />

                  {/* Cake Bottom Layer */}
                  <rect x="20" y="78" width="100" height="30" rx="6" fill="#8C503A" />
                  <path d="M20 90 Q35 96 50 90 Q65 96 80 90 Q95 96 110 90 Q120 96 120 90" stroke="#F3E5AB" strokeWidth="3" fill="none" />
                </svg>

                <p className="mt-2 text-xs font-serif-luxury tracking-wider text-[#FAD2B8] flex items-center justify-center gap-1.5">
                  <Flame className={`w-3.5 h-3.5 ${candlesBlown ? 'text-gray-400' : 'text-[#E5C158] animate-bounce'}`} />
                  <span>{candlesBlown ? "Candles Blown Out! 🎂" : "Tap the Cake to Blow the Candles! 💨"}</span>
                </p>
              </div>
            </div>

            {/* Revealed Birthday Wish Card */}
            {candlesBlown ? (
              <div className="p-5 rounded-2xl bg-[#380e1a]/90 border border-[#E5C158]/50 text-left animate-fade-in space-y-3">
                <p className="font-serif-luxury italic text-sm sm:text-base text-[#FDE2E4] leading-relaxed">
                  "May every wish your heart whispers today find its way into reality, Kavya. You deserve all the sunshine, happiness, peace, and warmth this universe has to offer. I promise to stand by you, celebrate your victories, and make you smile as brightly as you do today. Happy Birthday, my love! ❤️"
                </p>
                <div className="text-right">
                  <span className="font-cursive text-xl text-[#F3E5AB]">Forever Your Biggest Fan</span>
                </div>
              </div>
            ) : (
              <p className="font-sans-clean text-xs text-[#E8C5C8]/80 italic">
                Close your eyes, think of the deepest wish in your heart, and tap the candles to blow them out...
              </p>
            )}

            <button
              onClick={() => setShowWishModal(false)}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#B76E79]/40 hover:bg-[#B76E79]/70 border border-[#E8C5C8]/40 text-xs font-serif-luxury text-[#FDE2E4] transition-all cursor-pointer"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
