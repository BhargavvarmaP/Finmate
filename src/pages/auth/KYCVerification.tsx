import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';
import { GradientText } from '@/components/ui/gradient-text';
import { Card3D } from '@/components/ui/card-3d';
import { cn } from '@/lib/utils';
import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Camera,
  Shield
} from 'lucide-react';

const documents = [
  {
    id: 'pan',
    title: 'PAN Card',
    description: 'Personal or Business PAN Card',
    status: 'pending',
    icon: FileText,
  },
  {
    id: 'aadhar',
    title: 'Aadhar Card',
    description: 'For identity verification',
    status: 'completed',
    icon: Shield,
  },
  {
    id: 'photo',
    title: 'Photograph',
    description: 'Recent passport size photo',
    status: 'pending',
    icon: Camera,
  },
  {
    id: 'bank',
    title: 'Bank Statement',
    description: 'Last 3 months statement',
    status: 'pending',
    icon: FileText,
  }
];

export function KYCVerification() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <GradientText className="text-4xl font-bold mb-2">
            KYC Verification
          </GradientText>
          <p className="text-gray-400">
            Complete your verification to access all features
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/5 rounded-full h-2 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-full w-1/4" />
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {documents.map((doc) => (
            <Card3D
              key={doc.id}
              className={cn(
                "p-4 cursor-pointer transition-all duration-300",
                "hover:scale-105"
              )}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className={cn(
                    "p-3 rounded-lg",
                    doc.status === 'completed' ? "bg-green-500/20" : "bg-purple-500/20"
                  )}
                >
                  <doc.icon
                    className={cn(
                      "w-6 h-6",
                      doc.status === 'completed' ? "text-green-500" : "text-purple-500"
                    )}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-white">{doc.title}</h4>
                  <p className="text-sm text-gray-400">
                    {doc.description}
                  </p>
                  <div className={cn(
                    "mt-2 text-sm flex items-center justify-center gap-1",
                    doc.status === 'completed' ? "text-green-500" : "text-purple-500"
                  )}>
                    {doc.status === 'completed' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Verified</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        <span>Pending</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Upload Section */}
        <GlassPanel className="p-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
              Upload Documents
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6",
                    "border-white/10 hover:border-purple-500/50",
                    "transition-colors duration-300"
                  )}
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-white mb-1">
                        Upload {doc.title}
                      </h4>
                      <p className="text-sm text-gray-400 mb-4">
                        {doc.description}
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        id={`file-${doc.id}`}
                      />
                      <label
                        htmlFor={`file-${doc.id}`}
                        className={cn(
                          "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
                          "bg-white/5 hover:bg-white/10 cursor-pointer",
                          "text-sm font-medium text-white transition-colors"
                        )}
                      >
                        <Upload className="w-4 h-4" />
                        Choose File
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400">
                Make sure all documents are clear and readable
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-white/10 hover:bg-white/5"
                >
                  Save Progress
                </Button>
                <Button
                  className={cn(
                    "bg-gradient-to-r from-purple-600 to-blue-600",
                    "hover:from-purple-700 hover:to-blue-700",
                    "text-white flex items-center gap-2"
                  )}
                >
                  Submit for Verification
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </GlassPanel>

        {/* Help Section */}
        <div className="text-center">
          <p className="text-gray-400">
            Need help with verification?{' '}
            <Link
              to="/support"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}