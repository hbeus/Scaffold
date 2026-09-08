import { Shader, type PaletteMode } from '@base/shaders';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';

export default function PaletteHero() {
  const p = useDialKit('Palette', {
    colorA: { type: 'color', default: '#0b1020' },
    colorB: { type: 'color', default: '#fd9038' },
    colorC: { type: 'color', default: '#266df0' },
    speed: [1, 0, 3, 0.01],
    intensity: [1, 0, 2, 0.01],
    mode: { type: 'select', options: ['field', 'angular'], default: 'field' },
    stops: [4, 1, 8, 1],
  });
  const mode: PaletteMode = p.mode === 'angular' ? 'angular' : 'field';

  return (
    <>
      <Shader.Root
        style={{ width: '100%', height: 320, borderRadius: 12 }}
        fallback={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(120deg, ${p.colorA}, ${p.colorB}, ${p.colorC})`,
            }}
          />
        }
      >
        <Shader.Palette
          colorA={p.colorA}
          colorB={p.colorB}
          colorC={p.colorC}
          speed={p.speed}
          intensity={p.intensity}
          mode={mode}
          stops={p.stops}
        />
      </Shader.Root>
      <DialRoot />
    </>
  );
}
