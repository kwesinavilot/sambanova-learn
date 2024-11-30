'use client';

import { useState, useEffect } from 'react';
import { Explainer } from '@/components/modes/explainer';
import { ChatSection } from '@/components/modes/chat-section';
import { useModeStore } from '@/lib/stores/mode-store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/lib/stores/user-store';

export default function LearnPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [username, setUsername] = useState('');
    const [currentMode, setCurrentMode] = useState('');

    useEffect(() => {
        const initializeData = () => {
            useModeStore.persist.rehydrate();

            const storedMode = useModeStore.getState().mode;
            const storedTopic = useModeStore.getState().topic;
            const storedDifficulty = useModeStore.getState().difficulty;
            const username = useUserStore.getState().name;

            console.log("Retrieved Details:", {
                storedMode,
                storedTopic,
                storedDifficulty,
                username,
            });

            // Early validation and redirect
            if (!storedTopic || !storedDifficulty || !username) {
                router.push('/onboarding');
                return;
            }

            // Handle mode priority and updates
            const activeMode = mode || storedMode;
            console.log('Active Mode:', activeMode);

            if (!activeMode) {
                router.push('/onboarding');
                return;
            }

            // Set all states at once
            setCurrentMode(activeMode);
            setTopic(storedTopic);
            setDifficulty(storedDifficulty);
            setUsername(username);
        };

        initializeData();
    }, [router, mode]);

    // Add a guard clause in the return
    if (!currentMode || !topic || !difficulty || !username) {
        return null;
    }

    return (
        <div className="grid grid-cols-12 gap-10">
            <Explainer topic={topic} difficulty={difficulty} />
            <ChatSection
                mode={currentMode}
                name={username}
                topic={topic}
                difficulty={difficulty}
            />
        </div>
    );
}