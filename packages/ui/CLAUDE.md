# @base/ui

## Structure

```
src/
  components/
    input/        Button, Input, Toggle, Pressable
    layout/       Card
    typography/   Text
    overlays/     Dialog
    navigation/   Tabs, TreeView, Toolbar, Sidebar, …
  tokens/         themes, spacing, size, elementSize, radii, typography, …
  types/          polymorphic.ts (read before creating polymorphic components)
  utils/          styleArray, mergeRefs
```

## Key decisions

- **Token split**: `spacing` = padding/margin/gap, `size` = arbitrary dimensions, `elementSize` = component heights (sm/md/lg). Read the token files to see the scales.
- **No hardcoded values**: all colors, spacing, radii, and typography come from tokens. No raw px, hex, or font sizes.
- **Components import from barrel** (`@base/ui`), **tokens use deep imports** (`@base/ui/tokens/themes.stylex`).
- **Theming via `stylex.createTheme()`**: default-dark values in `defineVars()`; other palette/scheme combos via `themeMap` / `createTheme()` on `<html>`. Do not use `light-dark()` CSS function — LightningCSS mangles it.
