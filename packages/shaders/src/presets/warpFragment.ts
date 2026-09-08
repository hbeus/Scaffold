export const WARP_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uIntensity;
uniform float uWarp;
uniform float uScale;
uniform float uPointerPull;
uniform float uVelocityPull;
uniform vec2 uPointer;
uniform float uActive;
uniform vec2 uVelocity;
uniform vec2 uResolution;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = (vUv - 0.5) * uScale;
  float t = uTime * 0.2;
  float w = uWarp;

  vec2 ptr = (uPointer - 0.5) * vec2(aspect, 1.0);
  float speed = length(uVelocity);
  vec2 pull = ptr * uPointerPull * uActive + uVelocity * uVelocityPull * 0.06;
  uv += pull * (0.35 + speed * 0.15);

  vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(1.7, 9.2) + t * 0.7));
  vec2 r = vec2(
    fbm(uv + w * q + vec2(1.3, 2.8) + t * 0.15),
    fbm(uv + w * q + vec2(8.3, 2.1) - t * 0.12)
  );
  float f = fbm(uv + w * r);

  vec3 col = mix(uColorA, uColorB, clamp(f, 0.0, 1.0));
  col = mix(col, uColorC, clamp(length(q) * 0.85, 0.0, 1.0));
  col *= 0.45 + uIntensity * f;

  gl_FragColor = vec4(col, 1.0);
}
`;
