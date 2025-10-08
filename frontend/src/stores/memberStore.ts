import { create } from "zustand";
import api from "../api/axios";
import type { Member } from "../types/member";

interface MemberState {
  members: Member[];
  loading: boolean;
  error: string | null;
  fetchMembers: () => Promise<void>;
  fetchMemberById: (id: string) => Promise<Member | null>;
  fetchMembersUpToDate: () => Promise<void>;
  fetchMemberDuesReport: (id: string) => Promise<any[]>; // TODO: Define DuesReportItem type
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
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchMemberById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<Member>(`/members/${id}`);
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  fetchMembersUpToDate: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<Member[]>("/members/up-to-date");
      set({ members: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchMemberDuesReport: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<any[]>(`/members/${id}/dues-report`);
      set({ loading: false });
      return response.data;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return [];
    }
  },
}));
