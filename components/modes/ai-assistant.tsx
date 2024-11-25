'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

export function AIAssistant() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hint, setHint] = useState("Need a hint? I can help break down this problem!");

  return (
    <Card className="col-span-2 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-semibold">AI Assistant</h3>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4"
          >
            <p className="text-muted-foreground">{hint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>Hide Hint <ChevronUp className="ml-2 h-4 w-4" /></>
        ) : (
          <>Show Hint <ChevronDown className="ml-2 h-4 w-4" /></>
        )}
      </Button>
    </Card>
  );
}