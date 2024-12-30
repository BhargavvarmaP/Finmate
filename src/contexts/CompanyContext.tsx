import React, { createContext, useContext, ReactNode } from 'react';

const CompanyContext = createContext<any>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  return <CompanyContext.Provider value={{}}>{children}</CompanyContext.Provider>;
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) throw new Error('useCompany must be used within CompanyProvider');
  return context;
}