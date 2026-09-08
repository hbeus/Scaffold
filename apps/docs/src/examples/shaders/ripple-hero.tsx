import { Shader } from '@base/shaders';
import { DialRoot, useDialKit } from 'dialkit';
import 'dialkit/styles.css';

export default function RippleHero() {
  const p = useDialKit('Ripple', {
    colorA: { type: 'color', default: '#0a1420' },
    colorB: { type: 'color', default: '#5ec8ff' },
    amplitude: [1, 0, 2, 0.01],
    frequency: [28, 8, 60, 0.5],
    speed: [1, 0, 3, 0.01],
    decay: [2.2, 0.5, 6, 0.05],
    thickness: [1, 0.2, 3, 0.01],
    velocityAmp: [0.8, 0, 2, 0.01],
    velocityFreq: [0.5, 0, 2, 0.01],
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
              background: `radial-gradient(circle at 50% 50%, ${p.colorB}, ${p.colorA})`,
            }}
          />
        }
      >
        <Shader.Ripple
          colorA={p.colorA}
          colorB={p.colorB}
          amplitude={p.amplitude}
          frequency={p.frequency}
          speed={p.speed}
          decay={p.decay}
          thickness={p.thickness}
          velocityAmp={p.velocityAmp}
          velocityFreq={p.velocityFreq}
        />
      </Shader.Root>
      <DialRoot />
    </>
  );
}
