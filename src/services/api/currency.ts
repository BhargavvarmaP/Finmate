import { api } from './base';
import { Currency, Payment } from '@/types/currency';

export const currencyApi = {
  getRates: async () => {
    const response = await api.get<Currency[]>('/currencies/rates');
    return response.data;
  },

  convert: async (amount: number, from: string, to: string) => {
    const response = await api.post<{ amount: number }>('/currencies/convert', {
      amount,
      from,
      to,
    });
    return response.data;
  },

  processPayment: async (amount: number, currency: string) => {
    const response = await api.post<Payment>('/payments/process', {
      amount,
      currency,
    });
    return response.data;
  },
};