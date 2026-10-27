import React, { useState } from 'react';
import { 
  Camera, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2 
} from 'lucide-react';
import { soundEffects } from '../utils/audioSystem';
import { defaultBirthdayConfig } from '../config/birthdayData';

export default function MemoriesGallery({ config, girlfriendName = "Kavya" }) {
  const memories = config?.memories?.length ? config.memories : defaultBirthdayConfig.memories;

  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const handleNext = () => {
    soundEffects.playHeartHit();
    setActiveIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    soundEffects.playHeartHit();
    setActiveIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const activePhoto = memories[activeIndex] || memories[0];

  return (
    <section className="relative py-24 px-4 w-full max-w-6xl mx-auto z-20">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B76E79]/20 border border-[#E8C5C8]/30 text-xs font-serif-luxury tracking-widest uppercase text-[#F3E5AB] mb-4">
          <Camera className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Timeless Keepsakes</span>
        </div>

        <h3 className="font-cursive text-4xl sm:text-6xl text-shimmer-rosegold mb-3">
          Our Memories Gallery
        </h3>

        <p className="font-sans-clean text-xs sm:text-sm text-[#FAD2B8]/80 leading-relaxed max-w-lg mx-auto">
          Every picture tells the story of how you brought magic into my life. Beautiful snapshots etched in my heart forever.
        </p>

        {/* View Toggle */}
        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center rounded-full bg-[#240C13]/80 border border-[#E8C5C8]/30 p-1 shadow-md">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans-clean transition-all cursor-pointer ${
                viewMode === 'carousel' ? 'bg-[#B76E79] text-white shadow' : 'text-[#E8C5C8]/70 hover:text-white'
              }`}
            >
              Polaroid Carousel
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans-clean transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#B76E79] text-white shadow' : 'text-[#E8C5C8]/70 hover:text-white'
              }`}
            >
              Scrapbook Grid
            </button>
          </div>
        </div>
      </div>

      {/* Main Gallery Area */}
      {memories.length > 0 && viewMode === 'carousel' ? (
        /* ================= CAROUSEL VIEW ================= */
        <div className="relative max-w-xl mx-auto flex flex-col items-center">
          
          {/* Main Polaroid Frame */}
          <div
            onClick={() => setLightboxPhoto(activePhoto)}
            className="relative cursor-pointer w-full max-w-sm sm:max-w-md p-4 sm:p-5 rounded-2xl bg-[#FFFDF7] text-[#331118] border-2 border-[#8C503A]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform rotate-[-1deg] hover:rotate-0 hover:scale-[1.02] transition-all duration-300"
          >
            {/* Bronze Washi Tape on Top */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#8C503A]/60 backdrop-blur-sm border-l border-r border-[#E5C158]/50 shadow-sm transform -rotate-1 rounded-sm" />

            {/* Photo Container formatted for vertical portraits */}
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-lg overflow-hidden bg-neutral-900 border border-[#8C503A]/30">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />

              {/* Heart Badge */}
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#B76E79]/80 backdrop-blur-sm text-[10px] font-sans-clean text-white flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 fill-white" />
                <span>Memory #{activeIndex + 1}</span>
              </span>

              {/* Expand Lightbox Icon */}
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/50 text-white/80 hover:text-white">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Polaroid Bottom Notes with User's Exact Quotes */}
            <div className="pt-4 pb-2 px-1 text-center">
              <h4 className="font-cursive text-2xl sm:text-3xl text-[#8C503A] font-bold">
                {activePhoto.title}
              </h4>
              <p className="font-handwriting text-base sm:text-xl text-[#5A3326] mt-1 px-1 leading-relaxed">
                "{activePhoto.caption}"
              </p>
              <div className="mt-2 text-[11px] font-sans-clean uppercase tracking-wider text-[#8C503A]/60 flex items-center justify-center gap-1.5">
                <span>{activePhoto.date}</span>
                <span>•</span>
                <span>For {girlfriendName} ❤️</span>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Arrows & Dots */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-[#240C13]/80 border border-[#E8C5C8]/30 hover:border-[#E5C158] text-[#F3E5AB] transition-all hover:scale-110 shadow-md cursor-pointer"
              title="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {memories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundEffects.playHeartHit();
                    setActiveIndex(idx);
                  }}
                  className={`rounded-full transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'w-6 h-2.5 bg-[#E5C158]'
                      : 'w-2.5 h-2.5 bg-[#E8C5C8]/30 hover:bg-[#E8C5C8]/60'
                  }`}
                  title={`Photo ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-[#240C13]/80 border border-[#E8C5C8]/30 hover:border-[#E5C158] text-[#F3E5AB] transition-all hover:scale-110 shadow-md cursor-pointer"
              title="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      ) : (
        /* ================= SCRAPBOOK GRID VIEW ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {memories.map((photo, idx) => {
            const rot = (idx % 3 === 0 ? '-2deg' : idx % 3 === 1 ? '1.5deg' : '-1deg');
            return (
              <div
                key={photo.id}
                onClick={() => setLightboxPhoto(photo)}
                className="group relative cursor-pointer p-4 rounded-2xl bg-[#FFFDF7] text-[#331118] border border-[#8C503A]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:z-10"
                style={{ transform: `rotate(${rot})` }}
              >
                {/* Image */}
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-neutral-900 border border-[#8C503A]/20">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#B76E79]/80 text-[9px] font-sans-clean text-white">
                    #{idx + 1}
                  </span>
                </div>

                {/* Caption with User's Exact Quotes */}
                <div className="pt-3 pb-1 text-center">
                  <h5 className="font-cursive text-xl text-[#8C503A] font-bold">
                    {photo.title}
                  </h5>
                  <p className="font-handwriting text-sm sm:text-base text-[#5A3326] mt-1 leading-snug">
                    "{photo.caption}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {lightboxPhoto && (
        <div 
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* High-res photo container */}
            <div className="relative max-h-[72vh] w-full rounded-2xl overflow-hidden border-2 border-[#E5C158]/60 shadow-[0_20px_70px_rgba(0,0,0,0.9)] bg-black/50 flex items-center justify-center">
              <img
                src={lightboxPhoto.imageUrl}
                alt={lightboxPhoto.title}
                className="w-full h-full max-h-[72vh] object-contain"
              />
            </div>

            {/* Romantic Lightbox Caption Card with User's Quote */}
            <div className="mt-4 p-5 rounded-2xl glass-panel w-full text-center border border-[#E8C5C8]/30">
              <h4 className="font-cursive text-3xl text-shimmer-gold mb-1">
                {lightboxPhoto.title}
              </h4>
              <p className="font-handwriting text-lg sm:text-2xl text-[#FDE2E4] leading-relaxed">
                "{lightboxPhoto.caption}"
              </p>
              <div className="mt-2 text-xs font-sans-clean text-[#E8C5C8]/60 uppercase tracking-widest">
                {lightboxPhoto.date} • A Chapter in Our Love Story
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
