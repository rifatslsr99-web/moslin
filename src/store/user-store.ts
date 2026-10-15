import { create } from "zustand";
import { UserProfile, Measurement } from "@/types";

interface UserState {
  user: UserProfile | null;
  measurements: Measurement | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: UserProfile | null) => void;
  setMeasurements: (measurements: Measurement) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  measurements: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user: UserProfile | null) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setMeasurements: (measurements: Measurement) =>
    set({ measurements }),

  setAuthenticated: (isAuthenticated: boolean) =>
    set({ isAuthenticated }),

  setLoading: (isLoading: boolean) =>
    set({ isLoading }),

  logout: () =>
    set({
      user: null,
      measurements: null,
      isAuthenticated: false,
    }),
}));
