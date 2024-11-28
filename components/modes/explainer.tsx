import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useModeStore } from "@/lib/stores/mode-store";
import { useRouter } from 'next/navigation';
import MarkdownView from "@/components/modes/markdown-view";

interface ExplainerProps {
    topic: string;
    difficulty: string;
}

const ExplainerSkeleton = () => (
    <Card className="col-span-3 p-6">
        <div className="space-y-8">
            {/* Title and Badge Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-5 w-16" />
            </div>

            {/* Explanation Section Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-24 w-full" />
            </div>

            {/* Examples Section Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </div>
            </div>

            {/* Key Concepts Section Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </div>
        </div>
    </Card>
);

export function Explainer({ topic, difficulty }: ExplainerProps) {
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Handle hydration and data fetching
    useEffect(() => {
        useModeStore.persist.rehydrate();
        setIsHydrated(true);

        if (topic && difficulty) {
            fetch('/api/explain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, difficulty }),
            })
                .then(res => res.json())
                .then(data => {
                    setExplanation(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setIsLoading(false);
                });
        }
    }, [topic, difficulty]);

    // Wait for hydration before rendering
    if (!isHydrated || isLoading) {
        return <ExplainerSkeleton />;
    }

    // Redirect if no topic after hydration
    if (!topic) {
        router.push('/onboarding');
        return null;
    }

    return (
        <Card className="col-span-3 p-2">
            <ScrollArea className="h-[calc(100vh-12rem)] p-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">{topic.charAt(0).toUpperCase() + topic.slice(1)}</h2>
                        <Badge variant="outline">Difficulty: {difficulty}</Badge>
                    </div>
                </div>

                <div className="space-y-4">
                    <MarkdownView content={explanation} />
                </div>
            </ScrollArea>
        </Card>
    );
}