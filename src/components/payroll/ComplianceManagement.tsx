import { useState } from 'react';
import { CheckCircle, AlertCircle, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  type: 'tax' | 'regulatory' | 'statutory';
}

export function ComplianceManagement() {
  const [items, setItems] = useState<ComplianceItem[]>([
    {
      id: '1',
      title: 'PF Contribution',
      description: 'Monthly PF contribution for all employees',
      dueDate: '2025-01-15',
      status: 'pending',
      type: 'statutory',
    },
    {
      id: '2',
      title: 'ESI Payment',
      description: 'Employee State Insurance payment',
      dueDate: '2025-01-15',
      status: 'pending',
      type: 'statutory',
    },
    {
      id: '3',
      title: 'TDS Filing',
      description: 'TDS return for salary payments',
      dueDate: '2025-01-31',
      status: 'pending',
      type: 'tax',
    },
  ]);

  const handleStatusChange = (id: string, newStatus: ComplianceItem['status']) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/10';
      case 'overdue':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-yellow-500 bg-yellow-500/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tax':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'regulatory':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'statutory':
        return <Calendar className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">
                {items.filter(item => item.status === 'pending').length}
              </h3>
              <p className="text-sm text-gray-400">Pending Tasks</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">
                {items.filter(item => item.status === 'completed').length}
              </h3>
              <p className="text-sm text-gray-400">Completed Tasks</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">
                {items.filter(item => item.status === 'overdue').length}
              </h3>
              <p className="text-sm text-gray-400">Overdue Tasks</p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-6">
        <h2 className="text-xl font-semibold mb-6">Compliance Tasks</h2>
        <div className="space-y-4">
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-start justify-between p-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div className="flex items-start gap-4">
                {getTypeIcon(item.type)}
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-gray-400">Due: {item.dueDate}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
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
                <CheckCircle className="w-4 h-4 mr-2" />
                {item.status === 'completed' ? 'Completed' : 'Mark Complete'}
              </Button>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
