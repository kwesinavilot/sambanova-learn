'use client';

import { motion } from "framer-motion";

interface MathProblemProps {
  problem?: string;
  visualAid?: React.ReactNode;
}

export function MathProblem({ problem = "12 + 5 = ?", visualAid }: MathProblemProps) {
  return (
    <motion.div 
      className="rounded-lg border bg-card p-8 text-center"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
    >
      <h3 className="text-6xl font-bold mb-6">{problem}</h3>
      {visualAid && (
        <div className="mt-4">
          {visualAid}
        </div>
      )}
    </motion.div>
  );
}