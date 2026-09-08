import { CartesianChart } from '@base/charts';
import { appleStock } from '@visx/mock-data';

const data = appleStock.slice(-60).map(d => ({
  date: String(d.date),
  close: d.close,
}));

export default function AreaHero() {
  return (
    <CartesianChart.Root data={data} x='date' height={280} label='Apple stock close'>
      <CartesianChart.Grid />
      <CartesianChart.Axis position='left' />
      <CartesianChart.Axis position='bottom' />
      <CartesianChart.Area dataKey='close' label='Close' />
      <CartesianChart.Crosshair />
      <CartesianChart.Tooltip />
    </CartesianChart.Root>
  );
}
