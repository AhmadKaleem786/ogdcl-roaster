import { ConfigProvider } from 'antd';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { THEME_STORAGE_KEY } from '../core/constants/app';
import { useLanguage } from './LanguageContext';
import { getOgdclTheme, type ThemeMode } from '../theme/ogdclTheme';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function loadThemeMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // ignore
  }
  return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const [mode, setMode] = useState<ThemeMode>(() => {
    const loaded = loadThemeMode();
    document.documentElement.dataset.theme = loaded;
    return loaded;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  const setTheme = useCallback((nextMode: ThemeMode) => {
    setMode(nextMode);
  }, []);

  const value = useMemo(
    () => ({ mode, toggleTheme, setTheme }),
    [mode, toggleTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={getOgdclTheme(mode)} direction={language === 'ur' ? 'rtl' : 'ltr'}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
