import * as stylex from '@stylexjs/stylex';
import { colors } from '@base/ui/tokens/themes.stylex';
import { radii } from '@base/ui/tokens/radii.stylex';
import { size } from '@base/ui/tokens/size.stylex';
import { typography } from '@base/ui/tokens/typography.stylex';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { dataColorAt } from '../dataColors';
import { chartMotion } from '../motion';
import { useDonut } from './context';

export type DonutTooltipContext = {
  index: number;
  category: string;
  value: number;
  color: string;
};

export type DonutTooltipProps = {
  children?: (ctx: DonutTooltipContext) => ReactNode;
};

const styles = stylex.create({
  panel: {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 2,
    minWidth: 100,
    padding: size.s8,
    borderRadius: radii.r8,
    backgroundColor: colors.chartTooltipBg,
    color: colors.chartTooltipFg,
    boxShadow: colors.shadowElevated,
    fontSize: typography.labelSize,
    lineHeight: typography.labelLineHeight,
    left: '50%',
    top: size.s8,
    transform: 'translateX(-50%)',
  },
});

export function Tooltip({ children }: DonutTooltipProps) {
  const { activeIndex, data, categoryKey, valueKey, hostRef } = useDonut();
  const reduce = useReducedMotion();

  const row = activeIndex != null ? data[activeIndex] : undefined;
  const ctx: DonutTooltipContext | null =
    activeIndex != null && row
      ? {
          index: activeIndex,
          category: String(row[categoryKey] ?? ''),
          value: Number(row[valueKey]) || 0,
          color: dataColorAt(activeIndex),
        }
      : null;

  const host = hostRef.current;
  if (!host) return null;

  return createPortal(
    <AnimatePresence>
      {ctx ? (
        <motion.div
          {...stylex.props(styles.panel)}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={chartMotion.tooltip}
        >
          {children ? (
            children(ctx)
          ) : (
            <>
              <div>{ctx.category}</div>
              <div style={{ fontVariantNumeric: 'tabular-nums' }}>{ctx.value}</div>
            </>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    host,
  );
}
