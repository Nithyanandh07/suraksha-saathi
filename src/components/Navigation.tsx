import React from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { Home, Scan, CalendarClock, MessageSquareWarning, BookOpen } from 'lucide-react';

export type NavTab = 'home' | 'manual' | 'shifts' | 'grievance' | 'resources';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  language
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const navItems: Array<{
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'manual', label: t.navManual, icon: Scan },
    { id: 'shifts', label: t.navShifts, icon: CalendarClock },
    { id: 'grievance', label: t.navGrievance, icon: MessageSquareWarning },
    { id: 'resources', label: t.navResources, icon: BookOpen }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t-2 border-amber-500/50 shadow-2xl safe-area-pb">
      <div className="max-w-4xl mx-auto px-1.5 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex-1 min-w-0 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all select-none active:scale-95 ${
                isActive
                  ? 'bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 font-semibold'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'
                  }`}
                />
              </div>
              <span className="text-[10px] sm:text-[11px] leading-tight mt-1 truncate max-w-full text-center tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
