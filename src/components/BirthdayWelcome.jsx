import React from 'react';
import { Heart, Sparkles, Calendar, ChevronDown } from 'lucide-react';

export default function BirthdayWelcome({ config, girlfriendName = "Kavya", onExploreClick }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      
      {/* Subtle luxury background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#b76e79_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-tr from-[#8C503A]/25 via-[#B76E79]/30 to-[#E5C158]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#4A0E17]/40 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Date Monogram Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-panel border border-[#E5C158]/50 shadow-[0_0_20px_rgba(229,193,88,0.2)] mb-8 animate-fade-in">
          <Calendar className="w-4 h-4 text-[#E5C158]" />
          <span className="font-serif-luxury tracking-widest text-xs sm:text-sm text-[#F3E5AB] uppercase">
            {config?.welcome?.dateSubtitle || "26 December — The Day My Favourite Person Was Born"}
          </span>
          <Heart className="w-3.5 h-3.5 text-[#B76E79] fill-[#B76E79]" />
        </div>

        {/* Romantic Cursive Heading */}
        <h2 className="font-cursive text-4xl sm:text-6xl md:text-7xl font-bold py-4 px-3 leading-[1.4] overflow-visible inline-flex items-center justify-center gap-3 drop-shadow-[0_4px_18px_rgba(183,110,121,0.5)]">
          <span className="text-shimmer-rosegold inline-block py-1">
            {config?.welcome?.heading?.replace(/❤️/g, '').trim() || "Happy Birthday, My Love"}
          </span>
          <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-[#FF6B8B] fill-[#FF6B8B] animate-pulse shrink-0 drop-shadow-[0_2px_10px_rgba(255,107,139,0.5)]" />
        </h2>

        {/* Her Name in Dazzling Gold Shimmer */}
        <div className="my-6 relative py-2">
          {/* Subtle gold halo behind name */}
          <div className="absolute inset-0 bg-[#E5C158]/20 blur-2xl rounded-full transform scale-110" />

          {/* Decorative Filigree Lines */}
          <div className="flex items-center justify-center gap-4">
            <span className="hidden sm:inline-block w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#E5C158] to-[#F3E5AB]" />
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-wider text-shimmer-gold uppercase drop-shadow-[0_10px_25px_rgba(229,193,88,0.4)]">
              {girlfriendName}
            </h1>
            <span className="hidden sm:inline-block w-16 sm:w-28 h-[1px] bg-gradient-to-l from-transparent via-[#E5C158] to-[#F3E5AB]" />
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-2 text-[#F3E5AB]">
            <Sparkles className="w-4 h-4 animate-spin text-[#E5C158]" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-serif-luxury tracking-widest uppercase text-[#E8C5C8]">
              Queen of My Heart
            </span>
            <Sparkles className="w-4 h-4 animate-spin text-[#E5C158]" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Romantic Message Card */}
        <div className="mt-8 max-w-2xl px-6 sm:px-10 py-8 rounded-3xl glass-panel border border-[#E8C5C8]/30 shadow-[0_15px_45px_rgba(74,14,23,0.5)] text-center relative group hover:border-[#E5C158]/50 transition-all duration-500">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-[#380e1a] border border-[#E8C5C8]/40 text-[11px] font-serif-luxury tracking-wider text-[#FAD2B8] flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-[#B76E79] fill-[#B76E79]" />
            <span>My Heart's Whisper</span>
          </div>

          <p className="font-serif-luxury italic text-lg sm:text-2xl text-[#FDE2E4] leading-relaxed">
            "{config?.welcome?.quote || "If I could give you one thing in life, I would give you the ability to see yourself through my eyes. Only then would you realise how incredibly special you are to me."}"
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-[#B76E79]/40" />
            <span className="font-cursive text-xl text-[#F3E5AB]">Forever Yours</span>
            <span className="w-8 h-[1px] bg-[#B76E79]/40" />
          </div>
        </div>

        {/* Scroll / Explore Invitation */}
        <button
          onClick={onExploreClick}
          className="mt-14 inline-flex flex-col items-center gap-2 text-[#E8C5C8]/80 hover:text-[#F3E5AB] transition-colors group cursor-pointer"
        >
          <span className="text-xs font-serif-luxury tracking-widest uppercase">
            Scroll to Explore Your Surprises
          </span>
          <div className="w-9 h-9 rounded-full border border-[#E8C5C8]/30 group-hover:border-[#E5C158] flex items-center justify-center transition-all bg-[#240C13]/60 group-hover:translate-y-1">
            <ChevronDown className="w-4 h-4 text-[#F3E5AB] animate-bounce" />
          </div>
        </button>

      </div>
    </section>
  );
}
