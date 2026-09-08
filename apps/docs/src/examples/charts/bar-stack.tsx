import { CartesianChart } from '@base/charts';
import { cityTemperature } from '@visx/mock-data';

const data = cityTemperature.slice(0, 8).map(d => ({
  date: d.date,
  'New York': Number(d['New York']),
  'San Francisco': Number(d['San Francisco']),
  Austin: Number(d.Austin),
}));

export default function BarStackExample() {
  return (
    <CartesianChart.Root
      data={data}
      x='date'
      height={280}
      layout='stack'
      label='City temperatures stacked'
    >
      <CartesianChart.Grid />
      <CartesianChart.Axis position='left' />
      <CartesianChart.Axis position='bottom' />
      <CartesianChart.Bar dataKey='New York' />
      <CartesianChart.Bar dataKey='San Francisco' />
      <CartesianChart.Bar dataKey='Austin' />
      <CartesianChart.Tooltip />
    </CartesianChart.Root>
  );
}
