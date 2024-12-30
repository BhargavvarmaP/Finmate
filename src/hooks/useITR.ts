import { useState } from 'react';
import { ITRSummary } from '@/types/itr';

interface UseITRReturn {
  summary: ITRSummary;
  isLoading: boolean;
}

export function useITR(): UseITRReturn {
  const [isLoading] = useState(false);

  return {
    summary: {
      taxLiability: 0,
      taxPaid: 0,
      daysLeft: 30,
      lastUpdated: new Date().toISOString()
    },
    isLoading
  };
}