'use client';

import { Header } from "@/components/header";

export default function ModesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            
            <main className="container mx-auto px-4 py-10">
                {children}
            </main>
        </div>
    );
}