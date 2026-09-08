import * as stylex from '@stylexjs/stylex';

export const breakpoints = stylex.defineConsts({
  sm: '@media (max-width: 640px)',
  md: '@media (max-width: 768px)',
  lg: '@media (max-width: 1024px)',
  xl: '@media (max-width: 1280px)',
});
