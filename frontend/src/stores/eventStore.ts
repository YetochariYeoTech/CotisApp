import { create } from "zustand";
import api from "../api/axios";
import type { Event } from "../types/event";

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
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
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get<Event[]>("/events"); // Assuming an endpoint to get all events
      set({ events: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
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
      // Optionally refetch events after creation
    } catch (error: any) {
      set({ error: error.message, loading: false });
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
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
