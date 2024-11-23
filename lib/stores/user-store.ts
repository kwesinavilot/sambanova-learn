import { create } from 'zustand';

interface UserState {
  name: string;
  topic: string;
  difficulty: string;
  setUserData: (data: { name: string; topic: string; difficulty: string }) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  topic: '',
  difficulty: '',
  setUserData: (data) => set(data),
  clearUserData: () => set({ name: '', topic: '', difficulty: '' }),
}));
