import { useLayoutEffect, useRef } from 'react';
import { useShaderContext } from '../context';
import { resolveColor } from '../resolveColor';
import type { UniformMap } from '../types';
import { RIPPLE_FRAGMENT } from './rippleFragment';
import { syncPointerUniforms } from './syncPointer';

export type RippleProps = {
  colorA?: string;
  colorB?: string;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  decay?: number;
  thickness?: number;
  velocityAmp?: number;
  velocityFreq?: number;
};

export function Ripple({
  colorA = '#0a1420',
  colorB = '#5ec8ff',
  amplitude = 1,
  frequency = 28,
  speed = 1,
  decay = 2.2,
  thickness = 1,
  velocityAmp = 0.8,
  velocityFreq = 0.5,
}: RippleProps) {
  const { register, hostRef } = useShaderContext('Shader.Ripple');
  const propsRef = useRef({
    colorA,
    colorB,
    amplitude,
    frequency,
    speed,
    decay,
    thickness,
    velocityAmp,
    velocityFreq,
  });
  propsRef.current = {
    colorA,
    colorB,
    amplitude,
    frequency,
    speed,
    decay,
    thickness,
    velocityAmp,
    velocityFreq,
  };

  useLayoutEffect(() => {
    return register({
      id: 'ripple',
      fragment: RIPPLE_FRAGMENT,
      pointer: true,
      uniforms: {
        uColorA: { value: [0.04, 0.08, 0.14] },
        uColorB: { value: [0.35, 0.75, 1.0] },
        uAmplitude: { value: 1 },
        uFrequency: { value: 28 },
        uThickness: { value: 1 },
        uDecay: { value: 2.2 },
        uVelocityAmp: { value: 0.8 },
        uVelocityFreq: { value: 0.5 },
        uOrigin: { value: [0.5, 0.5] },
        uActive: { value: 0 },
        uVelocity: { value: [0, 0] },
      },
      sync(uniforms: UniformMap, frame) {
        const p = propsRef.current;
        const host = hostRef.current;
        if (uniforms.uTime) uniforms.uTime.value = frame.time * p.speed;
        if (uniforms.uColorA) uniforms.uColorA.value = resolveColor(p.colorA, host);
        if (uniforms.uColorB) uniforms.uColorB.value = resolveColor(p.colorB, host);
        if (uniforms.uAmplitude) uniforms.uAmplitude.value = p.amplitude;
        if (uniforms.uFrequency) uniforms.uFrequency.value = p.frequency;
        if (uniforms.uThickness) uniforms.uThickness.value = p.thickness;
        if (uniforms.uDecay) uniforms.uDecay.value = p.decay;
        if (uniforms.uVelocityAmp) uniforms.uVelocityAmp.value = p.velocityAmp;
        if (uniforms.uVelocityFreq) uniforms.uVelocityFreq.value = p.velocityFreq;
        const origin = uniforms.uOrigin as { value: [number, number] } | undefined;
        if (origin && frame.pointer) {
          origin.value = [frame.pointer.x, frame.pointer.y];
        } else if (origin) {
          origin.value = [0.5, 0.5];
        }
        syncPointerUniforms(uniforms, frame, {
          x: 0.5,
          y: 0.5,
          active: frame.pointer ? 0.35 : 0.25,
        });
      },
    });
  }, [register, hostRef]);

  return null;
}
