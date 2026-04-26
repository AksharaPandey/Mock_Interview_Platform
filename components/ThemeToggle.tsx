"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "p-2.5 rounded-xl border transition-all flex items-center justify-center",
        "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 dark:text-gray-400 dark:hover:text-white",
        "light:bg-black/5 light:border-black/5 light:text-gray-600 light:hover:text-black"
      )}
      title="Toggle Theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggle;
