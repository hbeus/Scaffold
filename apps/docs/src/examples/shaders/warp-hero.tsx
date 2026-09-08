import { Shader } from '@base/shaders';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';

export default function WarpHero() {
  const p = useDialKit('Warp', {
    colorA: { type: 'color', default: '#0a1628' },
    colorB: { type: 'color', default: '#3d5a80' },
    colorC: { type: 'color', default: '#98c1d9' },
    speed: [1, 0, 3, 0.01],
    intensity: [1, 0, 2, 0.01],
    warp: [1, 0, 3, 0.01],
    scale: [1.4, 0.4, 4, 0.01],
    pointerPull: [0.45, 0, 1.5, 0.01],
    velocityPull: [0.7, 0, 2, 0.01],
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
              background: `linear-gradient(140deg, ${p.colorA}, ${p.colorB}, ${p.colorC})`,
            }}
          />
        }
      >
        <Shader.Warp
          colorA={p.colorA}
          colorB={p.colorB}
          colorC={p.colorC}
          speed={p.speed}
          intensity={p.intensity}
          warp={p.warp}
          scale={p.scale}
          pointerPull={p.pointerPull}
          velocityPull={p.velocityPull}
        />
      </Shader.Root>
      <DialRoot />
    </>
  );
}
