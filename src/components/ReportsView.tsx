import React, { useState } from 'react';
import { CampusProfile, MetricData, RecommendationItem } from '../types';
import { getCampusAuditReport } from '../data/campusAuditData';
import { AuditCertificateModal } from './AuditCertificateModal';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  Leaf,
  IndianRupee,
  Sun,
  Zap,
  CheckCircle2,
  Calendar,
  Building2,
  Share2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface ReportsViewProps {
  campus: CampusProfile;
  metrics: MetricData;
  recommendations: RecommendationItem[];
  onOpenAuditModal: () => void;
  isDarkMode?: boolean;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  campus,
  metrics,
  recommendations,
  onOpenAuditModal,
  isDarkMode = false,
}) => {
  const [reportPeriod, setReportPeriod] = useState<'current_month' | 'quarter' | 'year'>('current_month');
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Dynamic audit report derived strictly from selected campus (single source of truth)
  const report = getCampusAuditReport(campus);

  const handlePrintCertificate = () => {
    setIsCertificateModalOpen(true);
    // Allow user to preview certificate and automatically invoke browser print flow
    setTimeout(() => {
      try {
        window.print();
      } catch (err) {
        console.warn('Native print trigger deferred:', err);
      }
    }, 150);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Campus Energy & Audit Reports
            </h1>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
              isDarkMode
                ? 'bg-blue-950/60 text-blue-300 border-blue-800/40'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              ISO 50001 Verified
            </span>
          </div>
          <p className={`text-xs sm:text-sm mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            Comprehensive Virtual Power Plant yield audit, tariff reconciliation, and statutory carbon reduction reports
          </p>
        </div>

        {/* Audit Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAuditModal}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-xs ${
              isDarkMode
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-blue-700 hover:bg-blue-800 text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Primary 5 Metrics (Dynamically bound to selected campus audit data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Metric 1: Renewable Energy Generated */}
        <div
          className={`border rounded-2xl p-4 shadow-xs transition-colors ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Renewable Gen
            </span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-extrabold font-mono ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {report.hasAuditData ? report.totalRenewableGenKwh.toLocaleString() : '0'}
            </span>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>kWh</span>
          </div>
          <p className={`text-[11px] mt-1 font-semibold ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
            {report.hasAuditData ? (
              <>
                Solar ({report.solarSharePercent}%)
                {report.windSharePercent > 0 ? ` + Wind (${report.windSharePercent}%)` : ''}
              </>
            ) : (
              'Capacity Unconfirmed / 0 kW'
            )}
          </p>
        </div>

        {/* Metric 2: Renewable Energy Self-Consumed */}
        <div
          className={`border rounded-2xl p-4 shadow-xs transition-colors ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Self-Consumed
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-extrabold font-mono ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {report.hasAuditData ? `${report.selfConsumedPercent}%` : 'N/A'}
            </span>
          </div>
          <p className={`text-[11px] mt-1 font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
            {report.hasAuditData
              ? `${report.selfConsumedKwh.toLocaleString()} kWh utilized locally`
              : 'No generation recorded'}
          </p>
        </div>

        {/* Metric 3: Grid Energy Imported */}
        <div
          className={`border rounded-2xl p-4 shadow-xs transition-colors ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Grid Imported
            </span>
            <Zap className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-extrabold font-mono ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {report.hasAuditData ? report.gridImportedKwh.toLocaleString() : 'N/A'}
            </span>
            {report.hasAuditData && (
              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>kWh</span>
            )}
          </div>
          <p className={`text-[11px] mt-1 font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            {report.hasAuditData ? 'Net grid draw balance' : 'Meter unverified'}
          </p>
        </div>

        {/* Metric 4: Estimated ₹ Savings */}
        <div
          className={`border rounded-2xl p-4 shadow-xs transition-colors ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Est. Savings
            </span>
            <IndianRupee className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-extrabold font-mono ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {report.monthlySavingsFormatted}
            </span>
          </div>
          <p className={`text-[11px] mt-1 font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
            {report.hasAuditData ? 'Tariff delta + peak shaving' : 'No tariff offset'}
          </p>
        </div>

        {/* Metric 5: CO2 Avoided */}
        <div
          className={`border rounded-2xl p-4 shadow-xs transition-colors ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              CO₂ Avoided
            </span>
            <Leaf className={`w-4 h-4 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-extrabold font-mono ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {report.co2AvoidedTonnesFormatted}
            </span>
          </div>
          <p className={`text-[11px] mt-1 font-semibold ${isDarkMode ? 'text-teal-400' : 'text-teal-700'}`}>
            {report.hasAuditData ? 'Thermal grid offset' : 'No verified offset'}
          </p>
        </div>
      </div>

      {/* Institutional Audit Summary & Weekly VPP Energy Audit Log Table */}
      <div
        className={`border rounded-2xl p-5 sm:p-6 shadow-xs transition-colors space-y-4 ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
        }`}
      >
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div>
            <h2 className={`text-base font-bold tracking-tight uppercase ${
              isDarkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              WEEKLY VPP ENERGY AUDIT LOG • {campus.name}
            </h2>
            <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
              Validated against state DISCOM interconnect meter • {report.discomMeterId}
            </p>
          </div>

          <div className={`flex items-center gap-2 text-xs font-mono font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
            <Calendar className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
            <span>{report.auditCycle}</span>
          </div>
        </div>

        {/* Audit Table or Transparent Unavailable State */}
        {report.hasAuditData ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className={`border-b font-mono uppercase tracking-wider text-[11px] font-bold ${
                  isDarkMode ? 'border-slate-800 text-slate-300 bg-slate-900' : 'border-slate-300 text-slate-800 bg-slate-100'
                }`}>
                  <th className="py-2.5 px-3">Audit Interval</th>
                  <th className="py-2.5 px-3 text-right">Solar Yield</th>
                  <th className="py-2.5 px-3 text-right">Wind Yield</th>
                  <th className="py-2.5 px-3 text-right">Self-Consumption</th>
                  <th className="py-2.5 px-3 text-right">DISCOM Savings</th>
                  <th className="py-2.5 px-3 text-right">Audit Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-mono ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
                {report.weeklyRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isDarkMode ? 'hover:bg-slate-800/40 text-slate-200' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <td className={`py-3 px-3 font-semibold font-sans ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {row.period}
                    </td>
                    <td className={`py-3 px-3 text-right font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                      {row.solarKwh.toLocaleString()} kWh
                    </td>
                    <td className={`py-3 px-3 text-right font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                      {row.windKwh !== null ? `${row.windKwh.toLocaleString()} kWh` : (
                        <span className={`text-[11px] font-normal ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          — (No Wind)
                        </span>
                      )}
                    </td>
                    <td className={`py-3 px-3 text-right font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {row.selfConsumed}
                    </td>
                    <td className={`py-3 px-3 text-right font-extrabold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {row.savings}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        row.status === 'Audited'
                          ? isDarkMode
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                            : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : isDarkMode
                          ? 'bg-blue-950/60 text-blue-400 border-blue-800/40'
                          : 'bg-blue-100 text-blue-900 border-blue-300'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={`p-6 rounded-xl border-2 border-dashed ${
            isDarkMode ? 'border-amber-900/60 bg-amber-950/20 text-slate-200' : 'border-amber-300 bg-amber-50/70 text-slate-800'
          }`}>
            <div className="flex items-start gap-3">
              <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                isDarkMode ? 'text-amber-400' : 'text-amber-700'
              }`} />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-sm ${isDarkMode ? 'text-amber-300' : 'text-amber-950'}`}>
                    Weekly audit data not available for this campus
                  </h3>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    isDarkMode ? 'bg-amber-950 text-amber-300 border-amber-800' : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    DATA STATUS: UNAVAILABLE
                  </span>
                </div>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {report.unavailableReason}
                </p>
                <p className={`text-[11px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Government Credibility Mandate: UrjaSetu strictly refrains from fabricating telemetry or historical yield logs for unverified nodes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Compliance Signoff Footer */}
        <div
          className={`mt-4 p-4 rounded-xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            isDarkMode
              ? 'bg-slate-950/60 border-slate-800 text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className={`w-5 h-5 shrink-0 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <div>
              <p className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                Statutory Energy Audit Verification • {campus.code}
              </p>
              <p className={`text-[11px] font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                Complies with Rajasthan State Energy Conservation Policy & Bureau of Energy Efficiency (BEE) benchmarks.
              </p>
            </div>
          </div>

          <button
            id="print-audit-certificate-btn"
            onClick={handlePrintCertificate}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
            }`}
            title={`Print official energy audit certificate for ${campus.name}`}
          >
            <Printer className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`} />
            <span>Print Audit Certificate</span>
          </button>
        </div>
      </div>

      {/* Official Audit Certificate Viewer / Print Modal */}
      <AuditCertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        campus={campus}
        metrics={metrics}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

