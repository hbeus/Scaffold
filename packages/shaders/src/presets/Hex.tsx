import { useLayoutEffect, useRef } from 'react';
import { useShaderContext } from '../context';
import { resolveColor } from '../resolveColor';
import type { UniformMap } from '../types';
import { HEX_FRAGMENT } from './hexFragment';

export type HexProps = {
  colorLine?: string;
  colorFill?: string;
  scale?: number;
  thickness?: number;
  speed?: number;
  glow?: number;
};

export function Hex({
  colorLine = '#6eb6ff',
  colorFill = '#0b1220',
  scale = 8,
  thickness = 1,
  speed = 1,
  glow = 0.35,
}: HexProps) {
  const { register, hostRef } = useShaderContext('Shader.Hex');
  const propsRef = useRef({ colorLine, colorFill, scale, thickness, speed, glow });
  propsRef.current = { colorLine, colorFill, scale, thickness, speed, glow };

  useLayoutEffect(() => {
    return register({
      id: 'hex',
      fragment: HEX_FRAGMENT,
      uniforms: {
        uColorLine: { value: [0.4, 0.7, 1.0] },
        uColorFill: { value: [0.05, 0.08, 0.14] },
        uScale: { value: 8 },
        uThickness: { value: 1 },
        uGlow: { value: 0.35 },
      },
      sync(uniforms: UniformMap, frame) {
        const p = propsRef.current;
        const host = hostRef.current;
        if (uniforms.uTime) uniforms.uTime.value = frame.time * p.speed;
        if (uniforms.uColorLine) uniforms.uColorLine.value = resolveColor(p.colorLine, host);
        if (uniforms.uColorFill) uniforms.uColorFill.value = resolveColor(p.colorFill, host);
        if (uniforms.uScale) uniforms.uScale.value = p.scale;
        if (uniforms.uThickness) uniforms.uThickness.value = p.thickness;
        if (uniforms.uGlow) uniforms.uGlow.value = p.glow;
      },
    });
  }, [register, hostRef]);

  return null;
}
