import { useState, useEffect } from 'react';
import { Currency, Payment } from '@/types/currency';
import { currencyApi } from '@/services/api/currency';
import { useToast } from '@/components/ui/use-toast';

export function useCurrency() {
  const [rates, setRates] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchRates = async () => {
    try {
      const data = await currencyApi.getRates();
      setRates(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch currency rates',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const convertCurrency = async (amount: number, from: string, to: string) => {
    try {
      return await currencyApi.convert(amount, from, to);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to convert currency',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    rates,
    isLoading,
    convertCurrency,
  };
}