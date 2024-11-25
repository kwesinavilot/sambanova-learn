'use client';

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  total?: number;
}

export function ProgressBar({ value, total = 10 }: ProgressBarProps) {
  const percentage = (value / total) * 100;
  
  return (
    <div className="w-[300px] space-y-2">
      <Progress value={percentage} className="h-3" />
      <p className="text-sm text-muted-foreground text-center">{value} of {total} completed</p>
    </div>
  );
}