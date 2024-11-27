'use client';

import { useEffect, useState } from 'react';
import { useModeStore } from '@/lib/stores/mode-store';
import { useUserStore } from '@/lib/stores/user-store';

export function StoreProvider({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Only rehydrate on the client side
        if (typeof window !== 'undefined') {
            useUserStore.persist.rehydrate();
            useModeStore.persist.rehydrate();
        }
        setIsHydrated(true);
    }, []);

    // Show nothing until hydration is complete
    if (!isHydrated) {
        return null;
    }

    return children;
}