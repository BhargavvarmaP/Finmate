import { api } from './base';

export const payrollApi = {
  getSummary: async () => {
    const response = await api.get('/payroll/summary');
    return response.data;
  },

  getEmployees: async () => {
    const response = await api.get('/payroll/employees');
    return response.data;
  },

  process: async (month: string) => {
    const response = await api.post(`/payroll/process/${month}`);
    return response.data;
  },

  generatePayslips: async (month: string) => {
    const response = await api.post(`/payroll/payslips/${month}`);
    return response.data;
  },

  downloadPayslip: async (employeeId: string, month: string) => {
    const response = await api.get(
      `/payroll/payslips/${employeeId}/${month}`,
      { responseType: 'blob' }
    );
    return response.data;
  },

  submitCompliance: async (type: string, data: any) => {
    const response = await api.post(`/payroll/compliance/${type}`, data);
    return response.data;
  },
};