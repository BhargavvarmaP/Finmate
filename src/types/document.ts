export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  tags: string[];
  uploadedAt: string;
  lastModified: string;
  version: number;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  changes: string;
  createdAt: string;
  createdBy: string;
}