import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Video, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const faqItems: FAQItem[] = [
    {
      question: 'How do I set up GST filing?',
      answer: 'To set up GST filing, go to the GST Filing page and follow the step-by-step guide...',
      category: 'gst',
    },
    {
      question: 'How do I verify my KYC?',
      answer: 'KYC verification can be completed by uploading your Aadhaar card and PAN card...',
      category: 'kyc',
    },
    // Add more FAQ items
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    toast({
      title: 'Success',
      description: 'Your message has been sent. We will get back to you soon.',
    });
  };

  const filteredFAQs = faqItems.filter(
    (item) =>
      (selectedCategory === 'all' || item.category === selectedCategory) &&
      (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <HelpCircle className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold">FAQ</h3>
                <p className="text-sm text-gray-400">Find quick answers</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Browse FAQ
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Video className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Video Tutorials</h3>
                <p className="text-sm text-gray-400">Learn through videos</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Watch Tutorials
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Book className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Documentation</h3>
                <p className="text-sm text-gray-400">Detailed guides</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Read Docs
            </Button>
          </GlassPanel>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassPanel className="p-6">
            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Search FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <select
                className="w-full p-2 rounded-md bg-background border border-input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="gst">GST</option>
                <option value="kyc">KYC</option>
                <option value="tax">Income Tax</option>
                <option value="payroll">Payroll</option>
              </select>

              <div className="space-y-4 mt-4">
                {filteredFAQs.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg bg-card">
                    <h4 className="font-semibold mb-2">{item.question}</h4>
                    <p className="text-sm text-gray-400">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="text-sm mb-1 block">Name</label>
                <Input type="text" placeholder="Your name" />
              </div>

              <div>
                <label className="text-sm mb-1 block">Email</label>
                <Input type="email" placeholder="Your email" />
              </div>

              <div>
                <label className="text-sm mb-1 block">Subject</label>
                <Input type="text" placeholder="Subject of your inquiry" />
              </div>

              <div>
                <label className="text-sm mb-1 block">Message</label>
                <Textarea placeholder="Describe your issue..." rows={4} />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </GlassPanel>
        </div>
      </motion.div>
    </div>
  );
}
