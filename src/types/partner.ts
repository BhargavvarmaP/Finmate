export interface Partner {
  id: string;
  name: string;
  type: 'payment' | 'banking' | 'compliance' | 'other';
  status: 'active' | 'inactive';
  apiKey?: string;
  webhookUrl?: string;
}

export interface Integration {
  id: string;
  partnerId: string;
  status: 'connected' | 'disconnected' | 'pending';
  settings: Record<string, any>;
  lastSync?: string;
}