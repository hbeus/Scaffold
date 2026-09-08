import { Flex, Meter } from '@base/ui';

export default function MeterHero() {
  return (
    <Flex direction='column' gap='s8'>
      <Meter.Root value={72}>
        <Flex direction='row' justify='between'>
          <Meter.Label>Storage used</Meter.Label>
          <Meter.Value />
        </Flex>
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>
      <Meter.Root value={30}>
        <Flex direction='row' justify='between'>
          <Meter.Label>CPU usage</Meter.Label>
          <Meter.Value />
        </Flex>
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>
    </Flex>
  );
}
