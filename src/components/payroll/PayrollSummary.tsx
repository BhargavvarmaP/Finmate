import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/utils/format';
import { usePayroll } from '@/hooks/usePayroll';
import { Users, DollarSign, FileText } from 'lucide-react';

export function PayrollSummary() {
  const { summary } = usePayroll();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary?.totalEmployees || 0}</div>
          <Progress value={100} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(summary?.monthlyPayroll || 0)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Including all deductions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
          <FileText className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summary?.complianceStatus || 'Up to date'}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            PF, ESIC, and PT compliant
          </p>
        </CardContent>
      </Card>
    </div>
  );
}