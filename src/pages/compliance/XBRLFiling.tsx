import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XBRLConverter } from '@/components/xbrl/XBRLConverter';
import { XBRLValidator } from '@/components/xbrl/XBRLValidator';
import { XBRLSubmission } from '@/components/xbrl/XBRLSubmission';

export function XBRLFiling() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">XBRL Filing</h1>
      </div>

      <div className="grid gap-6">
        <XBRLConverter />
        <XBRLValidator />
        <XBRLSubmission />
      </div>
    </motion.div>
  );
}