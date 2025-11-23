import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Evita hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    setIsAnimating(true);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    
    // Add theme-transition class to body
    document.body.classList.add("theme-transition");
    
    setTimeout(() => {
      setIsAnimating(false);
      document.body.classList.remove("theme-transition");
    }, 500);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      className="transition-smooth hover:bg-secondary/80 relative overflow-hidden group"
    >
      <div className={isAnimating ? "icon-rotate" : ""}>
        {resolvedTheme === "dark" ? (
          <Sun className="h-5 w-5 text-yellow-500 group-hover:scale-110 transition-transform" />
        ) : (
          <Moon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
        )}
      </div>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </Button>
  );
};
