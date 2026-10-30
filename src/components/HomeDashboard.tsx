import React, { useState } from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { speechService } from '../utils/speech';
import { NavTab } from './Navigation';
import {
  AlertTriangle,
  Camera,
  CalendarClock,
  MessageSquareWarning,
  BookOpen,
  Volume2,
  VolumeX,
  PhoneCall,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  Activity
} from 'lucide-react';

interface HomeDashboardProps {
  language: Language;
  onNavigate: (tab: NavTab) => void;
  onTriggerSOS: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  language,
  onNavigate,
  onTriggerSOS
}) => {
  const [isPlayingTipAudio, setIsPlayingTipAudio] = useState(false);
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const handlePlaySafetyTip = () => {
    if (isPlayingTipAudio) {
      speechService.stop();
      setIsPlayingTipAudio(false);
      return;
    }

    setIsPlayingTipAudio(true);
    speechService.speak(
      `${t.safetyTipTitle}. ${t.safetyTipBody}`,
      language,
      0.9,
      () => setIsPlayingTipAudio(false),
      () => setIsPlayingTipAudio(false)
    );
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Unmissable Giant Emergency SOS Card */}
      <div className="relative overflow-hidden p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-red-600 via-red-700 to-rose-700 border-2 border-red-400 shadow-2xl shadow-red-900/40 text-white">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-block px-2 py-0.5 rounded-full bg-black/30 text-red-200 text-[10px] font-black uppercase tracking-wider">
              प्लांट आपातकालीन सहायता
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              {t.emergencySos}
            </h2>
            <p className="text-xs sm:text-sm text-red-100 font-medium">
              {t.sosSubtext}
            </p>
          </div>

          <button
            onClick={onTriggerSOS}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-red-600 font-black text-sm sm:text-base flex flex-col items-center justify-center shadow-2xl active:scale-90 transition hover:bg-red-50 flex-shrink-0 border-2 border-red-200"
            aria-label="Activate Emergency SOS"
          >
            <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 fill-red-600 text-white" />
            <span className="text-[11px] font-black tracking-widest mt-0.5">SOS</span>
          </button>
        </div>

        {/* Rapid One-Touch Emergency Buttons */}
        <div className="mt-3 pt-3 border-t border-red-500/50 flex items-center justify-between text-xs font-bold text-red-100">
          <span className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" />
            <span>एम्बुलेंस 102</span>
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" />
            <span>फायर 101</span>
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            <span>सुरक्षा 112</span>
          </span>
        </div>
      </div>

      {/* 2. Today's Worker Status & Live Shift Widget */}
      <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-amber-500/50 text-white shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/40">
              👷
            </div>
            <div>
              <span className="text-xs text-zinc-400 font-bold block">
                {t.welcomeWorker}
              </span>
              <span className="text-sm font-black text-white">
                {t.activeLine}
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ऑन ड्यूटी (Active)</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-800">
          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">
              आज की पाली / Shift
            </span>
            <span className="text-sm font-black text-amber-400 mt-0.5 block">
              दिन पाली (8h) + 2h OT
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 font-bold uppercase block">
              आज की कमाई (2x OT सहित)
            </span>
            <span className="text-sm font-black text-white mt-0.5 block">
              ₹687.50
            </span>
          </div>
        </div>
      </div>

      {/* 3. Safety Rule of the Day with Audio */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold text-amber-400 uppercase tracking-wide">
              {t.safetyTipTitle}
            </h3>
          </div>

          <button
            onClick={handlePlaySafetyTip}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 ${
              isPlayingTipAudio
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-zinc-700'
            }`}
          >
            {isPlayingTipAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isPlayingTipAudio ? t.stopAudio : t.listenAudio}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
          {t.safetyTipBody}
        </p>
      </div>

      {/* 4. Primary Fast Actions 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Action 1: Manual Reader */}
        <button
          onClick={() => onNavigate('manual')}
          className="p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-800 hover:border-amber-400 text-left transition active:scale-98 group shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold mb-3 shadow-md group-hover:scale-105 transition-transform">
            <Camera className="w-6 h-6" />
          </div>
          <h4 className="text-base font-black text-white flex items-center justify-between">
            <span>{t.quickScanManual}</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-xs text-zinc-400 mt-1 leading-snug">
            {t.quickScanDesc}
          </p>
        </button>

        {/* Action 2: Shift Tracker */}
        <button
          onClick={() => onNavigate('shifts')}
          className="p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-800 hover:border-amber-400 text-left transition active:scale-98 group shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold mb-3 shadow-md group-hover:scale-105 transition-transform">
            <CalendarClock className="w-6 h-6" />
          </div>
          <h4 className="text-base font-black text-white flex items-center justify-between">
            <span>{t.quickLogShift}</span>
            <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-xs text-zinc-400 mt-1 leading-snug">
            दिन व रात की शिफ्ट, 2x दर पर ओवरटाइम मजदूरी का पूरा हिसाब
          </p>
        </button>

        {/* Action 3: Grievance Box */}
        <button
          onClick={() => onNavigate('grievance')}
          className="p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-800 hover:border-amber-400 text-left transition active:scale-98 group shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold mb-3 shadow-md group-hover:scale-105 transition-transform">
            <MessageSquareWarning className="w-6 h-6" />
          </div>
          <h4 className="text-base font-black text-white flex items-center justify-between">
            <span>{t.quickReportHazard}</span>
            <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-xs text-zinc-400 mt-1 leading-snug">
            माइक से बोलकर बिना नाम बताए टूटी मशीन या खतरे की गुप्त रिपोर्ट करें
          </p>
        </button>

        {/* Action 4: Resources & Welfare */}
        <button
          onClick={() => onNavigate('resources')}
          className="p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-800 hover:border-amber-400 text-left transition active:scale-98 group shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-3 shadow-md group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <h4 className="text-base font-black text-white flex items-center justify-between">
            <span>{t.navResources}</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </h4>
          <p className="text-xs text-zinc-400 mt-1 leading-snug">
            ई-श्रम, राशन कार्ड, पीएफ बैलेंस SMS, कानूनी अधिकार व मुफ्त हेल्पलाइन
          </p>
        </button>
      </div>

      {/* 5. 24x7 Government Helpline Quick Dial Strip */}
      <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              राष्ट्रीय श्रम व प्रवासी हेल्पलाइन
            </span>
            <span className="text-[11px] text-zinc-400">
              वेतन, बंधक व सुरक्षा विवाद (24x7 निशुल्क)
            </span>
          </div>
        </div>

        <a
          href="tel:14434"
          className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs flex items-center gap-1 shadow transition active:scale-95"
        >
          <span>कॉल 14434</span>
        </a>
      </div>
    </div>
  );
};
