import { api } from './base';

export const tdsApi = {
  getDeductions: async () => {
    const response = await api.get('/tds/deductions');
    return response.data;
  },

  addDeduction: async (data: any) => {
    const response = await api.post('/tds/deductions', data);
    return response.data;
  },

  fileReturn: async (data: any) => {
    const response = await api.post('/tds/returns', data);
    return response.data;
  },

  generateCertificate: async (id: string) => {
    const response = await api.post(`/tds/certificates/${id}`);
    return response.data;
  },

  downloadCertificate: async (id: string) => {
    const response = await api.get(`/tds/certificates/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  getSummary: async () => {
    const response = await api.get('/tds/summary');
    return response.data;
  },
};