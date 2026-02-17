'use client'
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme : dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light")
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  })
  const toggleTheme = () => {
    switch (theme) {
      case "light": {
        setTheme('dark');
        return;
      }
      case "dark": {
        setTheme('light');
        return;
      }
      case 'system': {
        setTheme(systemTheme === 'light' ? 'dark' : 'light')
      }
    }
  }
  return (
    <button onClick={toggleTheme} className=" dark:bg-neutral-500/30 rounded-full px-3 py-2 shadow-md  flex items-center justify-center dark:shadow-neutral-700 dark:shadow-sm" >
      <SunIcon size={12} className="rotate-0   text-black scale-100 transition-all duration-500 dark:rotate-90 dark:scale-0" />
      <MoonIcon size={12} className="rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
    </button>
  )
}
