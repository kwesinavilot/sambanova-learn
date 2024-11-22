import { Brain } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">Archimedes Jnr.</h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}