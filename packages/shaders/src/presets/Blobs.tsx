import { useLayoutEffect, useRef } from 'react';
import { useShaderContext } from '../context';
import { resolveColor } from '../resolveColor';
import type { UniformMap } from '../types';
import { BLOBS_FRAGMENT } from './blobsFragment';
import { syncPointerUniforms } from './syncPointer';

export type BlobsProps = {
  colorA?: string;
  colorB?: string;
  colorC?: string;
  speed?: number;
  intensity?: number;
  threshold?: number;
  attract?: number;
  velocityForce?: number;
};

export function Blobs({
  colorA = '#0a1420',
  colorB = '#5ec8ff',
  colorC = '#ff7ad9',
  speed = 1,
  intensity = 1,
  threshold = 1.1,
  attract = 0.55,
  velocityForce = 0.8,
}: BlobsProps) {
  const { register, hostRef } = useShaderContext('Shader.Blobs');
  const propsRef = useRef({
    colorA,
    colorB,
    colorC,
    speed,
    intensity,
    threshold,
    attract,
    velocityForce,
  });
  propsRef.current = {
    colorA,
    colorB,
    colorC,
    speed,
    intensity,
    threshold,
    attract,
    velocityForce,
  };

  useLayoutEffect(() => {
    return register({
      id: 'blobs',
      fragment: BLOBS_FRAGMENT,
      pointer: true,
      uniforms: {
        uColorA: { value: [0.04, 0.08, 0.12] },
        uColorB: { value: [0.35, 0.78, 1] },
        uColorC: { value: [1, 0.48, 0.85] },
        uIntensity: { value: 1 },
        uThreshold: { value: 1.1 },
        uAttract: { value: 0.55 },
        uVelocityForce: { value: 0.8 },
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
        if (uniforms.uThreshold) uniforms.uThreshold.value = p.threshold;
        if (uniforms.uAttract) uniforms.uAttract.value = p.attract;
        if (uniforms.uVelocityForce) uniforms.uVelocityForce.value = p.velocityForce;
        syncPointerUniforms(uniforms, frame);
      },
    });
  }, [register, hostRef]);

  return null;
}
