import { create } from "zustand";
import api from "../api/axios";
import type { Event } from "../types/event";

interface EventState {
  events: Event[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  fetchEvents: (page?: number, limit?: number) => Promise<void>;
  createEvent: (
    name: string,
    description: string,
    date: string,
    minimalAmount: number
  ) => Promise<void>;
  contributeToEvent: (
    eventId: string,
    memberId: string,
    amount: number
  ) => Promise<void>;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,

  fetchEvents: async (page = 1, limit = 10) => {
    console.log("Fetching events with page:", page, "and limit:", limit);
    set({ loading: true, error: null });
    try {
      const response = await api.get("/events", { params: { page, limit } });
      console.log("Response from backend:", response.data);
      set({ 
        events: response.data.events, 
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        loading: false 
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },

  createEvent: async (
    name: string,
    description: string,
    date: string,
    minimalAmount: number
  ) => {
    set({ loading: true, error: null });
    try {
      await api.post("/events", { name, description, date, minimalAmount });
      set({ loading: false });
      useEventStore.getState().fetchEvents();
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },

  contributeToEvent: async (
    eventId: string,
    memberId: string,
    amount: number
  ) => {
    set({ loading: true, error: null });
    try {
      await api.post(`/events/${eventId}/payments`, { memberId, amount });
      set({ loading: false });
      // Optionally refetch event details or transactions after contribution
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },
}));
