'use client';

import { useState, useEffect } from 'react';
import { Explainer } from '@/components/modes/explainer';
import { ChatSection } from '@/components/modes/chat-section';
import { useModeStore } from '@/lib/stores/mode-store';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/stores/user-store';
import { set } from 'zod';

export default function RegularModePage() {
    const router = useRouter();
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [ username, setUsername ] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Retrieve topic and difficulty from the store after hydration
        useModeStore.persist.rehydrate();
        
        const storedTopic = useModeStore.getState().topic;
        const storedDifficulty = useModeStore.getState().difficulty;
        const username = useUserStore.getState().name;

        if (!storedTopic || !storedDifficulty || !username) {
            router.push('/onboarding');
            return;
        }

        setTopic(storedTopic);
        setDifficulty(storedDifficulty);
        setUsername(username);
    }, [router]);

    // If topic or difficulty is not set, don't render the page
    if (!topic || !difficulty) {
        return null;
    }

    return (
        <div className="grid grid-cols-6 gap-4">
            <Explainer topic={topic} difficulty={difficulty} />
            <ChatSection 
                name={username} 
                topic={topic} 
                difficulty={difficulty} 
            />
        </div>
    );
}