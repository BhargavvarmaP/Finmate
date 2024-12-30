export interface UserSettings {
  notifications: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
    complianceAlerts: boolean;
    financialUpdates: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginHistory: LoginRecord[];
  };
}

export interface LoginRecord {
  id: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  location: string;
}

export interface SecurityMethod {
  id: string;
  type: 'password' | 'oauth' | 'jwt';
  isEnabled: boolean;
  lastUpdated: string;
}