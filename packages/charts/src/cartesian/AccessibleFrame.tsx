import * as stylex from '@stylexjs/stylex';
import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { a11yStyles } from '../a11y.stylex';
import { useCartesian } from './context';

type Props = {
  label?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  keyboard: boolean;
  children: ReactNode;
};

export function AccessibleFrame({
  label,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  keyboard,
  children,
}: Props) {
  const { data, xValues, series, layout, activeIndex, setActiveIndex } = useCartesian();
  const [liveText, setLiveText] = useState('');

  const announce = (index: number | null) => {
    if (index == null) {
      setLiveText('');
      return;
    }
    const category = xValues[index] ?? '';
    const row = data[index];
    if (!row) {
      setLiveText(category);
      return;
    }
    const parts = series.map(s => {
      const value = Number(row[s.dataKey]) || 0;
      return `${s.label ?? s.dataKey} ${value}`;
    });
    const stackedKeys = series.filter(s => s.kind === 'bar' || s.kind === 'area');
    if (layout === 'stack' && stackedKeys.length > 1) {
      const total = stackedKeys.reduce((sum, s) => sum + (Number(row[s.dataKey]) || 0), 0);
      parts.push(`total ${total}`);
    }
    setLiveText(parts.length > 0 ? `${category}: ${parts.join(', ')}` : category);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!keyboard || data.length === 0) return;
    const { key } = event;
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      event.preventDefault();
      const next =
        activeIndex == null ? 0 : Math.min(data.length - 1, activeIndex + 1);
      setActiveIndex(next);
      announce(next);
      return;
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      event.preventDefault();
      const next =
        activeIndex == null ? data.length - 1 : Math.max(0, activeIndex - 1);
      setActiveIndex(next);
      announce(next);
      return;
    }
    if (key === 'Home') {
      event.preventDefault();
      setActiveIndex(0);
      announce(0);
      return;
    }
    if (key === 'End') {
      event.preventDefault();
      const last = data.length - 1;
      setActiveIndex(last);
      announce(last);
      return;
    }
    if (key === 'Escape') {
      event.preventDefault();
      setActiveIndex(null);
      announce(null);
    }
  };

  return (
    <div
      {...stylex.props(a11yStyles.frame)}
      role='img'
      aria-label={ariaLabelledby ? undefined : label}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      tabIndex={keyboard ? 0 : undefined}
      onKeyDown={onKeyDown}
    >
      {children}
      <div {...stylex.props(a11yStyles.srOnly)} aria-live='polite' aria-atomic='true'>
        {liveText}
      </div>
    </div>
  );
}
