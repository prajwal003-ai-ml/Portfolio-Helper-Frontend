import { create } from "zustand";

export interface UserData {
  username: string;
  password: string;
  id: number;
}

interface StoreStatus {
  data: UserData[];
  addData: (userdata: UserData) => void;
  removeData: (id: number) => void;
  isFetched:boolean
  Fetched:()=>void
  InsertData:(data:UserData[])=>void
}

export const useApiUserData = create<StoreStatus>((set) => ({
  data: [],
  addData: (userdata) =>
    set((state) => ({
      data: [...state.data, userdata],
    })),
  removeData: (id) =>
    set((state) => ({
      data: state.data.filter((user) => user.id !== id),
    })),

    isFetched:false,
    Fetched:()=>set(()=>({
      isFetched:true
    })),
    InsertData:(userData)=>(set(()=>({
      data:userData
    })))
}));
