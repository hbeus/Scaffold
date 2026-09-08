import type { PropDef } from '~/components/PropsTable';

export const tableRootProps: PropDef[] = [
  {
    name: 'data',
    type: 'TData[]',
    default: '—',
    description: 'Array of row objects to display.',
  },
  {
    name: 'columns',
    type: 'ColumnDef<TData, any>[]',
    default: '—',
    description:
      'TanStack Table column definitions. Use createTableHelper() to build them.',
  },
  {
    name: 'enableSorting',
    type: 'boolean',
    default: 'true',
    description: 'Enable column sorting by clicking headers.',
  },
  {
    name: 'sorting',
    type: 'SortingState',
    default: 'undefined',
    description: 'Controlled sorting state.',
  },
  {
    name: 'onSortingChange',
    type: 'OnChangeFn<SortingState>',
    default: 'undefined',
    description: 'Callback when sorting changes (controlled mode).',
  },
  {
    name: 'initialSorting',
    type: 'SortingState',
    default: 'undefined',
    description: 'Initial sorting state for uncontrolled mode.',
  },
  {
    name: 'pagination',
    type: 'boolean',
    default: 'false',
    description: 'Show pagination controls below the table.',
  },
  {
    name: 'pageSize',
    type: 'number',
    default: '10',
    description: 'Initial number of rows per page.',
  },
  {
    name: 'pageSizeOptions',
    type: 'readonly number[]',
    default: '[10, 20, 50]',
    description: 'Options shown in the rows-per-page dropdown.',
  },
  {
    name: 'enableRowSelection',
    type: 'boolean | (row) => boolean',
    default: 'false',
    description:
      'Enable row selection. Auto-injects a checkbox column. Pass a function to control per-row selectability.',
  },
  {
    name: 'rowSelection',
    type: 'RowSelectionState',
    default: 'undefined',
    description: 'Controlled row selection state.',
  },
  {
    name: 'onRowSelectionChange',
    type: 'OnChangeFn<RowSelectionState>',
    default: 'undefined',
    description: 'Callback when row selection changes.',
  },
  {
    name: 'enableColumnResizing',
    type: 'boolean',
    default: 'true',
    description: 'Allow users to resize columns by dragging header edges.',
  },
  {
    name: 'emptyState',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content shown when data is empty.',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: 'undefined',
    description: 'Accessible name for the table.',
  },
  {
    name: 'getRowId',
    type: '(row, index) => string',
    default: 'undefined',
    description: 'Custom row identity function for selection stability.',
  },
];

export const columnMetaProps: PropDef[] = [
  {
    name: 'fr',
    type: 'number',
    default: '1',
    description:
      'Proportional width of the column in fr units. Set via column meta.',
  },
  {
    name: 'minWidth',
    type: 'number',
    default: '100',
    description:
      'Minimum column width in pixels. Passed as the lower bound in minmax().',
  },
];
