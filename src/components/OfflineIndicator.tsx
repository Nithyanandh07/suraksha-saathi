import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { offlineStorage } from '../utils/offlineStorage';
import { Wifi, WifiOff, HardDrive, RefreshCw, CheckCircle, ArrowDownToLine } from 'lucide-react';

interface OfflineIndicatorProps {
  language: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ language }) => {
  const [isOnline, setIsOnline] = useState<boolean>(offlineStorage.isOnline());
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = offlineStorage.subscribeOnlineStatus((online) => {
      setIsOnline(online);
      setPendingCount(offlineStorage.getPendingGrievances().length);
    });

    setPendingCount(offlineStorage.getPendingGrievances().length);
    return () => unsubscribe();
  }, []);

  const handleManualSync = async () => {
    if (!isOnline) return;
    setSyncing(true);
    const synced = await offlineStorage.syncPendingGrievances();
    setPendingCount(offlineStorage.getPendingGrievances().length);
    setSyncing(false);
  };

  const handleDownloadOfflinePack = () => {
    const res = offlineStorage.preDownloadAllManuals();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="w-full">
      {/* Offline Alert Strip - Visible when network drops */}
      {!isOnline && (
        <div className="bg-amber-500 text-zinc-950 px-3 py-2 text-xs font-bold flex items-center justify-between gap-2 shadow-md animate-in slide-in-from-top">
          <div className="flex items-center gap-2 min-w-0">
            <WifiOff className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">
              {language === 'hi'
                ? '⚠️ ऑफलाइन मोड चालू: बिना इंटरनेट के सभी सुरक्षा नियम व मजदूरी का हिसाब सुरक्षित उपलब्ध है।'
                : language === 'ta'
                ? '⚠️ ஆஃப்லைன் பயன்முறை: இணையம் இன்றியும் பாதுகாப்பு கையேடுகள் மற்றும் ஊதிய கணக்குகள் செயல்படும்.'
                : '⚠️ Offline Mode Active: Core safety manuals & wage logs are accessible without internet.'}
            </span>
          </div>

          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className="px-2 py-0.5 rounded bg-zinc-950 text-amber-300 text-[11px] font-black flex-shrink-0"
          >
            विवरण / Info
          </button>
        </div>
      )}

      {/* Online Status Header Badge (Compact pill next to controls or expandable) */}
      <div className="max-w-4xl mx-auto px-3 pt-1.5 flex items-center justify-between text-[11px] text-zinc-400">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border transition ${
              isOnline
                ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-400'
                : 'bg-amber-950/40 border-amber-800/50 text-amber-300 animate-pulse'
            }`}
          >
            {isOnline ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-amber-400" />}
            <span className="font-semibold">
              {isOnline
                ? language === 'hi'
                  ? 'ऑनलाइन कनेक्टेड'
                  : 'Online Connected'
                : language === 'hi'
                ? 'ऑफलाइन मोड (कैश सुरक्षित)'
                : 'Offline Cache Ready'}
            </span>
          </button>

          {pendingCount > 0 && (
            <span className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 font-black text-[10px]">
              {pendingCount} सिंक बाकी
            </span>
          )}
        </div>

        <button
          onClick={handleDownloadOfflinePack}
          className="hover:text-amber-300 flex items-center gap-1 transition"
          title="Save all factory manuals on phone"
        >
          {downloadSuccess ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">फोन में सुरक्षित (Cached)!</span>
            </>
          ) : (
            <>
              <ArrowDownToLine className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline">ऑफलाइन डेटा सुरक्षित करें</span>
            </>
          )}
        </button>
      </div>

      {/* Expandable Offline & Sync Information Drawer */}
      {showDrawer && (
        <div className="max-w-4xl mx-auto px-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-zinc-900 border-2 border-zinc-800 text-xs text-zinc-300 space-y-2.5 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white text-sm">
                  कारखाना ऑफलाइन सुरक्षा सिस्टम (Offline Factory Storage)
                </span>
              </div>
              <button
                onClick={() => setShowDrawer(false)}
                className="text-zinc-500 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <p className="leading-relaxed">
              कारखाने के बेसमेंट, धातु के शेड या सुदूर क्षेत्रों में मोबाइल नेटवर्क नहीं होने पर भी:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-amber-400 font-bold block mb-0.5">1. सुरक्षा निर्देशिका (Manuals)</span>
                <span className="text-[11px] text-zinc-400">सभी 6 भाषाओं में स्थानीय रूप से संग्रहित।</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-blue-400 font-bold block mb-0.5">2. वेतन व शिफ्ट (Wage Records)</span>
                <span className="text-[11px] text-zinc-400">हर शिफ्ट तुरंत फोन में सुरक्षित, इंटरनेट की जरूरत नहीं।</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-orange-400 font-bold block mb-0.5">3. गुप्त शिकायत (Offline Queue)</span>
                <span className="text-[11px] text-zinc-400">शिकायत दर्ज होगी और इंटरनेट आते ही स्वतः भेज दी जाएगी।</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800">
              <button
                onClick={handleDownloadOfflinePack}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-zinc-950 font-black text-xs hover:bg-amber-400 flex items-center gap-1.5 transition active:scale-95"
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>सभी मैनुअल फोन में अपडेट करें</span>
              </button>

              {isOnline && pendingCount > 0 && (
                <button
                  onClick={handleManualSync}
                  disabled={syncing}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 text-amber-300 font-bold text-xs hover:bg-zinc-700 flex items-center gap-1.5 border border-zinc-700 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                  <span>{syncing ? 'सिंक हो रहा है...' : 'अभी सिंक करें (Sync)'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
