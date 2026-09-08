import { Shader } from '@base/shaders';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';

export default function AuroraHero() {
  const p = useDialKit('Aurora', {
    colorA: { type: 'color', default: '#0b1d36' },
    colorB: { type: 'color', default: '#3d8bfd' },
    speed: [1, 0, 3, 0.01],
    intensity: [1, 0, 2, 0.01],
    bandCount: [3, 1, 8, 1],
  });

  return (
    <>
      <Shader.Root
        style={{ width: '100%', height: 320, borderRadius: 12 }}
        fallback={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(160deg, ${p.colorA}, ${p.colorB})`,
            }}
          />
        }
      >
        <Shader.Aurora
          colorA={p.colorA}
          colorB={p.colorB}
          speed={p.speed}
          intensity={p.intensity}
          bandCount={p.bandCount}
        />
      </Shader.Root>
      <DialRoot />
    </>
  );
}
