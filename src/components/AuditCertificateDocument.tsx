import React from 'react';
import { CampusProfile, MetricData } from '../types';
import { getCampusAuditReport } from '../data/campusAuditData';
import { ShieldCheck, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuditCertificateDocumentProps {
  campus: CampusProfile;
  metrics: MetricData;
  isPrintVersion?: boolean;
}

export const AuditCertificateDocument: React.FC<AuditCertificateDocumentProps> = ({
  campus,
  isPrintVersion = false,
}) => {
  const report = getCampusAuditReport(campus);
  const generationDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={`w-full max-w-[210mm] mx-auto bg-white text-slate-900 font-sans ${
      isPrintVersion ? 'p-0' : 'p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200'
    }`}>
      {/* Official Government of Rajasthan & UrjaSetu Header */}
      <div className="border-b-2 border-slate-900 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0 mt-0.5 print:border print:border-slate-800">
              <Zap className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-slate-600">
                Government of Rajasthan • Directorate of Technical Education
              </p>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 mt-0.5">
                UrjaSetu • Virtual Power Plant Energy Audit Certificate
              </h1>
              <p className="text-xs text-slate-700 mt-0.5 font-medium">
                Statutory Institutional Energy Yield Audit, Net-Metering Reconciliation & Carbon Offset Ledger
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right font-mono text-[11px] border border-slate-300 rounded p-2.5 bg-slate-50 shrink-0">
            <p className="font-bold text-slate-900">CERTIFICATE NO: RJ-VPP-{campus.code}-AUDIT</p>
            <p className="text-slate-600">Issue Date: {generationDate}</p>
            <p className="text-slate-600">Audit Period: {report.auditCycle}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        {/* Section 1: Institution & Node Identity Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-lg border border-slate-300 bg-slate-50/70">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
              Audited Technical Institution
            </span>
            <span className="text-sm font-bold text-slate-900 block mt-0.5">
              {campus.name}
            </span>
            <span className="text-[11px] text-slate-600 block mt-0.5">
              Location: {campus.district} • {campus.division}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">VPP Node Code</span>
              <span className="font-mono font-bold text-slate-900">{campus.code}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Verification Status</span>
              <span className="font-bold inline-block px-1.5 py-0.5 rounded text-[10px] border border-slate-400 bg-white">
                {campus.verificationStatus === 'VERIFIED' ? 'OFFICIALLY VERIFIED' : campus.verificationStatus}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">DISCOM Interconnect Meter</span>
              <span className="font-mono text-[10.5px] text-slate-800 font-medium">{report.discomMeterId}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Sanctioned & Installed Asset Capacity Profile */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 border-b pb-1">
            1. Institutional Clean Energy Asset Capacity Profile
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="border border-slate-300 rounded p-2 bg-slate-50">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Rooftop Solar PV</span>
              <span className="text-sm font-bold font-mono text-slate-900 block mt-0.5">
                {campus.solarCapacityKw > 0 ? `${campus.solarCapacityKw} kWp` : '0 kWp (Unconfirmed)'}
              </span>
            </div>
            <div className="border border-slate-300 rounded p-2 bg-slate-50">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Wind Turbine</span>
              <span className="text-sm font-bold font-mono text-slate-900 block mt-0.5">
                {campus.windCapacityKw > 0 ? `${campus.windCapacityKw} kW` : '—'}
              </span>
            </div>
            <div className="border border-slate-300 rounded p-2 bg-slate-50">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Battery Storage</span>
              <span className="text-sm font-bold font-mono text-slate-900 block mt-0.5">
                {campus.batteryCapacityKwh > 0 ? `${campus.batteryCapacityKwh} kWh` : '—'}
              </span>
            </div>
            <div className="border border-slate-300 rounded p-2 bg-slate-50">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Peak Demand Cap</span>
              <span className="text-sm font-bold font-mono text-slate-900 block mt-0.5">
                {campus.peakDemandKw} kW
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Monthly Energy Reconciliation & Audit Summary */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 border-b pb-1">
            2. Energy Audit & Tariff Reconciliation Summary ({report.auditCycle})
          </h2>

          {report.hasAuditData ? (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
              <div className="border border-slate-300 rounded p-2 bg-white">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Renewable Generation</span>
                <span className="text-sm font-bold font-mono text-slate-900 block mt-0.5">
                  {report.totalRenewableGenKwh.toLocaleString()} kWh
                </span>
                <span className="text-[9px] text-slate-600 block mt-0.5">
                  Solar {report.solarSharePercent}%{report.windSharePercent > 0 ? ` + Wind ${report.windSharePercent}%` : ''}
                </span>
              </div>
              <div className="border border-slate-300 rounded p-2 bg-white">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Self-Consumption</span>
                <span className="text-sm font-bold font-mono text-slate-900 block mt-0.5">
                  {report.selfConsumedPercent}%
                </span>
                <span className="text-[9px] text-slate-600 block mt-0.5">
                  {report.selfConsumedKwh.toLocaleString()} kWh utilized
                </span>
              </div>
              <div className="border border-slate-300 rounded p-2 bg-white">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Grid Import Draw</span>
                <span className="text-sm font-bold font-mono text-slate-900 block mt-0.5">
                  {report.gridImportedKwh.toLocaleString()} kWh
                </span>
                <span className="text-[9px] text-slate-600 block mt-0.5">Net draw balance</span>
              </div>
              <div className="border border-slate-300 rounded p-2 bg-white">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">DISCOM Savings</span>
                <span className="text-sm font-bold font-mono text-slate-900 block mt-0.5">
                  {report.monthlySavingsFormatted}
                </span>
                <span className="text-[9px] text-slate-600 block mt-0.5">Net-metering credits</span>
              </div>
              <div className="border border-slate-300 rounded p-2 bg-white col-span-2 sm:col-span-1">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">CO₂ Abatement</span>
                <span className="text-sm font-bold font-mono text-slate-900 block mt-0.5">
                  {report.co2AvoidedTonnesFormatted}
                </span>
                <span className="text-[9px] text-slate-600 block mt-0.5">CEA grid factor offset</span>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-amber-400 rounded-lg p-3.5 bg-amber-50/60 text-slate-800">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs uppercase tracking-wide text-amber-950">
                    Official Regulatory Notice: Weekly Audit Data Unavailable
                  </p>
                  <p className="text-[11px] mt-1 leading-relaxed text-slate-700">
                    {report.unavailableReason}
                  </p>
                  <p className="text-[10px] mt-1.5 font-mono text-slate-600">
                    Compliance Standard: Rajasthan Energy Transparency Protocol • Unverified generation metrics are strictly withheld from statutory certificates.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Weekly VPP Energy Audit Log Table */}
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 border-b pb-1">
            3. Weekly VPP Energy Audit Log • {campus.name}
          </h2>

          {report.hasAuditData ? (
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] border-collapse border border-slate-300 text-left">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold uppercase text-[10px]">
                    <th className="border border-slate-300 py-1.5 px-2.5">Audit Interval</th>
                    <th className="border border-slate-300 py-1.5 px-2.5 text-right">Solar Yield</th>
                    <th className="border border-slate-300 py-1.5 px-2.5 text-right">Wind Yield</th>
                    <th className="border border-slate-300 py-1.5 px-2.5 text-right">Self-Consumption</th>
                    <th className="border border-slate-300 py-1.5 px-2.5 text-right">DISCOM Savings</th>
                    <th className="border border-slate-300 py-1.5 px-2.5 text-center">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {report.weeklyRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="border border-slate-300 py-2 px-2.5 font-sans font-medium text-slate-900">
                        {row.period}
                      </td>
                      <td className="border border-slate-300 py-2 px-2.5 text-right font-bold text-slate-900">
                        {row.solarKwh.toLocaleString()} kWh
                      </td>
                      <td className="border border-slate-300 py-2 px-2.5 text-right text-slate-700">
                        {row.windKwh !== null ? `${row.windKwh.toLocaleString()} kWh` : (
                          <span className="text-slate-400 font-sans">— (No Wind)</span>
                        )}
                      </td>
                      <td className="border border-slate-300 py-2 px-2.5 text-right text-slate-800 font-medium">
                        {row.selfConsumed}
                      </td>
                      <td className="border border-slate-300 py-2 px-2.5 text-right font-bold text-slate-900">
                        {row.savings}
                      </td>
                      <td className="border border-slate-300 py-2 px-2.5 text-center font-sans">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-400 text-[9.5px] font-semibold">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border border-slate-300 rounded p-3 text-center text-slate-600 bg-slate-50 font-mono text-[11px]">
              No weekly audit ledger available for {campus.code}. Generation uncommissioned or hardware gateway in transit.
            </div>
          )}
        </div>

        {/* Section 5: Data Provenance & Verification Authority */}
        <div className="border border-slate-300 rounded p-3 bg-slate-50/70 text-[10.5px] space-y-1">
          <p className="font-bold uppercase tracking-wider text-slate-800">
            4. Statutory Verification & Provenance Trail
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
            <p>
              <strong>Audit Standard: </strong>
              {campus.provenance?.solarCapacity?.auditStandard || 'Bureau of Energy Efficiency (BEE) / ISO 50001:2018 Protocol'}
            </p>
            <p>
              <strong>Verified By: </strong>
              {campus.provenance?.solarCapacity?.verifiedBy || 'DTE Energy Audit Cell / State DISCOM Engineering Wing'}
            </p>
            <p className="sm:col-span-2">
              <strong>Source Document: </strong>
              {campus.provenance?.solarCapacity?.sourceName || 'Institutional Energy Yield Logbooks & DISCOM Net-Metering Ledger'}
            </p>
            {campus.provenance?.solarCapacity?.notes && (
              <p className="sm:col-span-2 text-slate-600 italic">
                {campus.provenance.solarCapacity.notes}
              </p>
            )}
          </div>
        </div>

        {/* Section 6: Statutory Signoff Signatures */}
        <div className="pt-4 border-t-2 border-slate-900 grid grid-cols-3 gap-4 text-center text-[10px]">
          <div className="space-y-6">
            <div className="h-6 border-b border-dashed border-slate-400" />
            <div>
              <p className="font-bold text-slate-900">Campus Facility In-Charge</p>
              <p className="text-slate-600 truncate max-w-[160px] mx-auto">{campus.name}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-6 border-b border-dashed border-slate-400" />
            <div>
              <p className="font-bold text-slate-900">Nodal Executive Engineer</p>
              <p className="text-slate-600">DISCOM Interconnect Circle</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-6 border-b border-dashed border-slate-400" />
            <div>
              <p className="font-bold text-slate-900">Director of Clean Energy</p>
              <p className="text-slate-600">DTE, Government of Rajasthan</p>
            </div>
          </div>
        </div>

        <div className="text-center text-[9px] text-slate-500 font-mono pt-1">
          UrjaSetu Autonomous VPP Telemetry & Audit Subsystem • Valid for Statutory Tariff Offset & ESG Compliance
        </div>
      </div>
    </div>
  );
};
