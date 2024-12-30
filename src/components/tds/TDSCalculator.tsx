import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/utils/format';

export function TDSCalculator() {
  const [amount, setAmount] = useState('');
  const [section, setSection] = useState('');
  const [deducteeType, setDeducteeType] = useState('');
  const [calculatedTDS, setCalculatedTDS] = useState<number | null>(null);

  const calculateTDS = () => {
    const baseAmount = parseFloat(amount);
    if (!baseAmount || !section || !deducteeType) return;

    let rate = 0;
    // TDS rates based on section and deductee type
    switch (section) {
      case '194C':
        rate = deducteeType === 'individual' ? 0.01 : 0.02;
        break;
      case '194J':
        rate = 0.1;
        break;
      case '194I':
        rate = 0.1;
        break;
      default:
        rate = 0.1;
    }

    setCalculatedTDS(baseAmount * rate);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>TDS Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">TDS Section</label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="194C">194C - Contractors</SelectItem>
                <SelectItem value="194J">194J - Professional Services</SelectItem>
                <SelectItem value="194I">194I - Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deductee Type</label>
            <Select value={deducteeType} onValueChange={setDeducteeType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculateTDS} className="w-full">
          Calculate TDS
        </Button>

        {calculatedTDS !== null && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium">TDS Amount:</p>
            <p className="text-2xl font-bold">{formatCurrency(calculatedTDS)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}