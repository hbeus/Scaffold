import { createContext } from 'react';

export type SurfaceLevel = 0 | 100 | 200 | 300 | 400 | 500;

export const SURFACE_LEVELS: readonly SurfaceLevel[] = [0, 100, 200, 300, 400, 500] as const;
export const SURFACE_STEP = 100;
export const SURFACE_MAX = 500;

export const SurfaceContext = createContext<SurfaceLevel>(0);
