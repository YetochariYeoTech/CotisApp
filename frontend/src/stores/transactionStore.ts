import { create } from "zustand";
import api from "../api/axios";
import type { Transaction } from "../types/transaction";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>; // Assuming an endpoint to get all transactions
  validateTransaction: (id: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  loading: false,
  error: null,

  fetchTransactions: async () => {
    set({ loading: true, error: null });
    try {
      // Assuming an endpoint to get all transactions
      // const response = await api.get<Transaction[]>('/transactions');
      // set({ transactions: response.data, loading: false });
      set({ loading: false }); // Placeholder
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  validateTransaction: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/transactions/${id}/validate`);
      set({ loading: false });
      // Optionally refetch transactions after validation
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
