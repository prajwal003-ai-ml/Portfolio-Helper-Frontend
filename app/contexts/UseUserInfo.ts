import { create } from "zustand";

export interface Information {
    id?: number;
    uid?: number;
    name: string;
    title?: string;
    homeimage?: string;
    aboutimage?: string;
    about?: string;
    skills?: string[];
    resume?: string;
    contact?: string;
    whatsapp?: string;
    facebook?: string;
    github?: string;
    email?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
}

interface InformationStore {
    information: Information | null;
    isFetched: boolean;
    setIsFetched: () => void;
    setInformation: (data: Information) => void;
    clearInformation: () => void;
}

export const useInformationStore = create<InformationStore>((set) => ({
    information: null,
    isFetched: false,

    setIsFetched: () => set({ isFetched: true }),

    setInformation: (data) => set({ information: data }),

    clearInformation: () => set({ information: null }),
}));
