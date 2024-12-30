import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComplianceCalendar } from '@/components/compliance/ComplianceCalendar';
import { ComplianceChecklist } from '@/components/compliance/ComplianceChecklist';
import { ComplianceAlerts } from '@/components/compliance/ComplianceAlerts';

export function ComplianceMonitoring() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Compliance Monitoring</h1>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <ComplianceCalendar />
        </TabsContent>

        <TabsContent value="checklist">
          <ComplianceChecklist />
        </TabsContent>

        <TabsContent value="alerts">
          <ComplianceAlerts />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}