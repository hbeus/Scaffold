function oklchToLinearSrgb(L: number, C: number, H: number) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

function inSrgb({ r, g, b }: { r: number; g: number; b: number }) {
  const e = 1e-6;
  return r >= -e && r <= 1 + e && g >= -e && g <= 1 + e && b >= -e && b <= 1 + e;
}

export function maxChroma(L: number, H: number): number {
  if (L <= 0 || L >= 1) return 0;
  let lo = 0;
  let hi = 0.5;
  for (let i = 0; i < 25; i++) {
    const mid = (lo + hi) / 2;
    if (inSrgb(oklchToLinearSrgb(L, mid, H))) lo = mid;
    else hi = mid;
  }
  return lo;
}

export function harmonizeHue(hue: number, target: number, factor: number): number {
  let d = target - hue;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return (((hue + d * factor) % 360) + 360) % 360;
}
