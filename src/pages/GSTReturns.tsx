import { motion } from 'framer-motion';
import { GSTReturnsList } from '@/components/gst/GSTReturnsList';
import { useGSTReturns } from '@/hooks/useGSTReturns';

export function GSTReturns() {
  const { returns, isLoading } = useGSTReturns();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">GST Returns</h1>
      {isLoading ? (
        <div>Loading GST returns...</div>
      ) : (
        <GSTReturnsList returns={returns} />
      )}
    </motion.div>
  );
}