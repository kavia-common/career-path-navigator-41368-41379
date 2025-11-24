import { useEffect, useState } from 'react';

const THEME_KEY = 'cn_theme';

// PUBLIC_INTERFACE
export function useTheme() {
  /** Persist and toggle theme via data-theme attribute on <html> */
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return { theme, toggle, setTheme };
}
