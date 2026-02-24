"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Важливо: useEffect гарантує, що ми показуємо інтерфейс 
  // лише після того, як клієнт змонтувався (захист від помилок гідрації)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.placeholder}></div>; // Пустий блок на час завантаження
  }

  const isDark = theme === "dark";

  return (
    <button
      className={styles.toggle}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Переключити тему"
    >
      <svg className={styles.icon}>
        {/* Використовуємо іконку зі спрайту залежно від теми */}
        <use xlinkHref={`/sprites/sprite.svg#${isDark ? 'sun' : 'moon'}`} />
      </svg>
      <span className={styles.text}>
        {isDark ? "Світла тема" : "Темна тема"}
      </span>
    </button>
  );
}