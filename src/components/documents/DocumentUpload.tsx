import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDocuments } from '@/hooks/useDocuments';
import { Upload } from 'lucide-react';
import { Document } from '@/types';

export function DocumentUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const { uploadDocument } = useDocuments();

  const handleUpload = async () => {
    if (!selectedFile) return;
    await uploadDocument(selectedFile, tags);
    setSelectedFile(null);
    setTags([]);
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
      />
      <Input
        placeholder="Add tags (comma separated)"
        onChange={(e) => setTags(e.target.value.split(',').map(t => t.trim()))}
      />
      <Button onClick={handleUpload} disabled={!selectedFile}>
        <Upload className="mr-2 h-4 w-4" />
        Upload Document
      </Button>
    </div>
  );
}