import { useLayoutEffect, useRef } from 'react';
import { useShaderContext } from '../context';
import { resolveColor } from '../resolveColor';
import type { UniformMap } from '../types';
import { PALETTE_FRAGMENT } from './paletteFragment';

export type PaletteMode = 'field' | 'angular';

export type PaletteProps = {
  colorA?: string;
  colorB?: string;
  colorC?: string;
  speed?: number;
  intensity?: number;
  mode?: PaletteMode;
  stops?: number;
};

export function Palette({
  colorA = '#0b1020',
  colorB = '#fd9038',
  colorC = '#266df0',
  speed = 1,
  intensity = 1,
  mode = 'field',
  stops = 4,
}: PaletteProps) {
  const { register, hostRef } = useShaderContext('Shader.Palette');
  const propsRef = useRef({ colorA, colorB, colorC, speed, intensity, mode, stops });
  propsRef.current = { colorA, colorB, colorC, speed, intensity, mode, stops };

  useLayoutEffect(() => {
    return register({
      id: 'palette',
      fragment: PALETTE_FRAGMENT,
      uniforms: {
        uColorA: { value: [0.05, 0.06, 0.12] },
        uColorB: { value: [1, 0.55, 0.2] },
        uColorC: { value: [0.15, 0.4, 0.95] },
        uIntensity: { value: 1 },
        uMode: { value: 0 },
        uStops: { value: 4 },
      },
      sync(uniforms: UniformMap, frame) {
        const p = propsRef.current;
        const host = hostRef.current;
        if (uniforms.uTime) uniforms.uTime.value = frame.time * p.speed;
        if (uniforms.uColorA) uniforms.uColorA.value = resolveColor(p.colorA, host);
        if (uniforms.uColorB) uniforms.uColorB.value = resolveColor(p.colorB, host);
        if (uniforms.uColorC) uniforms.uColorC.value = resolveColor(p.colorC, host);
        if (uniforms.uIntensity) uniforms.uIntensity.value = p.intensity;
        if (uniforms.uMode) uniforms.uMode.value = p.mode === 'angular' ? 1 : 0;
        if (uniforms.uStops) uniforms.uStops.value = p.stops;
      },
    });
  }, [register, hostRef]);

  return null;
}
