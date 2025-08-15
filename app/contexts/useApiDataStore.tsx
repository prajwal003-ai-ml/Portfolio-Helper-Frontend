import { create } from "zustand";

interface UserData {
  id: number;
  username: string;
  password: string;
}

interface ApiStore {
  data: UserData[];
  setData: (user: UserData) => void;
  removeData: (id: number) => void;
}

export const useApiStore = create<ApiStore>((set) => ({
  data: [],
  
  setData: (user) =>
    set((state) => ({
      data: [...state.data, user]
    })),

  removeData: (id) =>
    set((state) => ({
      data: state.data.filter((item) => item.id !== id)
    }))
}));
