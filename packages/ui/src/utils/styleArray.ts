import type { StyleXStyles } from '@stylexjs/stylex';

export function styleArray(style?: StyleXStyles | StyleXStyles[]): StyleXStyles[] {
  return Array.isArray(style) ? style : style ? [style] : [];
}
