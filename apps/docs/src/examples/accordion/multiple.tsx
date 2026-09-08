import { Accordion, Text } from '@base/ui';

export default function AccordionMultiple() {
  return (
    <Accordion.Root multiple>
      <Accordion.Item trigger='Section one'>
        <Text weight='regular' color='secondary'>
          Multiple items can be open at the same time when the multiple prop is set.
        </Text>
      </Accordion.Item>
      <Accordion.Item trigger='Section two'>
        <Text weight='regular' color='secondary'>
          Try opening this while the first section is still expanded.
        </Text>
      </Accordion.Item>
    </Accordion.Root>
  );
}
