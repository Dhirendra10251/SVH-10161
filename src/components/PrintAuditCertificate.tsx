import React from 'react';
import { CampusProfile, MetricData } from '../types';
import { AuditCertificateDocument } from './AuditCertificateDocument';

interface PrintAuditCertificateProps {
  campus: CampusProfile;
  metrics: MetricData;
}

export const PrintAuditCertificate: React.FC<PrintAuditCertificateProps> = ({
  campus,
  metrics,
}) => {
  return (
    <div
      id="urjasetu-audit-certificate-print"
      className="print-only text-slate-900 bg-white"
      aria-hidden="true"
    >
      <AuditCertificateDocument
        campus={campus}
        metrics={metrics}
        isPrintVersion={true}
      />
    </div>
  );
};
