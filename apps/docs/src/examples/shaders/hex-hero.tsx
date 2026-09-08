import { Shader } from '@base/shaders';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';

export default function HexHero() {
  const p = useDialKit('Hex', {
    colorLine: { type: 'color', default: '#6eb6ff' },
    colorFill: { type: 'color', default: '#0b1220' },
    scale: [8, 2, 20, 0.1],
    thickness: [1, 0.2, 3, 0.01],
    speed: [1, 0, 3, 0.01],
    glow: [0.35, 0, 1.5, 0.01],
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
              background: `radial-gradient(circle, ${p.colorFill}, ${p.colorLine})`,
            }}
          />
        }
      >
        <Shader.Hex
          colorLine={p.colorLine}
          colorFill={p.colorFill}
          scale={p.scale}
          thickness={p.thickness}
          speed={p.speed}
          glow={p.glow}
        />
      </Shader.Root>
      <DialRoot />
    </>
  );
}
