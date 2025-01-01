import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Building, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  timeframe: string;
  roi: string;
  imageUrl: string;
}

export function CaseStudies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'Streamlining GST Compliance for E-commerce Giant',
      company: 'TechMart India',
      industry: 'E-commerce',
      challenge: 'Managing GST compliance across multiple states with high transaction volume...',
      solution: 'Implemented automated GST filing system with real-time tracking...',
      results: [
        '80% reduction in compliance processing time',
        'Zero penalties in the last fiscal year',
        '₹50 lakhs saved in operational costs',
      ],
      timeframe: '6 months',
      roi: '300%',
      imageUrl: '/case-studies/techmart.jpg',
    },
    {
      id: '2',
      title: 'Automating Payroll for Growing Startup',
      company: 'InnovateTech Solutions',
      industry: 'Technology',
      challenge: 'Manual payroll processing for rapidly growing team across multiple locations...',
      solution: 'Deployed integrated payroll management system with compliance automation...',
      results: [
        '95% reduction in payroll processing time',
        'Eliminated manual errors',
        'Improved employee satisfaction',
      ],
      timeframe: '3 months',
      roi: '250%',
      imageUrl: '/case-studies/innovatetech.jpg',
    },
    // Add more case studies
  ];

  const filteredCaseStudies = caseStudies.filter(
    (study) =>
      (selectedIndustry === 'all' || study.industry === selectedIndustry) &&
      (study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Case Studies</h1>

        <GlassPanel className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search case studies..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="p-2 rounded-md bg-background border border-input"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="all">All Industries</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Technology">Technology</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Services">Services</option>
            </select>
          </div>
        </GlassPanel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCaseStudies.map((study) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GlassPanel className="h-full">
                <img
                  src={study.imageUrl}
                  alt={study.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {study.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {study.timeframe}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      ROI: {study.roi}
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-2">{study.title}</h2>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">Challenge:</h3>
                    <p className="text-gray-400">{study.challenge}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">Solution:</h3>
                    <p className="text-gray-400">{study.solution}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Key Results:</h3>
                    <ul className="list-disc list-inside text-gray-400">
                      {study.results.map((result, index) => (
                        <li key={index}>{result}</li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full flex items-center justify-center gap-2">
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {filteredCaseStudies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No case studies found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
