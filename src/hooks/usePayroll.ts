import { useState, useEffect } from 'react';
import { payrollApi } from '@/services/api/payroll';
import { useToast } from '@/components/ui/use-toast';

export function usePayroll() {
  const [summary, setSummary] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSummary = async () => {
    try {
      const data = await payrollApi.getSummary();
      setSummary(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch payroll summary',
        variant: 'destructive',
      });
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await payrollApi.getEmployees();
      setEmployees(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch employees',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processPayroll = async (month: string) => {
    try {
      await payrollApi.process(month);
      toast({
        title: 'Success',
        description: 'Payroll processed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process payroll',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchEmployees();
  }, []);

  return {
    summary,
    employees,
    isLoading,
    processPayroll,
  };
}