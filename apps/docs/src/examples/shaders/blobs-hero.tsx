import { Shader } from '@base/shaders';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';

export default function BlobsHero() {
  const p = useDialKit('Blobs', {
    colorA: { type: 'color', default: '#0a1420' },
    colorB: { type: 'color', default: '#5ec8ff' },
    colorC: { type: 'color', default: '#ff7ad9' },
    speed: [1, 0, 3, 0.01],
    intensity: [1, 0, 2, 0.01],
    threshold: [1.1, 0.4, 2.5, 0.01],
    attract: [0.55, 0, 1.5, 0.01],
    velocityForce: [0.8, 0, 2, 0.01],
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
              background: `radial-gradient(circle at 40% 50%, ${p.colorB}, ${p.colorA})`,
            }}
          />
        }
      >
        <Shader.Blobs
          colorA={p.colorA}
          colorB={p.colorB}
          colorC={p.colorC}
          speed={p.speed}
          intensity={p.intensity}
          threshold={p.threshold}
          attract={p.attract}
          velocityForce={p.velocityForce}
        />
      </Shader.Root>
      <DialRoot />
    </>
  );
}
