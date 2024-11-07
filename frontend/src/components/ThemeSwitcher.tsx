
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BsMoonStars } from "react-icons/bs";
import { IoSunnySharp } from "react-icons/io5";
const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const {systemTheme, theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const renderThemeChanger= () => {
    if(!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme ;

    if(currentTheme ==="dark"){
      return (
        <IoSunnySharp onClick={() => setTheme('light')}/>
      )
    }

    else {
      return (
        <BsMoonStars  onClick={() => setTheme('dark')}/>
      )
    }
 };

  return (
    <>
    {renderThemeChanger()}
    </>
  );
};

export default ThemeSwitcher;