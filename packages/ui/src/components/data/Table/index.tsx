import {
  type ColumnDef,
  type OnChangeFn,
  type Row,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as stylex from '@stylexjs/stylex';
import {
  IconArrowDown,
  IconArrowUp,
  IconChevronLeft,
  IconChevronRight,
  IconSelector,
} from '@tabler/icons-react';
import type { ReactNode, Ref } from 'react';
import { useMemo } from 'react';
import { borders } from '../../../tokens/borders.stylex';
import { radii } from '../../../tokens/radii.stylex';
import { size } from '../../../tokens/size.stylex';
import { spacing } from '../../../tokens/spacing.stylex';
import { colors } from '../../../tokens/themes.stylex';
import { typography } from '../../../tokens/typography.stylex';
import type { BaseProps } from '../../../types/BaseProps';
import { mergeRefs } from '../../../utils/mergeRefs';
import { styleArray } from '../../../utils/styleArray';
import { Avatar } from '../../display/Avatar';
import { Checkbox } from '../../input/Checkbox';
import type { GridColumnMeta } from './helpers';
import { useGridTemplate } from './useGridTemplate';

/* ---------- Cell atoms ---------- */

/* ---------- TextCell ---------- */

export interface TextCellProps extends BaseProps {
  value: string;
  truncate?: boolean;
}

const textCellStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

function TextCell({ value, truncate = true, style }: TextCellProps) {
  return (
    <span
      data-slot="table-text-cell"
      {...stylex.props(textCellStyles.base, truncate && textCellStyles.truncate, ...styleArray(style))}
    >
      {value}
    </span>
  );
}

/* ---------- NumericCell ---------- */

export interface NumericCellProps extends BaseProps {
  value: number;
  format?: Intl.NumberFormatOptions;
  locale?: string;
}

const numericCellStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'right',
    display: 'block',
  },
});

function NumericCell({ value, format, locale, style }: NumericCellProps) {
  const formatted = new Intl.NumberFormat(locale, format).format(value);

  return (
    <span
      data-slot="table-numeric-cell"
      {...stylex.props(numericCellStyles.base, ...styleArray(style))}
    >
      {formatted}
    </span>
  );
}

/* ---------- BadgeCell ---------- */

type BadgeVariant = 'positive' | 'negative' | 'neutral' | 'highlight';

export interface BadgeCellProps extends BaseProps {
  value: string;
  variant?: BadgeVariant;
}

const badgeCellStyles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.s4,
    paddingInline: spacing.s8,
    paddingBlock: spacing.s2,
    borderRadius: radii.full,
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  positive: {
    backgroundColor: 'oklch(from var(--_color) 0.95 0.03 h)',
    color: colors.statePositive,
  },
  negative: {
    backgroundColor: 'oklch(from var(--_color) 0.95 0.03 h)',
    color: colors.stateNegative,
  },
  neutral: {
    backgroundColor: colors.lighten8,
    color: colors.foregroundSecondary,
  },
  highlight: {
    backgroundColor: 'oklch(from var(--_color) 0.95 0.03 h)',
    color: colors.stateHighlight,
  },
});

const badgeColorVars = stylex.create({
  positive: { '--_color': colors.statePositive } as Record<string, string>,
  negative: { '--_color': colors.stateNegative } as Record<string, string>,
  neutral: {},
  highlight: { '--_color': colors.stateHighlight } as Record<string, string>,
});

function BadgeCell({ value, variant = 'neutral', style }: BadgeCellProps) {
  return (
    <span
      data-slot="table-badge-cell"
      {...stylex.props(
        badgeCellStyles.base,
        badgeColorVars[variant],
        badgeCellStyles[variant],
        ...styleArray(style),
      )}
    >
      {value}
    </span>
  );
}

/* ---------- ActionCell ---------- */

export interface ActionCellProps extends BaseProps {
  children: ReactNode;
}

const actionCellStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
  },
});

function ActionCell({ children, style }: ActionCellProps) {
  return (
    <div
      data-slot="table-action-cell"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      {...stylex.props(actionCellStyles.base, ...styleArray(style))}
    >
      {children}
    </div>
  );
}

/* ---------- UserCell ---------- */

export interface UserCellProps extends BaseProps {
  name: string;
  avatar?: string;
  subtitle?: string;
}

const userCellStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s8,
    minWidth: 0,
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  name: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  subtitle: {
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    color: colors.foregroundSecondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

function UserCell({ name, avatar, subtitle, style }: UserCellProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      data-slot="table-user-cell"
      {...stylex.props(userCellStyles.base, ...styleArray(style))}
    >
      <Avatar.Root size="sm">
        {avatar ? <Avatar.Image src={avatar} alt={name} /> : null}
        <Avatar.Fallback>{initials}</Avatar.Fallback>
      </Avatar.Root>
      <div {...stylex.props(userCellStyles.text)}>
        <span {...stylex.props(userCellStyles.name)}>{name}</span>
        {subtitle ? (
          <span {...stylex.props(userCellStyles.subtitle)}>{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- DateTimeCell ---------- */

export interface DateTimeCellProps extends BaseProps {
  value: Date | string | number;
  format?: Intl.DateTimeFormatOptions;
  relative?: boolean;
  locale?: string;
}

const dateTimeCellStyles = stylex.create({
  base: {
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
    color: colors.foregroundPrimary,
    whiteSpace: 'nowrap',
  },
});

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31_536_000_000],
  ['month', 2_592_000_000],
  ['week', 604_800_000],
  ['day', 86_400_000],
  ['hour', 3_600_000],
  ['minute', 60_000],
  ['second', 1_000],
];

function formatRelative(date: Date, locale?: string): string {
  const diff = date.getTime() - Date.now();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  for (const [unit, ms] of RELATIVE_UNITS) {
    if (Math.abs(diff) >= ms) {
      return rtf.format(Math.round(diff / ms), unit);
    }
  }
  return rtf.format(0, 'second');
}

const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

function DateTimeCell({ value, format, relative = false, locale, style }: DateTimeCellProps) {
  const date = value instanceof Date ? value : new Date(value);
  const formatted = relative
    ? formatRelative(date, locale)
    : new Intl.DateTimeFormat(locale, format ?? DEFAULT_DATE_FORMAT).format(date);

  return (
    <span
      data-slot="table-datetime-cell"
      {...stylex.props(dateTimeCellStyles.base, ...styleArray(style))}
    >
      {formatted}
    </span>
  );
}

/* ---------- Internal components ---------- */

/* ---------- HeaderCell ---------- */

const headerCellStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.s4,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    letterSpacing: typography.captionLetterSpacing,
    fontWeight: 600,
    color: colors.foregroundSecondary,
    textTransform: 'uppercase',
    position: 'relative',
    userSelect: 'none',
  },
  sortable: {
    cursor: 'pointer',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
  },
});

const sortIconStyles = stylex.create({
  base: {
    flexShrink: 0,
    opacity: 0.4,
    transition: 'opacity 0.15s',
  },
  active: {
    opacity: 1,
  },
});

const resizeHandleStyles = stylex.create({
  base: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: size.s4,
    cursor: 'col-resize',
    touchAction: 'none',
    opacity: 0,
    backgroundColor: colors.focusOutline,
    transition: 'opacity 0.15s',
    ':hover': {
      opacity: 1,
    },
  },
  active: {
    opacity: 1,
  },
});

/* ---------- Row styles ---------- */

const rowStyles = stylex.create({
  header: {
    display: 'contents',
  },
  body: {
    display: 'contents',
  },
  row: {
    display: 'contents',
  },
});

const cellStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    paddingInline: spacing.s12,
    paddingBlock: spacing.s10,
    borderBottomWidth: borders.default,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    minWidth: 0,
    transition: 'background-color 0.1s',
  },
  headerBg: {
    backgroundColor: colors.surface100,
    borderBottomWidth: size.s2,
  },
  rowHover: {
    ':hover > &': {
      backgroundColor: colors.hover4,
    },
  },
  selected: {
    backgroundColor: colors.hover8,
  },
  checkbox: {
    justifyContent: 'center',
  },
});

/* ---------- Pagination ---------- */

const paginationStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.s12,
    paddingInline: spacing.s12,
    paddingBlock: spacing.s8,
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    color: colors.foregroundSecondary,
    borderTopWidth: borders.default,
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
  },
  select: {
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: colors.foregroundPrimary,
    fontSize: typography.captionSize,
    lineHeight: typography.captionLineHeight,
    fontFamily: typography.fontSans,
    cursor: 'pointer',
    paddingInline: spacing.s4,
    paddingBlock: spacing.s2,
    borderRadius: radii.r4,
    ':hover': {
      backgroundColor: colors.hover4,
    },
  },
  navButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size.s28,
    height: size.s28,
    borderRadius: radii.r6,
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.foregroundSecondary,
    cursor: 'pointer',
    padding: 0,
    ':hover': {
      backgroundColor: colors.hover4,
    },
    ':disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
    },
  },
});

/* ---------- Empty state ---------- */

const emptyStyles = stylex.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBlock: spacing.s48,
    paddingInline: spacing.s24,
    color: colors.foregroundSecondary,
    fontSize: typography.bodySmSize,
    lineHeight: typography.bodySmLineHeight,
  },
});

const spanAllColumns = stylex.create({
  base: {
    gridColumn: '1 / -1',
  },
});

/* ---------- Container ---------- */

const containerStyles = stylex.create({
  base: {
    display: 'grid',
    width: '100%',
    overflow: 'auto',
    borderWidth: borders.default,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.r8,
  },
});

/* ---------- Table.Root ---------- */

export interface TableRootProps<TData> extends BaseProps {
  data: TData[];
  columns: ColumnDef<TData, any>[];

  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  initialSorting?: SortingState;
  enableSorting?: boolean;
  enableMultiSort?: boolean;

  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: readonly number[];

  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  getRowId?: (row: TData, index: number) => string;

  enableColumnResizing?: boolean;

  emptyState?: ReactNode;

  'aria-label'?: string;
  'aria-labelledby'?: string;

  ref?: Ref<HTMLDivElement>;
}

function Root<TData>({
  data,
  columns: columnsProp,
  sorting: sortingProp,
  onSortingChange,
  initialSorting,
  enableSorting = true,
  enableMultiSort = true,
  pagination = false,
  pageSize: pageSizeProp = 10,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  enableRowSelection = false,
  rowSelection: rowSelectionProp,
  onRowSelectionChange,
  getRowId,
  enableColumnResizing = true,
  emptyState,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  style,
  ref,
}: TableRootProps<TData>) {
  const hasSelection = enableRowSelection !== false;

  const columns = useMemo(() => {
    if (!hasSelection) return columnsProp;

    const selectionColumn: ColumnDef<TData, any> = {
      id: '__selection',
      meta: { fr: 0, minWidth: 48 },
      enableResizing: false,
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox.Root
          size="sm"
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
        >
          <Checkbox.Indicator />
        </Checkbox.Root>
      ),
      cell: ({ row }) => (
        <Checkbox.Root
          size="sm"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={() => row.toggleSelected()}
        >
          <Checkbox.Indicator />
        </Checkbox.Root>
      ),
    };

    return [selectionColumn, ...columnsProp];
  }, [columnsProp, hasSelection]);

  const state: Record<string, unknown> = {};
  if (sortingProp !== undefined) state.sorting = sortingProp;
  if (rowSelectionProp !== undefined) state.rowSelection = rowSelectionProp;

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    enableSorting,
    enableMultiSort,
    enableColumnResizing,
    columnResizeMode: 'onChange' as const,
    getRowId: getRowId as ((row: TData, index: number) => string) | undefined,
    ...(onSortingChange !== undefined && { onSortingChange }),
    ...(onRowSelectionChange !== undefined && { onRowSelectionChange }),
    enableRowSelection: enableRowSelection as boolean | ((row: Row<TData>) => boolean),
    state,
    initialState: {
      ...(initialSorting && { sorting: initialSorting }),
      ...(pagination && { pagination: { pageIndex: 0, pageSize: pageSizeProp } }),
    },
  });

  const { gridTemplateColumns, containerRef } = useGridTemplate(table, hasSelection);

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;
  const isEmpty = data.length === 0;

  const containerSx = stylex.props(containerStyles.base, ...styleArray(style));

  return (
    <div
      data-slot="table"
      ref={mergeRefs(containerRef, ref)}
      className={containerSx.className}
      style={{ ...containerSx.style, gridTemplateColumns }}
      role="table"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {headerGroups.map((headerGroup) => (
        <div key={headerGroup.id} data-slot="table-header" {...stylex.props(rowStyles.header)} role="row">
          {headerGroup.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const sorted = header.column.getIsSorted();
            const isSelectionCol = header.column.id === '__selection';
            const canResize = header.column.getCanResize();

            return (
              <div
                key={header.id}
                data-slot="table-header-cell"
                role="columnheader"
                aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined}
                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                {...stylex.props(
                  isSelectionCol ? headerCellStyles.checkbox : headerCellStyles.base,
                  canSort && headerCellStyles.sortable,
                  cellStyles.headerBg,
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}

                {canSort && !isSelectionCol ? (
                  <span {...stylex.props(sortIconStyles.base, sorted && sortIconStyles.active)}>
                    {sorted === 'asc' ? (
                      <IconArrowUp size={14} />
                    ) : sorted === 'desc' ? (
                      <IconArrowDown size={14} />
                    ) : (
                      <IconSelector size={14} />
                    )}
                  </span>
                ) : null}

                {canResize ? (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    onDoubleClick={() => header.column.resetSize()}
                    onClick={(e) => e.stopPropagation()}
                    {...stylex.props(
                      resizeHandleStyles.base,
                      header.column.getIsResizing() && resizeHandleStyles.active,
                    )}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      ))}

      {isEmpty && emptyState ? (
        <div
          data-slot="table-empty"
          {...stylex.props(spanAllColumns.base, emptyStyles.base)}
        >
          {emptyState}
        </div>
      ) : (
        rows.map((row) => {
          const isSelected = row.getIsSelected();
          return (
            <div key={row.id} data-slot="table-row" data-selected={isSelected || undefined} {...stylex.props(rowStyles.row)} role="row">
              {row.getVisibleCells().map((cell) => {
                const isSelectionCol = cell.column.id === '__selection';
                return (
                  <div
                    key={cell.id}
                    data-slot="table-cell"
                    role="cell"
                    {...stylex.props(
                      cellStyles.base,
                      isSelectionCol && cellStyles.checkbox,
                      !isSelectionCol && cellStyles.rowHover,
                      isSelected && cellStyles.selected,
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                );
              })}
            </div>
          );
        })
      )}

      {pagination && !isEmpty ? (
        <div
          data-slot="table-pagination"
          {...stylex.props(spanAllColumns.base, paginationStyles.base)}
        >
          <span>Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            {...stylex.props(paginationStyles.select)}
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <span>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            &ndash;
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getRowCount(),
            )}
            {' of '}
            {table.getRowCount()}
          </span>

          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
            {...stylex.props(paginationStyles.navButton)}
          >
            <IconChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
            {...stylex.props(paginationStyles.navButton)}
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Export ---------- */

export type { RowSelectionState, SortingState } from '@tanstack/react-table';

export const Table = {
  Root,
  TextCell,
  NumericCell,
  BadgeCell,
  ActionCell,
  UserCell,
  DateTimeCell,
};
