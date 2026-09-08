import { Table, createTableHelper } from '@base/ui';

type Person = {
  name: string;
  email: string;
  role: string;
};

const helper = createTableHelper<Person>();

const columns = [
  helper.accessor('name', {
    header: 'Name',
    meta: { fr: 1.5, minWidth: 120 },
    cell: (info) => <Table.TextCell value={info.getValue()} />,
  }),
  helper.accessor('email', {
    header: 'Email',
    meta: { fr: 2, minWidth: 180 },
    cell: (info) => <Table.TextCell value={info.getValue()} />,
  }),
  helper.accessor('role', {
    header: 'Role',
    meta: { fr: 1, minWidth: 100 },
    cell: (info) => <Table.TextCell value={info.getValue()} />,
  }),
];

const data: Person[] = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Engineer' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
  { name: 'Carol Williams', email: 'carol@example.com', role: 'Manager' },
  { name: 'Dan Brown', email: 'dan@example.com', role: 'Engineer' },
];

export default function TableHero() {
  return (
    <Table.Root
      data={data}
      columns={columns}
      enableSorting={false}
      enableColumnResizing={false}
      aria-label="Team members"
    />
  );
}
