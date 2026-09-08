import { createColumnHelper } from '@tanstack/react-table';

export interface GridColumnMeta {
  fr?: number;
  minWidth?: number;
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends unknown, TValue> extends GridColumnMeta {}
}

export function createTableHelper<TData>() {
  return createColumnHelper<TData>();
}
