import { harmonizeHue, maxChroma } from './oklch';
import {
  ACCENT_CONFIG,
  ACHROMATIC_DATA_HUES,
  BACKGROUND_CONFIG,
  DATA_RAMP_CONFIG,
  DATA_RAMP_COUNT,
  FOREGROUND_CONFIG,
  HIGHLIGHT_CONFIG,
  OPACITY_CONFIG,
  PRIMARY_BUTTON_CONFIG,
  type Schemes,
  STATE_CONFIG,
  type ThemeConfig,
  type ThemeMode,
} from './theme-config';

/* ---------- Helpers ---------- */

function n4(v: number): string {
  return Number(v.toFixed(4)).toString();
}

function lch(L: number, C: number, H: number): string {
  if (C < 0.001) return `${n4(L)} 0 0`;
  return `${n4(L)} ${n4(C)} ${n4(H)}`;
}

function vivid(L: number, H: number, v: number): string {
  return lch(L, maxChroma(L, H) * Math.min(v, 1), H);
}

function tint(L: number, chroma: number, hue: number | null): string {
  return hue !== null && chroma > 0 ? lch(L, chroma, hue) : lch(L, 0, 0);
}

/* ---------- Generator ---------- */

export function generateTheme(config: ThemeConfig): Schemes {
  return {
    dark: generateMode(config, 'dark'),
    light: generateMode(config, 'light'),
  };
}

type StateKey = keyof ThemeMode['state'];

function generateMode(
  { brandHue, neutralTint, stateHarmony }: ThemeConfig,
  mode: 'dark' | 'light',
): ThemeMode {
  const achromatic = brandHue === null;
  const isDark = mode === 'dark';

  const fg = FOREGROUND_CONFIG;
  const bg = BACKGROUND_CONFIG;
  const op = OPACITY_CONFIG;

  const nt = (L: number) => tint(L, neutralTint, brandHue);

  const stateColor = (key: StateKey) => {
    const cfg = STATE_CONFIG[key];
    const { lightness, vividness } = cfg[mode];
    const hue = achromatic ? cfg.hue : harmonizeHue(cfg.hue, brandHue, stateHarmony);
    return vivid(lightness, hue, vividness);
  };

  const fgPrimary = nt(fg.primary[mode].lightness);
  const fgInverse = nt(fg.inverse[mode].lightness);

  const hl = HIGHLIGHT_CONFIG[mode];
  const highlightHue = achromatic ? STATE_CONFIG.highlight.hue : brandHue;
  const highlightBase = vivid(hl.lightness, highlightHue, hl.vividness);

  const ab = ACCENT_CONFIG.bg[mode];
  const ah = ACCENT_CONFIG.hover[mode];
  let accentBg: string;
  let accentFg: string;
  let accentHover: string;

  if (achromatic) {
    accentBg = lch(ACCENT_CONFIG.achromaticBg[mode].lightness, 0, 0);
    accentFg = fgInverse;
    accentHover = lch(ACCENT_CONFIG.achromaticHover[mode].lightness, 0, 0);
  } else {
    accentBg = vivid(ab.lightness, brandHue, ab.vividness);
    accentFg = lch(ACCENT_CONFIG.fg.lightness, 0, 0);
    accentHover = vivid(ah.lightness, brandHue, ah.vividness);
  }

  const pb = PRIMARY_BUTTON_CONFIG;
  let primaryBg: string;
  let primaryFg: string;
  let primaryHover: string;

  if (achromatic) {
    const overlay = isDark ? '1 0 0' : '0 0 0';
    primaryBg = `${overlay} / ${pb.achromaticOpacity.bg}`;
    primaryFg = fgPrimary;
    primaryHover = `${overlay} / ${pb.achromaticOpacity.hover}`;
  } else {
    const btnColor = vivid(pb.color.lightness, brandHue, pb.color.vividness);
    primaryBg = `${btnColor} / ${pb.opacity[mode].bg}`;
    primaryFg = nt(fg.primary[mode].lightness);
    primaryHover = `${btnColor} / ${pb.opacity[mode].hover}`;
  }

  const lightenColor = isDark ? (achromatic ? '1 0 0' : tint(1, neutralTint, brandHue)) : '0 0 0';
  const darkenColor = isDark ? '0 0 0' : '1 0 0';

  const { lightness: dataL, vividness: dataV } = DATA_RAMP_CONFIG[mode];
  const dataEntries = Array.from({ length: DATA_RAMP_COUNT }, (_, i) => {
    const hue = achromatic
      ? ACHROMATIC_DATA_HUES[i]!
      : (((brandHue as number) + i * 45) % 360 + 360) % 360;
    return [`data${i + 1}`, vivid(dataL, hue, dataV)] as const;
  });
  const data = Object.fromEntries(dataEntries) as ThemeMode['data'];

  return {
    foreground: {
      primary: fgPrimary,
      primaryHover: nt(fg.hover[mode].lightness),
      primaryInverse: fgInverse,
      secondary: fgPrimary,
      secondaryHover: fgPrimary,
      secondaryInverse: fgInverse,
      disabled: fgPrimary,
    },
    background: {
      base: nt(bg.base[mode].lightness),
      lighten: lightenColor,
      darken: darkenColor,
      hover: isDark ? lightenColor : '0 0 0',
      surface0: nt(bg.surface0[mode].lightness),
      surface100: nt(bg.surface100[mode].lightness),
      surface200: nt(bg.surface200[mode].lightness),
      surface300: nt(bg.surface300[mode].lightness),
      surface400: nt(bg.surface400[mode].lightness),
      surface500: nt(bg.surface500[mode].lightness),
      surface600: nt(bg.surface600[mode].lightness),
    },
    state: {
      positive: stateColor('positive'),
      semiPositive: stateColor('semiPositive'),
      neutral: stateColor('neutral'),
      semiNegative: stateColor('semiNegative'),
      negative: stateColor('negative'),
      highlight: stateColor('highlight'),
    },
    highlight: {
      base: highlightBase,
      foreground: '1 0 0',
    },
    shadow: {
      drop: '0 0 0',
      inner: `1 0 0 / ${op.shadowInner[mode]}`,
    },
    border: `${fgPrimary} / ${op.border}`,
    button: {
      accentBg,
      accentFg,
      accentHover,
      primaryBg,
      primaryFg,
      primaryHover,
    },
    data,
    chart: {
      axis: `${fgPrimary} / ${op.chartAxis}`,
      grid: `${fgPrimary} / ${op.chartGrid}`,
      crosshair: `${fgPrimary} / ${op.chartCrosshair}`,
      tooltipBg: nt(bg.surface300[mode].lightness),
      tooltipFg: fgPrimary,
    },
  };
}

/* ---------- StyleX mapping ---------- */

export function modeToVars(mode: ThemeMode) {
  const op = OPACITY_CONFIG;
  const se = op.shadowElevated;

  return {
    background: `oklch(${mode.background.base})`,
    surface0: `oklch(${mode.background.surface0})`,
    surface100: `oklch(${mode.background.surface100})`,
    surface200: `oklch(${mode.background.surface200})`,
    surface300: `oklch(${mode.background.surface300})`,
    surface400: `oklch(${mode.background.surface400})`,
    surface500: `oklch(${mode.background.surface500})`,
    surface600: `oklch(${mode.background.surface600})`,

    lighten4: `oklch(${mode.background.lighten} / 0.04)`,
    lighten6: `oklch(${mode.background.lighten} / 0.06)`,
    lighten8: `oklch(${mode.background.lighten} / 0.08)`,
    lighten12: `oklch(${mode.background.lighten} / 0.12)`,
    lighten16: `oklch(${mode.background.lighten} / 0.16)`,
    lighten50: `oklch(${mode.background.lighten} / 0.5)`,

    darken4: `oklch(${mode.background.darken} / 0.04)`,
    darken6: `oklch(${mode.background.darken} / 0.06)`,
    darken8: `oklch(${mode.background.darken} / 0.08)`,
    darken12: `oklch(${mode.background.darken} / 0.12)`,
    darken16: `oklch(${mode.background.darken} / 0.16)`,
    darken50: `oklch(${mode.background.darken} / 0.5)`,

    hover4: `oklch(${mode.background.hover} / 0.04)`,
    hover6: `oklch(${mode.background.hover} / 0.06)`,
    hover8: `oklch(${mode.background.hover} / 0.08)`,
    hover12: `oklch(${mode.background.hover} / 0.12)`,
    hover16: `oklch(${mode.background.hover} / 0.16)`,

    foregroundPrimary: `oklch(${mode.foreground.primary})`,
    foregroundPrimaryHover: `oklch(${mode.foreground.primaryHover})`,
    foregroundPrimaryInverse: `oklch(${mode.foreground.primaryInverse})`,
    foregroundSecondary: `oklch(${mode.foreground.secondary} / ${op.foregroundSecondary})`,
    foregroundSecondaryHover: `oklch(${mode.foreground.secondaryHover} / ${op.foregroundSecondaryHover})`,
    foregroundSecondaryInverse: `oklch(${mode.foreground.secondaryInverse} / ${op.foregroundSecondary})`,
    foregroundDisabled: `oklch(${mode.foreground.disabled} / ${op.foregroundDisabled})`,

    border: `oklch(${mode.border})`,
    focusOutline: `oklch(${mode.highlight.base})`,

    highlight: `oklch(${mode.highlight.base})`,
    highlightForeground: `oklch(${mode.highlight.foreground})`,

    statePositive: `oklch(${mode.state.positive})`,
    stateNegative: `oklch(${mode.state.negative})`,
    stateSemiNegative: `oklch(${mode.state.semiNegative})`,
    stateSemiPositive: `oklch(${mode.state.semiPositive})`,
    stateNeutral: `oklch(${mode.state.neutral})`,
    stateHighlight: `oklch(${mode.state.highlight})`,

    buttonAccentBg: `oklch(${mode.button.accentBg})`,
    buttonAccentFg: `oklch(${mode.button.accentFg})`,
    buttonAccentHover: `oklch(${mode.button.accentHover})`,
    buttonPrimaryBg: `oklch(${mode.button.primaryBg})`,
    buttonPrimaryFg: `oklch(${mode.button.primaryFg})`,
    buttonPrimaryHover: `oklch(${mode.button.primaryHover})`,

    data1: `oklch(${mode.data.data1})`,
    data2: `oklch(${mode.data.data2})`,
    data3: `oklch(${mode.data.data3})`,
    data4: `oklch(${mode.data.data4})`,
    data5: `oklch(${mode.data.data5})`,
    data6: `oklch(${mode.data.data6})`,
    data7: `oklch(${mode.data.data7})`,
    data8: `oklch(${mode.data.data8})`,

    chartAxis: `oklch(${mode.chart.axis})`,
    chartGrid: `oklch(${mode.chart.grid})`,
    chartCrosshair: `oklch(${mode.chart.crosshair})`,
    chartTooltipBg: `oklch(${mode.chart.tooltipBg})`,
    chartTooltipFg: `oklch(${mode.chart.tooltipFg})`,

    shadowElevated: `0 0 0 1px oklch(${mode.shadow.drop} / ${se.ring}), 0 2px 8px oklch(${mode.shadow.drop} / ${se.ambient1}), 0 2px 6px -4px oklch(${mode.shadow.drop} / ${se.key}), 0 4px 10px oklch(${mode.shadow.drop} / ${se.ambient2}), 0 4px 24px oklch(${mode.shadow.drop} / ${se.spread})`,
    shadowElevatedInner: `inset 0 0 0 1px oklch(${mode.shadow.inner})`,
  };
}
