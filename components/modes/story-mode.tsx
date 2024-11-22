"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface StoryModeProps {
  onBack: () => void;
}

export function StoryMode({ onBack }: StoryModeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Modes
      </Button>
      
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Story Mode</h2>
        <p className="text-muted-foreground mb-4">
          Join an interactive adventure where your math skills help shape the story!
        </p>
        {/* Story content will be added here */}
      </Card>
    </motion.div>
  );
}