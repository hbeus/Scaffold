import { Flex, Slider } from '@base/ui';

export default function SliderRange() {
  return (
    <Slider.Root defaultValue={[25, 75]}>
      <Flex direction='row' justify='between'>
        <Slider.Label>Price range</Slider.Label>
        <Slider.Value />
      </Flex>
      <Slider.Control>
        <Slider.Track>
          <Slider.Indicator />
          <Slider.Thumb />
          <Slider.Thumb />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
