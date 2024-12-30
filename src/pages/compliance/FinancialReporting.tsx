import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BalanceSheet } from '@/components/reports/BalanceSheet';
import { ProfitLoss } from '@/components/reports/ProfitLoss';
import { CashFlow } from '@/components/reports/CashFlow';

export function FinancialReporting() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Reports</h1>
      </div>

      <Tabs defaultValue="balance-sheet" className="space-y-4">
        <TabsList>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="balance-sheet">
          <BalanceSheet />
        </TabsContent>

        <TabsContent value="profit-loss">
          <ProfitLoss />
        </TabsContent>

        <TabsContent value="cash-flow">
          <CashFlow />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}