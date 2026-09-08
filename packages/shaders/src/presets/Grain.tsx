import { useLayoutEffect, useRef } from 'react';
import { useShaderContext } from '../context';
import { resolveColor } from '../resolveColor';
import type { UniformMap } from '../types';
import { GRAIN_FRAGMENT } from './grainFragment';

export type GrainProps = {
  color?: string;
  amount?: number;
  size?: number;
  speed?: number;
  lumaResponse?: number;
};

export function Grain({
  color = '#1a1b1e',
  amount = 0.12,
  size = 1,
  speed = 1,
  lumaResponse = 0.35,
}: GrainProps) {
  const { register, hostRef } = useShaderContext('Shader.Grain');
  const propsRef = useRef({ color, amount, size, speed, lumaResponse });
  propsRef.current = { color, amount, size, speed, lumaResponse };

  useLayoutEffect(() => {
    return register({
      id: 'grain',
      fragment: GRAIN_FRAGMENT,
      uniforms: {
        uColor: { value: [0.1, 0.1, 0.12] },
        uAmount: { value: 0.12 },
        uSize: { value: 1 },
        uLumaResponse: { value: 0.35 },
      },
      sync(uniforms: UniformMap, frame) {
        const p = propsRef.current;
        const host = hostRef.current;
        if (uniforms.uTime) uniforms.uTime.value = frame.time * p.speed;
        if (uniforms.uColor) uniforms.uColor.value = resolveColor(p.color, host);
        if (uniforms.uAmount) uniforms.uAmount.value = p.amount;
        if (uniforms.uSize) uniforms.uSize.value = p.size;
        if (uniforms.uLumaResponse) uniforms.uLumaResponse.value = p.lumaResponse;
      },
    });
  }, [register, hostRef]);

  return null;
}
