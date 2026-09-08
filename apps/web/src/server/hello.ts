import { createServerFn } from '@tanstack/react-start';

export const getHello = createServerFn({ method: 'GET' }).handler(async () => {
  return { message: 'Hello from the server!' };
});
