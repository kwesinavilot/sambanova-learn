import { ModeSelector } from "@/components/mode-selector";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ModeSelector />
      </div>
    </main>
  );
}