import type { FrameInfo, UniformMap } from '../types';

export function syncPointerUniforms(
  uniforms: UniformMap,
  frame: FrameInfo,
  fallback: { x: number; y: number; active: number } = { x: 0.5, y: 0.5, active: 0 },
) {
  const pointer = uniforms.uPointer as { value: [number, number] } | undefined;
  const active = uniforms.uActive as { value: number } | undefined;
  const velocity = uniforms.uVelocity as { value: [number, number] } | undefined;
  if (!pointer || !active || !velocity) return;

  if (frame.pointer) {
    pointer.value = [frame.pointer.x, frame.pointer.y];
    active.value = frame.pointer.active ? 1 : fallback.active;
    velocity.value = [frame.pointer.vx, frame.pointer.vy];
    return;
  }

  pointer.value = [fallback.x, fallback.y];
  active.value = fallback.active;
  velocity.value = [0, 0];
}
