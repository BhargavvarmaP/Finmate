import { useState } from 'react';
import { CheckCircle2, AlertCircle, FileText, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface ValidationResult {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  element: string;
  line: number;
}

export function XBRLValidator() {
  const [file, setFile] = useState<File | null>(null);
  const [validating, setValidating] = useState(false);
  const [results, setResults] = useState<ValidationResult[]>([]);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResults([]);
    }
  };

  const handleValidate = async () => {
    if (!file) return;

    setValidating(true);
    // Simulating validation process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Sample validation results
    setResults([
      {
        id: '1',
        type: 'error',
        message: 'Missing required context reference',
        element: 'Assets',
        line: 45,
      },
      {
        id: '2',
        type: 'warning',
        message: 'Deprecated taxonomy element used',
        element: 'CashFlow',
        line: 78,
      },
      {
        id: '3',
        type: 'info',
        message: 'Consider using more specific element',
        element: 'OtherIncome',
        line: 92,
      },
    ]);

    setValidating(false);
    toast({
      title: 'Validation Complete',
      description: 'XBRL document validation has been completed.',
    });
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-l-4 border-red-500';
      case 'warning':
        return 'border-l-4 border-yellow-500';
      case 'info':
        return 'border-l-4 border-blue-500';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <GlassPanel className="p-6">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold mb-2">XBRL Validator</h2>
          <p className="text-gray-400 mb-6">
            Validate your XBRL documents against the latest taxonomy rules
          </p>

          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 border-gray-200 dark:border-gray-800">
              <input
                type="file"
                accept=".xbrl,.xml"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FileText className="w-8 h-8 mb-2 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  XBRL or XML files only
                </span>
              </label>
            </div>

            <Button
              className="w-full"
              disabled={!file || validating}
              onClick={handleValidate}
            >
              {validating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Validating...
                </>
              ) : (
                'Validate XBRL'
              )}
            </Button>
          </div>
        </div>
      </GlassPanel>

      {results.length > 0 && (
        <GlassPanel className="p-6">
          <h3 className="text-lg font-semibold mb-4">Validation Results</h3>
          <div className="space-y-4">
            {results.map(result => (
              <div
                key={result.id}
                className={`p-4 rounded-lg ${getResultColor(result.type)}`}
              >
                <div className="flex items-start gap-4">
                  {getResultIcon(result.type)}
                  <div>
                    <p className="font-medium">{result.message}</p>
                    <div className="text-sm text-gray-400 mt-1">
                      <span>Element: {result.element}</span>
                      <span className="mx-2">•</span>
                      <span>Line: {result.line}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      )}
    </div>
  );
}
