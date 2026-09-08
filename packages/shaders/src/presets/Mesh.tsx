import { useLayoutEffect, useRef } from 'react';
import { useShaderContext } from '../context';
import { resolveColor } from '../resolveColor';
import type { UniformMap } from '../types';
import { MESH_FRAGMENT } from './meshFragment';
import { syncPointerUniforms } from './syncPointer';

export type MeshProps = {
  colorA?: string;
  colorB?: string;
  colorC?: string;
  colorD?: string;
  speed?: number;
  intensity?: number;
  softness?: number;
  attract?: number;
  velocityBias?: number;
};

export function Mesh({
  colorA = '#fd9038',
  colorB = '#266df0',
  colorC = '#ff5b59',
  colorD = '#13dd8d',
  speed = 1,
  intensity = 1,
  softness = 1,
  attract = 0.45,
  velocityBias = 0.6,
}: MeshProps) {
  const { register, hostRef } = useShaderContext('Shader.Mesh');
  const propsRef = useRef({
    colorA,
    colorB,
    colorC,
    colorD,
    speed,
    intensity,
    softness,
    attract,
    velocityBias,
  });
  propsRef.current = {
    colorA,
    colorB,
    colorC,
    colorD,
    speed,
    intensity,
    softness,
    attract,
    velocityBias,
  };

  useLayoutEffect(() => {
    return register({
      id: 'mesh',
      fragment: MESH_FRAGMENT,
      pointer: true,
      uniforms: {
        uColorA: { value: [1, 0.5, 0.2] },
        uColorB: { value: [0.15, 0.4, 0.95] },
        uColorC: { value: [1, 0.35, 0.35] },
        uColorD: { value: [0.07, 0.87, 0.55] },
        uIntensity: { value: 1 },
        uSoftness: { value: 1 },
        uAttract: { value: 0.45 },
        uVelocityBias: { value: 0.6 },
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
        if (uniforms.uColorD) uniforms.uColorD.value = resolveColor(p.colorD, host);
        if (uniforms.uIntensity) uniforms.uIntensity.value = p.intensity;
        if (uniforms.uSoftness) uniforms.uSoftness.value = p.softness;
        if (uniforms.uAttract) uniforms.uAttract.value = p.attract;
        if (uniforms.uVelocityBias) uniforms.uVelocityBias.value = p.velocityBias;
        syncPointerUniforms(uniforms, frame, { x: 0.5, y: 0.35, active: 0 });
      },
    });
  }, [register, hostRef]);

  return null;
}
