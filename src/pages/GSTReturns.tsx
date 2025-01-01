import { motion } from 'framer-motion';
import { Card3D } from '@/components/ui/card-3d';
import { GlassPanel } from '@/components/ui/glass-panel';
import { GradientText } from '@/components/ui/gradient-text';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { cn } from '@/lib/utils';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  ArrowUpRight,
  Download,
  Upload,
  Filter
} from 'lucide-react';

const gstReturns = [
  {
    id: 'gst1',
    period: 'December 2024',
    type: 'GSTR-1',
    dueDate: '2025-01-11',
    status: 'pending',
    amount: '₹45,000'
  },
  {
    id: 'gst2',
    period: 'December 2024',
    type: 'GSTR-3B',
    dueDate: '2025-01-20',
    status: 'draft',
    amount: '₹38,500'
  },
  {
    id: 'gst3',
    period: 'November 2024',
    type: 'GSTR-1',
    dueDate: '2024-12-11',
    status: 'filed',
    amount: '₹52,750'
  }
];

const metrics = [
  {
    title: 'Total Tax Liability',
    value: '₹1,45,000',
    change: '+8.5%',
    color: '#3b82f6'
  },
  {
    title: 'Input Tax Credit',
    value: '₹85,000',
    change: '+12.3%',
    color: '#22c55e'
  },
  {
    title: 'Net Payable',
    value: '₹60,000',
    change: '+5.2%',
    color: '#f59e0b'
  }
];

const upcomingFilings = [
  {
    id: 'uf1',
    type: 'GSTR-1',
    dueDate: '2025-01-11',
    status: 'pending'
  },
  {
    id: 'uf2',
    type: 'GSTR-3B',
    dueDate: '2025-01-20',
    status: 'not-started'
  }
];

export function GSTReturns() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <GradientText className="text-3xl font-bold mb-2">
              GST Returns
            </GradientText>
            <p className="text-gray-400">
              Manage and file your GST returns efficiently
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button
              className={cn(
                "bg-gradient-to-r from-purple-600 to-blue-600",
                "hover:from-purple-700 hover:to-blue-700",
                "text-white flex items-center gap-2"
              )}
            >
              <Upload className="w-4 h-4" />
              File New Return
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Card3D
              key={index}
              className="p-6"
              glowColor={metric.color}
            >
              <div className="space-y-2">
                <p className="text-gray-400">{metric.title}</p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">
                    {metric.change} from last month
                  </span>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Recent Returns */}
        <GlassPanel className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Recent Returns</h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 border-b border-white/10">
                  <th className="text-left py-3">Period</th>
                  <th className="text-left py-3">Type</th>
                  <th className="text-left py-3">Due Date</th>
                  <th className="text-right py-3">Amount</th>
                  <th className="text-right py-3">Status</th>
                  <th className="text-right py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {gstReturns.map((gst) => (
                  <tr key={gst.id} className="border-b border-white/5">
                    <td className="py-3">{gst.period}</td>
                    <td className="py-3">{gst.type}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {gst.dueDate}
                      </div>
                    </td>
                    <td className="text-right py-3">{gst.amount}</td>
                    <td className="text-right py-3">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        gst.status === 'filed' ? 'bg-green-500/20 text-green-500' :
                        gst.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-blue-500/20 text-blue-500'
                      )}>
                        {gst.status}
                      </span>
                    </td>
                    <td className="text-right py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>

        {/* Upcoming Filings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassPanel className="p-6">
            <h3 className="text-xl font-semibold mb-4">Upcoming Filings</h3>
            <div className="space-y-4">
              {upcomingFilings.map((filing) => (
                <div
                  key={filing.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-2 rounded-lg",
                      filing.status === 'pending' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                    )}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{filing.type}</h4>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Due: {filing.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4"
                  >
                    Start Filing
                  </Button>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2"
              >
                <Upload className="w-6 h-6" />
                <span>Upload Invoice</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2"
              >
                <Download className="w-6 h-6" />
                <span>Download Returns</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2"
              >
                <FileText className="w-6 h-6" />
                <span>View Reports</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2"
              >
                <AlertCircle className="w-6 h-6" />
                <span>Get Help</span>
              </Button>
            </div>
          </GlassPanel>
        </div>
      </motion.div>
    </div>
  );
}