'use client';

import { Button } from "@/components/ui/button";

interface NumberPadProps {
  onInput: (value: string) => void;
  value: string;
}

export function NumberPad({ onInput, value }: NumberPadProps) {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

  const handleClick = (num: string) => {
    if (num === '⌫') {
      onInput(value.slice(0, -1));
    } else {
      onInput(value + num);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 max-w-[400px] mx-auto">
      {numbers.map((num) => (
        <Button
          key={num}
          variant="outline"
          size="lg"
          onClick={() => handleClick(num)}
          className="h-16 text-2xl"
        >
          {num}
        </Button>
      ))}
    </div>
  );
}