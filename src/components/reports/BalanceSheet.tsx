import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

export function BalanceSheet() {
  const balanceSheet = {
    assets: {
      current: [
        { name: 'Cash and Cash Equivalents', amount: 1000000 },
        { name: 'Accounts Receivable', amount: 500000 },
        { name: 'Inventory', amount: 750000 },
      ],
      fixed: [
        { name: 'Property and Equipment', amount: 2000000 },
        { name: 'Intangible Assets', amount: 300000 },
      ],
    },
    liabilities: {
      current: [
        { name: 'Accounts Payable', amount: 400000 },
        { name: 'Short-term Loans', amount: 300000 },
      ],
      longTerm: [
        { name: 'Long-term Debt', amount: 1500000 },
      ],
    },
    equity: [
      { name: 'Share Capital', amount: 1000000 },
      { name: 'Retained Earnings', amount: 1350000 },
    ],
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Balance Sheet</CardTitle>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Assets</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Current Assets</h4>
              {balanceSheet.assets.current.map((item) => (
                <div key={item.name} className="flex justify-between py-1">
                  <span>{item.name}</span>
                  <span>{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Fixed Assets</h4>
              {balanceSheet.assets.fixed.map((item) => (
                <div key={item.name} className="flex justify-between py-1">
                  <span>{item.name}</span>
                  <span>{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Liabilities</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Current Liabilities</h4>
              {balanceSheet.liabilities.current.map((item) => (
                <div key={item.name} className="flex justify-between py-1">
                  <span>{item.name}</span>
                  <span>{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Long-term Liabilities</h4>
              {balanceSheet.liabilities.longTerm.map((item) => (
                <div key={item.name} className="flex justify-between py-1">
                  <span>{item.name}</span>
                  <span>{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Equity</h3>
          {balanceSheet.equity.map((item) => (
            <div key={item.name} className="flex justify-between py-1">
              <span>{item.name}</span>
              <span>{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}