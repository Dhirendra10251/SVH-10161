export type TabType = 'overview' | 'recommendations' | 'simulator' | 'reports' | 'dte' | 'landing';

// Data Hierarchy Modes as per Government & VPP Credibility Standards
// LEVEL A: LIVE - Actual live telemetry (meters, satellite irradiance)
// LEVEL B: LAST_VERIFIED - Verified institutional / historical audit records
// LEVEL C: PROJECTED - Simulator / dispatch forecast
// LEVEL D: UNAVAILABLE - Missing / unconfirmed sensor data (NEVER fabricate)
export type DataMode = 'LIVE' | 'LAST_VERIFIED' | 'PROJECTED' | 'UNAVAILABLE';

export interface ProvenanceInfo {
  mode: DataMode;
  sourceName: string;
  sourceUrl?: string;
  sourceDate?: string;
  verifiedBy?: string;
  auditStandard?: string; // e.g. "ISO 50001:2018", "DTE Energy Audit 2023"
  notes?: string;
}

export interface MetricData {
  solarNowKw: number; // Current generation (or 0 if unverified)
  windNowKw: number;
  batterySocPercent: number;
  batteryCapacityKwh: number;
  batteryPowerKw: number; // negative = charging, positive = discharging
  gridDrawKw: number;
  totalDemandKw: number;
  selfSufficiencyPercent: number;
  provenanceMap?: Record<string, ProvenanceInfo>;
}

export interface WeatherTelemetry {
  temperatureC: number;
  directNormalIrradianceWm2: number;
  windSpeedKmh: number;
  cloudCoverPercent: number;
  timestamp: string;
  mode: DataMode;
  source: string;
  isFallback?: boolean;
}

export interface RajasthanDistrict {
  id: string;
  name: string;
  division: string;
  headquarters?: string;
  pilotCampusesCount: number;
}

export interface RajasthanDivision {
  name: string;
  districts: string[];
}

export interface GenerationMixItem {
  key: string;
  label: string;
  percentage: number;
  kw: number;
  color: string;
  bgLight: string;
  borderColor: string;
  icon: string;
}

export interface ForecastPoint {
  hour: string; // "00:00", "01:00", ... "23:00"
  hourNum: number;
  solarKw: number;
  windKw: number;
  batteryKw: number; // positive = discharge to campus, negative = charging
  gridKw: number;
  demandKw: number;
  totalGenKw: number;
  isMiddayPeak?: boolean;
  isEveningPeak?: boolean;
}

export interface RecommendationItem {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string; // Bold short action: e.g. "Charge battery now"
  actionType: 'charge' | 'shift_load' | 'hold_export' | 'load_stagger';
  reasoning: string; // Plain-language explainability "WHY"
  timeWindow: string; // e.g. "Next 2 Hours (12:00 - 14:00)"
  financialImpact: string; // e.g. "Saves ₹420 / peak cycle"
  co2Impact: string; // e.g. "Avoids 14.2 kg CO₂"
  status: 'pending' | 'acknowledged' | 'scheduled' | 'dismissed';
  suggestedAt: string;
  targetDevice: string;
  dataMode?: DataMode;
}

export interface CampusProfile {
  id: string;
  name: string;
  code: string;
  districtId: string;
  district: string;
  division: string;
  solarCapacityKw: number; // Installed capacity (0 if unconfirmed tender)
  windCapacityKw: number;
  batteryCapacityKwh: number;
  peakDemandKw: number;
  isMainCampus: boolean;
  verificationStatus: 'VERIFIED' | 'TENDER_UNCONFIRMED' | 'TELEMETRY_PENDING';
  tenderCapacityKw?: number; // E.g., MNIT 300 kW tender floated
  annualUnitsKwh?: number; // E.g. IIT Jodhpur ~14.9 Lakh units/year (1,490,000 kWh)
  demandFulfillmentPercent?: number; // E.g. IIT Jodhpur ~15% campus demand
  annualCo2ReductionTonnes?: number; // E.g. IIT Jodhpur ~1,060 tonnes/year
  latitude: number;
  longitude: number;
  provenance: Record<string, ProvenanceInfo>;
  dataNotes?: string;
}

export interface SimulatorState {
  additionalSolarKw: number; // 0 to 20 kW
  shiftLabHours: number;      // 0 to 4 hours
}

export interface SimulationResult {
  baselineSelfConsumption: number; // 62%
  projectedSelfConsumption: number; // e.g. 78%
  dailySavingsInr: number; // e.g. ₹1,120
  monthlySavingsInr: number; // e.g. ₹33,600
  co2AvoidedKgDay: number; // e.g. 32.4 kg
  gridDependencePercent: number; // e.g. 22%
  solarSurplusKw: number;
}

export interface WeeklyAuditRow {
  period: string; // e.g. 'Week 1 (Aug 1 - Aug 7)'
  solarKwh: number;
  windKwh: number | null; // null if no wind installed
  selfConsumed: string; // e.g. '98.5%'
  savings: string; // e.g. '₹2,15,600'
  status: 'Audited' | 'Projected';
}

export interface CampusAuditReport {
  campusId: string;
  campusName: string;
  campusCode: string;
  district: string;
  hasAuditData: boolean;
  unavailableReason?: string;
  discomMeterId: string;
  auditCycle: string;
  totalRenewableGenKwh: number;
  solarSharePercent: number;
  windSharePercent: number;
  selfConsumedPercent: number;
  selfConsumedKwh: number;
  gridImportedKwh: number;
  monthlySavingsInr: number;
  monthlySavingsFormatted: string;
  co2AvoidedKg: number;
  co2AvoidedTonnesFormatted: string;
  weeklyRows: WeeklyAuditRow[];
}
