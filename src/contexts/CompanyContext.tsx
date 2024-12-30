import React, { createContext, useContext, useState } from 'react';
import { api } from '@/services/api/base';
import { Company } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface CompanyContextType {
  company: Company | null;
  createCompany: (data: Partial<Company>) => Promise<void>;
  updateCompany: (data: Partial<Company>) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [company, setCompany] = useState<Company | null>(null);
  const { toast } = useToast();

  const createCompany = async (data: Partial<Company>) => {
    try {
      const response = await api.post('/companies', data);
      setCompany(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create company',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateCompany = async (data: Partial<Company>) => {
    try {
      const response = await api.put(`/companies/${company?.id}`, data);
      setCompany(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update company information',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <CompanyContext.Provider value={{ company, createCompany, updateCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within CompanyProvider');
  }
  return context;
}