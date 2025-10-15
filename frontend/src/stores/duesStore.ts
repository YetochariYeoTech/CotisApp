import { create } from "zustand";
import api from "../api/axios";
import type { MemberDue, CreateDuePayload, PayDuePayload } from "../types/dues";

import { useAuthStore } from "./authStore";

interface DuesState {
  memberDues: MemberDue[];
  loading: boolean;
  error: string | null;
  fetchMemberDues: (memberId: string) => Promise<void>;
  createDue: (payload: CreateDuePayload) => Promise<void>;
  payDue: (payload: PayDuePayload) => Promise<void>;
}

export const useDuesStore = create<DuesState>((set, get) => ({
  memberDues: [],
  loading: false,
  error: null,

  fetchMemberDues: async (memberId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<MemberDue[]>(`/dues/member/${memberId}`);
      set({ memberDues: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  createDue: async (payload: CreateDuePayload) => {
    set({ loading: true, error: null });
    try {
      await api.post("/dues", payload);

      // After creating a due, refetch the dues for the current user to update the UI
      const memberId = useAuthStore.getState().user?._id;
      if (memberId) {
        await get().fetchMemberDues(memberId);
      }
      
    } catch (error: any) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  payDue: async (payload: PayDuePayload) => {
    set({ loading: true, error: null });
    try {
      await api.post("/dues/pay", payload);
      // After payment, refetch the dues for the specific member to update the UI
      await get().fetchMemberDues(payload.memberId);
    } catch (error: any) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));