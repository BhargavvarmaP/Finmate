export interface ComplianceEvent {
  id: string;
  title: string;
  dueDate: string;
  type: 'gst' | 'tds' | 'itr';
  status: 'pending' | 'completed' | 'overdue';
  description?: string;
}

export interface ComplianceCalendarEvent {
  id: string;
  title: string;
  dueDate: string;
  type: 'gst' | 'tds' | 'itr';
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
} 