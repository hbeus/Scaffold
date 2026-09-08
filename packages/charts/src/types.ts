export type ChartDatum = Record<string, unknown>;

export type Accessor<T> = keyof T & string;

export type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export const DEFAULT_MARGIN: Margin = {
  top: 16,
  right: 16,
  bottom: 36,
  left: 48,
};

export type CartesianLayout = 'overlay' | 'stack' | 'group';
