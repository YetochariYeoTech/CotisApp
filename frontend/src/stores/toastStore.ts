import { create } from 'zustand';

interface ToastState {
  message: string | null;
  type: 'success' | 'error' | null;
  showToast: (message: string, type: 'success' | 'error') => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  type: null,

  showToast: (message, type) => set({ message, type }),
  hideToast: () => set({ message: null, type: null }),
}));
