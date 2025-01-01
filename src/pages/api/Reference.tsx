import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';

interface Endpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  responses: {
    code: number;
    description: string;
    example: string;
  }[];
  category: string;
}

export function APIReference() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  const endpoints: Endpoint[] = [
    {
      id: '1',
      method: 'POST',
      path: '/v1/auth/login',
      description: 'Authenticate user and get access token',
      parameters: [
        {
          name: 'email',
          type: 'string',
          required: true,
          description: 'User email address',
        },
        {
          name: 'password',
          type: 'string',
          required: true,
          description: 'User password',
        },
      ],
      responses: [
        {
          code: 200,
          description: 'Success',
          example: '{\n  "token": "eyJhbGciOiJIUzI1NiIs...",\n  "user": {\n    "id": "123",\n    "email": "user@example.com"\n  }\n}',
        },
        {
          code: 401,
          description: 'Invalid credentials',
          example: '{\n  "error": "Invalid email or password"\n}',
        },
      ],
      category: 'Authentication',
    },
    {
      id: '2',
      method: 'GET',
      path: '/v1/business',
      description: 'Get business details',
      responses: [
        {
          code: 200,
          description: 'Success',
          example: '{\n  "id": "456",\n  "name": "Example Business",\n  "type": "Private Limited"\n}',
        },
        {
          code: 404,
          description: 'Business not found',
          example: '{\n  "error": "Business not found"\n}',
        },
      ],
      category: 'Business',
    },
    // Add more endpoints
  ];

  const filteredEndpoints = endpoints.filter(
    (endpoint) =>
      (selectedCategory === 'all' || endpoint.category === selectedCategory) &&
      (endpoint.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = Array.from(new Set(endpoints.map((e) => e.category)));

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-500/20 text-green-500';
      case 'POST':
        return 'bg-blue-500/20 text-blue-500';
      case 'PUT':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'DELETE':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">API Reference</h1>

        <GlassPanel className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search endpoints..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="p-2 rounded-md bg-background border border-input"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </GlassPanel>

        <div className="space-y-4">
          {filteredEndpoints.map((endpoint) => (
            <GlassPanel key={endpoint.id} className="p-6">
              <div
                className="flex items-start justify-between cursor-pointer"
                onClick={() =>
                  setExpandedEndpoint(
                    expandedEndpoint === endpoint.id ? null : endpoint.id
                  )
                }
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getMethodColor(
                        endpoint.method
                      )}`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm">{endpoint.path}</code>
                  </div>
                  <p className="text-gray-400">{endpoint.description}</p>
                </div>
                <Button variant="ghost" size="icon">
                  {expandedEndpoint === endpoint.id ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {expandedEndpoint === endpoint.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-700"
                >
                  {endpoint.parameters && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Parameters</h3>
                      <table className="w-full">
                        <thead>
                          <tr className="text-left">
                            <th className="py-2">Name</th>
                            <th className="py-2">Type</th>
                            <th className="py-2">Required</th>
                            <th className="py-2">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {endpoint.parameters.map((param) => (
                            <tr key={param.name}>
                              <td className="py-2">{param.name}</td>
                              <td className="py-2">{param.type}</td>
                              <td className="py-2">
                                {param.required ? 'Yes' : 'No'}
                              </td>
                              <td className="py-2">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Responses</h3>
                    <div className="space-y-4">
                      {endpoint.responses.map((response) => (
                        <div key={response.code}>
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                response.code >= 200 && response.code < 300
                                  ? 'bg-green-500/20 text-green-500'
                                  : 'bg-red-500/20 text-red-500'
                              }`}
                            >
                              {response.code}
                            </span>
                            <span className="text-gray-400">
                              {response.description}
                            </span>
                          </div>
                          <pre className="bg-card p-4 rounded-lg overflow-x-auto">
                            <code>{response.example}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </GlassPanel>
          ))}
        </div>

        {filteredEndpoints.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No endpoints found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
