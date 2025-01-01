import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl: string;
}

export function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Understanding GST Filing in India',
      excerpt: 'A comprehensive guide to GST filing requirements and deadlines...',
      content: 'Full content here...',
      author: 'Tax Expert',
      date: '2025-01-01',
      category: 'GST',
      tags: ['GST', 'Compliance', 'Tax Filing'],
      imageUrl: '/blog/gst-filing.jpg',
    },
    {
      id: '2',
      title: 'Payroll Management Best Practices',
      excerpt: 'Learn how to efficiently manage your company payroll...',
      content: 'Full content here...',
      author: 'HR Specialist',
      date: '2024-12-28',
      category: 'Payroll',
      tags: ['Payroll', 'HR', 'Management'],
      imageUrl: '/blog/payroll.jpg',
    },
    // Add more blog posts
  ];

  const filteredPosts = blogPosts.filter(
    (post) =>
      (selectedCategory === 'all' || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Blog</h1>

        <GlassPanel className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
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
              <option value="GST">GST</option>
              <option value="Payroll">Payroll</option>
              <option value="Compliance">Compliance</option>
              <option value="Tax">Tax</option>
            </select>
          </div>
        </GlassPanel>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GlassPanel className="h-full">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-500/20 rounded-full text-xs flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    Read More
                  </Button>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No blog posts found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
