import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        <ThemeToggle />
      </div>
    </header>
  );
}