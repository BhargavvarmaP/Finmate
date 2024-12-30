import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGSTReturns } from '@/hooks/useGSTReturns';
import { formatCurrency } from '@/utils/format';
import { GSTSummaryType } from '@/types/gst';

export function GSTSummary() {
  const { summary } = useGSTReturns();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Tax Liability</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(summary?.totalLiability || 0)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Input Tax Credit</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(summary?.inputCredit || 0)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Net Payable</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(summary?.netPayable || 0)}</p>
        </CardContent>
      </Card>
    </div>
  );
}