import React, { useState } from 'react';
import { Language, ResourceCategory, ResourceItem } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { MIGRANT_RESOURCES } from '../data/mockData';
import { speechService } from '../utils/speech';
import {
  BookOpen,
  ShieldCheck,
  Scale,
  CreditCard,
  PhoneCall,
  Volume2,
  VolumeX,
  Search,
  ExternalLink,
  ShoppingBag,
  HeartPulse,
  AlertOctagon,
  FileText,
  BadgePercent,
  Smile,
  UserCheck,
  CheckCircle2,
  Phone
} from 'lucide-react';

interface ResourcesSectionProps {
  language: Language;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return ShieldCheck;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'HeartPulse':
        return HeartPulse;
      case 'Scale':
        return Scale;
      case 'AlertOctagon':
        return AlertOctagon;
      case 'FileText':
        return FileText;
      case 'CreditCard':
        return CreditCard;
      case 'BadgePercent':
        return BadgePercent;
      case 'Smile':
        return Smile;
      case 'UserCheck':
        return UserCheck;
      default:
        return PhoneCall;
    }
  };

  // Filtered resources
  const filteredResources = MIGRANT_RESOURCES.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    const title = (item.title[language] || item.title.en).toLowerCase();
    const desc = (item.description[language] || item.description.en).toLowerCase();
    const sub = (item.subtitle[language] || item.subtitle.en).toLowerCase();
    return title.includes(q) || desc.includes(q) || sub.includes(q);
  });

  // Audio Readout for a resource item
  const handleToggleAudio = (item: ResourceItem) => {
    if (currentlyPlayingId === item.id) {
      speechService.stop();
      setCurrentlyPlayingId(null);
      return;
    }

    speechService.stop();
    setCurrentlyPlayingId(item.id);

    const title = item.title[language] || item.title.en;
    const desc = item.description[language] || item.description.en;
    const points = (item.keyPoints[language] || item.keyPoints.en).join('. ');
    const fullText = `${title}. ${desc}. मुख्य बातें: ${points}`;

    speechService.speak(
      fullText,
      language,
      0.9,
      () => setCurrentlyPlayingId(null),
      () => setCurrentlyPlayingId(null)
    );
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Title & Overview Card */}
      <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-amber-500/40 text-white shadow-lg">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-amber-400 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <span>{t.resourcesTitle}</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
              {t.resourcesDesc}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/40 flex-shrink-0">
            मुफ्त अधिकार
          </span>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="खोजें (जैसे: ई-श्रम, राशन, पीएफ, 2x ओवर-टाइम, हेल्पलाइन)..."
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'ALL', label: 'सभी (All)' },
            { id: 'GOV_SCHEMES', label: t.tabGovSchemes },
            { id: 'LEGAL_RIGHTS', label: t.tabLaborRights },
            { id: 'FINANCIAL_LITERACY', label: t.tabFinancePF },
            { id: 'COMMUNITY_HELPLINES', label: t.tabHelplines }
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 ${
                  isSelected
                    ? 'bg-amber-500 text-zinc-950 font-black shadow-md'
                    : 'bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Toll-Free Hotlines Bar */}
      <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <a
          href="tel:14434"
          className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-amber-500/30 transition flex flex-col items-center"
        >
          <span className="text-[10px] text-zinc-400 font-semibold">श्रम मंत्रालय</span>
          <span className="text-sm font-black text-amber-400 font-mono">14434</span>
        </a>
        <a
          href="tel:9966044425"
          className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-amber-500/30 transition flex flex-col items-center"
        >
          <span className="text-[10px] text-zinc-400 font-semibold">PF मिस्ड कॉल</span>
          <span className="text-xs font-black text-amber-400 font-mono">9966044425</span>
        </a>
        <a
          href="tel:14416"
          className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-amber-500/30 transition flex flex-col items-center"
        >
          <span className="text-[10px] text-zinc-400 font-semibold">तनाव हेल्पलाइन</span>
          <span className="text-sm font-black text-amber-400 font-mono">14416</span>
        </a>
        <a
          href="tel:181"
          className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-amber-500/30 transition flex flex-col items-center"
        >
          <span className="text-[10px] text-zinc-400 font-semibold">महिला सुरक्षा</span>
          <span className="text-sm font-black text-amber-400 font-mono">181 / 1091</span>
        </a>
      </div>

      {/* Resource Cards List */}
      <div className="space-y-3.5">
        {filteredResources.map((item) => {
          const Icon = getIcon(item.iconName);
          const isPlaying = currentlyPlayingId === item.id;
          const title = item.title[language] || item.title.en;
          const subtitle = item.subtitle[language] || item.subtitle.en;
          const description = item.description[language] || item.description.en;
          const points = item.keyPoints[language] || item.keyPoints.en;
          const badgeText = item.badge ? item.badge[language] || item.badge.en : null;
          const actionText = item.actionLabel ? item.actionLabel[language] || item.actionLabel.en : null;

          return (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border-2 border-zinc-800 hover:border-amber-500/50 transition-all shadow-md space-y-3"
            >
              {/* Header with Icon, Badge, and Audio Button */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                        {title}
                      </h2>
                      {badgeText && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-black uppercase">
                          {badgeText}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                      {subtitle}
                    </p>
                  </div>
                </div>

                {/* Audio Read Aloud Button */}
                <button
                  onClick={() => handleToggleAudio(item)}
                  title="Listen in native audio"
                  className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 flex-shrink-0 ${
                    isPlaying
                      ? 'bg-red-600 text-white animate-pulse border border-red-400'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-zinc-700'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span className="hidden sm:inline">रोकें</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span className="hidden sm:inline">आवाज में सुनें</span>
                    </>
                  )}
                </button>
              </div>

              {/* Main Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80">
                {description}
              </p>

              {/* 3 Key Takeaways / Points */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  ज़रूरी बातें व लाभ / Key Actions:
                </div>
                <div className="space-y-1">
                  {points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Call or Link */}
              {actionText && item.contactOrAction && (
                <div className="pt-1">
                  <a
                    href={item.contactOrAction}
                    target={item.contactOrAction.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-black text-xs flex items-center justify-center sm:justify-start gap-2 shadow transition inline-flex"
                  >
                    {item.contactOrAction.startsWith('tel:') ? (
                      <Phone className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <ExternalLink className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                    <span>{actionText}</span>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
