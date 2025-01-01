import { useState } from 'react';
import { Calculator, Calendar, DollarSign, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface PayrollEntry {
  id: string;
  employeeName: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
}

export function PayrollProcessing() {
  const [entries, setEntries] = useState<PayrollEntry[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      basicSalary: 50000,
      allowances: 5000,
      deductions: 3000,
      netSalary: 52000,
      status: 'pending',
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      basicSalary: 60000,
      allowances: 6000,
      deductions: 4000,
      netSalary: 62000,
      status: 'pending',
    },
  ]);

  const [selectedMonth, setSelectedMonth] = useState('2024-12');
  const { toast } = useToast();

  const totalPayroll = entries.reduce((sum, entry) => sum + entry.netSalary, 0);
  const pendingCount = entries.filter(entry => entry.status === 'pending').length;

  const handleProcess = (id: string) => {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === id ? { ...entry, status: 'processed' } : entry
      )
    );
    toast({
      title: 'Payroll Processed',
      description: 'The payroll entry has been processed successfully.',
    });
  };

  const handlePayAll = () => {
    setEntries(prevEntries =>
      prevEntries.map(entry => ({ ...entry, status: 'paid' }))
    );
    toast({
      title: 'Payroll Completed',
      description: 'All payroll entries have been marked as paid.',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'processed':
        return 'text-blue-500 bg-blue-500/10';
      case 'paid':
        return 'text-green-500 bg-green-500/10';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Payroll Processing</h2>
        <div className="flex items-center gap-4">
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-40"
          />
          <Button onClick={handlePayAll} disabled={pendingCount === 0}>
            Process All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Calculator className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Payroll</p>
              <h3 className="text-2xl font-semibold">
                ${totalPayroll.toLocaleString()}
              </h3>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending Entries</p>
              <h3 className="text-2xl font-semibold">{pendingCount}</h3>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Average Salary</p>
              <h3 className="text-2xl font-semibold">
                ${(totalPayroll / entries.length).toLocaleString()}
              </h3>
            </div>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel className="p-6">
        <div className="space-y-4">
          {entries.map(entry => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{entry.employeeName}</h3>
                <div className="flex gap-4 mt-1 text-sm text-gray-400">
                  <span>Basic: ${entry.basicSalary.toLocaleString()}</span>
                  <span>•</span>
                  <span>Allowances: ${entry.allowances.toLocaleString()}</span>
                  <span>•</span>
                  <span>Deductions: ${entry.deductions.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(
                    entry.status
                  )}`}
                >
                  {entry.status}
                </span>
                <div className="text-lg font-semibold">
                  ${entry.netSalary.toLocaleString()}
                </div>
                {entry.status === 'pending' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleProcess(entry.id)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Process
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
