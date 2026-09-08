import { Avatar, Flex } from '@base/ui';

export default function AvatarFallback() {
  return (
    <Flex direction='row' gap='s8' align='center'>
      <Avatar.Root size='lg'>
        <Avatar.Fallback>HB</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size='lg'>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size='lg'>
        <Avatar.Fallback>AK</Avatar.Fallback>
      </Avatar.Root>
    </Flex>
  );
}
