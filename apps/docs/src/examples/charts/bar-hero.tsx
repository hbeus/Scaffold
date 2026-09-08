import { CartesianChart } from '@base/charts';
import { letterFrequency } from '@visx/mock-data';

const data = letterFrequency.slice(0, 12).map(d => ({
  letter: d.letter,
  frequency: d.frequency,
}));

export default function BarHero() {
  return (
    <CartesianChart.Root data={data} x='letter' height={280} label='Letter frequency'>
      <CartesianChart.Grid />
      <CartesianChart.Axis position='left' />
      <CartesianChart.Axis position='bottom' />
      <CartesianChart.Bar dataKey='frequency' label='Frequency' />
      <CartesianChart.Crosshair />
      <CartesianChart.Tooltip />
    </CartesianChart.Root>
  );
}
