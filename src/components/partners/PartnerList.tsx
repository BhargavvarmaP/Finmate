import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePartners } from '@/hooks/usePartners';

export function PartnerList() {
  const { partners, integrations, connectPartner } = usePartners();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {partners.map((partner) => (
        <Card key={partner.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{partner.name}</span>
              <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                {partner.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Integration type: {partner.type}
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => connectPartner(partner.id, {})}
            >
              Connect
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}