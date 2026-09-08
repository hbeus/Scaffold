import { Shader } from '@base/shaders';
import type { CSSProperties } from 'react';

export default function AuroraTokens() {
  return (
    <div
      style={
        {
          '--shader-a': '#12263a',
          '--shader-b': '#7aa2f7',
          width: '100%',
        } as CSSProperties
      }
    >
      <Shader.Root
        style={{ width: '100%', height: 240, borderRadius: 12 }}
        fallback={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(160deg, var(--shader-a), var(--shader-b))',
            }}
          />
        }
      >
        <Shader.Aurora colorA='var(--shader-a)' colorB='var(--shader-b)' />
      </Shader.Root>
    </div>
  );
}
