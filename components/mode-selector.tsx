"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, MapPin, BookOpen } from "lucide-react";
import { useState } from "react";
import { RegularMode } from "./modes/regular-mode";
import { AdventureMode } from "./modes/adventure-mode";
import { StoryMode } from "./modes/story-mode";

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
    description: "Learn math through AI-generated interactive stories",
    icon: BookOpen,
    color: "from-purple-500 to-purple-600",
  },
];

export function ModeSelector() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const renderMode = () => {
    switch (selectedMode) {
      case "regular":
        return <RegularMode onBack={() => setSelectedMode(null)} />;
      case "adventure":
        return <AdventureMode onBack={() => setSelectedMode(null)} />;
      case "story":
        return <StoryMode onBack={() => setSelectedMode(null)} />;
      default:
        return null;
    }
  };

  if (selectedMode) {
    return renderMode();
  }

  return (
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
              onClick={() => setSelectedMode(mode.id)}
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
  );
}