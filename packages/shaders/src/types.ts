export type UniformMap = Record<string, { value: unknown }>;

export type PointerState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
};

export type FrameInfo = {
  time: number;
  delta: number;
  pointer: PointerState | null;
};

export type PresetRegistration = {
  id: string;
  fragment: string;
  vertex?: string;
  pointer?: boolean;
  uniforms: UniformMap;
  sync: (uniforms: UniformMap, frame: FrameInfo) => void;
};

export type RegisterFn = (preset: PresetRegistration) => () => void;
