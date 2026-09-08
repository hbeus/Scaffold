import { Aurora } from './presets/Aurora';
import { Blobs } from './presets/Blobs';
import { Grain } from './presets/Grain';
import { Hex } from './presets/Hex';
import { Mesh } from './presets/Mesh';
import { Palette } from './presets/Palette';
import { Ripple } from './presets/Ripple';
import { Warp } from './presets/Warp';
import { Root } from './Root';

export type { AuroraProps } from './presets/Aurora';
export type { BlobsProps } from './presets/Blobs';
export type { GrainProps } from './presets/Grain';
export type { HexProps } from './presets/Hex';
export type { MeshProps } from './presets/Mesh';
export type { PaletteMode, PaletteProps } from './presets/Palette';
export type { RippleProps } from './presets/Ripple';
export type { WarpProps } from './presets/Warp';
export type { RootProps } from './Root';
export { resolveColor } from './resolveColor';
export type { FrameInfo, PointerState, PresetRegistration, UniformMap } from './types';

export const Shader = {
  Root,
  Aurora,
  Warp,
  Grain,
  Hex,
  Ripple,
  Mesh,
  Palette,
  Blobs,
};
