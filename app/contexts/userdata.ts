import { create } from "zustand";

export interface User {
  id:number;
  Name: string;
  Email: string;
  IsVerified: boolean;
  Token:string
}

interface UserState {
  user: User;
  IsAuthorized: boolean;
  setUser: (user: User) => void;
  setAuthorized: (status: boolean) => void;
}

export const useUserdata = create<UserState>((set) => ({
  user: {id:0 , Name: "", Email: "", IsVerified: false,Token:'' }, // default values
  IsAuthorized: false,
  setUser: (user) => set({ user }),
  setAuthorized: (status) => set({ IsAuthorized: status }),
}));
