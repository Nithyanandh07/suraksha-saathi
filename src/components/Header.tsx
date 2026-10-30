import React, { useState } from 'react';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../utils/translations';
import { Globe, AlertTriangle, Moon, Sun, Type } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onTriggerSOS: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onFontSizeChange: (size: 'normal' | 'large' | 'xlarge') => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onTriggerSOS,
  fontSize,
  onFontSizeChange,
  isHighContrast,
  onToggleHighContrast
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const cycleFontSize = () => {
    if (fontSize === 'normal') onFontSizeChange('large');
    else if (fontSize === 'large') onFontSizeChange('xlarge');
    else onFontSizeChange('normal');
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950 text-white border-b-2 border-amber-500 shadow-md">
      {/* Top Banner with High-Visibility Hazard Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

      <div className="max-w-4xl mx-auto px-3 py-2.5 flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center font-black text-zinc-950 text-xl shadow-inner border border-amber-300 flex-shrink-0">
            🛡️
          </div>
          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-amber-400 tracking-tight text-lg md:text-xl truncate">
                {t.appName}
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                AI Sathi
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium truncate hidden xs:block">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Action Controls & Emergency SOS */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Font Size Toggle Button */}
          <button
            onClick={cycleFontSize}
            title="Change Text Size"
            className="h-9 px-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-zinc-200 flex items-center gap-1 text-xs font-bold transition active:scale-95"
            aria-label="Toggle Font Size"
          >
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <span>{fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}</span>
          </button>

          {/* High-Contrast / Night Theme Toggle */}
          <button
            onClick={onToggleHighContrast}
            title="Toggle High Contrast"
            className={`h-9 w-9 rounded-lg flex items-center justify-center border transition active:scale-95 ${
              isHighContrast
                ? 'bg-amber-400 border-amber-300 text-zinc-950 font-bold'
                : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-amber-400'
            }`}
            aria-label="Toggle High Contrast"
          >
            {isHighContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="h-9 px-2.5 rounded-lg bg-amber-500/15 border border-amber-500/40 hover:border-amber-400 text-amber-300 flex items-center gap-1.5 text-xs font-bold transition active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="tracking-wide">{currentLangObj.nativeName}</span>
            </button>

            {showLangMenu && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/50"
                  onClick={() => setShowLangMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-zinc-900 border-2 border-amber-500 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider border-b border-zinc-800">
                    भाषा चुनें / Select Language
                  </div>
                  <div className="py-1 flex flex-col gap-1 max-h-64 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          onLanguageChange(item.code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full px-3 py-2 rounded-lg text-left text-sm font-semibold flex items-center justify-between transition ${
                          language === item.code
                            ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                            : 'text-zinc-200 hover:bg-zinc-800'
                        }`}
                      >
                        <span>{item.nativeName}</span>
                        <span className="text-[11px] opacity-75">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Header Emergency SOS Button */}
          <button
            onClick={onTriggerSOS}
            className="h-9 px-3 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-black text-xs tracking-wider flex items-center gap-1.5 shadow-lg shadow-red-600/30 border border-red-400 animate-pulse active:scale-95"
            aria-label="Emergency SOS"
          >
            <AlertTriangle className="w-4 h-4 fill-white text-red-600" />
            <span className="font-extrabold uppercase">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
