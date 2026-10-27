import React, { useState } from 'react';
import { Settings, Save, RotateCcw, X, Heart, Music, Check, Sparkles } from 'lucide-react';
import { defaultBirthdayConfig } from '../config/birthdayData';

export default function CustomizationModal({ isOpen, onClose, config, onSaveConfig }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    girlfriendName: config?.girlfriendName || "Kavya",
    partnerName: config?.partnerName || "Yours",
    birthdayDay: config?.birthdayDay || 26,
    birthdayMonth: config?.birthdayMonth || 12,
    customMusicUrl: config?.customMusicUrl || "",
    landingTitle: config?.landing?.title || "A Little Universe Made Just for You, Kavya ❤️",
    landingSubtitle: config?.landing?.subtitle || "Some surprises are too special to reveal all at once…",
    welcomeHeading: config?.welcome?.heading || "Happy Birthday, My Love ❤️",
    welcomeQuote: config?.welcome?.quote || "If I could give you one thing in life, I would give you the ability to see yourself through my eyes. Only then would you realise how incredibly special you are to me."
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updated = {
      ...config,
      girlfriendName: formData.girlfriendName,
      partnerName: formData.partnerName,
      birthdayDay: parseInt(formData.birthdayDay, 10),
      birthdayMonth: parseInt(formData.birthdayMonth, 10),
      customMusicUrl: formData.customMusicUrl,
      landing: {
        ...config.landing,
        title: formData.landingTitle,
        subtitle: formData.landingSubtitle
      },
      welcome: {
        ...config.welcome,
        heading: formData.welcomeHeading,
        quote: formData.welcomeQuote
      }
    };

    onSaveConfig(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 700);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all customizations back to Kavya's original birthday settings?")) {
      onSaveConfig(defaultBirthdayConfig);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl glass-gold-card p-6 sm:p-8 border-2 border-[#E5C158]/70 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-[#FDE2E4]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#E8C5C8] hover:text-white p-1 rounded-full cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#E5C158]/20 border border-[#E5C158] flex items-center justify-center text-[#F3E5AB]">
            <Settings className="w-5 h-5 text-[#E5C158]" />
          </div>
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#F3E5AB]">
              Personalize Kavya's Surprise Website
            </h3>
            <p className="text-xs font-sans-clean text-[#E8C5C8]/70">
              Customize names, messages, birthday dates, or custom soundtrack
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5 text-left text-xs sm:text-sm font-sans-clean">
          
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#E8C5C8] font-medium mb-1">Girlfriend's Name</label>
              <input
                type="text"
                name="girlfriendName"
                value={formData.girlfriendName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#240C13]/90 border border-[#E8C5C8]/40 text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <div>
              <label className="block text-[#E8C5C8] font-medium mb-1">Your Name / Signature</label>
              <input
                type="text"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#240C13]/90 border border-[#E8C5C8]/40 text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>
          </div>

          {/* Birthday Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#E8C5C8] font-medium mb-1">Birthday Day (1-31)</label>
              <input
                type="number"
                min="1"
                max="31"
                name="birthdayDay"
                value={formData.birthdayDay}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#240C13]/90 border border-[#E8C5C8]/40 text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <div>
              <label className="block text-[#E8C5C8] font-medium mb-1">Birthday Month (1-12)</label>
              <input
                type="number"
                min="1"
                max="12"
                name="birthdayMonth"
                value={formData.birthdayMonth}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#240C13]/90 border border-[#E8C5C8]/40 text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>
          </div>

          {/* Custom Background Music URL */}
          <div>
            <label className="block text-[#E8C5C8] font-medium mb-1 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Custom Romantic Song URL (Optional MP3)</span>
            </label>
            <input
              type="url"
              name="customMusicUrl"
              placeholder="Leave empty to use built-in procedural romantic piano soundtrack"
              value={formData.customMusicUrl}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#240C13]/90 border border-[#E8C5C8]/40 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          {/* Landing Title */}
          <div>
            <label className="block text-[#E8C5C8] font-medium mb-1">Landing Page Heading</label>
            <input
              type="text"
              name="landingTitle"
              value={formData.landingTitle}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#240C13]/90 border border-[#E8C5C8]/40 text-white focus:outline-none focus:border-[#E5C158]"
            />
          </div>

          {/* Welcome Screen Quote */}
          <div>
            <label className="block text-[#E8C5C8] font-medium mb-1">Romantic Quote (Welcome Section)</label>
            <textarea
              name="welcomeQuote"
              value={formData.welcomeQuote}
              onChange={handleChange}
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#240C13]/90 border border-[#E8C5C8]/40 text-white focus:outline-none focus:border-[#E5C158]"
            />
          </div>

        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-4 border-t border-[#E8C5C8]/20 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2 rounded-full text-xs font-sans-clean text-[#E8C5C8]/70 hover:text-white border border-[#E8C5C8]/30 hover:border-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Original</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-sans-clean text-[#E8C5C8] hover:text-white cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-7 py-2.5 rounded-full font-serif-luxury text-sm text-[#240C13] bg-gradient-to-r from-[#F3E5AB] via-[#E5C158] to-[#FAD2B8] font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-green-800" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#240C13]" />
                  <span>Save & Apply</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
