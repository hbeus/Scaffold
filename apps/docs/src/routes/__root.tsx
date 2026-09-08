/// <reference types="vite/client" />

import { MotionProvider, QueryProvider, ThemeProvider, useTheme } from '@base/shared';
import { getThemeFromCookie } from '@base/shared/server';
import appCss from '@base/shared/styles/global.css?url';
import { SurfaceLevel, Toast, TreeView, useSurface } from '@base/ui';
import { breakpoints } from '@base/ui/tokens/breakpoints.stylex';
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
import { IconContrast } from '@tabler/icons-react';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import { ToastHost } from '~/components/ToastHost';
import shikiCss from '~/styles/shiki.css?url';

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { colorScheme, palette } = await getThemeFromCookie();
    return { colorScheme, palette };
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Base UI' },
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
      { rel: 'stylesheet', href: shikiCss },
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
          <Toast.Provider>
            <RootDocument>
              <DocsLayout />
            </RootDocument>
          </Toast.Provider>
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

const layoutStyles = stylex.create({
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    height: '100vh',
    width: '240px',
    flexShrink: 0,
    overflowY: 'auto',
    paddingBlock: spacing.s8,
    paddingInline: spacing.s20,
    display: {
      default: 'flex',
      [breakpoints.md]: 'none',
    },
    flexDirection: 'column',
    gap: spacing.s8,
  },
  sidebarHeader: {
    paddingBlock: spacing.s8,
    paddingInline: spacing.s8,
    marginBottom: spacing.s8,
  },
  main: {
    flex: 1,
    minWidth: 0,
    maxWidth: '720px',
    marginInline: 'auto',
    paddingInline: spacing.s24,
    paddingBlock: spacing.s64,
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

function DocsSidebar() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      router.navigate({ to: href });
    }
  };

  return (
    <TreeView.Root activeHref={pathname}>
      <TreeView.Group label='Components'>
        <TreeView.Group label='Input'>
          <TreeView.Item href='/components/input/button' onClick={handleClick}>
            Button
          </TreeView.Item>
          <TreeView.Item href='/components/input/button-states' onClick={handleClick}>
            Button States
          </TreeView.Item>
          <TreeView.Item href='/components/input/checkbox' onClick={handleClick}>
            Checkbox
          </TreeView.Item>
          <TreeView.Item href='/components/input/input' onClick={handleClick}>
            Input
          </TreeView.Item>
          <TreeView.Item href='/components/input/number-field' onClick={handleClick}>
            Number Field
          </TreeView.Item>
          <TreeView.Item href='/components/input/otp-field' onClick={handleClick}>
            OTP Field
          </TreeView.Item>
          <TreeView.Item href='/components/input/pressable' onClick={handleClick}>
            Pressable
          </TreeView.Item>
          <TreeView.Item href='/components/input/radio' onClick={handleClick}>
            Radio
          </TreeView.Item>
          <TreeView.Item href='/components/input/select' onClick={handleClick}>
            Select
          </TreeView.Item>
          <TreeView.Item href='/components/input/slider' onClick={handleClick}>
            Slider
          </TreeView.Item>
          <TreeView.Item href='/components/input/switch' onClick={handleClick}>
            Switch
          </TreeView.Item>
          <TreeView.Item href='/components/input/toggle' onClick={handleClick}>
            Toggle
          </TreeView.Item>
          <TreeView.Item href='/components/input/toggle-group' onClick={handleClick}>
            Toggle Group
          </TreeView.Item>
        </TreeView.Group>
        <TreeView.Group label='Layout'>
          <TreeView.Item href='/components/layout/accordion' onClick={handleClick}>
            Accordion
          </TreeView.Item>
          <TreeView.Item href='/components/layout/card' onClick={handleClick}>
            Card
          </TreeView.Item>
          <TreeView.Item href='/components/layout/collapsible' onClick={handleClick}>
            Collapsible
          </TreeView.Item>
          <TreeView.Item href='/components/layout/flex' onClick={handleClick}>
            Flex
          </TreeView.Item>
          <TreeView.Item href='/components/layout/grid' onClick={handleClick}>
            Grid
          </TreeView.Item>
          <TreeView.Item href='/components/layout/scroll-area' onClick={handleClick}>
            Scroll Area
          </TreeView.Item>
        </TreeView.Group>
        <TreeView.Group label='Data'>
          <TreeView.Item href='/components/data/table' onClick={handleClick}>
            Table
          </TreeView.Item>
        </TreeView.Group>
        <TreeView.Group label='Display'>
          <TreeView.Item href='/components/display/avatar' onClick={handleClick}>
            Avatar
          </TreeView.Item>
          <TreeView.Item href='/components/display/icon' onClick={handleClick}>
            Icon
          </TreeView.Item>
          <TreeView.Item href='/components/display/meter' onClick={handleClick}>
            Meter
          </TreeView.Item>
          <TreeView.Item href='/components/display/progress' onClick={handleClick}>
            Progress
          </TreeView.Item>
          <TreeView.Item href='/components/display/separator' onClick={handleClick}>
            Separator
          </TreeView.Item>
        </TreeView.Group>
        <TreeView.Group label='Navigation'>
          <TreeView.Item href='/components/navigation/menu' onClick={handleClick}>
            Menu
          </TreeView.Item>
          <TreeView.Item href='/components/navigation/sidebar' onClick={handleClick}>
            Sidebar
          </TreeView.Item>
          <TreeView.Item href='/components/navigation/tabs' onClick={handleClick}>
            Tabs
          </TreeView.Item>
          <TreeView.Item href='/components/navigation/toolbar' onClick={handleClick}>
            Toolbar
          </TreeView.Item>
          <TreeView.Item href='/components/navigation/tree-view' onClick={handleClick}>
            Tree View
          </TreeView.Item>
        </TreeView.Group>
        <TreeView.Group label='Overlays'>
          <TreeView.Item href='/components/overlays/alert-dialog' onClick={handleClick}>
            Alert Dialog
          </TreeView.Item>
          <TreeView.Item href='/components/overlays/dialog' onClick={handleClick}>
            Dialog
          </TreeView.Item>
          <TreeView.Item href='/components/overlays/drawer' onClick={handleClick}>
            Drawer
          </TreeView.Item>
          <TreeView.Item href='/components/overlays/dropdown' onClick={handleClick}>
            Dropdown
          </TreeView.Item>
          <TreeView.Item href='/components/overlays/popover' onClick={handleClick}>
            Popover
          </TreeView.Item>
          <TreeView.Item href='/components/overlays/tooltip' onClick={handleClick}>
            Tooltip
          </TreeView.Item>
          <TreeView.Item href='/components/overlays/toast' onClick={handleClick}>
            Toast
          </TreeView.Item>
        </TreeView.Group>
      </TreeView.Group>
      <TreeView.Group label='Charts'>
        <TreeView.Item href='/charts' onClick={handleClick}>
          Overview
        </TreeView.Item>
        <TreeView.Item href='/charts/bar' onClick={handleClick}>
          Bar
        </TreeView.Item>
        <TreeView.Item href='/charts/line' onClick={handleClick}>
          Line
        </TreeView.Item>
        <TreeView.Item href='/charts/area' onClick={handleClick}>
          Area
        </TreeView.Item>
        <TreeView.Item href='/charts/donut' onClick={handleClick}>
          Donut
        </TreeView.Item>
      </TreeView.Group>
      <TreeView.Group label='Shaders'>
        <TreeView.Item href='/shaders' onClick={handleClick}>
          Overview
        </TreeView.Item>
        <TreeView.Item href='/shaders/aurora' onClick={handleClick}>
          Aurora
        </TreeView.Item>
        <TreeView.Item href='/shaders/warp' onClick={handleClick}>
          Warp
        </TreeView.Item>
        <TreeView.Item href='/shaders/grain' onClick={handleClick}>
          Grain
        </TreeView.Item>
        <TreeView.Item href='/shaders/hex' onClick={handleClick}>
          Hex
        </TreeView.Item>
        <TreeView.Item href='/shaders/ripple' onClick={handleClick}>
          Ripple
        </TreeView.Item>
        <TreeView.Item href='/shaders/mesh' onClick={handleClick}>
          Mesh
        </TreeView.Item>
        <TreeView.Item href='/shaders/palette' onClick={handleClick}>
          Palette
        </TreeView.Item>
        <TreeView.Item href='/shaders/blobs' onClick={handleClick}>
          Blobs
        </TreeView.Item>
      </TreeView.Group>
      <TreeView.Group label='Tokens'>
        <TreeView.Item href='/tokens/overview' onClick={handleClick}>
          Overview
        </TreeView.Item>
        <TreeView.Item href='/tokens/themes' onClick={handleClick}>
          Themes
        </TreeView.Item>
        <TreeView.Item href='/tokens/data-colors' onClick={handleClick}>
          Data Colors
        </TreeView.Item>
        <TreeView.Item href='/tokens/typography' onClick={handleClick}>
          Typography
        </TreeView.Item>
      </TreeView.Group>
      <TreeView.Group label='Utilities'>
        <TreeView.Item href='/utilities/surface' onClick={handleClick}>
          Surface
        </TreeView.Item>
        <TreeView.Item href='/utilities/scroll-fade' onClick={handleClick}>
          Scroll Fade
        </TreeView.Item>
      </TreeView.Group>
      <TreeView.Group label='Guides'>
        <TreeView.Item href='/guides/theming' onClick={handleClick}>
          Theming
        </TreeView.Item>
      </TreeView.Group>
    </TreeView.Root>
  );
}

function DocsLayout() {
  return (
    <div {...stylex.props(layoutStyles.wrapper)}>
      <aside {...stylex.props(layoutStyles.sidebar)}>
        <DocsSidebar />
      </aside>
      <main {...stylex.props(layoutStyles.main)}>
        <Outlet />
      </main>
    </div>
  );
}

function RootBody({ children }: { children: React.ReactNode }) {
  const surface = useSurface();

  return (
    <body {...stylex.props(bodyStyles.base, surface)}>
      <PalettePicker />
      <ThemeToggle />
      {children}
      <ToastHost />
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
