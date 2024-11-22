"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface AdventureModeProps {
  onBack: () => void;
}

export function AdventureMode({ onBack }: AdventureModeProps) {
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
        <h2 className="text-2xl font-bold mb-4">Adventure Mode</h2>
        <p className="text-muted-foreground mb-4">
          Embark on an exciting journey where solving math problems unlocks new achievements and rewards!
        </p>
        {/* Adventure content will be added here */}
      </Card>
    </motion.div>
  );
}