export interface AnomalyDetection {
  id: string;
  type: 'Transaction' | 'Pattern' | 'Compliance';
  description: string;
  severity: 'high' | 'medium' | 'low';
  date: string;
  status: 'open' | 'investigating' | 'resolved';
}

export interface AuditReport {
  id: string;
  type: string;
  findings: string[];
  recommendations: string[];
  createdAt: string;
  status: 'draft' | 'final';
} 