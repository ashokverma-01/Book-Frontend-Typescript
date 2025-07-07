import React, { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const iconColor = theme === "dark" ? "text-white" : "text-pink-500";

  return (
    <label className="swap swap-rotate cursor-pointer">
      <input
        type="checkbox"
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        checked={theme === "dark"}
      />

      {/* Sun Icon for Light Mode */}
      <svg
        className={`swap-off fill-current w-7 h-7 ${iconColor}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17.66l-.7.71a1,1,0,0,0,1.41,1.41l.71-.7a1,1,0,1,0-1.41-1.42ZM12,18a6,6,0,1,1,6-6A6,6,0,0,1,12,18Zm0-10a4,4,0,1,0,4,4A4,4,0,0,0,12,8ZM12,4a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0V3A1,1,0,0,0,12,4Zm6.36,2.34a1,1,0,1,0-1.41-1.41l-.71.7a1,1,0,1,0,1.41,1.42ZM20,11H21a1,1,0,0,0,0-2H20a1,1,0,0,0,0,2ZM17.66,18.36l.7.71a1,1,0,0,0,1.41-1.41l-.7-.71a1,1,0,1,0-1.41,1.41ZM12,20a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V21A1,1,0,0,0,12,20ZM4,11H3a1,1,0,0,0,0,2H4a1,1,0,0,0,0-2Zm2.34-4.36A1,1,0,0,0,7.75,5.2l-.7-.7A1,1,0,0,0,5.64,5.9Z" />
      </svg>

      {/* Moon Icon for Dark Mode */}
      <svg
        className={`swap-on fill-current w-7 h-7 ${iconColor}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.06-.25,8,8,0,0,1-10.33-10.3A1,1,0,0,0,9,1.36,10,10,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
      </svg>
    </label>
  );
}

export default ThemeToggle;
