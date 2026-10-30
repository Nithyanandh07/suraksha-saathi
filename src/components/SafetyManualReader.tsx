import React, { useState } from 'react';
import { Language, SafetySignAnalysis, HazardLevel } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { PRESET_SIGNS } from '../data/mockData';
import { speechService } from '../utils/speech';
import { offlineStorage } from '../utils/offlineStorage';
import {
  Camera,
  Upload,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  Loader2,
  Sparkles,
  FileText,
  RotateCcw
} from 'lucide-react';

interface SafetyManualReaderProps {
  language: Language;
}

export const SafetyManualReader: React.FC<SafetyManualReaderProps> = ({ language }) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('nip_point');
  const [customText, setCustomText] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<SafetySignAnalysis | null>(
    PRESET_SIGNS[0].analysis[language] || PRESET_SIGNS[0].analysis.en
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Whenever language changes, if showing a preset, update the localized analysis
  React.useEffect(() => {
    const currentPreset = PRESET_SIGNS.find((p) => p.id === selectedPreset);
    if (currentPreset && !uploadedImage && !customText) {
      setAnalysis(currentPreset.analysis[language] || currentPreset.analysis.hi || currentPreset.analysis.en);
    }
  }, [language, selectedPreset, uploadedImage, customText]);

  // Handle Preset Selection
  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setUploadedImage(null);
    setCustomText('');
    const preset = PRESET_SIGNS.find((p) => p.id === presetId);
    if (preset) {
      const localized = preset.analysis[language] || preset.analysis.hi || preset.analysis.en;
      setAnalysis(localized);
      // Automatically read out audio for low-literacy workers
      handlePlayAudio(localized.audioScript);
    }
  };

  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setUploadedImage(base64);
        analyzeContent(base64, '');
      };
      reader.readAsDataURL(file);
    }
  };

  // Call Server-side Gemini API or fallback
  const analyzeContent = async (base64Img: string | null, text: string) => {
    setLoading(true);
    speechService.stop();
    setIsPlayingAudio(false);

    try {
      const res = await fetch('/api/analyze-safety-manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Img,
          textContent: text,
          targetLanguage: language,
          signPreset: selectedPreset
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAnalysis(json.data);
        if (json.data.audioScript) {
          handlePlayAudio(json.data.audioScript);
        }
      }
    } catch (err) {
      console.warn('Network offline or analysis error, loading from local cache:', err);
      // Retrieve instant localized manual from offline storage
      const cached = offlineStorage.getCachedSafetyManual(selectedPreset, language);
      if (cached) {
        setAnalysis(cached);
        if (cached.audioScript) {
          handlePlayAudio(cached.audioScript);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Play audio readout
  const handlePlayAudio = (script?: string) => {
    const textToSpeak = script || analysis?.audioScript || analysis?.explanation;
    if (!textToSpeak) return;

    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    speechService.speak(
      textToSpeak,
      language,
      0.9,
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const getHazardBadge = (level: HazardLevel = 'DANGER') => {
    switch (level) {
      case 'DANGER':
        return {
          bg: 'bg-red-600',
          text: 'text-white',
          border: 'border-red-400',
          label: language === 'hi' ? 'खतरा (DANGER)' : language === 'ta' ? 'ஆபத்து (DANGER)' : 'DANGER'
        };
      case 'WARNING':
        return {
          bg: 'bg-orange-500',
          text: 'text-zinc-950 font-black',
          border: 'border-orange-300',
          label: language === 'hi' ? 'चेतावनी (WARNING)' : language === 'ta' ? 'எச்சரிக்கை (WARNING)' : 'WARNING'
        };
      case 'CAUTION':
        return {
          bg: 'bg-amber-400',
          text: 'text-zinc-950 font-black',
          border: 'border-amber-300',
          label: language === 'hi' ? 'सावधानी (CAUTION)' : 'CAUTION'
        };
      default:
        return {
          bg: 'bg-blue-600',
          text: 'text-white',
          border: 'border-blue-400',
          label: language === 'hi' ? 'अनिवार्य नियम (MANDATORY)' : 'MANDATORY'
        };
    }
  };

  const badge = getHazardBadge(analysis?.hazardLevel);

  return (
    <div className="space-y-4 pb-20">
      {/* Title & Overview Card */}
      <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-amber-500/40 text-white shadow-lg">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-400 flex items-center gap-2">
              <Camera className="w-6 h-6 text-amber-400" />
              <span>{t.manualScannerTitle}</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
              {t.manualScannerDesc}
            </p>
          </div>
          <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30 flex-shrink-0">
            AI Multilingual
          </span>
        </div>

        {/* Input Methods: Camera Snap & File Upload */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label className="cursor-pointer py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-black text-sm flex items-center justify-center gap-2 shadow-md transition">
            <Camera className="w-5 h-5" />
            <span>{t.takePhoto}</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <label className="cursor-pointer py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-100 font-bold text-sm flex items-center justify-center gap-2 border border-zinc-700 transition">
            <Upload className="w-5 h-5 text-amber-400" />
            <span>{t.uploadPrompt}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Text Input Option */}
        <div className="mt-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={t.enterManualText}
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
            <button
              onClick={() => customText && analyzeContent(null, customText)}
              disabled={!customText || loading}
              className="px-3 py-2 bg-amber-500 text-zinc-950 rounded-xl font-bold text-xs hover:bg-amber-400 disabled:opacity-50 transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.analyzeBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Preset Factory Signs Selector */}
      <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
        <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
          {t.orPickPreset}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESET_SIGNS.map((preset) => {
            const isSelected = selectedPreset === preset.id && !uploadedImage;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`p-3 rounded-xl text-left border flex items-center gap-3 transition active:scale-95 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-white font-bold ring-2 ring-amber-400/30'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="text-2xl p-1.5 rounded-lg bg-zinc-900 border border-zinc-700 flex-shrink-0">
                  {preset.previewIcon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-amber-300 truncate">
                    {preset.name}
                  </div>
                  <div className="text-[11px] text-zinc-400 truncate">
                    {preset.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="p-8 rounded-2xl bg-zinc-900 border-2 border-amber-500/50 flex flex-col items-center justify-center gap-3 text-center">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-sm font-bold text-amber-300">
            {t.analyzingText}
          </p>
        </div>
      )}

      {/* Analysis Result Card */}
      {analysis && !loading && (
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border-2 border-amber-500/60 shadow-xl space-y-4">
          {/* Header & Hazard Level */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow ${badge.bg} ${badge.text} ${badge.border}`}
              >
                {badge.label}
              </span>
              <span className="text-xs text-zinc-400 font-semibold">
                {language.toUpperCase()} Voice Ready
              </span>
            </div>

            {/* Audio Read Aloud Button */}
            <button
              onClick={() => handlePlayAudio()}
              className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 shadow-lg transition active:scale-95 ${
                isPlayingAudio
                  ? 'bg-red-600 text-white animate-pulse border border-red-400'
                  : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 border border-amber-300'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>{t.stopSpeaking}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>{t.speakAloud}</span>
                </>
              )}
            </button>
          </div>

          {/* Title in Selected Language */}
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              {analysis.title}
            </h2>
          </div>

          {/* Plain Words Explanation */}
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.whatThisMeans}</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 font-medium leading-relaxed">
              {analysis.explanation}
            </p>
          </div>

          {/* Do's and Don'ts High-Contrast Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* DO's */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border-2 border-emerald-600/50">
              <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.dosTitle}</span>
              </div>
              <ul className="space-y-2">
                {analysis.dos?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-200">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DONT's */}
            <div className="p-3.5 rounded-xl bg-red-950/30 border-2 border-red-600/50">
              <div className="text-xs font-extrabold text-red-400 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <XCircle className="w-4 h-4 text-red-400" />
                <span>{t.dontsTitle}</span>
              </div>
              <ul className="space-y-2">
                {analysis.donts?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-200">
                    <span className="text-red-400 font-bold mt-0.5">✕</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Required PPE Protective Gear */}
          {analysis.requiredPPE && analysis.requiredPPE.length > 0 && (
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>{t.requiredPPETitle}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.requiredPPE.map((ppe, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-1"
                  >
                    <span>🛡️</span>
                    <span>{ppe}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
