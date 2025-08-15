import { create } from "zustand";

interface DialogData {
    Accept: () => void;
    Reject: () => void;
    Title: string;
    Description: string;
}

interface DialogStore {
    isShowing: boolean;
    data: DialogData;
    Show: (data: DialogData) => void;
    Hide: () => void;
}

export const useDialogBox = create<DialogStore>((set) => ({
    isShowing: false,
    data: {
        Accept: () => { },
        Reject: () => { },
        Title: "",
        Description: ""
    },
    Show: (data) => set({ isShowing: true, data }),
    Hide: () => set({
        isShowing: false, data: {
            Accept: () => { },
            Reject: () => { },
            Title: "",
            Description: ""
        }
    })
}));
