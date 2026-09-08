import { useLayoutEffect, useRef } from 'react';
import { useShaderContext } from '../context';
import { resolveColor } from '../resolveColor';
import type { UniformMap } from '../types';
import { syncPointerUniforms } from './syncPointer';
import { WARP_FRAGMENT } from './warpFragment';

export type WarpProps = {
  colorA?: string;
  colorB?: string;
  colorC?: string;
  speed?: number;
  intensity?: number;
  warp?: number;
  scale?: number;
  pointerPull?: number;
  velocityPull?: number;
};

export function Warp({
  colorA = '#0a1628',
  colorB = '#3d5a80',
  colorC = '#98c1d9',
  speed = 1,
  intensity = 1,
  warp = 1,
  scale = 1.4,
  pointerPull = 0.45,
  velocityPull = 0.7,
}: WarpProps) {
  const { register, hostRef } = useShaderContext('Shader.Warp');
  const propsRef = useRef({
    colorA,
    colorB,
    colorC,
    speed,
    intensity,
    warp,
    scale,
    pointerPull,
    velocityPull,
  });
  propsRef.current = {
    colorA,
    colorB,
    colorC,
    speed,
    intensity,
    warp,
    scale,
    pointerPull,
    velocityPull,
  };

  useLayoutEffect(() => {
    return register({
      id: 'warp',
      fragment: WARP_FRAGMENT,
      pointer: true,
      uniforms: {
        uColorA: { value: [0, 0, 0] },
        uColorB: { value: [1, 1, 1] },
        uColorC: { value: [0.5, 0.5, 0.5] },
        uIntensity: { value: 1 },
        uWarp: { value: 1 },
        uScale: { value: 1 },
        uPointerPull: { value: 0.45 },
        uVelocityPull: { value: 0.7 },
        uPointer: { value: [0.5, 0.5] },
        uActive: { value: 0 },
        uVelocity: { value: [0, 0] },
      },
      sync(uniforms: UniformMap, frame) {
        const p = propsRef.current;
        const host = hostRef.current;
        if (uniforms.uTime) uniforms.uTime.value = frame.time * p.speed;
        if (uniforms.uColorA) uniforms.uColorA.value = resolveColor(p.colorA, host);
        if (uniforms.uColorB) uniforms.uColorB.value = resolveColor(p.colorB, host);
        if (uniforms.uColorC) uniforms.uColorC.value = resolveColor(p.colorC, host);
        if (uniforms.uIntensity) uniforms.uIntensity.value = p.intensity;
        if (uniforms.uWarp) uniforms.uWarp.value = p.warp;
        if (uniforms.uScale) uniforms.uScale.value = p.scale;
        if (uniforms.uPointerPull) uniforms.uPointerPull.value = p.pointerPull;
        if (uniforms.uVelocityPull) uniforms.uVelocityPull.value = p.velocityPull;
        syncPointerUniforms(uniforms, frame);
      },
    });
  }, [register, hostRef]);

  return null;
}
