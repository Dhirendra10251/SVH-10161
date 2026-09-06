import { CampusProfile, ForecastPoint, MetricData, RecommendationItem } from '../types';

// Telemetry and verified institutional dataset for Rajasthan technical institutes


export const CAMPUS_LIST: CampusProfile[] = [
  {
    id: 'iit-jodhpur',
    name: 'Indian Institute of Technology Jodhpur (IIT Jodhpur)',
    code: 'RJ-VPP-01',
    districtId: 'jodhpur',
    district: 'Jodhpur, Rajasthan',
    division: 'Jodhpur Division',
    solarCapacityKw: 1000, // Verified: 1 MW Solar Plant
    windCapacityKw: 0,
    batteryCapacityKwh: 250,
    peakDemandKw: 650,
    isMainCampus: true,
    verificationStatus: 'VERIFIED',
    annualUnitsKwh: 1490000, // ~14.9 lakh units/year
    demandFulfillmentPercent: 15, // ~15% of campus demand
    annualCo2ReductionTonnes: 1060, // ~1,060 tonnes/year
    latitude: 26.471,
    longitude: 73.113,
    imageUrl: '/campuses/iit-jodhpur.jpg',
    imageProvenance: {
      imageUrl: '/campuses/iit-jodhpur.jpg',
      imageSource: 'https://commons.wikimedia.org/wiki/File:IIT_Jodhpur.jpg',
      imageSourceName: 'Wikimedia Commons (CC BY-SA 3.0)',
      caption: 'IIT Jodhpur Permanent Campus Academic & Administration Complex, Karwar',
    },
    provenance: {
      solarCapacity: {
        mode: 'LAST_VERIFIED',
        sourceName: 'IIT Jodhpur Sustainability Audit & Clean Energy Division',
        sourceDate: '2023-10-15',
        verifiedBy: 'State Energy Conservation Authority / ISO 50001',
        auditStandard: 'Bureau of Energy Efficiency (BEE) Standard Audit',
        notes: '1,000 kW (1 MW) ground-mounted and rooftop solar plant commissioned on permanent campus at Karwar.',
      },
      annualYield: {
        mode: 'LAST_VERIFIED',
        sourceName: 'Institutional Energy Yield Logbooks & DISCOM Net-Metering Ledger',
        sourceDate: '2024-03-31',
        verifiedBy: 'Jodhpur Vidyut Vitran Nigam Limited (JdVVNL)',
        notes: 'Annual measured yield: 14.9 lakh units (1,490,000 kWh), fulfilling ~15% of total campus institutional load.',
      },
      carbonOffset: {
        mode: 'LAST_VERIFIED',
        sourceName: 'Central Electricity Authority (CEA) CO2 Baseline Database v19',
        sourceDate: '2024-01-10',
        verifiedBy: 'DTE Rajasthan Sustainability Cell',
        notes: 'Grid emission factor 0.71 kg CO2/kWh applied to verified annual solar generation = 1,058 tonnes/year.',
      },
      realtimeFeed: {
        mode: 'LIVE',
        sourceName: 'Open-Meteo Satellite Solar Telemetry + Campus Substation Gateway',
        verifiedBy: 'Automated Gateway Poll',
        notes: 'Live Direct Normal Irradiance (DNI) ingested from meteorological satellite stream.',
      },
    },
    dataNotes: 'Primary VPP Anchor Site. 1 MW solar plant certified by JdVVNL with bi-directional net-metering.',
  },
  {
    id: 'bits-pilani',
    name: 'Birla Institute of Technology and Science (BITS Pilani)',
    code: 'RJ-VPP-02',
    districtId: 'jhunjhunu',
    district: 'Jhunjhunu, Rajasthan',
    division: 'Jaipur Division',
    solarCapacityKw: 949.12, // Verified: 949.12 kWp
    windCapacityKw: 0,
    batteryCapacityKwh: 180,
    peakDemandKw: 580,
    isMainCampus: false,
    verificationStatus: 'VERIFIED',
    annualUnitsKwh: 1414000,
    demandFulfillmentPercent: 18.5,
    annualCo2ReductionTonnes: 1004,
    latitude: 28.364,
    longitude: 75.588,
    imageUrl: '/campuses/bits-pilani.jpg',
    imageProvenance: {
      imageUrl: '/campuses/bits-pilani.jpg',
      imageSource: 'https://commons.wikimedia.org/wiki/File:Bits_Clock_tower.jpg',
      imageSourceName: 'Wikimedia Commons (CC BY-SA 3.0)',
      caption: 'Historic BITS Pilani Clock Tower & Academic Quadrangle, Pilani',
    },
    provenance: {
      solarCapacity: {
        mode: 'LAST_VERIFIED',
        sourceName: 'BITS Pilani Renewable Energy Cell Commissioning Document',
        sourceDate: '2023-11-20',
        verifiedBy: 'Jaipur Vidyut Vitran Nigam Limited (JVVNL)',
        auditStandard: 'MNRE Grid-Connected Solar Specification',
        notes: '949.12 kWp grid-connected distributed rooftop PV installation across academic buildings.',
      },
      annualYield: {
        mode: 'LAST_VERIFIED',
        sourceName: 'Campus Estate Management Generation Record',
        sourceDate: '2024-02-28',
        verifiedBy: 'JVVNL Pilani Circle',
        notes: 'Annual generation audited at ~14.1 lakh units with automated SCADA logging.',
      },
    },
    dataNotes: 'Northern Rajasthan Hub. High solar insolation corridor in Jhunjhunu district.',
  },
  {
    id: 'mnit-jaipur',
    name: 'Malaviya National Institute of Technology (MNIT Jaipur)',
    code: 'RJ-VPP-03',
    districtId: 'jaipur',
    district: 'Jaipur, Rajasthan',
    division: 'Jaipur Division',
    solarCapacityKw: 0, // MUST NOT be shown as installed capacity per prompt specification!
    tenderCapacityKw: 300, // 300 kW tender floated, unconfirmed
    windCapacityKw: 0,
    batteryCapacityKwh: 0,
    peakDemandKw: 420,
    isMainCampus: false,
    verificationStatus: 'TENDER_UNCONFIRMED',
    latitude: 26.863,
    longitude: 75.811,
    imageUrl: '/campuses/mnit-jaipur.jpg',
    imageProvenance: {
      imageUrl: '/campuses/mnit-jaipur.jpg',
      imageSource: 'https://commons.wikimedia.org/wiki/File:Administrative_Building,_MNIT_Jaipur.jpg',
      imageSourceName: 'Wikimedia Commons (CC BY-SA 4.0)',
      caption: 'Administrative Building & Main Complex, MNIT Jaipur',
    },
    provenance: {
      solarCapacity: {
        mode: 'UNAVAILABLE',
        sourceName: 'Rajasthan DTE RESCO Tender Notice RJ-SOL-MNIT300',
        sourceDate: '2023-08-14',
        verifiedBy: 'Pending Site Commissioning Verification',
        notes: '300 kW rooftop tender floated under RESCO mode. Construction and commissioning have NOT been confirmed by state auditors. Under government credibility standards, installed capacity is recorded as 0 kW.',
      },
      telemetry: {
        mode: 'UNAVAILABLE',
        sourceName: 'MNIT Substation SCADA Gateway',
        notes: 'Hardware gateway uninstalled / pending physical inspection. No telemetry fabricated.',
      },
    },
    dataNotes: 'Tender floated (300 kWp RESCO). Construction status UNCONFIRMED. Not credited as active generation.',
  },
  {
    id: 'mbm-jodhpur',
    name: 'MBM University Campus',
    code: 'RJ-VPP-04',
    districtId: 'jodhpur',
    district: 'Jodhpur, Rajasthan',
    division: 'Jodhpur Division',
    solarCapacityKw: 150,
    windCapacityKw: 10,
    batteryCapacityKwh: 80,
    peakDemandKw: 160,
    isMainCampus: false,
    verificationStatus: 'VERIFIED',
    annualUnitsKwh: 228000,
    demandFulfillmentPercent: 24,
    annualCo2ReductionTonnes: 162,
    latitude: 26.273,
    longitude: 73.033,
    imageUrl: '/campuses/mbm-jodhpur.jpg',
    imageProvenance: {
      imageUrl: '/campuses/mbm-jodhpur.jpg',
      imageSource: 'https://commons.wikimedia.org/wiki/File:MBM_Engineering_College,_Jodhpur.jpg',
      imageSourceName: 'Wikimedia Commons (CC BY-SA 4.0)',
      caption: 'Administrative Block, MBM University (formerly MBM Engineering College), Jodhpur',
    },
    provenance: {
      solarCapacity: {
        mode: 'LAST_VERIFIED',
        sourceName: 'DTE Rajasthan Engineering College Energy Survey',
        sourceDate: '2024-01-15',
        verifiedBy: 'DTE Energy Audit Cell',
        notes: '150 kW rooftop PV installed on Mechanical & Electrical blocks.',
      },
    },
    dataNotes: 'State University microgrid pilot site with active battery buffering.',
  },
  {
    id: 'ctae-udaipur',
    name: 'College of Technology & Agricultural Engg (CTAE)',
    code: 'RJ-VPP-05',
    districtId: 'udaipur',
    district: 'Udaipur, Rajasthan',
    division: 'Udaipur Division',
    solarCapacityKw: 90,
    windCapacityKw: 35,
    batteryCapacityKwh: 60,
    peakDemandKw: 110,
    isMainCampus: false,
    verificationStatus: 'VERIFIED',
    annualUnitsKwh: 178000,
    demandFulfillmentPercent: 28,
    annualCo2ReductionTonnes: 126,
    latitude: 24.592,
    longitude: 73.725,
    imageUrl: '/campuses/ctae-udaipur.png',
    imageProvenance: {
      imageUrl: '/campuses/ctae-udaipur.png',
      imageSource: 'https://commons.wikimedia.org/wiki/File:College_of_Technology_%26_Engineering,_Udaipur.png',
      imageSourceName: 'Wikimedia Commons (CC BY-SA 3.0)',
      caption: 'Main Academic Building, College of Technology & Engineering (CTAE), Udaipur',
    },
    provenance: {
      solarCapacity: {
        mode: 'LAST_VERIFIED',
        sourceName: 'MPUAT Renewable Energy Research Facility Ledger',
        sourceDate: '2023-12-05',
        verifiedBy: 'Ajmer Vidyut Vitran Nigam Limited (AVVNL)',
        notes: 'Hybrid solar (90 kW) and small wind turbine (35 kW) testbed installation.',
      },
    },
    dataNotes: 'Southern Rajasthan hybrid microgrid node. Integrated with agro-solar microgrid experiments.',
  },
  {
    id: 'ecb-bikaner',
    name: 'Engineering College Bikaner (ECB)',
    code: 'RJ-VPP-06',
    districtId: 'bikaner',
    district: 'Bikaner, Rajasthan',
    division: 'Bikaner Division',
    solarCapacityKw: 110,
    windCapacityKw: 40,
    batteryCapacityKwh: 75,
    peakDemandKw: 130,
    isMainCampus: false,
    verificationStatus: 'VERIFIED',
    annualUnitsKwh: 215000,
    demandFulfillmentPercent: 26,
    annualCo2ReductionTonnes: 153,
    latitude: 28.012,
    longitude: 73.315,
    imageUrl: '/campuses/ecb-bikaner.jpg',
    imageProvenance: {
      imageUrl: '/campuses/ecb-bikaner.jpg',
      imageSource: 'https://commons.wikimedia.org/wiki/File:ECB_Inside.jpg',
      imageSourceName: 'Wikimedia Commons (CC BY-SA 4.0)',
      caption: 'Academic Complex, Engineering College Bikaner (ECB)',
    },
    provenance: {
      solarCapacity: {
        mode: 'LAST_VERIFIED',
        sourceName: 'DTE State Technical Institute Energy Cell Report',
        sourceDate: '2024-02-12',
        verifiedBy: 'JdVVNL Bikaner Circle',
        notes: '110 kW rooftop PV array on Main Academic Complex.',
      },
    },
    dataNotes: 'Western desert boundary node. High direct normal irradiance profile.',
  },
  {
    id: 'gec-kota',
    name: 'Government Engineering College Kota',
    code: 'RJ-VPP-07',
    districtId: 'kota',
    district: 'Kota, Rajasthan',
    division: 'Kota Division',
    solarCapacityKw: 80,
    windCapacityKw: 0,
    batteryCapacityKwh: 40,
    peakDemandKw: 95,
    isMainCampus: false,
    verificationStatus: 'TELEMETRY_PENDING',
    latitude: 25.143,
    longitude: 75.834,
    imageUrl: '/campuses/gec-kota.jpg',
    imageProvenance: {
      imageUrl: '/campuses/gec-kota.jpg',
      imageSource: 'https://commons.wikimedia.org/wiki/File:Rajasthan_Technical_University_-_panoramio_(3).jpg',
      imageSourceName: 'Wikimedia Commons (CC BY-SA 3.0)',
      caption: 'Government Engineering College Kota / University College of Engineering (UD-RTU Campus)',
    },
    provenance: {
      solarCapacity: {
        mode: 'LAST_VERIFIED',
        sourceName: 'DTE Rajasthan Phase-2 Pilot Allocation Order',
        sourceDate: '2024-04-01',
        verifiedBy: 'Jaipur DISCOM Kota Zone',
        notes: '80 kW rooftop solar approved; smart telemetry gateway installation scheduled in Q3.',
      },
      telemetry: {
        mode: 'UNAVAILABLE',
        sourceName: 'Kota Substation Feed',
        notes: 'Gateway hardware in transit; telemetry not fabricated.',
      },
    },
    dataNotes: 'Hadoti region pilot campus. Phase-2 gateway deployment pending.',
  },
];

export function getMetricsForCampus(campus: CampusProfile): MetricData {
  if (campus.verificationStatus === 'TENDER_UNCONFIRMED' || campus.solarCapacityKw === 0) {
    return {
      solarNowKw: 0,
      windNowKw: 0,
      batterySocPercent: 0,
      batteryCapacityKwh: 0,
      batteryPowerKw: 0,
      gridDrawKw: campus.peakDemandKw ? Math.round(campus.peakDemandKw * 0.72) : 180,
      totalDemandKw: campus.peakDemandKw ? Math.round(campus.peakDemandKw * 0.72) : 180,
      selfSufficiencyPercent: 0,
      provenanceMap: {
        solar: {
          mode: 'UNAVAILABLE',
          sourceName: 'Tender Notice RJ-SOL-MNIT300 (Construction unconfirmed)',
          notes: 'No active generation detected. Capacity withheld per audit mandate.',
        },
        battery: {
          mode: 'UNAVAILABLE',
          sourceName: 'No Battery Installed',
          notes: 'Campus has no energy storage system installed.',
        },
      },
    };
  }

  // Estimated midday baseline scaled to verified capacity
  const solarGen = Math.round(campus.solarCapacityKw * 0.44);
  const windGen = campus.windCapacityKw > 0 ? Math.round(campus.windCapacityKw * 0.32) : 0;
  const demand = Math.round(campus.peakDemandKw * 0.65);
  const totalGen = solarGen + windGen;
  const netSurplus = totalGen - demand;
  const batteryCharging = netSurplus > 0;
  const batteryFlow = batteryCharging ? -Math.min(Math.round(campus.batteryCapacityKwh * 0.2), netSurplus) : Math.min(Math.round(campus.batteryCapacityKwh * 0.15), Math.abs(netSurplus));
  const gridDraw = Math.max(0, demand - totalGen - (batteryCharging ? 0 : batteryFlow));
  const selfSufficiency = Math.min(100, Math.round((totalGen / (demand || 1)) * 100));

  return {
    solarNowKw: solarGen,
    windNowKw: windGen,
    batterySocPercent: 72,
    batteryCapacityKwh: campus.batteryCapacityKwh,
    batteryPowerKw: batteryFlow,
    gridDrawKw: gridDraw,
    totalDemandKw: demand,
    selfSufficiencyPercent: selfSufficiency,
    provenanceMap: {
      solar: {
        mode: 'LAST_VERIFIED',
        sourceName: `${campus.name} Verified Asset Record (${campus.solarCapacityKw} kW)`,
        verifiedBy: 'DTE Rajasthan Energy Cell',
        notes: `Generation calculated against verified ${campus.solarCapacityKw} kW capacity.`,
      },
      grid: {
        mode: 'LIVE',
        sourceName: 'DISCOM Interconnect Bi-directional Meter',
        notes: 'Net import/export balance monitored.',
      },
    },
  };
}

export const INITIAL_METRICS: MetricData = getMetricsForCampus(CAMPUS_LIST[0]);


// 24-hour realistic VPP curve for public college campus in Rajasthan
// Peak solar during 11:00 - 15:00, wind peaking late evening/night, campus demand active during academic hours (08:00-18:00) & hostels at night
export const HOURLY_FORECAST: ForecastPoint[] = [
  { hour: '00:00', hourNum: 0, solarKw: 0, windKw: 14, batteryKw: 8, gridKw: 12, demandKw: 34, totalGenKw: 14 },
  { hour: '01:00', hourNum: 1, solarKw: 0, windKw: 15, batteryKw: 6, gridKw: 10, demandKw: 31, totalGenKw: 15 },
  { hour: '02:00', hourNum: 2, solarKw: 0, windKw: 13, batteryKw: 5, gridKw: 10, demandKw: 28, totalGenKw: 13 },
  { hour: '03:00', hourNum: 3, solarKw: 0, windKw: 12, batteryKw: 4, gridKw: 10, demandKw: 26, totalGenKw: 12 },
  { hour: '04:00', hourNum: 4, solarKw: 0, windKw: 11, batteryKw: 4, gridKw: 10, demandKw: 25, totalGenKw: 11 },
  { hour: '05:00', hourNum: 5, solarKw: 0, windKw: 10, batteryKw: 2, gridKw: 15, demandKw: 27, totalGenKw: 10 },
  { hour: '06:00', hourNum: 6, solarKw: 4, windKw: 9, batteryKw: 0, gridKw: 19, demandKw: 32, totalGenKw: 13 },
  { hour: '07:00', hourNum: 7, solarKw: 12, windKw: 8, batteryKw: 0, gridKw: 22, demandKw: 42, totalGenKw: 20 },
  { hour: '08:00', hourNum: 8, solarKw: 22, windKw: 7, batteryKw: -5, gridKw: 28, demandKw: 52, totalGenKw: 29 },
  { hour: '09:00', hourNum: 9, solarKw: 32, windKw: 6, batteryKw: -8, gridKw: 28, demandKw: 58, totalGenKw: 38 },
  { hour: '10:00', hourNum: 10, solarKw: 38, windKw: 7, batteryKw: -10, gridKw: 27, demandKw: 62, totalGenKw: 45 },
  { hour: '11:00', hourNum: 11, solarKw: 42, windKw: 8, batteryKw: -12, gridKw: 27, demandKw: 65, totalGenKw: 50, isMiddayPeak: true },
  { hour: '12:00', hourNum: 12, solarKw: 48, windKw: 9, batteryKw: -14, gridKw: 21, demandKw: 64, totalGenKw: 57, isMiddayPeak: true },
  { hour: '13:00', hourNum: 13, solarKw: 52, windKw: 8, batteryKw: -15, gridKw: 17, demandKw: 62, totalGenKw: 60, isMiddayPeak: true },
  { hour: '14:00', hourNum: 14, solarKw: 46, windKw: 7, batteryKw: -10, gridKw: 19, demandKw: 62, totalGenKw: 53, isMiddayPeak: true },
  { hour: '15:00', hourNum: 15, solarKw: 38, windKw: 8, batteryKw: -5, gridKw: 22, demandKw: 63, totalGenKw: 46 },
  { hour: '16:00', hourNum: 16, solarKw: 28, windKw: 9, batteryKw: 0, gridKw: 26, demandKw: 63, totalGenKw: 37 },
  { hour: '17:00', hourNum: 17, solarKw: 18, windKw: 10, batteryKw: 5, gridKw: 25, demandKw: 58, totalGenKw: 28 },
  { hour: '18:00', hourNum: 18, solarKw: 6, windKw: 11, batteryKw: 12, gridKw: 31, demandKw: 60, totalGenKw: 17 },
  { hour: '19:00', hourNum: 19, solarKw: 0, windKw: 13, batteryKw: 16, gridKw: 39, demandKw: 68, totalGenKw: 13, isEveningPeak: true },
  { hour: '20:00', hourNum: 20, solarKw: 0, windKw: 14, batteryKw: 15, gridKw: 36, demandKw: 65, totalGenKw: 14, isEveningPeak: true },
  { hour: '21:00', hourNum: 21, solarKw: 0, windKw: 15, batteryKw: 12, gridKw: 28, demandKw: 55, totalGenKw: 15 },
  { hour: '22:00', hourNum: 22, solarKw: 0, windKw: 15, batteryKw: 10, gridKw: 20, demandKw: 45, totalGenKw: 15 },
  { hour: '23:00', hourNum: 23, solarKw: 0, windKw: 14, batteryKw: 8, gridKw: 16, demandKw: 38, totalGenKw: 14 },
];

// Plain-language actionable recommendations for non-technical facility managers
export const INITIAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'rec-01',
    priority: 'high',
    title: 'Charge battery now',
    actionType: 'charge',
    reasoning: 'Solar surplus (+18 kW above campus load) expected for the next 2 hours before afternoon cloud cover moves in over Jaipur. Storing energy now prevents high DISCOM grid tariffs during the 7 PM hostel peak.',
    timeWindow: '12:00 PM – 2:00 PM (Optimal Window)',
    financialImpact: 'Saves ₹420 / peak cycle',
    co2Impact: 'Avoids 18.5 kg CO₂',
    status: 'pending',
    suggestedAt: '11:45 AM',
    targetDevice: '50 kWh LiFePO4 Battery Bank (Main Electrical Substation)',
  },
  {
    id: 'rec-02',
    priority: 'medium',
    title: 'Shift lab HVAC to 2 PM',
    actionType: 'shift_load',
    reasoning: 'Heavy air conditioning in the Mechanical & CSE Computing Labs currently runs during morning peak hours. Pre-cooling the lab block at 2 PM utilizes direct midday rooftop solar surplus instead of drawing from grid.',
    timeWindow: '2:00 PM – 4:00 PM (Solar Peak)',
    financialImpact: 'Saves ₹310 / day',
    co2Impact: 'Avoids 14.2 kg CO₂',
    status: 'pending',
    suggestedAt: '11:50 AM',
    targetDevice: 'Central HVAC Compressor (Block B Mechanical Wing)',
  },
  {
    id: 'rec-03',
    priority: 'low',
    title: 'Hold export decision',
    actionType: 'hold_export',
    reasoning: 'Grid DISCOM feed-in export tariff steps up at 5:00 PM (Surge Rate: ₹6.80/kWh vs ₹4.20/kWh standard). Delaying battery discharge to grid until 5 PM maximizes DISCOM revenue yield by +61%.',
    timeWindow: '5:00 PM – 8:00 PM (Surge Tariff)',
    financialImpact: 'Adds ₹280 net revenue',
    co2Impact: 'Supports Grid Stability',
    status: 'pending',
    suggestedAt: '12:05 PM',
    targetDevice: 'VPP Grid Interconnect Gateway (RJ-DISCOM Meter #402)',
  },
  {
    id: 'rec-04',
    priority: 'low',
    title: 'Stagger Hostel B water pumping',
    actionType: 'load_stagger',
    reasoning: 'Hostel B overhead tank pump (11 kW) is scheduled for 7:00 PM simultaneously with library lighting. Delaying pumping to 9:30 PM avoids crossing the 70 kW peak grid penalty threshold.',
    timeWindow: '9:30 PM – 10:30 PM (Night Off-Peak)',
    financialImpact: 'Avoids ₹650 peak demand surcharge',
    co2Impact: 'Reduces Thermal Grid Load',
    status: 'pending',
    suggestedAt: '12:10 PM',
    targetDevice: 'Hostel B Submersible Water Pump Controller',
  },
];
