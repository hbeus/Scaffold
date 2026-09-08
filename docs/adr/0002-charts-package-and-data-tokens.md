# Separate `@base/charts` package; data colors stay in `@base/ui`

We want theme-aware charts (VisX + focused D3 utils + motion) documented in the docs app, without pulling chart dependencies into `@base/ui` or forking a second theme system.

**Decision:** Ship a new `@base/charts` package for compound chart surfaces (`CartesianChart`, `DonutChart`). Keep theme generation and tokens in `@base/ui`, including a categorical Data ramp (`colors.data.data1`…`data8`) and Chart chrome tokens (`colors.chart.*`) produced by `generate-themes`. Charts deep-import `@base/ui/tokens/*.stylex` and paint VisX SVG via StyleX CSS variables. Do not extract `@base/tokens` in v1.

**Why not alternatives:** Charts inside `@base/ui` would weight the design system with VisX/D3. A separate tokens package is a larger split than v1 needs — charts can import `@base/ui` the same way other consumers will. `@visx/xychart` was rejected (react-spring animation path, no donut, fights StyleX theming); compose low-level `@visx/*` instead.

**Handoff:** Glossary in `CONTEXT.md` (Charts). Index of ticket resolutions on wayfinder map [Charts route for @base/charts](https://github.com/hbeus/Base/issues/16). Research notes: branches `research/visx-d3-package-set-v1-charts`, `research/stylex-theme-tokens-visx-svg`. v1 Roots size via `@visx/responsive` `ParentSize`.
