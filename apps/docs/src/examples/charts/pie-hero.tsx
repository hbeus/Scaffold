import { DonutChart } from '@base/charts';
import { letterFrequency } from '@visx/mock-data';

const data = [...letterFrequency]
  .sort((a, b) => b.frequency - a.frequency)
  .slice(0, 6)
  .map(d => ({
    letter: d.letter,
    frequency: d.frequency,
  }));

export default function PieHero() {
  return (
    <DonutChart.Root
      data={data}
      category='letter'
      value='frequency'
      height={280}
      innerRadiusRatio={0}
      label='Top letter frequencies as pie'
    >
      <DonutChart.Arc />
      <DonutChart.Tooltip />
    </DonutChart.Root>
  );
}
