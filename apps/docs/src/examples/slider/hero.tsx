import { Flex, Slider } from '@base/ui';

export default function SliderHero() {
  return (
    <Slider.Root defaultValue={50}>
      <Flex direction='row' justify='between'>
        <Slider.Label>Volume</Slider.Label>
        <Slider.Value />
      </Flex>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
