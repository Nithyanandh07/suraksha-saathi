export type Language = 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'en';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  speechLocale: string;
}

export type ShiftType = 'DAY' | 'AFTERNOON' | 'NIGHT' | 'DOUBLE' | 'OFF';

export interface ShiftRecord {
  id: string;
  date: string; // YYYY-MM-DD
  shiftType: ShiftType;
  hoursWorked: number;
  otHours: number;
  baseWagePerDay: number;
  otRateMultiplier: number;
  contractorName: string;
  advanceDeduction: number;
  notes?: string;
}

export type HazardLevel = 'DANGER' | 'WARNING' | 'CAUTION' | 'MANDATORY';

export interface SafetySignAnalysis {
  title: string;
  hazardLevel: HazardLevel;
  explanation: string;
  dos: string[];
  donts: string[];
  requiredPPE: string[];
  audioScript: string;
  sourceImage?: string;
  presetId?: string;
}

export type GrievanceCategory = 
  | 'MACHINERY_GUARD'
  | 'ELECTRICAL_HAZARD'
  | 'CHEMICAL_FUMES'
  | 'MISSING_PPE'
  | 'UNPAID_OVERTIME'
  | 'WATER_SANITATION'
  | 'SUPERVISOR_HARASSMENT'
  | 'OTHER';

export type GrievanceSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface GrievanceRecord {
  id: string;
  trackingCode: string;
  category: GrievanceCategory;
  severity: GrievanceSeverity;
  description: string;
  plantLocation: string;
  timestamp: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'INSPECTION_SCHEDULED' | 'RESOLVED';
  statusNote?: string;
  immediateSafetyAdvice?: string;
}

export type ResourceCategory = 'GOV_SCHEMES' | 'LEGAL_RIGHTS' | 'FINANCIAL_LITERACY' | 'COMMUNITY_HELPLINES';

export interface ResourceItem {
  id: string;
  category: ResourceCategory;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  description: Record<Language, string>;
  keyPoints: Record<Language, string[]>;
  actionLabel?: Record<Language, string>;
  contactOrAction?: string;
  iconName: string;
  badge?: Record<Language, string>;
}
