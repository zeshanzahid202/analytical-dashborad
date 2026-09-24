import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';
import {
  FileText,
  Download,
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ReportItem {
  id: string;
  name: string;
  period: string;
  type: string;
  format: 'PDF' | 'CSV' | 'JSON';
  size: string;
  generatedDate: string;
  status: 'Ready' | 'Processing';
}

const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep_01',
    name: 'Q1 2026 SaaS Executive Financial Audit',
    period: 'Jan 1, 2026 - Mar 31, 2026',
    type: 'Financial',
    format: 'PDF',
    size: '2.4 MB',
    generatedDate: '2026-04-01',
    status: 'Ready'
  },
  {
    id: 'rep_02',
    name: 'Monthly Recurring Revenue (MRR) Cohort Matrix',
    period: 'March 2026',
    type: 'Revenue',
    format: 'CSV',
    size: '840 KB',
    generatedDate: '2026-03-31',
    status: 'Ready'
  },
  {
    id: 'rep_03',
    name: 'Customer Acquisition Cost (CAC) & LTV Analysis',
    period: 'Trailing 12 Months',
    type: 'Marketing',
    format: 'PDF',
    size: '1.8 MB',
    generatedDate: '2026-03-25',
    status: 'Ready'
  },
  {
    id: 'rep_04',
    name: 'Global Tax & VAT Inbound Settlements',
    period: 'Feb 1, 2026 - Feb 28, 2026',
    type: 'Tax & Compliance',
    format: 'CSV',
    size: '1.1 MB',
    generatedDate: '2026-03-01',
    status: 'Ready'
  },
  {
    id: 'rep_05',
    name: 'Enterprise Security & Audit Trail Logs',
    period: 'Last 30 Days',
    type: 'Security',
    format: 'JSON',
    size: '4.6 MB',
    generatedDate: '2026-03-20',
    status: 'Ready'
  }
];

export const ReportsPage: React.FC = () => {
  const { showToast } = useToast();
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState('Financial');
  const [reportFormat, setReportFormat] = useState<'PDF' | 'CSV' | 'JSON'>('PDF');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportName.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newRep: ReportItem = {
        id: `rep_${Math.random().toString(36).substring(2, 7)}`,
        name: reportName,
        period: 'Current Cycle (2026)',
        type: reportType,
        format: reportFormat,
        size: '1.2 MB',
        generatedDate: new Date().toISOString().split('T')[0],
        status: 'Ready'
      };
      setReports([newRep, ...reports]);
      setIsGenerating(false);
      setIsGenerateModalOpen(false);
      setReportName('');
      showToast('Report Ready', `${newRep.name} compiled successfully.`, 'success');
    }, 700);
  };

  const handleDownload = (report: ReportItem) => {
    showToast('Download Dispatched', `Downloading ${report.name}.${report.format.toLowerCase()}`, 'success');
  };

  const getFormatIcon = (format: ReportItem['format']) => {
    switch (format) {
      case 'PDF':
        return <FileText className="w-4 h-4 text-rose-500" />;
      case 'CSV':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-500" />;
      case 'JSON':
        return <FileCode className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Reports & Financial Statements
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Generate GAAP-compliant financial summaries, cohort metrics, and tax documentation.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsGenerateModalOpen(true)}>
          <Plus className="w-3.5 h-3.5" />
          Generate Report
        </Button>
      </div>

      {/* Reports Table */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 text-neutral-500 dark:text-neutral-400">
                <th className="py-3 px-4 font-semibold">Report Name</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Reporting Period</th>
                <th className="py-3 px-4 font-semibold">Format & Size</th>
                <th className="py-3 px-4 font-semibold text-right">Generated</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {reports.map(rep => (
                <tr key={rep.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-neutral-100">
                    <div className="flex items-center gap-2.5">
                      {getFormatIcon(rep.format)}
                      <span>{rep.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant="default">{rep.type}</Badge>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                    {rep.period}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-neutral-500">
                    {rep.format} · {rep.size}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-300">
                    {rep.generatedDate}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(rep)}
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Report Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate New Report"
        description="Select report parameters to compile a snapshot of business performance"
      >
        <form onSubmit={handleCreateReport} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Report Title
            </label>
            <Input
              required
              placeholder="e.g. Q2 2026 Churn & Renewal Audit"
              value={reportName}
              onChange={e => setReportName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Domain Type
              </label>
              <select
                value={reportType}
                onChange={e => setReportType(e.target.value)}
                className="w-full h-9 px-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs"
              >
                <option value="Financial">Financial (P&L, ARPU)</option>
                <option value="Revenue">Revenue & Cohorts</option>
                <option value="Tax & Compliance">Tax & Compliance</option>
                <option value="Marketing">Marketing & Traffic</option>
                <option value="Security">Security & Access</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Export Format
              </label>
              <select
                value={reportFormat}
                onChange={e => setReportFormat(e.target.value as any)}
                className="w-full h-9 px-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs"
              >
                <option value="PDF">PDF Document</option>
                <option value="CSV">CSV Spreadsheet</option>
                <option value="JSON">Raw JSON Data</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsGenerateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={isGenerating}>
              Compile Report
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
