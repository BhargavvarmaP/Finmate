export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'support' | 'auditor';
  permissions: string[];
  lastActive: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface ComplianceStatus {
  userId: string;
  gstStatus: 'compliant' | 'pending' | 'overdue';
  tdsStatus: 'compliant' | 'pending' | 'overdue';
  lastUpdated: string;
}