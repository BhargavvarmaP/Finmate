import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AuditSummary } from '@/components/audit/AuditSummary';
import { AnomalyDetection } from '@/components/audit/AnomalyDetection';
import { RiskAssessment } from '@/components/audit/RiskAssessment';
import { Play } from 'lucide-react';

export function AuditAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI-Powered Audit Analytics</h1>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          Run Audit
        </Button>
      </div>

      <div className="grid gap-6">
        <AuditSummary />
        <AnomalyDetection />
        <RiskAssessment />
      </div>
    </motion.div>
  );
}