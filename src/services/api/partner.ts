import { api } from './base';
import { Partner, Integration } from '@/types/partner';

export const partnerApi = {
  getPartners: async () => {
    const response = await api.get<Partner[]>('/partners');
    return response.data;
  },

  getIntegrations: async () => {
    const response = await api.get<Integration[]>('/integrations');
    return response.data;
  },

  connectPartner: async (partnerId: string, settings: Record<string, any>) => {
    const response = await api.post<Integration>('/integrations', { partnerId, settings });
    return response.data;
  },

  disconnectPartner: async (integrationId: string) => {
    await api.delete(`/integrations/${integrationId}`);
  },
};