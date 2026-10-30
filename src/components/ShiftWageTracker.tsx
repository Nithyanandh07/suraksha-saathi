import React, { useState } from 'react';
import { Language, ShiftRecord, ShiftType } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { INITIAL_SHIFTS } from '../data/mockData';
import { offlineStorage } from '../utils/offlineStorage';
import {
  CalendarClock,
  Plus,
  Coins,
  FileSpreadsheet,
  Clock,
  ShieldCheck,
  Share2,
  Check,
  X,
  Trash2,
  TrendingUp,
  Download,
  HardDrive
} from 'lucide-react';

interface ShiftWageTrackerProps {
  language: Language;
}

export const ShiftWageTracker: React.FC<ShiftWageTrackerProps> = ({ language }) => {
  const [shifts, setShifts] = useState<ShiftRecord[]>(() => offlineStorage.getStoredShifts());
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showSlipModal, setShowSlipModal] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Form State for new shift
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newShiftType, setNewShiftType] = useState<ShiftType>('DAY');
  const [newHours, setNewHours] = useState<number>(8);
  const [newOtHours, setNewOtHours] = useState<number>(2);
  const [newBaseWage, setNewBaseWage] = useState<number>(550);
  const [newContractor, setNewContractor] = useState<string>('Apex Industrial Staffing');
  const [newAdvance, setNewAdvance] = useState<number>(0);
  const [newNotes, setNewNotes] = useState<string>('');

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Wage Calculations
  // Standard day is 8 hours. Hourly rate = baseWage / 8.
  // Overtime rate = (baseWage / 8) * 2 (Double rate mandated by Factories Act 1948).
  const totalRegularShifts = shifts.filter((s) => s.shiftType !== 'OFF').length;
  const totalOtHours = shifts.reduce((acc, curr) => acc + curr.otHours, 0);

  const totalBaseWages = shifts.reduce((acc, curr) => acc + curr.baseWagePerDay, 0);
  const totalOtPay = shifts.reduce((acc, curr) => {
    const hourlyBase = curr.baseWagePerDay / (curr.hoursWorked || 8);
    const otWage = curr.otHours * hourlyBase * (curr.otRateMultiplier || 2);
    return acc + otWage;
  }, 0);

  const totalGrossWages = Math.round(totalBaseWages + totalOtPay);
  const totalAdvances = shifts.reduce((acc, curr) => acc + curr.advanceDeduction, 0);
  const totalNetTakeHome = Math.max(0, totalGrossWages - totalAdvances);

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: ShiftRecord = {
      id: `shift-${Date.now()}`,
      date: newDate,
      shiftType: newShiftType,
      hoursWorked: Number(newHours),
      otHours: Number(newOtHours),
      baseWagePerDay: Number(newBaseWage),
      otRateMultiplier: 2, // 2x legally mandated
      contractorName: newContractor || 'Apex Industrial Staffing',
      advanceDeduction: Number(newAdvance) || 0,
      notes: newNotes
    };

    const updated = offlineStorage.addShift(newRecord);
    setShifts(updated);
    setShowAddModal(false);
    setNewOtHours(0);
    setNewAdvance(0);
    setNewNotes('');
  };

  const handleDeleteShift = (id: string) => {
    const updated = offlineStorage.deleteShift(id);
    setShifts(updated);
  };

  const getShiftBadge = (type: ShiftType) => {
    switch (type) {
      case 'DAY':
        return { label: 'दिन (Day Shift)', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'NIGHT':
        return { label: 'रात (Night Shift)', bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' };
      case 'DOUBLE':
        return { label: 'डबल (Double Shift)', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40' };
      default:
        return { label: 'छुट्टी (Off)', bg: 'bg-zinc-800 text-zinc-400 border-zinc-700' };
    }
  };

  const handleCopyWageSlip = () => {
    const slipText = `सुरक्षा साथी - मजदूरी हिसाब पर्ची (Suraksha Saathi Wage Slip)
--------------------------------------
कामगार का नाम: रामू कुमार (Ramu Kumar)
कंपनी / ठेकेदार: ${newContractor}
कुल काम किए गए दिन: ${totalRegularShifts} दिन
कुल ओवरटाइम घंटे (2x दर): ${totalOtHours} घंटे
मूल मजदूरी: ₹${totalBaseWages}
ओवरटाइम मजदूरी (डबल रेट): ₹${Math.round(totalOtPay)}
कुल कमाई: ₹${totalGrossWages}
काटी गई अग्रिम राशि: ₹${totalAdvances}
--------------------------------------
हाथ में मिलने योग्य कुल रकम: ₹${totalNetTakeHome}
(कारखाना अधिनियम 1948 धारा 59 के तहत प्रमाणित)`;

    navigator.clipboard.writeText(slipText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Title & Action Header */}
      <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-amber-500/40 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-amber-400 flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-amber-400" />
            <span>{t.shiftTrackerTitle}</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1">
            {t.shiftTrackerDesc}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-initial py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t.addShiftBtn}</span>
          </button>

          <button
            onClick={() => setShowSlipModal(true)}
            className="py-3 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-zinc-700 transition"
            title="Download Slip"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span className="hidden xs:inline">पर्ची</span>
          </button>
        </div>
      </div>

      {/* Factories Act 1948 Legal Notice */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200 font-medium leading-relaxed">
          {t.otRateNotice}
        </p>
      </div>

      {/* Monthly Wage Dashboard Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Total Shifts */}
        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-left">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            {t.regularShifts}
          </div>
          <div className="text-2xl font-black text-white mt-1">
            {totalRegularShifts} <span className="text-xs text-zinc-400 font-normal">दिन</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">8h सामान्य पाली</div>
        </div>

        {/* Total OT Hours */}
        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-left">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{t.overtimeHours}</span>
          </div>
          <div className="text-2xl font-black text-amber-400 mt-1">
            {totalOtHours} <span className="text-xs text-zinc-400 font-normal">घंटे</span>
          </div>
          <div className="text-[10px] text-amber-300/80 mt-0.5">डबल दर: ₹{(550 / 8) * 2}/घंटा</div>
        </div>

        {/* Advance Deduction */}
        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-left">
          <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
            {t.advancesDeductions}
          </div>
          <div className="text-2xl font-black text-red-400 mt-1">
            -₹{totalAdvances}
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">उठाया गया अग्रिम</div>
        </div>

        {/* Net In-Hand Wage */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border-2 border-amber-400 text-left">
          <div className="text-[11px] font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.netTakeHome}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            ₹{totalNetTakeHome.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>कुल कमाई: ₹{totalGrossWages}</span>
          </div>
        </div>
      </div>

      {/* Shift Log History List */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {t.shiftLogHistory} ({shifts.length} रिकॉर्ड)
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <HardDrive className="w-3 h-3" />
              <span>फोन में सुरक्षित (Offline Saved)</span>
            </span>
          </div>
          <span className="text-xs text-zinc-400">
            ठेकेदार: Apex Staffing
          </span>
        </div>

        <div className="space-y-2">
          {shifts.map((shift) => {
            const badge = getShiftBadge(shift.shiftType);
            const hourlyBase = shift.baseWagePerDay / 8;
            const shiftOtPay = Math.round(shift.otHours * hourlyBase * shift.otRateMultiplier);
            const shiftTotalEarned = shift.baseWagePerDay + shiftOtPay;

            return (
              <div
                key={shift.id}
                className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex flex-col items-center justify-center text-center flex-shrink-0">
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">
                      {new Date(shift.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-sm font-black text-amber-400 leading-none">
                      {new Date(shift.date).getDate()}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      {shift.otHours > 0 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-zinc-950">
                          +{shift.otHours}h OT (2x)
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                      <span>सामान्य: {shift.hoursWorked}h</span>
                      {shift.notes && <span>• {shift.notes}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                  <div className="text-right">
                    <div className="text-sm font-black text-white">
                      ₹{shiftTotalEarned}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      मूल ₹{shift.baseWagePerDay} {shiftOtPay > 0 && `+ OT ₹${shiftOtPay}`}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteShift(shift.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 transition"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Add Shift */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-zinc-950 border-2 border-amber-500 rounded-3xl p-5 sm:p-6 text-white my-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-black text-amber-400">
                {t.modalAddShiftTitle}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddShift} className="mt-4 space-y-3.5">
              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  {t.shiftDate}
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              {/* Shift Type */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  {t.shiftType}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'DAY', label: 'सुबह / दिन' },
                    { id: 'NIGHT', label: 'रात' },
                    { id: 'DOUBLE', label: 'डबल' }
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setNewShiftType(s.id as ShiftType)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                        newShiftType === s.id
                          ? 'bg-amber-500 text-zinc-950 border-amber-400'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hours & Overtime Hours */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    {t.hoursWorked}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={newHours}
                    onChange={(e) => setNewHours(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    {t.otHoursLabel} (2x)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="12"
                    value={newOtHours}
                    onChange={(e) => setNewOtHours(Number(e.target.value))}
                    className="w-full bg-zinc-900 border-2 border-amber-500/60 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Daily Wage Rate & Advance Taken */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    {t.dailyWageRate}
                  </label>
                  <input
                    type="number"
                    value={newBaseWage}
                    onChange={(e) => setNewBaseWage(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    {t.advanceTaken}
                  </label>
                  <input
                    type="number"
                    value={newAdvance}
                    onChange={(e) => setNewAdvance(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Contractor Name */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  {t.contractorName}
                </label>
                <input
                  type="text"
                  value={newContractor}
                  onChange={(e) => setNewContractor(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  टिप्पणी / Notes
                </label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="उदा. लाइन 4 डाई कास्टिंग"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-black text-xs shadow-lg transition"
                >
                  {t.saveShift}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Wage Slip Summary & WhatsApp Share */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-zinc-950 border-2 border-amber-500 rounded-3xl p-5 sm:p-6 text-white my-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-black text-white">
                  {t.wageSlipTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowSlipModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slip Paper Style */}
            <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-800 space-y-3 font-mono text-xs text-zinc-200">
              <div className="text-center pb-2 border-b border-dashed border-zinc-700">
                <div className="font-sans font-black text-amber-400 text-sm">
                  सुरक्षा साथी डिजिटल वेतन पर्ची
                </div>
                <div className="text-[11px] text-zinc-400">
                  Apex Industrial Staffing • अक्टूबर 2026
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span className="text-zinc-400">काम किए गए दिन:</span>
                  <span className="font-bold text-white">{totalRegularShifts} दिन (8h/दिन)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ओवरटाइम घंटे (2x दर):</span>
                  <span className="font-bold text-amber-400">{totalOtHours} घंटे</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">मूल वेतन राशि:</span>
                  <span className="font-bold text-white">₹{totalBaseWages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">ओवरटाइम राशि (Double OT):</span>
                  <span className="font-bold text-amber-400">+₹{Math.round(totalOtPay)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">उठाया गया अग्रिम (Advance):</span>
                  <span className="font-bold text-red-400">-₹{totalAdvances}</span>
                </div>
              </div>

              <div className="pt-2 border-t-2 border-dashed border-zinc-700 flex justify-between items-center text-sm">
                <span className="font-bold text-amber-400 uppercase">कुल हाथ में रकम:</span>
                <span className="font-black text-xl text-white">₹{totalNetTakeHome}</span>
              </div>

              <div className="text-[10px] text-zinc-500 pt-1 text-center font-sans">
                ✓ कारखाना अधिनियम 1948 धारा 59 के तहत मान्य कानूनी हिसाब
              </div>
            </div>

            {/* Share / Copy Button */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleCopyWageSlip}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-zinc-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition"
              >
                {copiedShare ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedShare ? 'कॉपी हो गया! (Copied)' : 'व्हाट्सएप / शेयर करें'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
