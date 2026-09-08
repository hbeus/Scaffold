import { Accordion, Text } from '@base/ui';

export default function AccordionHero() {
  return (
    <Accordion.Root>
      <Accordion.Item trigger='What is Base UI?'>
        <Text weight='regular' color='secondary'>
          Base UI is an unstyled component library from the MUI team. It provides accessible,
          headless primitives that you style yourself.
        </Text>
      </Accordion.Item>
      <Accordion.Item trigger='Why StyleX?'>
        <Text weight='regular' color='secondary'>
          StyleX provides atomic CSS with type-safe design tokens, co-located styles, and
          zero-runtime overhead in production.
        </Text>
      </Accordion.Item>
      <Accordion.Item trigger='How are animations handled?'>
        <Text weight='regular' color='secondary'>
          Animations use motion.dev for declarative enter/exit transitions and spring physics.
        </Text>
      </Accordion.Item>
    </Accordion.Root>
  );
}
