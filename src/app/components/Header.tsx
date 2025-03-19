import { Book, Moon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function Header() {
  const [fontStyle, setFontStyle] = useState("sans");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedFont = localStorage.getItem("fontStyle");
    const savedTheme = localStorage.getItem("darkMode");

    if (savedFont) setFontStyle(savedFont);
    if (savedTheme) setDarkMode(savedTheme === "true");
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("font-sans", "font-serif", "font-mono");
    document.documentElement.classList.add(`font-${fontStyle}`);

    localStorage.setItem("fontStyle", fontStyle);
  }, [fontStyle]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <section className="flex flex-row items-center justify-center w-full p-4">
      <div className="flex flex-row items-center justify-between w-full mt-6">
        <Book size={64} className="text-gray-600 dark:text-gray-300" />
      </div>

      <div className="flex flex-row items-center justify-center w-full mt-6 gap-6">
        {/* Selector de Fuente */}
        <Select value={fontStyle} onValueChange={setFontStyle}>
          <SelectTrigger className="w-64 border-none shadow-none text-xl font-bold text-gray-600 dark:text-gray-300">
            <SelectValue placeholder="Font Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sans">Sans Serif</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
            <SelectItem value="mono">Monospace</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-4xl text-gray-600 dark:text-gray-300">|</p>

        {/* Modo Oscuro */}
        <div className="flex flex-row items-center justify-center gap-2">
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <Moon size={32} className="text-gray-600 dark:text-gray-300" />
        </div>
      </div>
    </section>
  );
}