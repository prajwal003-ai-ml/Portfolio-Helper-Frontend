import { create } from "zustand";

interface Project {
  id?: number; // Optional if not set until backend returns
  name: string;
  image?: string;
  github?: string;
  live?: string;
  description: string;
  reason?: string;
  isspecial?: boolean;
  techstacks?: string[];
  uid?: number;
}

interface ProjectStore {
  projects: Project[];
  isFetched: boolean;
  setFetched: () => void;
  FetchAgain:()=>void
  addProject: (data: Project) => void;
  setProjects: (data: Project[]) => void;
  removeProject: (id: number) => void; // Added here
}

export const useProjectData = create<ProjectStore>((set) => ({
  projects: [],
  isFetched: false,

  setFetched: () => set({ isFetched: true }),
  FetchAgain: () => set({ isFetched: false }),

  addProject: (data) =>
    set((state) => ({
      projects: [...state.projects, data],
    })),

  setProjects: (data: Project[]) => set({
    projects: data
  }),

  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((proj) => proj.id !== id),
    })),
}));
