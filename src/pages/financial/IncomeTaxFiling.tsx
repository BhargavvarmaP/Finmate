import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ITRSummary } from '@/components/itr/ITRSummary';
import { ITR1Filing } from '@/components/itr/ITR1Filing';
import { ITR2Filing } from '@/components/itr/ITR2Filing';
import { ITR3Filing } from '@/components/itr/ITR3Filing';

export function IncomeTaxFiling() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Income Tax Filing</h1>
      </div>

      <ITRSummary />

      <Tabs defaultValue="itr1" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="itr1">ITR-1 (Sahaj)</TabsTrigger>
          <TabsTrigger value="itr2">ITR-2</TabsTrigger>
          <TabsTrigger value="itr3">ITR-3</TabsTrigger>
        </TabsList>

        <TabsContent value="itr1">
          <ITR1Filing />
        </TabsContent>

        <TabsContent value="itr2">
          <ITR2Filing />
        </TabsContent>

        <TabsContent value="itr3">
          <ITR3Filing />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}