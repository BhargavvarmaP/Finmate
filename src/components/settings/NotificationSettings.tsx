import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    gstReminders: true,
    transactionAlerts: true,
    monthlyReports: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch
            id="email-notifications"
            checked={settings.emailNotifications}
            onCheckedChange={() => handleToggle('emailNotifications')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="gst-reminders">GST Due Date Reminders</Label>
          <Switch
            id="gst-reminders"
            checked={settings.gstReminders}
            onCheckedChange={() => handleToggle('gstReminders')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="transaction-alerts">Transaction Alerts</Label>
          <Switch
            id="transaction-alerts"
            checked={settings.transactionAlerts}
            onCheckedChange={() => handleToggle('transactionAlerts')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="monthly-reports">Monthly Reports</Label>
          <Switch
            id="monthly-reports"
            checked={settings.monthlyReports}
            onCheckedChange={() => handleToggle('monthlyReports')}
          />
        </div>
      </CardContent>
    </Card>
  );
}