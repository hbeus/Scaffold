import { hexToRgb } from './hex';

function parseCssColor(color: string): [number, number, number] {
  if (typeof document === 'undefined') return [0, 0, 0];
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [0, 0, 0];
  ctx.fillStyle = '#000000';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const data = ctx.getImageData(0, 0, 1, 1).data;
  return [data[0]! / 255, data[1]! / 255, data[2]! / 255];
}

export function resolveColor(
  input: string,
  element?: Element | null,
): [number, number, number] {
  if (typeof document === 'undefined') return [0, 0, 0];

  let color = input.trim();
  if (!color) return [0, 0, 0];

  if (color.startsWith('#')) {
    return hexToRgb(color);
  }

  const el = element ?? document.documentElement;
  const varMatch = color.match(/^var\(\s*(--[\w-]+)/) ?? color.match(/^(--[\w-]+)$/);
  if (varMatch?.[1]) {
    const resolved = getComputedStyle(el).getPropertyValue(varMatch[1]).trim();
    if (!resolved) return [0, 0, 0];
    color = resolved;
    if (color.startsWith('#')) {
      return hexToRgb(color);
    }
  }

  return parseCssColor(color);
}
