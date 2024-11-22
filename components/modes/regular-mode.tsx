"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { QuizInterface } from "./regular-mode/quiz-interface";

interface RegularModeProps {
  onBack: () => void;
}

export function RegularMode({ onBack }: RegularModeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-6"
    >
      <Button
        variant="ghost"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Modes
      </Button>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Regular Mode</h2>
        <p className="text-muted-foreground">
          Practice math with interactive quizzes and get helpful hints from our AI tutor.
        </p>
      </div>

      <QuizInterface />
    </motion.div>
  );
}