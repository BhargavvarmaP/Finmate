import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GSTR1Filing } from '@/components/gst/GSTR1Filing';
import { GSTR3BFiling } from '@/components/gst/GSTR3BFiling';
import { GSTR9Filing } from '@/components/gst/GSTR9Filing';
import { GSTSummary } from '@/components/gst/GSTSummary';

export function GSTFiling() {
  const [activeTab, setActiveTab] = useState('gstr1');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">GST Filing</h1>
      </div>

      <GSTSummary />

      <Card>
        <CardHeader>
          <CardTitle>GST Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gstr1">GSTR-1</TabsTrigger>
              <TabsTrigger value="gstr3b">GSTR-3B</TabsTrigger>
              <TabsTrigger value="gstr9">GSTR-9</TabsTrigger>
            </TabsList>

            <TabsContent value="gstr1">
              <GSTR1Filing />
            </TabsContent>

            <TabsContent value="gstr3b">
              <GSTR3BFiling />
            </TabsContent>

            <TabsContent value="gstr9">
              <GSTR9Filing />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}