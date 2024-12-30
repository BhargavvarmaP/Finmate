import { api } from './base';
import { Transaction } from '@/types';

export const transactionApi = {
  getAll: async () => {
    const response = await api.get<Transaction[]>('/transactions');
    return response.data;
  },

  create: async (transaction: Omit<Transaction, 'id'>) => {
    const response = await api.post<Transaction>('/transactions', transaction);
    return response.data;
  },

  update: async (id: string, transaction: Partial<Transaction>) => {
    const response = await api.put<Transaction>(`/transactions/${id}`, transaction);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/transactions/${id}`);
  },

  getCategories: async () => {
    const response = await api.get<string[]>('/transactions/categories');
    return response.data;
  },
};