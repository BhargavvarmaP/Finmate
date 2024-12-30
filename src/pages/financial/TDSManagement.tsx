import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TDSDeductions } from '@/components/tds/TDSDeductions';
import { TDSReturns } from '@/components/tds/TDSReturns';
import { TDSCertificates } from '@/components/tds/TDSCertificates';
import { TDSSummary } from '@/components/tds/TDSSummary';
import { TDSCalculator } from '@/components/tds/TDSCalculator';

export function TDSManagement() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">TDS Management</h1>
      </div>

      <TDSSummary />

      <div className="grid gap-6 md:grid-cols-2">
        <TDSCalculator />
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="deductions" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="deductions">Deductions</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>

              <TabsContent value="deductions">
                <TDSDeductions />
              </TabsContent>

              <TabsContent value="returns">
                <TDSReturns />
              </TabsContent>

              <TabsContent value="certificates">
                <TDSCertificates />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}