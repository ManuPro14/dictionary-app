'use client'

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

export default function Header({ onOpenHistory }: { onOpenHistory: () => void }) {
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
    <section className="flex flex-col md:flex-row items-center justify-between w-full p-4">
      <div className="flex flex-row items-center justify-center w-full md:w-auto">
        {/* Clicking the book icon opens the history modal */}
        <button onClick={onOpenHistory} className="p-2 flex flex-row items-center gap-2">
          <Book size={48} className="text-gray-600 dark:text-gray-300 cursor-pointer" />
          <p className="text-2xl font-bold">History</p>
        </button>
      </div>

      <div className="flex flex-row items-center justify-center w-full md:w-auto mt-4 md:mt-0 gap-4 md:gap-6">
        <Select value={fontStyle} onValueChange={setFontStyle}>
          <SelectTrigger className="w-40 border-none shadow-none text-lg font-bold text-gray-600 dark:text-gray-300 cursor-pointer">
            <SelectValue placeholder="Font Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sans">Sans Serif</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
            <SelectItem value="mono">Monospace</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-2xl text-gray-600 dark:text-gray-300 hidden md:block">|</p>

        <div className="flex flex-row items-center gap-4">
          <Switch checked={darkMode} onCheckedChange={setDarkMode} className="cursor-pointer bg-gray-500"/>
          <Moon size={28} className="text-gray-600 dark:text-gray-300" />
        </div>
      </div>
    </section>
  );
}