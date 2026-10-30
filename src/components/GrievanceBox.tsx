import React, { useState } from 'react';
import { Language, GrievanceCategory, GrievanceSeverity, GrievanceRecord } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { INITIAL_GRIEVANCES } from '../data/mockData';
import { speechService } from '../utils/speech';
import { offlineStorage } from '../utils/offlineStorage';
import {
  MessageSquareWarning,
  Mic,
  MicOff,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  HelpCircle,
  Lock,
  Volume2
} from 'lucide-react';

interface GrievanceBoxProps {
  language: Language;
}

const CATEGORIES: Array<{
  id: GrievanceCategory;
  icon: string;
  labels: Record<Language, string>;
}> = [
  {
    id: 'MACHINERY_GUARD',
    icon: '⚙️',
    labels: {
      hi: 'मशीन गार्ड टूटा / फंसाव का खतरा',
      ta: 'இயந்திர கவசம் உடைந்த நிலை',
      te: 'మెషీన్ గార్డ్ విరిగిపోవడం',
      bn: 'মেশিনের গার্ড ভাঙা',
      mr: 'मशीनचे सेफ्टी गार्ड तुटलेले',
      en: 'Broken Machine Guard / Nip Point'
    }
  },
  {
    id: 'ELECTRICAL_HAZARD',
    icon: '⚡',
    labels: {
      hi: 'खुले तार / करंट / स्पार्किंग',
      ta: 'மின்கசிவு / உடைந்த மின் கம்பிகள்',
      te: 'కరెంట్ షాక్ / లూజ్ వైర్లు',
      bn: 'উন্মুক্ত বৈদ্যুতিক তার / স্পার্ক',
      mr: 'उघडी वायर / विजेचा शॉक',
      en: 'Exposed Electrical Wires / Sparking'
    }
  },
  {
    id: 'CHEMICAL_FUMES',
    icon: '☣️',
    labels: {
      hi: 'जहरीला धुआं / तेजाब रिसाव',
      ta: 'ரசாயன கசிவு / நச்சு புகை',
      te: 'రసాయనాల లీక్ / విషపూరిత పొగ',
      bn: 'বিষাক্ত গ্যাস / রাসায়নিক লিক',
      mr: 'विषारी वायू / ॲसिड गळती',
      en: 'Toxic Fumes / Acid Leak'
    }
  },
  {
    id: 'MISSING_PPE',
    icon: '🦺',
    labels: {
      hi: 'सुरक्षा जूते / किट नहीं दी गई',
      ta: 'பாதுகாப்பு சாதனங்கள் வழங்கப்படவில்லை',
      te: 'సేఫ్టీ పరికరాలు ఇవ్వకపోవడం',
      bn: 'সুরক্ষা সরঞ্জাম (PPE) না পাওয়া',
      mr: 'सेफ्टी किट (PPE) न मिळणे',
      en: 'Missing PPE (Shoes, Helmet, Mask)'
    }
  },
  {
    id: 'UNPAID_OVERTIME',
    icon: '💰',
    labels: {
      hi: 'मजदूरी में कटौती / ओटी नहीं मिला',
      ta: 'சம்பள பாக்கி / OT வழங்காமை',
      te: 'జీతం కోత / OT ఇవ్వకపోవడం',
      bn: 'মজুরি আটকে রাখা / OT না দেওয়া',
      mr: 'मजुरी कपात / ओव्हरटाईम न देणे',
      en: 'Unpaid Overtime / Illegal Wage Deduction'
    }
  },
  {
    id: 'WATER_SANITATION',
    icon: '💧',
    labels: {
      hi: 'पीने का गंदा पानी / शौचालय खराबी',
      ta: 'அசுத்தமான குடிநீர் / கழிப்பறை வசதியின்மை',
      te: 'కలుషిత నీరు / టాయిలెట్లు లేకపోవడం',
      bn: 'অপরিচ্ছন্ন পানীয় জল / শৌচাগার সমস্যা',
      mr: 'पिण्याचे अस्वच्छ पाणी / स्वच्छतागृह अभाव',
      en: 'Unclean Water / Blocked Toilets'
    }
  },
  {
    id: 'SUPERVISOR_HARASSMENT',
    icon: '🚨',
    labels: {
      hi: 'सुपरवाइजर द्वारा धमकी / बदतमीजी',
      ta: 'மேற்பார்வையாளர் அச்சுறுத்தல்',
      te: 'సూపర్ వైజర్ వేధింపులు / బెదిరింపులు',
      bn: 'সুপারভাইজারের হুমকি / দুর্ব্যবহার',
      mr: 'सुपरवायझरची अरेरावी / धमकी',
      en: 'Supervisor Harassment / Intimidation'
    }
  }
];

export const GrievanceBox: React.FC<GrievanceBoxProps> = ({ language }) => {
  const [grievances, setGrievances] = useState<GrievanceRecord[]>(() => offlineStorage.getStoredGrievances());
  const [activeTab, setActiveTab] = useState<'NEW' | 'HISTORY'>('NEW');

  // Form State
  const [category, setCategory] = useState<GrievanceCategory>('MACHINERY_GUARD');
  const [severity, setSeverity] = useState<GrievanceSeverity>('HIGH');
  const [plantLocation, setPlantLocation] = useState<string>('Floor 2 • Assembly Line 4');
  const [description, setDescription] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [lastSubmittedTicket, setLastSubmittedTicket] = useState<GrievanceRecord | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Voice to text using Web Speech Recognition API
  const handleToggleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recording not directly supported in this browser. Please type your message.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang =
        language === 'hi'
          ? 'hi-IN'
          : language === 'ta'
          ? 'ta-IN'
          : language === 'te'
          ? 'te-IN'
          : language === 'bn'
          ? 'bn-IN'
          : language === 'mr'
          ? 'mr-IN'
          : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition exception:', err);
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setSubmitting(true);
    const isOnline = offlineStorage.isOnline();

    if (!isOnline) {
      // Offline mode: queue locally immediately
      const trackingCode = `SS-2026-OFFLINE-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRecord: GrievanceRecord = {
        id: `grv-${Date.now()}`,
        trackingCode,
        category,
        severity,
        plantLocation,
        description,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'SUBMITTED',
        statusNote: '⚠️ ऑफ़लाइन दर्ज: फोन में सुरक्षित रूप से सेव किया गया। इंटरनेट जुड़ते ही स्वतः प्लांट को भेजा जाएगा (Offline Queued).',
        immediateSafetyAdvice: 'तत्काल कदम: 1. उस जगह से कम से कम 5 मीटर दूर रहें। 2. साथियों को चेतावनी दें। 3. नजदीकी वार्डन को बताएं। (आपकी रिपोर्ट फोन में सुरक्षित है)'
      };

      const updated = offlineStorage.addGrievance(newRecord, true);
      setGrievances(updated);
      setLastSubmittedTicket(newRecord);
      setDescription('');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/report-grievance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          severity,
          plantLocation,
          description,
          targetLanguage: language
        })
      });

      const json = await res.json();
      const trackingCode = json.trackingCode || `SS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newRecord: GrievanceRecord = {
        id: `grv-${Date.now()}`,
        trackingCode,
        category,
        severity,
        plantLocation,
        description,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'SUBMITTED',
        statusNote: 'गोपनीय रूप से प्लांट सुरक्षा समिति को प्रेषित (Forwarded to Plant Safety Committee).',
        immediateSafetyAdvice: json.immediateSafetyAdvice
      };

      const updated = offlineStorage.addGrievance(newRecord, false);
      setGrievances(updated);
      setLastSubmittedTicket(newRecord);
      setDescription('');
    } catch (err) {
      console.warn('Network failed, queueing offline:', err);
      const trackingCode = `SS-2026-OFFLINE-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRecord: GrievanceRecord = {
        id: `grv-${Date.now()}`,
        trackingCode,
        category,
        severity,
        plantLocation,
        description,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'SUBMITTED',
        statusNote: '⚠️ ऑफ़लाइन दर्ज: इंटरनेट जुड़ते ही स्वतः प्लांट को भेजा जाएगा (Offline Queued).',
        immediateSafetyAdvice: 'तत्काल कदम: 1. उस जगह से कम से कम 5 मीटर दूर रहें। 2. साथियों को सतर्क करें। (रिपोर्ट फोन में सुरक्षित है)'
      };

      const updated = offlineStorage.addGrievance(newRecord, true);
      setGrievances(updated);
      setLastSubmittedTicket(newRecord);
      setDescription('');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: GrievanceRecord['status']) => {
    switch (status) {
      case 'SUBMITTED':
        return { label: 'दर्ज (Submitted)', bg: 'bg-zinc-800 text-zinc-300 border-zinc-700' };
      case 'UNDER_REVIEW':
        return { label: 'जांच जारी (Under Review)', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'INSPECTION_SCHEDULED':
        return { label: 'मरम्मत तय (Remediation)', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      case 'RESOLVED':
        return { label: 'समाधान पूर्ण (Resolved)', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Overview Card */}
      <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-amber-500/40 text-white shadow-lg">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-400 flex items-center gap-2">
              <MessageSquareWarning className="w-6 h-6 text-amber-400" />
              <span>{t.grievanceTitle}</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
              {t.grievanceDesc}
            </p>
          </div>
          <div className="p-2 rounded-xl bg-zinc-950 border border-emerald-500/40 text-emerald-400 text-xs font-black flex items-center gap-1.5 flex-shrink-0">
            <Lock className="w-4 h-4" />
            <span className="hidden xs:inline">100% गोपनीय</span>
          </div>
        </div>

        {/* Guaranteed Privacy Banner */}
        <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-700/50 flex items-center gap-2 text-xs text-emerald-300 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{t.anonymousGuarantee}</span>
        </div>

        {/* Tabs: New Grievance vs History */}
        <div className="mt-4 flex rounded-xl bg-zinc-950 p-1 border border-zinc-800">
          <button
            onClick={() => setActiveTab('NEW')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'NEW'
                ? 'bg-amber-500 text-zinc-950 shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.reportHazardBtn}
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'HISTORY'
                ? 'bg-amber-500 text-zinc-950 shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>{t.myReports}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-zinc-800 text-[10px] text-zinc-300">
              {grievances.length}
            </span>
          </button>
        </div>
      </div>

      {/* Success Notification after submission */}
      {lastSubmittedTicket && activeTab === 'NEW' && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500 shadow-xl space-y-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
            <CheckCircle className="w-5 h-5" />
            <span>गोपनीय रिपोर्ट सफलतापूर्वक दर्ज हो गई!</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-emerald-600/40 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-zinc-400 block">गोपनीय ट्रैकिंग कोड (Anonymous ID):</span>
              <span className="font-mono text-base font-black text-amber-400">
                {lastSubmittedTicket.trackingCode}
              </span>
            </div>
            <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              सुरक्षा जांच प्रक्रिया चालू
            </span>
          </div>
          {lastSubmittedTicket.immediateSafetyAdvice && (
            <div className="p-3 rounded-xl bg-zinc-900 border border-amber-500/40 text-xs text-amber-200">
              <span className="font-bold text-amber-400 block mb-0.5">⚠️ तत्काल सुरक्षा सलाह:</span>
              <p>{lastSubmittedTicket.immediateSafetyAdvice}</p>
            </div>
          )}
        </div>
      )}

      {/* NEW GRIEVANCE FORM */}
      {activeTab === 'NEW' && (
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          {/* Category Badges */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              {t.categoryLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                const catLabel = cat.labels[language] || cat.labels.en;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 rounded-xl text-left border flex items-center gap-2.5 transition active:scale-95 ${
                      isSelected
                        ? 'bg-amber-500 text-zinc-950 font-black border-amber-400 shadow-md ring-2 ring-amber-400/40'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{cat.icon}</span>
                    <span className="text-xs leading-snug truncate">{catLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Severity Selector */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              {t.severityLabel}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'URGENT', label: 'अति गंभीर (जान का खतरा)', color: 'border-red-500 text-red-400 bg-red-950/30' },
                { id: 'HIGH', label: 'गंभीर (चोट का खतरा)', color: 'border-orange-500 text-orange-400 bg-orange-950/30' },
                { id: 'MEDIUM', label: 'मध्यम स्तर', color: 'border-yellow-500 text-yellow-400 bg-yellow-950/30' }
              ].map((sev) => (
                <button
                  type="button"
                  key={sev.id}
                  onClick={() => setSeverity(sev.id as GrievanceSeverity)}
                  className={`p-2.5 rounded-xl text-center text-xs font-bold border transition ${
                    severity === sev.id
                      ? `${sev.color} ring-2 ring-white/20 font-black`
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  {sev.label}
                </button>
              ))}
            </div>
          </div>

          {/* Plant Location */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
              {t.locationLabel}
            </label>
            <input
              type="text"
              value={plantLocation}
              onChange={(e) => setPlantLocation(e.target.value)}
              placeholder="उदा. बे नंबर 3, रोलर प्रेस मशीन के पास"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          {/* Voice to text + Description Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                {t.descriptionLabel}
              </label>

              {/* Voice-to-Text Button */}
              <button
                type="button"
                onClick={handleToggleVoiceInput}
                className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition active:scale-95 ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? t.listeningVoice : t.speakVoiceInput}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="मशीन में क्या खराबी है या सुपरवाइजर/ठेकेदार ने क्या किया? बोलकर या लिखकर पूरी बात बताएं..."
              className="w-full bg-zinc-950 border-2 border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400 placeholder-zinc-500 leading-relaxed"
              required
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting || !description.trim()}
            className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 disabled:opacity-50 transition"
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 stroke-[3]" />
                <span>{t.submitReport}</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* GRIEVANCE STATUS & HISTORY TAB */}
      {activeTab === 'HISTORY' && (
        <div className="space-y-3">
          {grievances.map((item) => {
            const badge = getStatusBadge(item.status);
            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2.5 shadow"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-zinc-950 border border-zinc-700 text-amber-400">
                      {item.trackingCode}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    {item.timestamp}
                  </span>
                </div>

                <div className="text-xs font-bold text-zinc-200">
                  📍 {item.plantLocation}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80">
                  {item.description}
                </p>

                {item.statusNote && (
                  <div className="text-xs text-emerald-300 font-medium bg-emerald-950/20 border border-emerald-800/40 p-2.5 rounded-xl flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-400 block text-[11px] uppercase">
                        प्लांट समाधान अपडेट / Plant Action:
                      </span>
                      {item.statusNote}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
