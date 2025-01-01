import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Building, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  date: string;
  imageUrl: string;
  category: string;
}

export function Testimonials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      company: 'TechMart India',
      position: 'CFO',
      content: 'Finmate has revolutionized how we handle our financial compliance. The automated GST filing and real-time monitoring have saved us countless hours.',
      rating: 5,
      date: '2024-12-15',
      imageUrl: '/testimonials/rajesh.jpg',
      category: 'Enterprise',
    },
    {
      id: '2',
      name: 'Priya Singh',
      company: 'InnovateTech Solutions',
      position: 'Founder',
      content: 'As a startup founder, managing finances was overwhelming. Finmate simplified everything from GST to payroll. Highly recommended!',
      rating: 4,
      date: '2024-12-10',
      imageUrl: '/testimonials/priya.jpg',
      category: 'Startup',
    },
    // Add more testimonials
  ];

  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      (selectedCategory === 'all' || testimonial.category === selectedCategory) &&
      (testimonial.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement testimonial submission
    toast({
      title: 'Success',
      description: 'Thank you for your testimonial! It will be reviewed and published soon.',
    });
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Customer Testimonials</h1>

        <GlassPanel className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search testimonials..."
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
              <option value="Enterprise">Enterprise</option>
              <option value="Startup">Startup</option>
              <option value="SMB">SMB</option>
              <option value="Freelancer">Freelancer</option>
            </select>
          </div>
        </GlassPanel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GlassPanel className="h-full p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < testimonial.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-purple-500 mb-2" />
                    <p className="text-gray-400 mb-4">{testimonial.content}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Building className="w-4 h-4" />
                          {testimonial.company} - {testimonial.position}
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        <GlassPanel className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Share Your Experience</h2>
          <form onSubmit={handleSubmitTestimonial} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm mb-1 block">Name</label>
                <Input type="text" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm mb-1 block">Company</label>
                <Input type="text" placeholder="Your company" />
              </div>
              <div>
                <label className="text-sm mb-1 block">Position</label>
                <Input type="text" placeholder="Your position" />
              </div>
              <div>
                <label className="text-sm mb-1 block">Category</label>
                <select className="w-full p-2 rounded-md bg-background border border-input">
                  <option value="Enterprise">Enterprise</option>
                  <option value="Startup">Startup</option>
                  <option value="SMB">SMB</option>
                  <option value="Freelancer">Freelancer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm mb-1 block">Your Experience</label>
              <Textarea
                placeholder="Share your experience with Finmate..."
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Rating</label>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="w-6 h-6 cursor-pointer text-gray-400 hover:text-yellow-500"
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit Testimonial
            </Button>
          </form>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
