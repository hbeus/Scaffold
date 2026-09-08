import { Blobs } from './presets/Blobs';
import { Mesh } from './presets/Mesh';
import { Palette } from './presets/Palette';
import { Root } from './Root';

export type { BlobsProps } from './presets/Blobs';
export type { MeshProps } from './presets/Mesh';
export type { PaletteMode, PaletteProps } from './presets/Palette';
export type { RootProps } from './Root';
export { resolveColor } from './resolveColor';
export type { FrameInfo, PointerState, PresetRegistration, UniformMap } from './types';

export const Shader = {
  Root,
  Mesh,
  Palette,
  Blobs,
};
