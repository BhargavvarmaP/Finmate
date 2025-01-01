import { BarChart3, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { GlassPanel } from '@/components/ui/glass-panel';

interface AuditIssue {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved';
  date: string;
  description: string;
}

export function AuditSummary() {
  const auditIssues: AuditIssue[] = [
    {
      id: '1',
      title: 'Inconsistent Invoice Numbering',
      severity: 'high',
      status: 'open',
      date: '2024-12-28',
      description: 'Multiple invoices found with duplicate numbers in Q4 2024',
    },
    {
      id: '2',
      title: 'Bank Reconciliation Delay',
      severity: 'medium',
      status: 'in_progress',
      date: '2024-12-25',
      description: 'Bank reconciliation for December 2024 pending beyond deadline',
    },
    {
      id: '3',
      title: 'Missing Receipt Documentation',
      severity: 'low',
      status: 'resolved',
      date: '2024-12-20',
      description: 'Some expense claims lack proper receipt attachments',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">3</h3>
              <p className="text-sm text-gray-400">Open Issues</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-full">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">5</h3>
              <p className="text-sm text-gray-400">In Progress</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">12</h3>
              <p className="text-sm text-gray-400">Resolved</p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Audit Issues</h2>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {auditIssues.map(issue => (
            <div
              key={issue.id}
              className="flex items-start justify-between p-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(issue.status)}
                  <h3 className="font-semibold">{issue.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(
                      issue.severity
                    )}/20 ${getSeverityColor(issue.severity)}`}
                  >
                    {issue.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{issue.description}</p>
              </div>
              <span className="text-sm text-gray-400">{issue.date}</span>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
