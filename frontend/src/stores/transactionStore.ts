import { create } from "zustand";
import api from "../api/axios";
import type { Transaction } from "../types/transaction";

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: (memberId?: string) => Promise<void>;
  validateTransaction: (id: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  loading: false,
  error: null,

  fetchTransactions: async (memberId?: string) => {
    set({ loading: true, error: null });
    try {
      const url = memberId ? `/transactions/member/${memberId}` : '/transactions';
      const response = await api.get<Transaction[]>(url);
      set({ transactions: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  validateTransaction: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await api.put(`/transactions/${id}/validate`);
      // Refetch all transactions to show the updated status
      await get().fetchTransactions();
    } catch (error: any) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
}));