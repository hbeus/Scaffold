import { Table, Text, createTableHelper } from '@base/ui';

type Item = {
  name: string;
  category: string;
};

const helper = createTableHelper<Item>();

const columns = [
  helper.accessor('name', {
    header: 'Name',
    meta: { fr: 2, minWidth: 140 },
    cell: (info) => <Table.TextCell value={info.getValue()} />,
  }),
  helper.accessor('category', {
    header: 'Category',
    meta: { fr: 1, minWidth: 100 },
    cell: (info) => <Table.TextCell value={info.getValue()} />,
  }),
];

export default function TableEmptyState() {
  return (
    <Table.Root
      data={[]}
      columns={columns}
      enableSorting={false}
      enableColumnResizing={false}
      emptyState={<Text color="secondary">No items found.</Text>}
      aria-label="Items"
    />
  );
}
