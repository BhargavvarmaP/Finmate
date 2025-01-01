import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

export function ComplianceChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: '1',
      title: 'GST Return Filing',
      description: 'Monthly GST return for the previous month',
      dueDate: '2025-01-20',
      status: 'pending',
    },
    {
      id: '2',
      title: 'TDS Payment',
      description: 'TDS payment for salaries and contractor payments',
      dueDate: '2025-01-07',
      status: 'pending',
    },
  ]);

  const handleStatusChange = (id: string, newStatus: ChecklistItem['status']) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="space-y-4">
      {items.map(item => (
        <GlassPanel key={item.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
              <p className="text-sm mt-2">
                Due: <span className="font-medium">{item.dueDate}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              {item.status === 'overdue' && (
                <AlertCircle className="text-red-500 w-5 h-5" />
              )}
              <Button
                variant={item.status === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() =>
                  handleStatusChange(
                    item.id,
                    item.status === 'completed' ? 'pending' : 'completed'
                  )
                }
              >
                <Check className="w-4 h-4 mr-1" />
                {item.status === 'completed' ? 'Completed' : 'Mark Complete'}
              </Button>
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
