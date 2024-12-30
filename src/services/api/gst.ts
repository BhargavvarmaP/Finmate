import { api } from './base';
import { GSTReturn } from '@/types';

export const gstApi = {
  getReturns: async () => {
    const response = await api.get<GSTReturn[]>('/gst/returns');
    return response.data;
  },

  fileReturn: async (id: string, data: any) => {
    const response = await api.post<GSTReturn>(`/gst/returns/${id}/file`, data);
    return response.data;
  },

  getStatus: async (id: string) => {
    const response = await api.get<GSTReturn>(`/gst/returns/${id}/status`);
    return response.data;
  },

  downloadInvoices: async (period: string) => {
    const response = await api.get(`/gst/invoices/${period}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};