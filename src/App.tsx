/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Header } from './components/Header';
import { Navigation, NavTab } from './components/Navigation';
import { HomeDashboard } from './components/HomeDashboard';
import { SafetyManualReader } from './components/SafetyManualReader';
import { ShiftWageTracker } from './components/ShiftWageTracker';
import { GrievanceBox } from './components/GrievanceBox';
import { ResourcesSection } from './components/ResourcesSection';
import { SOSModal } from './components/SOSModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AlertTriangle } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('suraksha_lang');
    return (saved as Language) || 'hi';
  });

  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('suraksha_lang', language);
  }, [language]);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-[17px]';
      case 'xlarge':
        return 'text-[19px]';
      default:
        return 'text-[15px]';
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isHighContrast
          ? 'bg-black text-yellow-300'
          : 'bg-zinc-950 text-zinc-100'
      } ${getFontSizeClass()} selection:bg-amber-500 selection:text-zinc-950`}
    >
      {/* Sticky Header with SOS & Language Switcher */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onTriggerSOS={() => setIsSOSOpen(true)}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
      />

      {/* Offline Status & Connectivity Sync Bar */}
      <OfflineIndicator language={language} />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 pt-3 pb-24">
        {currentTab === 'home' && (
          <HomeDashboard
            language={language}
            onNavigate={(tab) => setCurrentTab(tab)}
            onTriggerSOS={() => setIsSOSOpen(true)}
          />
        )}

        {currentTab === 'manual' && (
          <SafetyManualReader language={language} />
        )}

        {currentTab === 'shifts' && (
          <ShiftWageTracker language={language} />
        )}

        {currentTab === 'grievance' && (
          <GrievanceBox language={language} />
        )}

        {currentTab === 'resources' && (
          <ResourcesSection language={language} />
        )}
      </main>

      {/* Persistent Floating Emergency SOS Beacon (Visible in all tabs) */}
      <button
        onClick={() => setIsSOSOpen(true)}
        className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 active:scale-90 text-white font-black text-xs flex flex-col items-center justify-center shadow-2xl shadow-red-700/60 border-2 border-red-300 animate-bounce active:animate-none transition"
        aria-label="Instant Emergency SOS"
      >
        <AlertTriangle className="w-6 h-6 fill-white text-red-600" />
        <span className="text-[9px] font-black tracking-tighter uppercase leading-none mt-0.5">SOS</span>
      </button>

      {/* Bottom Accessible Tab Bar */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
      />

      {/* Full-Screen Emergency Siren & Dispatch Modal */}
      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        language={language}
      />
    </div>
  );
}
