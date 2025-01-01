import { useState } from 'react';
import { Bell, AlertTriangle, Clock, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'deadline' | 'update';
  date: string;
  read: boolean;
}

export function ComplianceAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'GST Return Deadline Approaching',
      description: 'GST return for December 2024 is due in 5 days',
      type: 'deadline',
      date: '2024-12-27',
      read: false,
    },
    {
      id: '2',
      title: 'New Tax Regulation Update',
      description: 'Important changes to income tax reporting requirements',
      type: 'update',
      date: '2024-12-25',
      read: false,
    },
    {
      id: '3',
      title: 'Compliance Risk Detected',
      description: 'Potential discrepancy in recent transaction records',
      type: 'warning',
      date: '2024-12-24',
      read: false,
    },
  ]);

  const { toast } = useToast();

  const markAsRead = (id: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
    toast({
      title: 'Alert marked as read',
      description: 'The alert has been marked as read and archived.',
    });
  };

  const dismissAlert = (id: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
    toast({
      title: 'Alert dismissed',
      description: 'The alert has been removed from your notifications.',
    });
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'deadline':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'update':
        return <Bell className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-4 border-red-500';
      case 'deadline':
        return 'border-l-4 border-yellow-500';
      case 'update':
        return 'border-l-4 border-blue-500';
      default:
        return '';
    }
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Compliance Alerts</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount} New
            </span>
          )}
        </div>
        {alerts.length > 0 && (
          <Button
            variant="outline"
            onClick={() => setAlerts(prevAlerts =>
              prevAlerts.map(alert => ({ ...alert, read: true }))
            )}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <GlassPanel className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-gray-400">No new compliance alerts</p>
          </GlassPanel>
        ) : (
          alerts.map(alert => (
            <GlassPanel
              key={alert.id}
              className={`p-4 ${getAlertColor(alert.type)} ${
                !alert.read ? 'bg-gray-50 dark:bg-gray-800/50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {getAlertIcon(alert.type)}
                  <div>
                    <h3 className="font-semibold mb-1">{alert.title}</h3>
                    <p className="text-sm text-gray-400">{alert.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{alert.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!alert.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(alert.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dismissAlert(alert.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </GlassPanel>
          ))
        )}
      </div>
    </div>
  );
}
