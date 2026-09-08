import * as stylex from '@stylexjs/stylex';
import type { CompiledStyles, InlineStyles, StyleXArray } from '@stylexjs/stylex';

type StylexPropArg = StyleXArray<
  (null | undefined | CompiledStyles) | boolean | Readonly<[CompiledStyles, InlineStyles]>
>;

const CLASS = {
  y: 'scroll-fade',
  x: 'scroll-fade-x',
  t: 'scroll-fade-t',
  b: 'scroll-fade-b',
  l: 'scroll-fade-l',
  r: 'scroll-fade-r',
  s: 'scroll-fade-s',
  e: 'scroll-fade-e',
  none: 'scroll-fade-none',
} as const;

type ScrollFadeVariant = keyof typeof CLASS;

function createScrollFade(variant: ScrollFadeVariant) {
  return (...styles: StylexPropArg[]) => {
    const { className, ...rest } = stylex.props(...styles);
    const merged = [CLASS[variant], className].filter(Boolean).join(' ');
    return {
      ...rest,
      className: merged || undefined,
    };
  };
}

export const scrollFade = {
  y: createScrollFade('y'),
  x: createScrollFade('x'),
  t: createScrollFade('t'),
  b: createScrollFade('b'),
  l: createScrollFade('l'),
  r: createScrollFade('r'),
  s: createScrollFade('s'),
  e: createScrollFade('e'),
  none: createScrollFade('none'),
};
