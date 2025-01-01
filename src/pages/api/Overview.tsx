import { motion } from 'framer-motion';
import { Code, Key, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';

export function APIOverview() {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">API Documentation</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Key className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold">Authentication</h3>
                <p className="text-sm text-gray-400">Secure API access</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Auth Guide
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Code className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">API Reference</h3>
                <p className="text-sm text-gray-400">Endpoint documentation</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Reference
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Zap className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Quick Start</h3>
                <p className="text-sm text-gray-400">Get started quickly</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Guide
            </Button>
          </GlassPanel>
        </div>

        <div className="space-y-6">
          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-gray-400 mb-4">
              Welcome to the Finmate API documentation. Our API enables you to integrate financial
              compliance, tax filing, and business management features into your applications.
            </p>
            <p className="text-gray-400 mb-4">
              The API is organized around REST principles, uses JSON for request and response
              payloads, and relies on standard HTTP response codes.
            </p>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
            <p className="text-gray-400 mb-4">
              All API requests must be authenticated using an API key. You can obtain your API key
              from your dashboard settings.
            </p>
            <div className="bg-card p-4 rounded-lg mb-4">
              <pre className="text-sm">
                <code>
                  curl -X GET "https://api.finmate.com/v1/business" \{'\n'}
                  {'  '}-H "Authorization: Bearer YOUR_API_KEY"
                </code>
              </pre>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Rate Limiting</h2>
            <p className="text-gray-400 mb-4">
              The API implements rate limiting to ensure fair usage. The current limits are:
            </p>
            <ul className="list-disc list-inside text-gray-400 mb-4">
              <li>100 requests per minute for standard plans</li>
              <li>1000 requests per minute for enterprise plans</li>
            </ul>
            <p className="text-gray-400">
              Rate limit information is included in the response headers:
            </p>
            <div className="bg-card p-4 rounded-lg mt-2">
              <pre className="text-sm">
                <code>
                  X-RateLimit-Limit: 100{'\n'}
                  X-RateLimit-Remaining: 95{'\n'}
                  X-RateLimit-Reset: 1640995200
                </code>
              </pre>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Pagination</h2>
            <p className="text-gray-400 mb-4">
              List endpoints support pagination using limit and offset parameters:
            </p>
            <div className="bg-card p-4 rounded-lg mb-4">
              <pre className="text-sm">
                <code>
                  GET /v1/transactions?limit=10&offset=0{'\n'}
                  GET /v1/transactions?limit=10&offset=10
                </code>
              </pre>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
            <p className="text-gray-400 mb-4">
              The API uses conventional HTTP response codes to indicate success or failure:
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>2xx: Success</li>
              <li>4xx: Client errors</li>
              <li>5xx: Server errors</li>
            </ul>
          </GlassPanel>
        </div>
      </motion.div>
    </div>
  );
}
