import { Table, createTableHelper, type RowSelectionState } from '@base/ui';
import { useState } from 'react';

type Task = {
  title: string;
  status: string;
  priority: string;
};

const helper = createTableHelper<Task>();

const columns = [
  helper.accessor('title', {
    header: 'Task',
    meta: { fr: 2, minWidth: 160 },
    cell: (info) => <Table.TextCell value={info.getValue()} />,
  }),
  helper.accessor('status', {
    header: 'Status',
    meta: { fr: 1, minWidth: 100 },
    cell: (info) => {
      const v = info.getValue();
      const variant = v === 'Done' ? 'positive' : v === 'Blocked' ? 'negative' : 'neutral';
      return <Table.BadgeCell value={v} variant={variant} />;
    },
  }),
  helper.accessor('priority', {
    header: 'Priority',
    meta: { fr: 0.8, minWidth: 90 },
    cell: (info) => {
      const v = info.getValue();
      const variant = v === 'High' ? 'negative' : v === 'Medium' ? 'highlight' : 'neutral';
      return <Table.BadgeCell value={v} variant={variant} />;
    },
  }),
];

const data: Task[] = [
  { title: 'Set up CI pipeline', status: 'Done', priority: 'High' },
  { title: 'Write unit tests', status: 'In Progress', priority: 'Medium' },
  { title: 'Update API docs', status: 'To Do', priority: 'Low' },
  { title: 'Fix login redirect', status: 'Blocked', priority: 'High' },
  { title: 'Design settings page', status: 'In Progress', priority: 'Medium' },
];

export default function TableSelection() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  return (
    <Table.Root
      data={data}
      columns={columns}
      enableRowSelection
      rowSelection={rowSelection}
      onRowSelectionChange={setRowSelection}
      enableColumnResizing={false}
      aria-label="Tasks"
    />
  );
}
