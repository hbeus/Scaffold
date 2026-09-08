import { Flex, Radio, Text } from '@base/ui';

export default function RadioHero() {
  return (
    <Radio.Group defaultValue='comfortable'>
      <Flex direction='column' gap='s8'>
        <Flex direction='row' align='center' gap='s8'>
          <Radio.Item value='compact'>
            <Radio.Indicator />
          </Radio.Item>
          <Text size='bodySm'>Compact</Text>
        </Flex>
        <Flex direction='row' align='center' gap='s8'>
          <Radio.Item value='comfortable'>
            <Radio.Indicator />
          </Radio.Item>
          <Text size='bodySm'>Comfortable</Text>
        </Flex>
        <Flex direction='row' align='center' gap='s8'>
          <Radio.Item value='spacious'>
            <Radio.Indicator />
          </Radio.Item>
          <Text size='bodySm'>Spacious</Text>
        </Flex>
      </Flex>
    </Radio.Group>
  );
}
