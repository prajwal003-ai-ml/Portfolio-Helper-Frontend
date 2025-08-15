import { create } from "zustand";

export interface User {
  id:number;
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
  user: {id:0 , Name: "", Email: "", IsVerified: true }, // default values
  IsAuthorized: true,
  setUser: (user) => set({ user }),
  setAuthorized: (status) => set({ IsAuthorized: status }),
}));
