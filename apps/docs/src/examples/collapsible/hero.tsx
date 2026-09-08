import { Button, Collapsible, Flex, Text } from '@base/ui';

export default function CollapsibleHero() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger render={<Button variant='ghost' size='sm' />}>
        Toggle content
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <Flex direction='column' gap='s8'>
          <Text size='bodySm' color='secondary'>
            This content can be collapsed and expanded. The panel animates its height using
            Base UI&apos;s built-in height transition.
          </Text>
          <Text size='bodySm' color='secondary'>
            Additional content that is hidden when collapsed.
          </Text>
        </Flex>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
