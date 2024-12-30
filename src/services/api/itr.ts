import { api } from './base';

export const itrApi = {
  getSummary: async () => {
    const response = await api.get('/itr/summary');
    return response.data;
  },

  fileReturn: async (type: string, data: any) => {
    const response = await api.post(`/itr/${type}`, data);
    return response.data;
  },

  getStatus: async (id: string) => {
    const response = await api.get(`/itr/${id}/status`);
    return response.data;
  },

  downloadForm: async (id: string) => {
    const response = await api.get(`/itr/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};