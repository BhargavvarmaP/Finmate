import { useState } from 'react';
import { Send, FileCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface SubmissionStatus {
  step: number;
  message: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export function XBRLSubmission() {
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus[]>([
    {
      step: 1,
      message: 'Validating XBRL document',
      status: 'pending',
    },
    {
      step: 2,
      message: 'Preparing submission package',
      status: 'pending',
    },
    {
      step: 3,
      message: 'Submitting to regulatory portal',
      status: 'pending',
    },
    {
      step: 4,
      message: 'Generating acknowledgment',
      status: 'pending',
    },
  ]);

  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Reset status when new file is selected
      setStatus(prevStatus =>
        prevStatus.map(step => ({ ...step, status: 'pending' }))
      );
    }
  };

  const updateStatus = (step: number, newStatus: SubmissionStatus['status']) => {
    setStatus(prevStatus =>
      prevStatus.map(s =>
        s.step === step ? { ...s, status: newStatus } : s
      )
    );
  };

  const handleSubmit = async () => {
    if (!file) return;

    setSubmitting(true);

    // Simulate submission process
    try {
      // Step 1: Validation
      updateStatus(1, 'processing');
      await new Promise(resolve => setTimeout(resolve, 2000));
      updateStatus(1, 'completed');

      // Step 2: Preparation
      updateStatus(2, 'processing');
      await new Promise(resolve => setTimeout(resolve, 1500));
      updateStatus(2, 'completed');

      // Step 3: Submission
      updateStatus(3, 'processing');
      await new Promise(resolve => setTimeout(resolve, 3000));
      updateStatus(3, 'completed');

      // Step 4: Acknowledgment
      updateStatus(4, 'processing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStatus(4, 'completed');

      toast({
        title: 'Submission Successful',
        description: 'Your XBRL document has been submitted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'An error occurred during submission. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
        );
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      <GlassPanel className="p-6">
        <div className="text-center">
          <FileCheck className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">XBRL Submission</h2>
          <p className="text-gray-400 mb-6">
            Submit your validated XBRL document to the regulatory authority
          </p>

          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 border-gray-200 dark:border-gray-800">
              <input
                type="file"
                accept=".xbrl,.xml"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={submitting}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FileCheck className="w-8 h-8 mb-2 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  Validated XBRL files only
                </span>
              </label>
            </div>

            <Button
              className="w-full"
              disabled={!file || submitting}
              onClick={handleSubmit}
            >
              {submitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit XBRL
                </>
              )}
            </Button>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold mb-4">Submission Status</h3>
        <div className="space-y-4">
          {status.map((step, index) => (
            <div
              key={step.step}
              className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div className="flex-shrink-0">{getStatusIcon(step.status)}</div>
              <div className="flex-1">
                <p className="font-medium">Step {step.step}</p>
                <p className="text-sm text-gray-400">{step.message}</p>
              </div>
              {index > 0 && step.status !== 'pending' && (
                <div className="absolute left-7 -mt-14 h-10 w-0.5 bg-gray-200 dark:bg-gray-700" />
              )}
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
