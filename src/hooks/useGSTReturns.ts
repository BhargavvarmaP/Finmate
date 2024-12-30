import { useState, useEffect } from 'react';
import { GSTReturn, GSTSummaryType } from '@/types/gst';
import { gstApi } from '@/services/api/gst';
import { useToast } from '@/components/ui/use-toast';

interface UseGSTReturnsReturn {
  returns: GSTReturn[];
  summary: GSTSummaryType;
  isLoading: boolean;
  fileReturn: (id: string, data: any) => Promise<void>;
  downloadInvoices: (period: string) => Promise<void>;
}

export function useGSTReturns(): UseGSTReturnsReturn {
  const [returns, setReturns] = useState<GSTReturn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchReturns = async () => {
    try {
      const data = await gstApi.getReturns();
      setReturns(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch GST returns',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fileReturn = async (id: string, data: any) => {
    try {
      const updatedReturn = await gstApi.fileReturn(id, data);
      setReturns((prev) =>
        prev.map((r) => (r.id === id ? updatedReturn : r))
      );
      toast({
        title: 'Success',
        description: 'GST return filed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to file GST return',
        variant: 'destructive',
      });
    }
  };

  const downloadInvoices = async (period: string) => {
    try {
      const blob = await gstApi.downloadInvoices(period);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoices-${period}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download invoices',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  return {
    returns,
    summary: {
      totalLiability: 0,
      inputCredit: 0,
      netPayable: 0,
      lastUpdated: new Date().toISOString()
    },
    isLoading,
    fileReturn,
    downloadInvoices,
  };
}