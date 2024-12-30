import { useState, useEffect } from 'react';
import { tdsApi } from '@/services/api/tds';
import { useToast } from '@/components/ui/use-toast';

export function useTDS() {
  const [deductions, setDeductions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchDeductions = async () => {
    try {
      const data = await tdsApi.getDeductions();
      setDeductions(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch TDS deductions',
        variant: 'destructive',
      });
    }
  };

  const fetchSummary = async () => {
    try {
      const data = await tdsApi.getSummary();
      setSummary(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch TDS summary',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addDeduction = async (data: any) => {
    try {
      await tdsApi.addDeduction(data);
      await fetchDeductions();
      toast({
        title: 'Success',
        description: 'TDS deduction added successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add TDS deduction',
        variant: 'destructive',
      });
    }
  };

  const fileReturn = async (data: any) => {
    try {
      await tdsApi.fileReturn(data);
      toast({
        title: 'Success',
        description: 'TDS return filed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to file TDS return',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchDeductions();
    fetchSummary();
  }, []);

  return {
    deductions,
    summary,
    isLoading,
    addDeduction,
    fileReturn,
  };
}