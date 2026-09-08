import { radii } from '@base/ui/tokens/radii.stylex';
import { spacing } from '@base/ui/tokens/spacing.stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';

interface InlineCodeProps {
  children: ReactNode;
}

const styles = stylex.create({
  code: {
    fontFamily: typography.fontMono,
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    letterSpacing: typography.captionLetterSpacing,
    backgroundColor: colors.lighten8,
    padding: `${spacing.s2} ${spacing.s6}`,
    borderRadius: radii.r4,
  },
});

export function InlineCode({ children }: InlineCodeProps) {
  return <code {...stylex.props(styles.code)}>{children}</code>;
}
