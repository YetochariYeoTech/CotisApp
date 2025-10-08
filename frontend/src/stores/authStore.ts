import { create } from "zustand";
import api from "../api/axios";
import type { AuthUser } from "../types/auth";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token, member } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(member));
    set({ token, user: member, isAuthenticated: true });
  },

  register: async (fullName, email, phoneNumber, password) => {
    const response = await api.post("/auth/register", {
      fullName,
      email,
      phoneNumber,
      password,
    });
    // After successful registration, you might want to automatically log in the user
    // or redirect them to the login page.
    console.log("Registration successful", response.data);
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    // This function can be used to verify the token with the backend if needed
    // For now, it just checks localStorage
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      set({ user, isAuthenticated: true });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
