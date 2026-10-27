import React, { useState, useEffect, useRef } from 'react';
import { defaultBirthdayConfig } from './config/birthdayData';
import { musicPlayer } from './utils/audioSystem';
import HeartRainCanvas from './components/HeartRainCanvas';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import BowArrowChallenge from './components/BowArrowChallenge';
import BirthdayWelcome from './components/BirthdayWelcome';
import BirthdayCountdown from './components/BirthdayCountdown';
import HeartTreeOfLove from './components/HeartTreeOfLove';
import LoveLetter from './components/LoveLetter';
import LoveCards from './components/LoveCards';
import MemoriesGallery from './components/MemoriesGallery';
import FinalSurprise from './components/FinalSurprise';
import CustomizationModal from './components/CustomizationModal';

export default function App() {
  // Load configuration from localStorage or default, ensuring latest real memories
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('kavya_birthday_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          memories: defaultBirthdayConfig.memories
        };
      }
    } catch (e) {}
    return defaultBirthdayConfig;
  });

  // Stages: 'landing' -> 'challenge' -> 'main'
  const [currentStage, setCurrentStage] = useState('landing');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [heartRainActive, setHeartRainActive] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const welcomeRef = useRef(null);

  // Save config changes to localStorage
  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('kavya_birthday_config', JSON.stringify(newConfig));
    } catch (e) {}
  };

  // Stage transitions
  const handleEnterFromLanding = () => {
    setCurrentStage('challenge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Start gentle music if not yet playing
    if (!isMusicPlaying) {
      musicPlayer.start(volume, config.customMusicUrl);
      setIsMusicPlaying(true);
    }
  };

  const handleCompleteChallenge = () => {
    setCurrentStage('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSkipChallenge = () => {
    setCurrentStage('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToExplore = () => {
    const nextElem = document.getElementById('birthday-countdown-section');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#140307] text-[#FDE2E4] font-sans-clean overflow-x-hidden selection:bg-[#B76E79]/40 selection:text-white">
      
      {/* 1. Endless Falling Heart Rain (Active throughout the entire site) */}
      <HeartRainCanvas isEnabled={heartRainActive} density="medium" />

      {/* 2. Floating Navbar & Audio Controller */}
      <Navbar
        currentStage={currentStage}
        setStage={setCurrentStage}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
        volume={volume}
        setVolume={setVolume}
        heartRainActive={heartRainActive}
        setHeartRainActive={setHeartRainActive}
        girlfriendName={config.girlfriendName}
      />

      {/* 3. STAGE 1: Magical Landing Page */}
      {currentStage === 'landing' && (
        <LandingPage
          onEnter={handleEnterFromLanding}
          girlfriendName={config.girlfriendName}
          config={config}
        />
      )}

      {/* 4. STAGE 2: Bow and Arrow Heart Challenge */}
      {currentStage === 'challenge' && (
        <BowArrowChallenge
          onComplete={handleCompleteChallenge}
          onSkip={handleSkipChallenge}
          girlfriendName={config.girlfriendName}
          config={config}
        />
      )}

      {/* 5. STAGE 3: Main Birthday Website */}
      {currentStage === 'main' && (
        <main className="relative w-full flex flex-col items-center">
          
          {/* Main Birthday Welcome Screen */}
          <div ref={welcomeRef} className="w-full">
            <BirthdayWelcome
              config={config}
              girlfriendName={config.girlfriendName}
              onExploreClick={handleScrollToExplore}
            />
          </div>

          {/* Birthday Countdown & Interactive Special Wish */}
          <div id="birthday-countdown-section" className="w-full">
            <BirthdayCountdown
              config={config}
              girlfriendName={config.girlfriendName}
            />
          </div>

          {/* Growing Heart Tree of Love */}
          <div id="heart-tree-section" className="w-full">
            <HeartTreeOfLove
              config={config}
              girlfriendName={config.girlfriendName}
            />
          </div>

          {/* Interactive Love Letter */}
          <div id="love-letter-section" className="w-full">
            <LoveLetter
              config={config}
              girlfriendName={config.girlfriendName}
              onSaveConfig={handleSaveConfig}
            />
          </div>

          {/* Romantic Love Messages & Surprise Cards */}
          <div id="love-cards-section" className="w-full">
            <LoveCards
              config={config}
              girlfriendName={config.girlfriendName}
            />
          </div>

          {/* Our Memories Gallery */}
          <div id="memories-section" className="w-full">
            <MemoriesGallery
              config={config}
              girlfriendName={config.girlfriendName}
            />
          </div>

          {/* Final Cinematic Surprise */}
          <div id="final-surprise-section" className="w-full">
            <FinalSurprise
              config={config}
              girlfriendName={config.girlfriendName}
              onSaveConfig={handleSaveConfig}
            />
          </div>

        </main>
      )}

    </div>
  );
}
