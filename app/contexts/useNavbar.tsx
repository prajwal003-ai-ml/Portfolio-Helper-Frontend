import { create } from "zustand";


interface dataState {
    isOpen:boolean;
    setIsopen:(status:boolean)=>void
}

export const useNavData = create<dataState>((set)=>({
isOpen:false,
setIsopen:(status)=>set({isOpen:status})
}))