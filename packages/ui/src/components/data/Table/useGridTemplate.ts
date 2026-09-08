import type { Table as ReactTable } from '@tanstack/react-table';
import { useLayoutEffect, useRef, useState } from 'react';
import type { GridColumnMeta } from './helpers';

const DEFAULT_FR = 1;
const DEFAULT_MIN_WIDTH = 100;
const CHECKBOX_WIDTH = 48;

function getMeta(column: { columnDef: { meta?: GridColumnMeta } }): Required<GridColumnMeta> {
  return {
    fr: column.columnDef.meta?.fr ?? DEFAULT_FR,
    minWidth: column.columnDef.meta?.minWidth ?? DEFAULT_MIN_WIDTH,
  };
}

function buildTemplate<TData>(
  table: ReactTable<TData>,
  isResizing: boolean,
  frOverrides: Record<string, number>,
): string {
  const columns = table.getVisibleLeafColumns();
  const parts: string[] = [];

  for (const col of columns) {
    if (col.id === '__selection') {
      parts.push(`${CHECKBOX_WIDTH}px`);
      continue;
    }

    if (isResizing) {
      parts.push(`${col.getSize()}px`);
    } else {
      const meta = getMeta(col);
      const fr = frOverrides[col.id] ?? meta.fr;
      parts.push(`minmax(${meta.minWidth}px, ${fr}fr)`);
    }
  }

  return parts.join(' ');
}

export function useGridTemplate<TData>(
  table: ReactTable<TData>,
  _hasSelectionColumn: boolean,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [frOverrides, setFrOverrides] = useState<Record<string, number>>({});

  const { isResizingColumn } = table.getState().columnSizingInfo;

  const gridTemplateColumns = buildTemplate(table, !!isResizingColumn, frOverrides);

  const prevResizing = useRef<string | false>(false);
  useLayoutEffect(() => {
    if (prevResizing.current && !isResizingColumn) {
      const columns = table.getVisibleLeafColumns().filter(c => c.id !== '__selection');
      if (columns.length === 0) return;

      const totalSize = columns.reduce((sum, col) => sum + col.getSize(), 0);
      if (totalSize === 0) return;

      const newOverrides: Record<string, number> = {};
      for (const col of columns) {
        const ratio = col.getSize() / totalSize;
        newOverrides[col.id] = Math.round(ratio * columns.length * 100) / 100;
      }
      setFrOverrides(newOverrides);
    }
    prevResizing.current = isResizingColumn;
  }, [isResizingColumn, table]);

  return { gridTemplateColumns, containerRef };
}
