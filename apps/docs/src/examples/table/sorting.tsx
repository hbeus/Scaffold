import { Table, createTableHelper } from '@base/ui';

type Product = {
  name: string;
  price: number;
  stock: number;
};

const helper = createTableHelper<Product>();

const columns = [
  helper.accessor('name', {
    header: 'Product',
    meta: { fr: 2, minWidth: 140 },
    cell: (info) => <Table.TextCell value={info.getValue()} />,
  }),
  helper.accessor('price', {
    header: 'Price',
    meta: { fr: 1, minWidth: 100 },
    cell: (info) => (
      <Table.NumericCell
        value={info.getValue()}
        format={{ style: 'currency', currency: 'USD' }}
      />
    ),
  }),
  helper.accessor('stock', {
    header: 'In Stock',
    meta: { fr: 1, minWidth: 100 },
    cell: (info) => <Table.NumericCell value={info.getValue()} />,
  }),
];

const data: Product[] = [
  { name: 'Wireless Headphones', price: 79.99, stock: 142 },
  { name: 'Mechanical Keyboard', price: 149.99, stock: 38 },
  { name: 'USB-C Hub', price: 34.99, stock: 256 },
  { name: 'Monitor Stand', price: 59.99, stock: 87 },
  { name: 'Webcam HD', price: 44.99, stock: 193 },
];

export default function TableSorting() {
  return (
    <Table.Root
      data={data}
      columns={columns}
      initialSorting={[{ id: 'name', desc: false }]}
      enableColumnResizing={false}
      aria-label="Products"
    />
  );
}
