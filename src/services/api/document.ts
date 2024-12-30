import { api } from './base';
import { Document, DocumentVersion } from '@/types/document';

export const documentApi = {
  upload: async (file: File, tags: string[]) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', JSON.stringify(tags));
    
    const response = await api.post<Document>('/documents/upload', formData);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get<Document[]>('/documents');
    return response.data;
  },

  getVersions: async (documentId: string) => {
    const response = await api.get<DocumentVersion[]>(`/documents/${documentId}/versions`);
    return response.data;
  },

  addTag: async (documentId: string, tag: string) => {
    const response = await api.post<Document>(`/documents/${documentId}/tags`, { tag });
    return response.data;
  },
};