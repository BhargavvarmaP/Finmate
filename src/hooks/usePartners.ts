import { useState, useEffect } from 'react';
import { partnerApi } from '@/services/api/partner';
import { useToast } from '@/components/ui/use-toast';
import { Partner, Integration } from '@/types/partner';

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const [partnersData, integrationsData] = await Promise.all([
        partnerApi.getPartners(),
        partnerApi.getIntegrations(),
      ]);

      setPartners(partnersData);
      setIntegrations(integrationsData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch partners data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const connectPartner = async (partnerId: string, settings: Record<string, any>) => {
    try {
      const integration = await partnerApi.connectPartner(partnerId, settings);
      setIntegrations([...integrations, integration]);
      toast({
        title: 'Success',
        description: 'Partner connected successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to connect partner',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    partners,
    integrations,
    isLoading,
    connectPartner,
  };
}