import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { speechService } from '../utils/speech';
import {
  AlertOctagon,
  Volume2,
  VolumeX,
  PhoneCall,
  CheckCircle2,
  Flame,
  Zap,
  Activity,
  Droplets,
  ShieldAlert
} from 'lucide-react';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const PLANT_ZONES = [
  'Floor 2 • Assembly Line 4',
  'Furnace Bay & Boiler Room',
  'Chemical & Acid Storage Tank',
  'Textile Spinning / Weaving Shed',
  'Loading Dock & Heavy Stacking'
];

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose, language }) => {
  const [isSirenPlaying, setIsSirenPlaying] = useState(true);
  const [selectedZone, setSelectedZone] = useState(PLANT_ZONES[0]);
  const [sosSent, setSosSent] = useState(false);
  const [emergencyType, setEmergencyType] = useState<string>('injury');

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  useEffect(() => {
    if (isOpen) {
      setSosSent(true);
      setIsSirenPlaying(true);
      speechService.startEmergencySiren();
      speechService.triggerVibration([300, 150, 300, 150, 600]);
    } else {
      speechService.stopEmergencySiren();
    }
    return () => {
      speechService.stopEmergencySiren();
    };
  }, [isOpen]);

  const toggleSiren = () => {
    if (isSirenPlaying) {
      speechService.stopEmergencySiren();
      setIsSirenPlaying(false);
    } else {
      speechService.startEmergencySiren();
      setIsSirenPlaying(true);
    }
  };

  const handleClose = () => {
    speechService.stopEmergencySiren();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-zinc-950 border-4 border-red-600 rounded-3xl shadow-2xl p-4 sm:p-6 text-white my-auto animate-in fade-in zoom-in-95">
        
        {/* Pulsing Alert Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-red-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center animate-ping text-white flex-shrink-0">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-red-500 tracking-tight uppercase">
                {t.sosTriggered}
              </h2>
              <p className="text-xs text-red-200 font-semibold">
                {t.sosHelpOnWay}
              </p>
            </div>
          </div>

          {/* Siren Mute Toggle */}
          <button
            onClick={toggleSiren}
            className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition ${
              isSirenPlaying
                ? 'bg-red-600 border-red-400 text-white animate-pulse'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300'
            }`}
          >
            {isSirenPlaying ? (
              <>
                <Volume2 className="w-5 h-5" />
                <span className="hidden sm:inline">साइरन चालू</span>
              </>
            ) : (
              <>
                <VolumeX className="w-5 h-5 text-zinc-400" />
                <span className="hidden sm:inline">म्यूट</span>
              </>
            )}
          </button>
        </div>

        {/* Dispatch Beacon Banner */}
        <div className="mt-4 p-3 rounded-2xl bg-red-950/60 border border-red-800 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-600/30 border border-red-500 flex items-center justify-center text-red-400 flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-extrabold text-red-300 block text-sm">
              🚨 अलर्ट ब्रॉडकास्ट सक्रिय (Plant Beacon Active)
            </span>
            <p className="text-zinc-300 mt-0.5">
              प्लांट कंट्रोल रूम, इमरजेंसी रिस्पॉन्स टीम और सुरक्षा गेट को आपकी लोकेशन भेज दी गई है।
            </p>
          </div>
        </div>

        {/* Plant Zone Location Selector */}
        <div className="mt-4">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
            📍 आपकी वर्तमान लोकेशन / Plant Location:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {PLANT_ZONES.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-2 rounded-xl text-left text-xs font-bold transition border flex items-center justify-between ${
                  selectedZone === zone
                    ? 'bg-amber-500 border-amber-400 text-zinc-950 shadow-md'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <span className="truncate">{zone}</span>
                {selectedZone === zone && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Type Selector */}
        <div className="mt-4">
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
            इमरजेंसी का प्रकार / Emergency Category:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'injury', label: 'चोट / रक्तस्त्राव', icon: Activity, color: 'text-red-400' },
              { id: 'machinery', label: 'मशीन में फंसना', icon: ShieldAlert, color: 'text-orange-400' },
              { id: 'fire', label: 'आग / धुआं', icon: Flame, color: 'text-amber-400' },
              { id: 'chemical', label: 'गैस / तेजाब रिसाव', icon: Droplets, color: 'text-emerald-400' }
            ].map((type) => {
              const Icon = type.icon;
              const isSelected = emergencyType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setEmergencyType(type.id)}
                  className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition ${
                    isSelected
                      ? 'bg-red-600/30 border-red-500 text-white font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${type.color}`} />
                  <span className="text-[11px] leading-tight font-medium">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* One-Tap Direct Emergency Call Actions */}
        <div className="mt-4 space-y-2">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            तुरंत फोन लगाएं / One-Tap Speed Dial:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href="tel:102"
              className="px-3.5 py-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-extrabold text-sm flex items-center justify-between shadow-lg shadow-red-900/40 border border-red-400 transition"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-white" />
                <span>{t.callMedical}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-black/30 text-xs font-mono">102 / Ext 4</span>
            </a>

            <a
              href="tel:112"
              className="px-3.5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white font-extrabold text-sm flex items-center justify-between border border-zinc-700 transition"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-amber-400" />
                <span>{t.callSecurity}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-black/40 text-xs font-mono text-zinc-300">112 / Ext 9</span>
            </a>
          </div>
        </div>

        {/* Life-Saving First Aid Quick Card */}
        <div className="mt-4 p-3 rounded-xl bg-zinc-900/90 border border-amber-500/40 text-xs">
          <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>जीवन रक्षक प्राथमिक नियम (Critical Protocol):</span>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            {emergencyType === 'injury'
              ? 'गंभीर खून बहने पर साफ कपड़े से घाव को सीधा दबाएं। घायल को अकेला न छोड़ें।'
              : emergencyType === 'fire'
              ? 'झुककर धुएं के नीचे से भागें। लिफ्ट का प्रयोग न करें। फायर एग्जिट का पालन करें।'
              : emergencyType === 'chemical'
              ? 'आंख या त्वचा पर तेजाब गिरने पर बिना देरी किए आई-वॉश से 15 मिनट धोएं। कपड़े उतारें।'
              : 'मशीन में फंसने पर तुरंत मेन पावर ब्रेकर या लाल E-Stop बटन दबाएं। हाथ से खींचने की कोशिश न करें।'}
          </p>
        </div>

        {/* Dismiss / Stop Siren Button */}
        <div className="mt-5">
          <button
            onClick={handleClose}
            className="w-full py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-200 font-bold text-sm border-2 border-zinc-600 transition"
          >
            {t.cancelSos}
          </button>
        </div>
      </div>
    </div>
  );
};
