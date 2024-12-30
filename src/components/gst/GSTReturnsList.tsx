import { GSTReturn } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, AlertCircle } from 'lucide-react';

interface GSTReturnsListProps {
  returns: GSTReturn[];
}

export function GSTReturnsList({ returns }: GSTReturnsListProps) {
  const getStatusColor = (status: GSTReturn['status']) => {
    switch (status) {
      case 'filed':
        return 'bg-green-500';
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {returns.map((gstReturn) => (
        <Card key={gstReturn.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{gstReturn.type}</span>
              <Badge className={getStatusColor(gstReturn.status)}>
                {gstReturn.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4" />
                <span>Period: {gstReturn.period}</span>
              </div>
              <div className="flex items-center text-sm">
                <AlertCircle className="mr-2 h-4 w-4" />
                <span>Due Date: {gstReturn.dueDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}