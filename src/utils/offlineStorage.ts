import { ShiftRecord, GrievanceRecord, SafetySignAnalysis, Language } from '../types';
import { INITIAL_SHIFTS, PRESET_SIGNS, INITIAL_GRIEVANCES } from '../data/mockData';

const SHIFTS_KEY = 'suraksha_offline_shifts_v1';
const GRIEVANCES_KEY = 'suraksha_offline_grievances_v1';
const PENDING_GRIEVANCES_KEY = 'suraksha_pending_grievances_v1';
const MANUALS_CACHE_KEY = 'suraksha_offline_manuals_v1';

class OfflineStorageManager {
  private isOnlineStatus: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private listeners: Array<(online: boolean) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnlineStatus = true;
        this.notifyListeners();
        this.syncPendingGrievances();
      });

      window.addEventListener('offline', () => {
        this.isOnlineStatus = false;
        this.notifyListeners();
      });

      // Initialize manuals cache if not present
      this.ensureManualsCached();
    }
  }

  public isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  public subscribeOnlineStatus(callback: (online: boolean) => void): () => void {
    this.listeners.push(callback);
    callback(this.isOnlineStatus);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((cb) => cb(this.isOnlineStatus));
  }

  // --- SHIFTS & WAGES PERSISTENCE ---
  public getStoredShifts(): ShiftRecord[] {
    if (typeof window === 'undefined') return INITIAL_SHIFTS;
    try {
      const data = localStorage.getItem(SHIFTS_KEY);
      if (data) {
        return JSON.parse(data);
      }
      // Save initial records on first load
      this.saveShifts(INITIAL_SHIFTS);
      return INITIAL_SHIFTS;
    } catch (e) {
      console.warn('Error reading shifts from localStorage:', e);
      return INITIAL_SHIFTS;
    }
  }

  public saveShifts(shifts: ShiftRecord[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(SHIFTS_KEY, JSON.stringify(shifts));
    } catch (e) {
      console.warn('Error saving shifts to localStorage:', e);
    }
  }

  public addShift(shift: ShiftRecord): ShiftRecord[] {
    const existing = this.getStoredShifts();
    const updated = [shift, ...existing];
    this.saveShifts(updated);
    return updated;
  }

  public deleteShift(id: string): ShiftRecord[] {
    const existing = this.getStoredShifts();
    const updated = existing.filter((s) => s.id !== id);
    this.saveShifts(updated);
    return updated;
  }

  // --- OFFLINE SAFETY MANUALS CACHING ---
  public ensureManualsCached(): void {
    if (typeof window === 'undefined') return;
    try {
      if (!localStorage.getItem(MANUALS_CACHE_KEY)) {
        const cacheObj: Record<string, any> = {};
        PRESET_SIGNS.forEach((sign) => {
          cacheObj[sign.id] = sign.analysis;
        });
        localStorage.setItem(MANUALS_CACHE_KEY, JSON.stringify(cacheObj));
      }
    } catch (e) {
      console.warn('Error precaching safety manuals:', e);
    }
  }

  public getCachedSafetyManual(signId: string, lang: Language): SafetySignAnalysis | null {
    if (typeof window === 'undefined') return null;
    try {
      const cached = localStorage.getItem(MANUALS_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed[signId]) {
          return parsed[signId][lang] || parsed[signId].hi || parsed[signId].en;
        }
      }
      // Fallback directly to PRESET_SIGNS
      const preset = PRESET_SIGNS.find((p) => p.id === signId) || PRESET_SIGNS[0];
      return preset.analysis[lang] || preset.analysis.hi || preset.analysis.en;
    } catch (e) {
      return null;
    }
  }

  // Pre-download all manuals with progress
  public preDownloadAllManuals(): { count: number; sizeKb: number } {
    if (typeof window === 'undefined') return { count: 0, sizeKb: 0 };
    try {
      const cacheObj: Record<string, any> = {};
      PRESET_SIGNS.forEach((sign) => {
        cacheObj[sign.id] = sign.analysis;
      });
      const str = JSON.stringify(cacheObj);
      localStorage.setItem(MANUALS_CACHE_KEY, str);
      const sizeKb = Math.round(new Blob([str]).size / 1024);
      return { count: PRESET_SIGNS.length, sizeKb };
    } catch (e) {
      return { count: 0, sizeKb: 0 };
    }
  }

  // --- ANONYMOUS GRIEVANCES & OFFLINE QUEUE ---
  public getStoredGrievances(): GrievanceRecord[] {
    if (typeof window === 'undefined') return INITIAL_GRIEVANCES;
    try {
      const data = localStorage.getItem(GRIEVANCES_KEY);
      if (data) {
        return JSON.parse(data);
      }
      this.saveGrievances(INITIAL_GRIEVANCES);
      return INITIAL_GRIEVANCES;
    } catch (e) {
      return INITIAL_GRIEVANCES;
    }
  }

  public saveGrievances(list: GrievanceRecord[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(GRIEVANCES_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Error saving grievances:', e);
    }
  }

  public addGrievance(record: GrievanceRecord, isPendingSync: boolean = false): GrievanceRecord[] {
    const list = this.getStoredGrievances();
    const updated = [record, ...list];
    this.saveGrievances(updated);

    if (isPendingSync) {
      const pending = this.getPendingGrievances();
      pending.push(record);
      localStorage.setItem(PENDING_GRIEVANCES_KEY, JSON.stringify(pending));
    }

    return updated;
  }

  public getPendingGrievances(): GrievanceRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(PENDING_GRIEVANCES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // Sync queued reports when internet is restored
  public async syncPendingGrievances(): Promise<number> {
    const pending = this.getPendingGrievances();
    if (pending.length === 0) return 0;

    let syncedCount = 0;
    const remainingPending: GrievanceRecord[] = [];

    for (const item of pending) {
      try {
        const res = await fetch('/api/report-grievance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: item.category,
            severity: item.severity,
            plantLocation: item.plantLocation,
            description: item.description
          })
        });

        if (res.ok) {
          syncedCount++;
          // Update status in local storage to SUBMITTED
          const list = this.getStoredGrievances();
          const updatedList = list.map((g) =>
            g.id === item.id
              ? {
                  ...g,
                  status: 'SUBMITTED' as const,
                  statusNote: 'इंटरनेट जुड़ने पर स्वतः प्लांट सुरक्षा समिति को प्रेषित (Auto-synced to Safety Committee).'
                }
              : g
          );
          this.saveGrievances(updatedList);
        } else {
          remainingPending.push(item);
        }
      } catch (e) {
        remainingPending.push(item);
      }
    }

    localStorage.setItem(PENDING_GRIEVANCES_KEY, JSON.stringify(remainingPending));
    return syncedCount;
  }
}

export const offlineStorage = new OfflineStorageManager();
