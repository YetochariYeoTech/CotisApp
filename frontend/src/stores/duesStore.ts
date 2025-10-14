import { create } from "zustand";
import api from "../api/axios";
import type { Dues } from "../types/dues";

interface DuesState {
  dues: Dues[];
  loading: boolean;
  error: string | null;
  fetchDues: () => Promise<void>;
  generateDues: () => Promise<void>;
  payDues: (memberId: string, duesId: string, amount: number) => Promise<void>;
}

export const useDuesStore = create<DuesState>((set) => ({
  dues: [],
  loading: false,
  error: null,

  fetchDues: async () => {
    // This endpoint is not defined in the backend, assuming it will be added or we fetch member specific dues
    set({ loading: true, error: null });
    try {
      // Example: Fetching all dues (if such an endpoint existed)
      // const response = await api.get<Dues[]>('/dues');
      // set({ dues: response.data, loading: false });
      set({ loading: false }); // Placeholder
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },

  generateDues: async () => {
    set({ loading: true, error: null });
    try {
      await api.post("/dues/generate");
      set({ loading: false });
      // Optionally refetch dues after generation
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },

  payDues: async (memberId: string, duesId: string, amount: number) => {
    set({ loading: true, error: null });
    try {
      await api.post("/dues/payments/dues", { memberId, duesId, amount });
      set({ loading: false });
      // Optionally refetch dues after payment
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },
}));
