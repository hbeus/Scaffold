import { CartesianChart } from '@base/charts';
import { cityTemperature } from '@visx/mock-data';

const data = cityTemperature.slice(0, 12).map(d => ({
  date: d.date,
  'New York': Number(d['New York']),
  'San Francisco': Number(d['San Francisco']),
  Austin: Number(d.Austin),
}));

export default function LineHero() {
  return (
    <CartesianChart.Root data={data} x='date' height={280} label='City temperatures'>
      <CartesianChart.Grid />
      <CartesianChart.Axis position='left' />
      <CartesianChart.Axis position='bottom' />
      <CartesianChart.Line dataKey='New York' />
      <CartesianChart.Line dataKey='San Francisco' />
      <CartesianChart.Line dataKey='Austin' />
      <CartesianChart.Crosshair />
      <CartesianChart.Tooltip />
    </CartesianChart.Root>
  );
}
