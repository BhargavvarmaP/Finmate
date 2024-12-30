import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { AnomalyDetection as AnomalyType } from '@/types/audit';

export function AnomalyDetection() {
  const anomalies = [
    {
      id: 1,
      type: 'Transaction',
      description: 'Unusual high-value transaction detected',
      severity: 'high',
      date: '2024-03-10',
    },
    {
      id: 2,
      type: 'Pattern',
      description: 'Irregular expense pattern in marketing category',
      severity: 'medium',
      date: '2024-03-09',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Detection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {anomalies.map((anomaly) => (
          <Alert
            key={anomaly.id}
            variant={anomaly.severity === 'high' ? 'destructive' : 'default'}
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{anomaly.type} Anomaly</AlertTitle>
            <AlertDescription>{anomaly.description}</AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}