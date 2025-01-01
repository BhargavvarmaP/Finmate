import { motion } from 'framer-motion';
import { Code, Terminal, Package, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';

export function Integration() {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Integration Guide</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Code className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold">SDKs</h3>
                <p className="text-sm text-gray-400">Official libraries</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View SDKs
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Terminal className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">CLI</h3>
                <p className="text-sm text-gray-400">Command line tools</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View CLI Docs
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Package className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Packages</h3>
                <p className="text-sm text-gray-400">NPM packages</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Packages
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <FileCode className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold">Examples</h3>
                <p className="text-sm text-gray-400">Sample code</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Examples
            </Button>
          </GlassPanel>
        </div>

        <div className="space-y-6">
          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="text-gray-400 mb-4">
              Follow these steps to integrate Finmate into your application:
            </p>
            <ol className="list-decimal list-inside text-gray-400 space-y-2">
              <li>Sign up for a Finmate account</li>
              <li>Get your API keys from the dashboard</li>
              <li>Install the SDK for your platform</li>
              <li>Initialize the client with your API key</li>
            </ol>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">SDK Installation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">JavaScript/TypeScript</h3>
                <pre className="bg-card p-4 rounded-lg overflow-x-auto">
                  <code>npm install @finmate/sdk</code>
                </pre>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Python</h3>
                <pre className="bg-card p-4 rounded-lg overflow-x-auto">
                  <code>pip install finmate-sdk</code>
                </pre>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Quick Start Example</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">JavaScript</h3>
                <pre className="bg-card p-4 rounded-lg overflow-x-auto">
                  <code>
                    {`import { Finmate } from '@finmate/sdk';

const finmate = new Finmate({
  apiKey: 'YOUR_API_KEY',
  environment: 'production'
});

// Get business details
const business = await finmate.business.get();

// File GST returns
const gstReturn = await finmate.gst.fileReturn({
  period: '2024-Q4',
  data: {
    // GST return data
  }
});`}
                  </code>
                </pre>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Webhooks</h2>
            <p className="text-gray-400 mb-4">
              Set up webhooks to receive real-time updates about events in your Finmate account:
            </p>
            <pre className="bg-card p-4 rounded-lg overflow-x-auto mb-4">
              <code>
                {`const express = require('express');
const app = express();

app.post('/webhook', express.json(), (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'gst.return.filed':
      // Handle GST return filed
      break;
    case 'payment.received':
      // Handle payment received
      break;
  }

  res.sendStatus(200);
});`}
              </code>
            </pre>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Always use environment variables for API keys</li>
              <li>Implement proper error handling</li>
              <li>Use pagination for large datasets</li>
              <li>Cache responses when appropriate</li>
              <li>Implement retry logic for failed requests</li>
            </ul>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Support</h2>
            <p className="text-gray-400 mb-4">
              If you need help with integration, you can:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Join our Discord community</li>
              <li>Open an issue on GitHub</li>
              <li>Contact our support team</li>
              <li>Check our Stack Overflow tag</li>
            </ul>
          </GlassPanel>
        </div>
      </motion.div>
    </div>
  );
}
