import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Suspense } from 'react';

interface CanvasProps extends Omit<ComponentPropsWithoutRef<typeof R3FCanvas>, 'children'> {
  children: ReactNode;
  controls?: boolean;
  environment?: boolean;
}

export function Canvas({ children, controls = true, environment = true, ...props }: CanvasProps) {
  return (
    <R3FCanvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      {...props}
    >
      <Suspense fallback={null}>
        {environment && <Environment preset='studio' />}
        {children}
        {controls && <OrbitControls enableDamping />}
      </Suspense>
    </R3FCanvas>
  );
}
