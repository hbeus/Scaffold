import { createServerFn } from '@tanstack/react-start';

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export const getUsers = createServerFn({ method: 'GET' }).handler(async (): Promise<User[]> => {
  return [
    { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', createdAt: '2026-01-15' },
    { id: '2', name: 'Grace Hopper', email: 'grace@example.com', createdAt: '2026-03-22' },
    { id: '3', name: 'Margaret Hamilton', email: 'margaret@example.com', createdAt: '2026-05-10' },
  ];
});

export const getUserById = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(async ({ data: id }): Promise<User | null> => {
    const users = await getUsers();
    return users.find(u => u.id === id) ?? null;
  });
