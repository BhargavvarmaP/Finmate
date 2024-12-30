export interface ITRSummary {
  taxLiability: number;
  taxPaid: number;
  daysLeft: number;
  lastUpdated: string;
}

export interface ITRFiling {
  id: string;
  assessmentYear: string;
  status: 'draft' | 'filed' | 'error';
  type: 'ITR1' | 'ITR2' | 'ITR3';
  dueDate: string;
  data: Record<string, any>;
} 