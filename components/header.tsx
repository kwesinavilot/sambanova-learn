import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { useUserStore } from "@/lib/stores/user-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const name = useUserStore((state) => state.name);
  console.log('Current user name:', name);

  return (
    <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-4">
          {name && (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{name}</span>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}