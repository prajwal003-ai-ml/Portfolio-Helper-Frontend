import { create } from "zustand";

export interface User {
  Name: string;
  Email: string;
  IsVerified: boolean;
}

interface UserState {
  user: User;
  IsAuthorized: boolean;
  setUser: (user: User) => void;
  setAuthorized: (status: boolean) => void;
}

export const useUserdata = create<UserState>((set) => ({
  user: { Name: "", Email: "", IsVerified: false }, // default values
  IsAuthorized: false,
  setUser: (user) => set({ user }),
  setAuthorized: (status) => set({ IsAuthorized: status }),
}));
