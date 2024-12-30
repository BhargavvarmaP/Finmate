import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/utils/format';
import { useITR } from '@/hooks/useITR';
import { Calculator, TrendingUp, AlertTriangle } from 'lucide-react';

export function ITRSummary() {
  const { summary } = useITR();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tax Liability</CardTitle>
          <Calculator className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(summary?.taxLiability || 0)}
          </div>
          <Progress value={70} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tax Paid</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(summary?.taxPaid || 0)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Including TDS and advance tax
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Due Date</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">31 Jul 2024</div>
          <p className="text-xs text-muted-foreground mt-1">
            {summary?.daysLeft || 0} days remaining
          </p>
        </CardContent>
      </Card>
    </div>
  );
}