"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, MapPin, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserStore } from '@/lib/stores/user-store';

const modes = [
  {
    id: "regular",
    title: "Regular Mode",
    description: "Practice math with interactive quizzes and AI hints",
    icon: Brain,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "adventure",
    title: "Adventure Mode",
    description: "Solve challenges to earn rewards and level up",
    icon: MapPin,
    color: "from-green-500 to-green-600",
  },
  {
    id: "story",
    title: "Story Mode",
    description: "Learn math through interactive stories",
    icon: BookOpen,
    color: "from-purple-500 to-purple-600",
  },
];

export default function Home() {
  const router = useRouter();

  const name = useUserStore((state) => state.name);

  const handleModeSelect = (modeId: string) => {
    if (name) {
      // router.push(`/mode/${modeId}`);
      router.push(`/learn?mode=${modeId}`);
    } else {
      router.push(`/onboarding?mode=${modeId}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Choose Your Learning Mode</h2>
            <p className="text-muted-foreground">
              Pick the way you want to learn math today!
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {modes.map((mode) => (
              <motion.div
                key={mode.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="relative overflow-hidden cursor-pointer h-full"
                  onClick={() => handleModeSelect(mode.id)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-10`}
                  />

                  <div className="p-6 relative">
                    <mode.icon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{mode.title}</h3>
                    <p className="text-muted-foreground">{mode.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}