'use client';

import { Header } from "@/components/header";
import Explainer from "@/components/modes/explainer";
import { AIAssistant } from "@/components/modes/ai-assistant";

export default function ModesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-10 grid grid-cols-8 gap-10">
                <Explainer />

                {/* Main Content Area */}
                <div className="col-span-4">
                    {children}
                </div>

                <AIAssistant />
            </main>
        </div>
    );
}