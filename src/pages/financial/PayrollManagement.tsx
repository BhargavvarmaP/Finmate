import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PayrollSummary } from '@/components/payroll/PayrollSummary';
import { EmployeeManagement } from '@/components/payroll/EmployeeManagement';
import { PayrollProcessing } from '@/components/payroll/PayrollProcessing';
import { ComplianceManagement } from '@/components/payroll/ComplianceManagement';

export function PayrollManagement() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Payroll Management</h1>
      </div>

      <PayrollSummary />

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <EmployeeManagement />
        </TabsContent>

        <TabsContent value="processing">
          <PayrollProcessing />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceManagement />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}