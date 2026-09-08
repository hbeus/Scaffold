import { Shader } from '@base/shaders';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';

export default function GrainHero() {
  const p = useDialKit('Grain', {
    color: { type: 'color', default: '#1a1b1e' },
    amount: [0.12, 0, 0.5, 0.01],
    size: [1, 0.25, 4, 0.01],
    speed: [1, 0, 3, 0.01],
    lumaResponse: [0.35, 0, 1, 0.01],
  });

  return (
    <>
      <Shader.Root
        style={{ width: '100%', height: 320, borderRadius: 12 }}
        fallback={
          <div style={{ width: '100%', height: '100%', background: p.color }} />
        }
      >
        <Shader.Grain
          color={p.color}
          amount={p.amount}
          size={p.size}
          speed={p.speed}
          lumaResponse={p.lumaResponse}
        />
      </Shader.Root>
      <DialRoot />
    </>
  );
}
