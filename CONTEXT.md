# Domain Glossary

Canonical terms for this project. Keep terms meaningful to the domain — not implementation details.

## Language

### Shaders

GPU background effects shipped via `@base/shaders`.

**Shader**:
The compound React surface for a GPU background effect — Root plus its named presets.
_Avoid_: GLSL source, OGL Program, any WebGL on the page

**Root**:
The Shader host that owns the canvas lifecycle (client mount, RAF pause, DPR, fallback, reveal). Exactly one Preset runs under it; Root may supply Pointer when that Preset opts in.
_Avoid_: the visual look itself; a Preset

**Preset**:
A named visual effect that plugs into Root — typed props in, fragment look out.
_Avoid_: editor save files; layer stacks; the canvas host

**Pointer**:
Host-tracked pointer state Root exposes to an opted-in Preset — normalized position, velocity (normalized units per second in the same space), and whether the pointer is over the host. Root may smooth and decay velocity. Absent when the Preset does not opt in or motion is reduced.
_Avoid_: DOM event objects; a required interaction for every Preset; flowmap / FBO trail buffers

**Fallback**:
The non-WebGL stand-in shown in Root’s fallback slot while the GPU isn’t ready or can’t run. Shaders-domain only.
_Avoid_: a low-quality shader; the reveal transition; general UI “fallback” elsewhere in the app

**Reveal**:
The transition from Fallback to the running Preset after the first successful frame, so the canvas doesn’t flash empty.
_Avoid_: pause/resume show-hide; a second Preset

### Charts

Visualizations shipped via `@base/charts`.

**Chart**:
The compound React surface in `@base/charts` for a single visualization (Root plus its parts) — e.g. a bar chart or donut.
_Avoid_: a raw VisX/D3 primitive; a docs page; a dashboard of many charts

**Series**:
One named data channel drawn inside a Chart (e.g. a line, a bar group, a donut segment set), mapped to a Data color by index or key.
_Avoid_: the whole Chart; a raw data array with no visual role; a legend item alone

**Data color**:
A theme token slot used to paint a Series (`data1`…`data8`), generated per palette and light/dark mode in `@base/ui`.
_Avoid_: UI state colors (`positive` / `negative`); accent/button colors; a hardcoded hex in chart code

**Data ramp**:
The ordered categorical set of Data colors (`data1`…`data8`) Series cycle through by index.
_Avoid_: a sequential/diverging continuous scale; Chart chrome tokens

**Chart chrome**:
Non-series visual scaffolding of a Chart — axes, grid, crosshair, and chart tooltip surface — styled with theme tokens (often shared UI fg/bg/border), not Data colors.
_Avoid_: Series fills/strokes; general app chrome (nav, shell)

**Cartesian shell**:
The shared Chart structure for bar, line, and area — scales, axes, grid, and plot frame that Series plug into.
_Avoid_: a donut/radial Chart; VisX internals; the Series itself

**Chart tooltip**:
The `@base/charts` hover/focus overlay that shows rich Series values at a pointer position; Chart chrome, not the `@base/ui` Tooltip.
_Avoid_: `Tooltip` from `@base/ui`; a legend; axis tick labels
