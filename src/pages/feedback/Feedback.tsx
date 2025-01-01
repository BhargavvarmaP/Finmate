import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Star,
  Send,
  BarChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface FeedbackItem {
  id: string;
  type: 'bug' | 'feature' | 'improvement';
  title: string;
  description: string;
  status: 'new' | 'in_progress' | 'completed' | 'declined';
  votes: number;
  date: string;
  category: string;
}

export function Feedback() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [formData, setFormData] = useState({
    type: 'bug',
    category: 'GST',
    title: '',
    description: ''
  });
  const { toast } = useToast();

  const feedbackItems: FeedbackItem[] = [
    {
      id: '1',
      type: 'feature',
      title: 'Add support for automated bank reconciliation',
      description: 'It would be helpful to have automated bank statement reconciliation...',
      status: 'in_progress',
      votes: 45,
      date: '2024-12-15',
      category: 'Banking',
    },
    {
      id: '2',
      type: 'improvement',
      title: 'Enhance GST filing workflow',
      description: 'The current GST filing process could be more streamlined...',
      status: 'new',
      votes: 32,
      date: '2024-12-10',
      category: 'GST',
    },
    // Add more feedback items
  ];

  const filteredFeedback = feedbackItems.filter(
    (item) =>
      (selectedType === 'all' || item.type === selectedType) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmitFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement feedback submission
    toast({
      title: 'Success',
      description: 'Thank you for your feedback! We will review it shortly.',
    });
    // Reset form
    setFormData({
      type: 'bug',
      category: 'GST',
      title: '',
      description: ''
    });
  };

  const handleVote = (id: string) => {
    // TODO: Implement voting
    toast({
      title: 'Success',
      description: 'Your vote has been recorded.',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-500';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'completed':
        return 'bg-green-500/20 text-green-500';
      case 'declined':
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
        <h1 className="text-3xl font-bold mb-6">Feedback & Suggestions</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <MessageSquare className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold">Submit Feedback</h3>
                <p className="text-sm text-gray-400">Share your thoughts</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              New Feedback
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold">Top Requests</h3>
                <p className="text-sm text-gray-400">Most voted items</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Top
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <BarChart className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Roadmap</h3>
                <p className="text-sm text-gray-400">Implementation status</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Roadmap
            </Button>
          </GlassPanel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GlassPanel className="p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search feedback..."
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
                  <option value="bug">Bugs</option>
                  <option value="feature">Feature Requests</option>
                  <option value="improvement">Improvements</option>
                </select>
              </div>
            </GlassPanel>

            <div className="space-y-4">
              {filteredFeedback.map((item) => (
                <GlassPanel key={item.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center"
                      onClick={() => handleVote(item.id)}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{item.votes}</span>
                    </Button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-400">{item.category}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{item.date}</span>
                        <Button variant="ghost" size="sm">
                          View Discussion
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>

          <div>
            <GlassPanel className="p-6">
              <h2 className="text-xl font-semibold mb-4">Submit New Feedback</h2>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label className="text-sm mb-1 block">Type</label>
                  <select 
                    className="w-full p-2 rounded-md bg-background border border-input"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="improvement">Improvement</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm mb-1 block">Category</label>
                  <select 
                    className="w-full p-2 rounded-md bg-background border border-input"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="GST">GST</option>
                    <option value="Banking">Banking</option>
                    <option value="Payroll">Payroll</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm mb-1 block">Title</label>
                  <Input 
                    type="text" 
                    placeholder="Brief description of your feedback"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-sm mb-1 block">Description</label>
                  <Textarea
                    placeholder="Detailed explanation of your feedback..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </Button>
              </form>
            </GlassPanel>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
