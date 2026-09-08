import { Shader } from '@base/shaders';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';

export default function MeshHero() {
  const p = useDialKit('Mesh', {
    colorA: { type: 'color', default: '#fd9038' },
    colorB: { type: 'color', default: '#266df0' },
    colorC: { type: 'color', default: '#ff5b59' },
    colorD: { type: 'color', default: '#13dd8d' },
    speed: [1, 0, 3, 0.01],
    intensity: [1, 0, 2, 0.01],
    softness: [1, 0.2, 2.5, 0.01],
    attract: [0.45, 0, 1.5, 0.01],
    velocityBias: [0.6, 0, 2, 0.01],
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
              background: `radial-gradient(ellipse at 50% 80%, ${p.colorA}, ${p.colorB} 45%, ${p.colorC})`,
            }}
          />
        }
      >
        <Shader.Mesh
          colorA={p.colorA}
          colorB={p.colorB}
          colorC={p.colorC}
          colorD={p.colorD}
          speed={p.speed}
          intensity={p.intensity}
          softness={p.softness}
          attract={p.attract}
          velocityBias={p.velocityBias}
        />
      </Shader.Root>
      <DialRoot />
    </>
  );
}
