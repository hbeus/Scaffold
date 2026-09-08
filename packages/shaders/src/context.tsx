import { createContext, useContext, type RefObject } from 'react';
import type { RegisterFn } from './types';

export type ShaderContextValue = {
  register: RegisterFn;
  hostRef: RefObject<HTMLDivElement | null>;
};

export const ShaderContext = createContext<ShaderContextValue | null>(null);

export function useShaderContext(component: string): ShaderContextValue {
  const ctx = useContext(ShaderContext);
  if (!ctx) {
    throw new Error(`${component} must be used within Shader.Root`);
  }
  return ctx;
}
