import * as stylex from '@stylexjs/stylex';
import { useContext } from 'react';

import { SurfaceContext, type SurfaceLevel } from '../contexts/SurfaceContext';
import { colors } from '../tokens/themes.stylex';

const surfaceBg = stylex.create({
  0: { backgroundColor: colors.surface0 },
  100: { backgroundColor: colors.surface100 },
  200: { backgroundColor: colors.surface200 },
  300: { backgroundColor: colors.surface300 },
  400: { backgroundColor: colors.surface400 },
  500: { backgroundColor: colors.surface500 },
});

export const surfaceHover = stylex.create({
  0: { ':hover': { backgroundColor: colors.surface100 } },
  100: { ':hover': { backgroundColor: colors.surface200 } },
  200: { ':hover': { backgroundColor: colors.surface300 } },
  300: { ':hover': { backgroundColor: colors.surface400 } },
  400: { ':hover': { backgroundColor: colors.surface500 } },
  500: { ':hover': { backgroundColor: colors.surface600 } },
});

export function useSurfaceLevel(): SurfaceLevel {
  return useContext(SurfaceContext);
}

export function useSurface() {
  const level = useSurfaceLevel();
  return surfaceBg[level];
}
