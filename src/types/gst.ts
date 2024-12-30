export interface GSTInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  taxAmount: number;
  status: 'pending' | 'processed' | 'error';
  type: 'inward' | 'outward';
}

export interface GSTReturn {
  id: string;
  type: 'GSTR1' | 'GSTR2' | 'GSTR3B';
  period: string;
  dueDate: string;
  status: 'filed' | 'pending' | 'overdue';
  amount?: number;
}

export interface GSTSummaryType {
  totalLiability: number;
  inputCredit: number;
  netPayable: number;
  lastUpdated: string;
} 