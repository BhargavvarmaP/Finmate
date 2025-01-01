import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Search, Tag, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  tags: string[];
}

export function DocumentStorage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // TODO: Implement file upload to cloud storage
    toast({
      title: 'Success',
      description: 'Files uploaded successfully',
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement document search
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Document Storage</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Upload className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold">Upload Documents</h3>
                <p className="text-sm text-gray-400">Drag and drop or browse</p>
              </div>
            </div>
            <Input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="w-full"
            >
              Choose Files
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Tag className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">AI Tagging</h3>
                <p className="text-sm text-gray-400">Automatic document tagging</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Manage Tags
            </Button>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <History className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Version Control</h3>
                <p className="text-sm text-gray-400">Track document changes</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View History
            </Button>
          </GlassPanel>
        </div>

        <GlassPanel className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Search className="w-6 h-6 text-gray-400" />
            <Input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3">Name</th>
                  <th className="text-left py-3">Type</th>
                  <th className="text-left py-3">Size</th>
                  <th className="text-left py-3">Upload Date</th>
                  <th className="text-left py-3">Tags</th>
                  <th className="text-left py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-700">
                    <td className="py-3">{doc.name}</td>
                    <td className="py-3">{doc.type}</td>
                    <td className="py-3">{doc.size}</td>
                    <td className="py-3">{doc.uploadDate}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-purple-500/20 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
