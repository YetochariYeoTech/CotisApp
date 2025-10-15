import { create } from "zustand";
import api from "../api/axios";
import type { AuthUser } from "../types/auth";
import { AccountStatus } from "../types/enums";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  activateAccount: (amount: number) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/auth/login", { email, password });
      const { member } = response.data;
      localStorage.setItem("user", JSON.stringify(member));
      set({ user: member, isAuthenticated: true, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      throw error;
    }
  },

  register: async (fullName, email, phoneNumber, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/auth/register", {
        fullName,
        email,
        phoneNumber,
        password,
      });
      console.log("Registration successful", response.data);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ token: null, user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      set({ user, isAuthenticated: true });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },

  activateAccount: async (amount: number) => {
    set({ loading: true, error: null });
    try {
      // Call the API to perform the activation on the backend
      await api.post("/auth/activate-account", { amount });

      // On success, proactively update the frontend state
      set(state => {
        if (!state.user) {
          return { loading: false }; // Should not happen if we got here
        }
        // Create a new user object with the updated status
        const updatedUser = {
          ...state.user,
          accountStatus: AccountStatus.ACTIVE,
        };
        // Save the new object to localStorage and update the store state
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { user: updatedUser, loading: false };
      });

    } catch (error: any) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      throw error;
    }
  },
}));