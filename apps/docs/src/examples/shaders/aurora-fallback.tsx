import { Shader } from '@base/shaders';

export default function AuroraFallback() {
  return (
    <Shader.Root
      style={{ width: '100%', height: 200, borderRadius: 12 }}
      fallback={
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            background: 'linear-gradient(160deg, #0b1d36, #1a3a5c)',
            color: '#9ec1ff',
            fontSize: 14,
          }}
        >
          Fallback while the GPU warms up
        </div>
      }
    >
      <Shader.Aurora />
    </Shader.Root>
  );
}
