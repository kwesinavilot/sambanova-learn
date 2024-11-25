import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ModeState {
    mode: string;
    topic: string;
    difficulty: string;
    setModeData: (data: { mode: string; topic: string; difficulty: string }) => void;
    clearModeData: () => void;
}

export const useModeStore = create<ModeState>()(
    persist(
        (set) => ({
            mode: '',
            topic: '',
            difficulty: '',
            setModeData: (data) => set({
                mode: data.mode,
                topic: data.topic,
                difficulty: data.difficulty
            }),
            clearModeData: () => set({ mode: '', topic: '', difficulty: '' }),
        }),
        {
            name: 'mode-storage',
            storage: createJSONStorage(() => sessionStorage), // Change to sessionStorage
            skipHydration: true,
        }
    )
);