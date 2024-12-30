import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTDS } from '@/hooks/useTDS';
import { Download, FileText } from 'lucide-react';

export function TDSCertificates() {
  const { generateCertificate, downloadCertificate } = useTDS();
  const [selectedDeduction, setSelectedDeduction] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!selectedDeduction) return;
    setIsGenerating(true);
    try {
      await generateCertificate(selectedDeduction);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!selectedDeduction) return;
    await downloadCertificate(selectedDeduction);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          TDS Certificates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Deduction</label>
            <Select
              value={selectedDeduction}
              onValueChange={setSelectedDeduction}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select deduction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Deduction #1</SelectItem>
                <SelectItem value="2">Deduction #2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Certificate Number</label>
            <Input placeholder="Enter certificate number" />
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Certificate'}
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}