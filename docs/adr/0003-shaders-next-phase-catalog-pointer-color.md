# Next-phase `@base/shaders`: catalog, pointer, and `resolveColor`

We want to grow `@base/shaders` beyond the Aurora POC with a small diversified preset catalog, optional pointer for interactive presets, and theme-agnostic color resolution — without reopening the package/engine decisions in ADR 0001, and without implementing stackable layers or a shaders.com-style editor.

**Decision:** Keep ADR 0001 as the foundation (OGL compound `Shader` API, one Preset per Root, shaders-local client guard, DialKit docs-only). For the next phase:

- **Catalog:** Add named presets `Shader.Warp`, `Shader.Grain`, `Shader.Hex`, and `Shader.Ripple` (docs routes `/shaders/warp|grain|hex|ripple`). Ripple is the pointer-aware preset; Flow (flowmap) is deferred.
- **Pointer:** Opt-in via `PresetRegistration.pointer`. Root attaches host `pointermove` / `pointerleave` only while opted in and visible; canvas stays `pointer-events: none`. Extend `FrameInfo` with `pointer: { x, y, active } | null` in normalized **0–1, origin bottom-left**. Under `prefers-reduced-motion`, detach listeners and pass `pointer: null`. No velocity / FBO this phase.
- **Colors:** Export public `resolveColor(input, element?) → [r,g,b]` (0–1) for `#hex`, `var(--token)`, and other CSS colors (1×1 canvas path when needed). Presets and apps use it; no StyleX / `@base/ui` dependency. Docs: “Colors & tokens” on `/shaders` overview plus one `var(--…)` example.

**Why not alternatives:** Amending ADR 0001 in place would mix foundation and evolution. Shipping Flow instead of Ripple would force a flowmap host before the pointer contract is proven. Putting token coupling in `@base/ui` or StyleX would violate the shaders package boundary. Stackable layers remain a later effort.

**Handoff:** Glossary in `CONTEXT.md` (Shaders — Pointer). Index of ticket resolutions on wayfinder map [Shaders next-phase route](https://github.com/hbeus/Base/issues/25). Research shortlist: branch `research/diversifying-fullscreen-preset-shortlist`. Implementation is a separate effort after this map clears.
