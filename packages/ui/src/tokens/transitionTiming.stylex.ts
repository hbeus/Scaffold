import * as stylex from '@stylexjs/stylex';

export const easing = stylex.defineVars({
  inQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  inCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  inQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  inQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  inExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  inCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',

  outQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  outCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  outQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  outQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  outExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  outCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  outFluid: 'cubic-bezier(0.32, 0.72, 0, 1)',

  inOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  inOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  inOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
  inOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
  inOutExpo: 'cubic-bezier(1, 0, 0, 1)',
  inOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
});
