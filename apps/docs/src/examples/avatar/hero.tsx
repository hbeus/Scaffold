import { Avatar, Flex } from '@base/ui';

export default function AvatarHero() {
  return (
    <Flex direction='row' gap='s8' align='center'>
      <Avatar.Root size='sm'>
        <Avatar.Fallback>S</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size='md'>
        <Avatar.Fallback>M</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size='lg'>
        <Avatar.Fallback>L</Avatar.Fallback>
      </Avatar.Root>
    </Flex>
  );
}
