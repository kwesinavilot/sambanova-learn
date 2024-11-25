import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const ExplainerSkeleton = () => (
    <Card className="col-span-2 p-6">
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

export default function Explainer() {
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return <ExplainerSkeleton />;
    }

    return (
        <Card className="col-span-2 p-6">
            <ScrollArea className="h-[calc(100vh-12rem)]">
                {/* Top Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Addition</h2>
                        <Badge variant="outline">Easy</Badge>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        {/* <h3 className="font-semibold mb-2">What is {userData.topic}?</h3> */}
                        <p className="text-muted-foreground">
                            [AI-generated explanation based on topic and difficulty]
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Examples</h3>
                        <div className="space-y-2">
                            [AI-generated examples]
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Key Concepts</h3>
                        <ul className="list-disc list-inside text-muted-foreground">
                            [AI-generated key points]
                        </ul>
                    </div>
                </div>
            </ScrollArea>
        </Card>
    );
}