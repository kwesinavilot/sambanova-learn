'use client';

import { useEffect, useState } from 'react';
import { useModeStore } from '@/lib/stores/mode-store';

export function StoreProvider({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Only rehydrate on the client side
        if (typeof window !== 'undefined') {
            useModeStore.persist.rehydrate();
        }
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        // You might want to show a loading indicator here
        return null;
    }

    return children;
}