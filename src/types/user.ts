import { Company } from './company';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  lastActive: string;
  company?: Company;
  settings?: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
} 