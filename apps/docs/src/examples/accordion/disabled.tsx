import { Accordion, Text } from '@base/ui';

export default function AccordionDisabled() {
  return (
    <Accordion.Root>
      <Accordion.Item trigger='Enabled item'>
        <Text weight='regular' color='secondary'>
          This item can be toggled.
        </Text>
      </Accordion.Item>
      <Accordion.Item trigger='Disabled item' disabled>
        <Text weight='regular' color='secondary'>
          This item cannot be toggled.
        </Text>
      </Accordion.Item>
    </Accordion.Root>
  );
}
