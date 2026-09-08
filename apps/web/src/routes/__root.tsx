/// <reference types="vite/client" />

import { MotionProvider, QueryProvider, ThemeProvider, useTheme } from '@base/shared';
import { getThemeFromCookie } from '@base/shared/server';
import appCss from '@base/shared/styles/global.css?url';
import { SurfaceLevel, useSurface } from '@base/ui';
import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import {
  colors,
  PALETTES,
  type Palette,
  themeBackgrounds,
  themeMap,
} from '@base/ui/tokens/themes.stylex';
import * as stylex from '@stylexjs/stylex';
import { IconArrowLeft, IconContrast } from '@tabler/icons-react';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { colorScheme, palette } = await getThemeFromCookie();
    return { colorScheme, palette };
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'base' },
    ],
    links: [
      {
        rel: 'preload',
        href: '/fonts/inter-latin-wght-normal.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { colorScheme, palette } = Route.useRouteContext();

  return (
    <QueryProvider>
      <ThemeProvider initialColorScheme={colorScheme} initialPalette={palette}>
        <MotionProvider>
          <RootDocument>
            <Outlet />
          </RootDocument>
        </MotionProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

function StyleXCSS() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      // @ts-expect-error
      import('virtual:stylex:css-only');
    }
  }, []);

  return import.meta.env.DEV ? (
    <link rel='stylesheet' href='/virtual:stylex.css' />
  ) : (
    <link rel='stylesheet' href='/stylex.css' />
  );
}

const bodyStyles = stylex.create({
  base: {
    color: colors.foregroundPrimary,
    minHeight: '100vh',
  },
});

const fixedButtonStyles = stylex.create({
  base: {
    position: 'fixed',
    zIndex: 9999,
    width: spacing.s32,
    height: spacing.s32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.r8,
    backgroundColor: colors.lighten8,
    color: colors.foregroundPrimary,
    cursor: 'pointer',
    lineHeight: 1,
    borderWidth: 0,
    transition: 'background-color 0.15s',
    ':hover': {
      backgroundColor: colors.lighten16,
    },
  },
  topRight: {
    top: spacing.s16,
    right: spacing.s16,
  },
  topLeft: {
    top: spacing.s16,
    left: spacing.s16,
  },
});

const palettePickerStyles = stylex.create({
  container: {
    position: 'fixed',
    zIndex: 9999,
    top: spacing.s16,
    right: `calc(${spacing.s16} + ${spacing.s32} + ${spacing.s8})`,
    display: 'flex',
    gap: spacing.s4,
    alignItems: 'center',
  },
  swatch: {
    width: spacing.s16,
    height: spacing.s16,
    borderRadius: '50%',
    cursor: 'pointer',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
    transition: 'border-color 0.15s, transform 0.15s',
    ':hover': {
      transform: 'scale(1.2)',
    },
  },
  active: {
    borderColor: colors.foregroundPrimary,
  },
});

const PALETTE_COLORS: Record<Palette, string> = {
  default: 'oklch(0.5 0 0)',
  blueberry: 'oklch(0.5774 0.2092 275)',
  warm: 'oklch(0.72 0.15 65)',
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useTheme();
  return (
    <button
      {...stylex.props(fixedButtonStyles.base, fixedButtonStyles.topRight)}
      onClick={toggleColorScheme}
      aria-label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <IconContrast size={18} />
    </button>
  );
}

function PalettePicker() {
  const { palette: currentPalette, setPalette } = useTheme();
  return (
    <div {...stylex.props(palettePickerStyles.container)}>
      {PALETTES.map(p => (
        <button
          key={p}
          onClick={() => setPalette(p)}
          aria-label={`${p} palette`}
          {...stylex.props(
            palettePickerStyles.swatch,
            p === currentPalette && palettePickerStyles.active,
          )}
          style={{ backgroundColor: PALETTE_COLORS[p] }}
        />
      ))}
    </div>
  );
}

function BackButton() {
  const router = useRouter();
  const pathname = useRouterState({ select: s => s.location.pathname });

  if (pathname === '/') return null;

  return (
    <button
      {...stylex.props(fixedButtonStyles.base, fixedButtonStyles.topLeft)}
      onClick={() => router.history.back()}
      aria-label='Go back'
    >
      <IconArrowLeft size={18} />
    </button>
  );
}

function RootBody({ children }: { children: React.ReactNode }) {
  const surface = useSurface();

  return (
    <body {...stylex.props(bodyStyles.base, surface)}>
      <BackButton />
      <PalettePicker />
      <ThemeToggle />
      {children}
    </body>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { colorScheme, palette } = useTheme();
  const themeKey = `${palette}-${colorScheme}` as const;
  const theme = themeMap[themeKey];
  const themeStyle = theme ? stylex.props(theme) : {};

  return (
    <html
      lang='en'
      data-theme={colorScheme}
      data-palette={palette}
      className={themeStyle.className}
      style={{ ...themeStyle.style, colorScheme }}
    >
      <head>
        <HeadContent />
        <meta name='theme-color' content={themeBackgrounds[themeKey]} />
        <StyleXCSS />
      </head>
      <SurfaceLevel level={0}>
        <RootBody>{children}</RootBody>
      </SurfaceLevel>
      <Scripts />
    </html>
  );
}
