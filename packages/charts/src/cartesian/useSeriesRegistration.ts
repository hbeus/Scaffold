import { useEffect, useId } from 'react';
import { dataColorAt } from '../dataColors';
import { useCartesian, type SeriesRegistration } from './context';

export function useSeriesRegistration(
  kind: SeriesRegistration['kind'],
  dataKey: string,
  label: string | undefined,
  color: string | undefined,
) {
  const id = useId();
  const { registerSeries, unregisterSeries, series } = useCartesian();
  const index = Math.max(
    0,
    series.findIndex(s => s.id === id) === -1
      ? series.length
      : series.findIndex(s => s.id === id),
  );
  const resolvedColor = color ?? dataColorAt(index);

  useEffect(() => {
    registerSeries({ id, dataKey, label: label ?? dataKey, color: resolvedColor, kind });
    return () => unregisterSeries(id);
  }, [id, dataKey, label, resolvedColor, kind, registerSeries, unregisterSeries]);

  const order = series.findIndex(s => s.id === id);
  return { id, color: resolvedColor, order: order === -1 ? index : order };
}
