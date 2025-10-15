import { create } from "zustand";
import api from "../api/axios";
import type { DuesReportItem } from "../types/dues";
import type { Member } from "../types/member";
import type { Transaction } from "../types/transaction";

interface MemberState {
  members: Member[];
  loading: boolean;
  error: string | null;
  fetchMembers: () => Promise<void>;
  fetchMemberById: (id: string) => Promise<Member | null>;
  fetchMembersUpToDate: () => Promise<void>;
  fetchMemberDuesReport: (id: string) => Promise<DuesReportItem[]>;
  fetchMemberTransactions: (id: string) => Promise<Transaction[]>;
}

export const useMemberStore = create<MemberState>((set) => ({
  members: [],
  loading: false,
  error: null,

  fetchMembers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<Member[]>("/members");
      set({ members: response.data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },

  fetchMemberById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<Member>(`/members/${id}`);
      set({ loading: false });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
      return null;
    }
  },

  fetchMembersUpToDate: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<Member[]>("/members/up-to-date");
      set({ members: response.data, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },

  fetchMemberDuesReport: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<DuesReportItem[]>(`/members/${id}/dues-report`);
      set({ loading: false });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
      return [];
    }
  },

  fetchMemberTransactions: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<Transaction[]>(`/transactions/member/${id}`);
      set({ loading: false });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
      return [];
    }
  },
}));