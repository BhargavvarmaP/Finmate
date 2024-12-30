import { useState, useEffect } from 'react';
import { Document } from '@/types/document';
import { documentApi } from '@/services/api/document';
import { useToast } from '@/components/ui/use-toast';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    try {
      const data = await documentApi.getAll();
      setDocuments(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch documents',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const uploadDocument = async (file: File, tags: string[]) => {
    try {
      const document = await documentApi.upload(file, tags);
      setDocuments([...documents, document]);
      return document;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload document',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    documents,
    isLoading,
    uploadDocument,
  };
}