export type ToastVariant = 'default' | 'destructive' | 'success';

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    // Implementation
    console.log('Toast:', options);
  };

  return { toast };
} 