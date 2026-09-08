import { DonutChart } from '@base/charts';
import { letterFrequency } from '@visx/mock-data';

const data = [...letterFrequency]
  .sort((a, b) => b.frequency - a.frequency)
  .slice(0, 6)
  .map(d => ({
    letter: d.letter,
    frequency: d.frequency,
  }));

export default function DonutHero() {
  return (
    <DonutChart.Root
      data={data}
      category='letter'
      value='frequency'
      height={280}
      label='Top letter frequencies'
    >
      <DonutChart.Arc />
      <DonutChart.Label />
      <DonutChart.Tooltip />
    </DonutChart.Root>
  );
}
