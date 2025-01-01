import { useState } from 'react';
import { Upload, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

export function XBRLConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setConverting(true);
    // Simulating conversion process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConverting(false);

    toast({
      title: 'Conversion Complete',
      description: 'Your XBRL file has been generated successfully.',
    });
  };

  return (
    <GlassPanel className="p-6">
      <div className="text-center">
        <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-semibold mb-2">XBRL Converter</h2>
        <p className="text-gray-400 mb-6">
          Convert your financial statements to XBRL format for regulatory filing
        </p>

        <div className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 border-gray-200 dark:border-gray-800">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <span className="text-sm text-gray-400">
                {file ? file.name : 'Click to upload or drag and drop'}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                Excel or CSV files only
              </span>
            </label>
          </div>

          <Button
            className="w-full"
            disabled={!file || converting}
            onClick={handleConvert}
          >
            {converting ? (
              <>Converting...</>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Convert to XBRL
              </>
            )}
          </Button>
        </div>
      </div>
    </GlassPanel>
  );
}
