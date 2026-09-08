import { Table, createTableHelper } from '@base/ui';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
};

const helper = createTableHelper<Transaction>();

const columns = [
  helper.accessor('id', {
    header: 'ID',
    meta: { fr: 0.6, minWidth: 80 },
    cell: (info) => <Table.TextCell value={info.getValue()} />,
  }),
  helper.accessor('date', {
    header: 'Date',
    meta: { fr: 1, minWidth: 120 },
    cell: (info) => <Table.DateTimeCell value={info.getValue()} />,
  }),
  helper.accessor('description', {
    header: 'Description',
    meta: { fr: 2, minWidth: 180 },
    cell: (info) => <Table.TextCell value={info.getValue()} />,
  }),
  helper.accessor('amount', {
    header: 'Amount',
    meta: { fr: 1, minWidth: 100 },
    cell: (info) => (
      <Table.NumericCell
        value={info.getValue()}
        format={{ style: 'currency', currency: 'USD' }}
      />
    ),
  }),
];

const data: Transaction[] = Array.from({ length: 23 }, (_, i) => ({
  id: `TXN-${String(i + 1).padStart(4, '0')}`,
  date: new Date(2025, 5, 1 + i).toISOString(),
  description: [
    'Office supplies',
    'Software license',
    'Cloud hosting',
    'Team lunch',
    'Travel expense',
  ][i % 5]!,
  amount: Math.round((Math.random() * 500 + 20) * 100) / 100,
}));

export default function TablePagination() {
  return (
    <Table.Root
      data={data}
      columns={columns}
      pagination
      pageSize={5}
      pageSizeOptions={[5, 10, 20]}
      enableColumnResizing={false}
      aria-label="Transactions"
    />
  );
}
