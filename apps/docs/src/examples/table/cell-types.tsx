import { Table, createTableHelper } from '@base/ui';
import { IconDots } from '@tabler/icons-react';

type Member = {
  name: string;
  avatar: string;
  email: string;
  revenue: number;
  status: string;
  joinedAt: string;
};

const helper = createTableHelper<Member>();

const columns = [
  helper.accessor('name', {
    header: 'Member',
    meta: { fr: 1.5, minWidth: 160 },
    cell: (info) => (
      <Table.UserCell
        name={info.getValue()}
        avatar={info.row.original.avatar}
        subtitle={info.row.original.email}
      />
    ),
  }),
  helper.accessor('revenue', {
    header: 'Revenue',
    meta: { fr: 1, minWidth: 110 },
    cell: (info) => (
      <Table.NumericCell
        value={info.getValue()}
        format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
      />
    ),
  }),
  helper.accessor('status', {
    header: 'Status',
    meta: { fr: 0.8, minWidth: 90 },
    cell: (info) => {
      const v = info.getValue();
      const variant = v === 'Active' ? 'positive' : v === 'Churned' ? 'negative' : 'neutral';
      return <Table.BadgeCell value={v} variant={variant} />;
    },
  }),
  helper.accessor('joinedAt', {
    header: 'Joined',
    meta: { fr: 1, minWidth: 120 },
    cell: (info) => <Table.DateTimeCell value={info.getValue()} />,
  }),
  helper.display({
    id: 'actions',
    header: '',
    meta: { fr: 0.3, minWidth: 48 },
    enableSorting: false,
    cell: () => (
      <Table.ActionCell>
        <IconDots size={16} />
      </Table.ActionCell>
    ),
  }),
];

const data: Member[] = [
  { name: 'Ava Chen', avatar: '', email: 'ava@acme.com', revenue: 12400, status: 'Active', joinedAt: '2024-01-15' },
  { name: 'Marcus Lee', avatar: '', email: 'marcus@acme.com', revenue: 8750, status: 'Active', joinedAt: '2024-03-22' },
  { name: 'Sofia Ruiz', avatar: '', email: 'sofia@acme.com', revenue: 3200, status: 'Inactive', joinedAt: '2023-11-08' },
  { name: 'James Park', avatar: '', email: 'james@acme.com', revenue: 950, status: 'Churned', joinedAt: '2023-09-01' },
];

export default function TableCellTypes() {
  return (
    <Table.Root
      data={data}
      columns={columns}
      enableColumnResizing={false}
      aria-label="Team members with details"
    />
  );
}
