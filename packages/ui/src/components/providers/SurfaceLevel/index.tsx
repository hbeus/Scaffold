import { type ReactNode, useContext } from 'react';
import {
  SURFACE_MAX,
  SURFACE_STEP,
  SurfaceContext,
  type SurfaceLevel as SurfaceLevelType,
} from '../../../contexts/SurfaceContext';

export interface SurfaceLevelProps {
  level?: SurfaceLevelType;
  children: ReactNode;
}

export function SurfaceLevel({ level, children }: SurfaceLevelProps) {
  const parentLevel = useContext(SurfaceContext);

  const resolvedLevel: SurfaceLevelType =
    level !== undefined
      ? level
      : (Math.min(parentLevel + SURFACE_STEP, SURFACE_MAX) as SurfaceLevelType);

  return <SurfaceContext value={resolvedLevel}>{children}</SurfaceContext>;
}
