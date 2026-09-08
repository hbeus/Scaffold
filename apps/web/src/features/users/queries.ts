import { queryOptions } from '@tanstack/react-query';

import { getUserById, getUsers } from '~/server/users';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const usersListOptions = () =>
  queryOptions({
    queryKey: userKeys.lists(),
    queryFn: () => getUsers(),
  });

export const userDetailOptions = (id: string) =>
  queryOptions({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserById({ data: id }),
  });
