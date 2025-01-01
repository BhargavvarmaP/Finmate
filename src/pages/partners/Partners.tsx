import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Link, ArrowRight, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';

interface Partner {
  id: string;
  name: string;
  description: string;
  type: 'payment' | 'accounting' | 'banking' | 'compliance';
  logo: string;
  website: string;
  features: string[];
}

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'live' | 'beta' | 'coming_soon';
  documentation: string;
  icon: string;
}

export function Partners() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const partners: Partner[] = [
    {
      id: '1',
      name: 'RazorpayX',
      description: 'Complete banking and payment solutions for businesses',
      type: 'payment',
      logo: '/partners/razorpay.svg',
      website: 'https://razorpay.com',
      features: [
        'Payment Gateway',
        'Business Banking',
        'Payroll Management',
        'Vendor Payments',
      ],
    },
    {
      id: '2',
      name: 'Tally',
      description: 'Enterprise resource planning and accounting software',
      type: 'accounting',
      logo: '/partners/tally.svg',
      website: 'https://tallysolutions.com',
      features: [
        'Accounting Integration',
        'Inventory Management',
        'Financial Reports',
        'GST Compliance',
      ],
    },
    // Add more partners
  ];

  const integrations: Integration[] = [
    {
      id: '1',
      name: 'GST API',
      description: 'Direct integration with government GST portal',
      category: 'Compliance',
      status: 'live',
      documentation: '/docs/integrations/gst',
      icon: '/integrations/gst.svg',
    },
    {
      id: '2',
      name: 'Bank Statement Import',
      description: 'Automated bank statement reconciliation',
      category: 'Banking',
      status: 'beta',
      documentation: '/docs/integrations/banking',
      icon: '/integrations/banking.svg',
    },
    // Add more integrations
  ];

  const filteredPartners = partners.filter(
    (partner) =>
      (selectedType === 'all' || partner.type === selectedType) &&
      (partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredIntegrations = integrations.filter(
    (integration) =>
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleDocumentationClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Partners & Integrations</h1>

        <GlassPanel className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search partners and integrations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="p-2 rounded-md bg-background border border-input"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="payment">Payment</option>
              <option value="accounting">Accounting</option>
              <option value="banking">Banking</option>
              <option value="compliance">Compliance</option>
            </select>
          </div>
        </GlassPanel>

        <div className="space-y-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-6">Featured Partners</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPartners.map((partner) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GlassPanel className="h-full p-6">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="h-12 mb-4"
                          onError={() => handleImageError(partner.id)}
                          style={{ display: imageErrors[partner.id] ? 'none' : 'block' }}
                        />
                        <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
                        <p className="text-gray-400 mb-4">{partner.description}</p>
                        <div className="space-y-2 mb-4">
                          {partner.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => window.open(partner.website, '_blank')}
                          >
                            <Globe className="w-4 h-4" />
                            Visit Website
                          </Button>
                          <Button className="flex items-center gap-2">
                            <Link className="w-4 h-4" />
                            Connect
                          </Button>
                        </div>
                      </GlassPanel>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-6">Available Integrations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredIntegrations.map((integration) => (
                    <motion.div
                      key={integration.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GlassPanel className="h-full p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <img
                            src={integration.icon}
                            alt={integration.name}
                            className="w-12 h-12"
                            onError={() => handleImageError(integration.id)}
                            style={{ display: imageErrors[integration.id] ? 'none' : 'block' }}
                          />
                          <div>
                            <h3 className="font-semibold">{integration.name}</h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                integration.status === 'live'
                                  ? 'bg-green-500/20 text-green-500'
                                  : integration.status === 'beta'
                                  ? 'bg-yellow-500/20 text-yellow-500'
                                  : 'bg-purple-500/20 text-purple-500'
                              }`}
                            >
                              {integration.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-400 mb-4">{integration.description}</p>
                        <Button
                          variant="outline"
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => handleDocumentationClick(integration.documentation)}
                        >
                          View Documentation
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </GlassPanel>
                    </motion.div>
                  ))}
                </div>
              </section>

              <GlassPanel className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Become a Partner</h2>
                <p className="text-gray-400 mb-4">
                  Join our partner ecosystem and help businesses streamline their financial operations.
                  We offer comprehensive support and resources to ensure mutual success.
                </p>
                <Button className="flex items-center gap-2">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </GlassPanel>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
