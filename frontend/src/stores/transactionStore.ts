import { create } from "zustand";
import api from "../api/axios";
import type { Transaction } from "../types/transaction";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  validateTransaction: (id: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  loading: false,
  error: null,

  fetchTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<Transaction[]>("/transactions"); // Assuming this endpoint will be added to backend
      set({ transactions: response.data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },

  validateTransaction: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/transactions/${id}/validate`);
      set({ loading: false });
      // Optionally refetch transactions after validation
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },
}));
