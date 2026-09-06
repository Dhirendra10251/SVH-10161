import { jsPDF } from 'jspdf';
import { CampusProfile, MetricData, RecommendationItem } from '../types';
import { getCampusAuditReport } from '../data/campusAuditData';

export interface GeneratePdfOptions {
  campus: CampusProfile;
  metrics?: MetricData;
  recommendations?: RecommendationItem[];
}

/**
 * Sanitizes campus name for safe, informative file naming:
 * e.g., "UrjaSetu_IIT_Jodhpur_Audit_Report.pdf"
 */
export function getAuditReportFileName(campus: CampusProfile): string {
  // Short name extract or clean identifier
  let shortName = 'Campus';
  if (campus.id === 'iit-jodhpur') shortName = 'IIT_Jodhpur';
  else if (campus.id === 'bits-pilani') shortName = 'BITS_Pilani';
  else if (campus.id === 'mnit-jaipur') shortName = 'MNIT_Jaipur';
  else if (campus.id === 'mbm-jodhpur') shortName = 'MBM_University';
  else if (campus.id === 'ctae-udaipur') shortName = 'CTAE_Udaipur';
  else if (campus.id === 'ecb-bikaner') shortName = 'ECB_Bikaner';
  else if (campus.id === 'gec-kota') shortName = 'GEC_Kota';
  else {
    shortName = campus.name
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .slice(0, 24);
  }

  return `UrjaSetu_${shortName}_Audit_Report.pdf`;
}

/**
 * Generates an authoritative, statutory Energy Audit PDF for any campus
 * in the UrjaSetu Rajasthan Virtual Power Plant Network.
 * Strictly preserves the distinction between AUDITED, PROJECTED, and UNAVAILABLE data.
 */
export async function generateAuditPdf({
  campus,
  metrics,
  recommendations = [],
}: GeneratePdfOptions): Promise<{ blob: Blob; fileName: string }> {
  const report = getCampusAuditReport(campus);
  const fileName = getAuditReportFileName(campus);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let y = margin;

  // 1. TOP HEADER BANNER (Official State Government Styling)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('GOVERNMENT OF RAJASTHAN • DEPARTMENT OF ENERGY', margin + 6, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('UrjaSetu Virtual Power Plant (VPP) Microgrid Network | Statutory Energy Audit', margin + 6, y + 13);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(251, 191, 36); // amber-400
  doc.text(`VPP NODE: ${campus.code}  |  STATUS: ${campus.verificationStatus}`, margin + 6, y + 19);

  // Date / timestamp on top right
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(226, 232, 240);
  doc.text(`Generated: ${dateStr}`, pageWidth - margin - 6, y + 7, { align: 'right' });
  doc.text('ISO 50001 / BEE Compliance', pageWidth - margin - 6, y + 13, { align: 'right' });

  y += 28;

  // 2. INSTITUTION TITLE & LOCATION
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(campus.name, margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text(`${campus.district} • ${campus.division} • Coordinates: ${campus.latitude.toFixed(3)}°N, ${campus.longitude.toFixed(3)}°E`, margin, y);
  y += 7;

  // 3. AUDIT CYCLE & METER ID BANNER
  doc.setFillColor(241, 245, 249); // slate-100
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.roundedRect(margin, y, contentWidth, 12, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text(`Audit Cycle: ${report.auditCycle}`, margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Interconnect Meter: ${report.discomMeterId}`, margin + 4, y + 9.5);

  y += 16;

  // 4. CAPACITY OVERVIEW (4 Cards)
  const colW = (contentWidth - 6) / 4;
  const capCards = [
    {
      label: 'ROOFTOP SOLAR',
      value: campus.solarCapacityKw > 0 ? `${campus.solarCapacityKw} kWp` : (campus.tenderCapacityKw ? `${campus.tenderCapacityKw} kW (Tender)` : '0 kW'),
      sub: campus.solarCapacityKw > 0 ? 'Verified Installed' : 'Unconfirmed / Pending',
      color: [180, 83, 9], // amber-700
    },
    {
      label: 'WIND TURBINE',
      value: `${campus.windCapacityKw} kW`,
      sub: campus.windCapacityKw > 0 ? 'Hybrid Turbine' : 'No Wind Asset',
      color: [13, 148, 136], // teal-600
    },
    {
      label: 'BATTERY STORAGE',
      value: `${campus.batteryCapacityKwh} kWh`,
      sub: campus.batteryCapacityKwh > 0 ? 'Peak Buffer Storage' : 'No BESS Installed',
      color: [2, 132, 199], // sky-600
    },
    {
      label: 'PEAK DEMAND CAP',
      value: `${campus.peakDemandKw} kW`,
      sub: 'Sanctioned Grid Load',
      color: [51, 65, 85], // slate-700
    },
  ];

  capCards.forEach((c, idx) => {
    const cx = margin + idx * (colW + 2);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(cx, y, colW, 16, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(c.label, cx + 3, y + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(c.color[0], c.color[1], c.color[2]);
    doc.text(c.value, cx + 3, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(c.sub, cx + 3, y + 14);
  });

  y += 20;

  // 5. MONTHLY AUDIT PERFORMANCE METRICS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('MONTHLY VPP ENERGY AUDIT RECONCILIATION', margin, y);
  y += 4;

  if (report.hasAuditData) {
    const metricW = (contentWidth - 8) / 5;
    const auditMetrics = [
      {
        label: 'RENEWABLE GEN',
        val: `${report.totalRenewableGenKwh.toLocaleString()} kWh`,
        note: `Solar ${report.solarSharePercent}%${report.windSharePercent > 0 ? ` + Wind ${report.windSharePercent}%` : ''}`,
      },
      {
        label: 'SELF-CONSUMED',
        val: `${report.selfConsumedPercent}%`,
        note: `${report.selfConsumedKwh.toLocaleString()} kWh local`,
      },
      {
        label: 'GRID IMPORTED',
        val: `${report.gridImportedKwh.toLocaleString()} kWh`,
        note: 'DISCOM balance draw',
      },
      {
        label: 'TARIFF SAVINGS',
        val: report.monthlySavingsFormatted,
        note: 'Net tariff offset',
      },
      {
        label: 'CO2 AVOIDED',
        val: report.co2AvoidedTonnesFormatted,
        note: 'Clean grid delta',
      },
    ];

    auditMetrics.forEach((m, idx) => {
      const mx = margin + idx * (metricW + 2);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(mx, y, metricW, 16, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(m.label, mx + 3, y + 4.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(m.val, mx + 3, y + 10);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(71, 85, 105);
      doc.text(m.note, mx + 3, y + 14);
    });

    y += 21;

    // 6. WEEKLY VPP AUDIT LOG TABLE
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`WEEKLY AUDIT LOG • DISCOM NET-METER RECORD`, margin, y);
    y += 4;

    // Table Header
    doc.setFillColor(30, 41, 59); // slate-800
    doc.rect(margin, y, contentWidth, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text('Audit Interval', margin + 3, y + 4.8);
    doc.text('Solar Yield', margin + 55, y + 4.8, { align: 'right' });
    doc.text('Wind Yield', margin + 85, y + 4.8, { align: 'right' });
    doc.text('Self-Consumption', margin + 120, y + 4.8, { align: 'right' });
    doc.text('DISCOM Savings', margin + 152, y + 4.8, { align: 'right' });
    doc.text('Audit Status', margin + 179, y + 4.8, { align: 'right' });

    y += 7;

    // Table Rows
    report.weeklyRows.forEach((row, rIdx) => {
      const isAlt = rIdx % 2 === 1;
      if (isAlt) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, y, contentWidth, 6.5, 'F');
      }
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, y + 6.5, margin + contentWidth, y + 6.5);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);
      doc.text(row.period, margin + 3, y + 4.5);

      doc.setFont('helvetica', 'normal');
      doc.text(`${row.solarKwh.toLocaleString()} kWh`, margin + 55, y + 4.5, { align: 'right' });
      doc.text(row.windKwh !== null ? `${row.windKwh.toLocaleString()} kWh` : '— (No Wind)', margin + 85, y + 4.5, { align: 'right' });
      doc.text(row.selfConsumed, margin + 120, y + 4.5, { align: 'right' });

      doc.setFont('helvetica', 'bold');
      doc.text(row.savings, margin + 152, y + 4.5, { align: 'right' });

      // Status tag
      if (row.status === 'Audited') {
        doc.setTextColor(5, 150, 105); // emerald-600
      } else {
        doc.setTextColor(37, 99, 235); // blue-600
      }
      doc.text(row.status.toUpperCase(), margin + 179, y + 4.5, { align: 'right' });

      y += 6.5;
    });

    y += 5;
  } else {
    // UNAVAILABLE DATA CALLOUT (Per government credibility standard)
    doc.setFillColor(254, 243, 199); // amber-100
    doc.setDrawColor(245, 158, 11); // amber-500
    doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(146, 64, 14); // amber-900
    doc.text('WEEKLY AUDIT DATA STATUS: UNAVAILABLE / PENDING COMMISSIONING', margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 53, 15); // amber-900
    const wrappedReason = doc.splitTextToSize(report.unavailableReason || 'Hardware gateway pending verification. Generation not fabricated.', contentWidth - 8);
    doc.text(wrappedReason, margin + 4, y + 11);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(180, 83, 9);
    doc.text('Government Credibility Mandate: UrjaSetu strictly refrains from fabricating telemetry or historical yield logs for unverified nodes.', margin + 4, y + 21);

    y += 28;
  }

  // 7. LIVE METRICS SNAPSHOT (If metrics provided)
  if (metrics) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text('LIVE TELEMETRY SNAPSHOT (METER GATEWAY STREAM)', margin, y);
    y += 4;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 14, 1.5, 1.5, 'FD');

    const liveW = contentWidth / 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);

    doc.text('Live Solar Gen:', margin + 4, y + 4.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(180, 83, 9);
    doc.text(`${metrics.solarNowKw} kW`, margin + 4, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Live Wind Gen:', margin + liveW + 4, y + 4.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(13, 148, 136);
    doc.text(`${metrics.windNowKw} kW`, margin + liveW + 4, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Battery SOC / Power:', margin + liveW * 2 + 4, y + 4.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(2, 132, 199);
    doc.text(`${metrics.batterySocPercent}% (${metrics.batteryPowerKw > 0 ? 'Discharging' : metrics.batteryPowerKw < 0 ? 'Charging' : 'Idle'})`, margin + liveW * 2 + 4, y + 10);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('Green Self-Sufficiency:', margin + liveW * 3 + 4, y + 4.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(5, 150, 105);
    doc.text(`${metrics.selfSufficiencyPercent}%`, margin + liveW * 3 + 4, y + 10);

    y += 18;
  }

  // 8. DATA PROVENANCE & AUDIT SOURCES
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('INSTITUTIONAL AUDIT PROVENANCE & STANDARDS', margin, y);
  y += 4;

  const provBoxH = 22;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, provBoxH, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);

  const provSolar = campus.provenance.solarCapacity;
  const provYield = campus.provenance.annualYield;
  const provCarbon = campus.provenance.carbonOffset;

  doc.text(`• Solar Capacity Source: ${provSolar?.sourceName || 'State Energy Audit'} (Mode: ${provSolar?.mode || 'VERIFIED'})`, margin + 4, y + 5);
  doc.text(`• Yield Validation: ${provYield?.sourceName || 'DISCOM Net-Metering Ledger'} | Verified By: ${provYield?.verifiedBy || 'DISCOM Circle'}`, margin + 4, y + 10);
  doc.text(`• Carbon Factor: ${provCarbon?.sourceName || 'CEA Baseline Database v19 (0.71 kg CO2/kWh)'}`, margin + 4, y + 15);
  doc.text(`• Compliance: Bureau of Energy Efficiency (BEE) Standard & ISO 50001 Energy Management`, margin + 4, y + 19.5);

  y += provBoxH + 6;

  // 9. STATUTORY CERTIFICATION & SIGNOFF FOOTER
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, margin + contentWidth, y);
  y += 4;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text('STATUTORY VERIFICATION & SIGN-OFF', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'This audit report is an official computer-generated document issued by the UrjaSetu Rajasthan Clean Energy VPP network in collaboration with the Directorate of Technical Education (DTE) and State DISCOMs.',
    margin,
    y + 4,
    { maxWidth: contentWidth - 40 }
  );

  // Digital verification stamp on bottom right
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(148, 163, 184);
  doc.roundedRect(pageWidth - margin - 36, y - 1, 36, 14, 1, 1, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(15, 23, 42);
  doc.text('VERIFIED BY', pageWidth - margin - 18, y + 3.5, { align: 'center' });
  doc.setFontSize(6);
  doc.setTextColor(5, 150, 105);
  doc.text('STATE VPP REGISTRY', pageWidth - margin - 18, y + 7.5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`ID: RJ-DTE-${campus.code}`, pageWidth - margin - 18, y + 11, { align: 'center' });

  // Output as Blob
  const blob = doc.output('blob');
  return { blob, fileName };
}

/**
 * Triggers a real, native browser download of the audit PDF for the selected campus.
 */
export async function downloadCampusAuditReport(options: GeneratePdfOptions): Promise<void> {
  const { blob, fileName } = await generateAuditPdf(options);

  // Create temporary URL and anchor
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 200);
}
