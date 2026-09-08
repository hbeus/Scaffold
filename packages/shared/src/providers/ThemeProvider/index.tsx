import type { ColorScheme, Palette } from '@base/ui/tokens/themes.stylex';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface ThemeContextValue {
  colorScheme: ColorScheme;
  palette: Palette;
  toggleColorScheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setPalette: (palette: Palette) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function writeCookie(palette: Palette, colorScheme: ColorScheme) {
  document.cookie = `theme=${palette}-${colorScheme};path=/;max-age=31536000`;
}

export function ThemeProvider({
  initialColorScheme,
  initialPalette,
  children,
}: {
  initialColorScheme: ColorScheme;
  initialPalette: Palette;
  children: ReactNode;
}) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(initialColorScheme);
  const [palette, setPaletteState] = useState<Palette>(initialPalette);

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
    writeCookie(palette, scheme);
  };

  const setPalette = (p: Palette) => {
    setPaletteState(p);
    writeCookie(p, colorScheme);
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext value={{ colorScheme, palette, toggleColorScheme, setColorScheme, setPalette }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
