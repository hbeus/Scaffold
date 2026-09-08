# Separate `@base/shaders` package with OGL compound Shader API

We want GPU page backgrounds with named presets, documented in the docs app, without pulling WebGL into `@base/ui` or conflating them with R3F scenes in `@base/canvas`.

**Decision:** Ship a new `@base/shaders` package: OGL + thin React wrapper; compound `Shader.Root` + named presets (POC: `Shader.Aurora`); single barrel export; `ogl` as a dependency and React as peers; shaders-local client-mount guard (same two-pass idea as canvas `SSRGuard`, no canvas dependency). Root owns the Program/RAF/Reveal; Presets register via context as headless children and sync uniforms through a ref + `sync` callback. Docs get a top-level Shaders section (`/shaders`, `/shaders/aurora`) with DialKit only in docs/demos. Plain typed props for the POC — no StyleX/`@base/ui` coupling yet.

**Why not alternatives:** Putting shaders in `@base/ui` would weight the design system with GPU deps. Extending `@base/canvas` would couple backgrounds to Three/R3F. Adopting shaders.com’s WebGPU `shaders` npm buys composition but not owned GLSL presets and a different engine bet. R3F for fullscreen fragment backgrounds is heavier than needed; OGL matches common fullscreen-shader practice.

**Handoff:** Glossary in `CONTEXT.md` (Shaders). Index of ticket resolutions on wayfinder map [Shader backgrounds route](https://github.com/hbeus/Base/issues/6). API sketch (throwaway): branch `prototype/shader-api-sketch`. Research notes: branch `research/ogl-react-fullscreen-preset-host`.
