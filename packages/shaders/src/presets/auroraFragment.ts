export const AURORA_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uIntensity;
uniform float uBandCount;
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
  vec2 uv = vUv;
  float bands = max(uBandCount, 1.0);
  float t = uTime * 0.35;

  float n = fbm(vec2(uv.x * 2.5 + t * 0.4, uv.y * bands * 0.55 - t * 0.15));
  float ridge = smoothstep(0.35, 0.75, n);
  float curtain = pow(1.0 - abs(uv.y * 2.0 - 1.0), 1.4);
  float glow = ridge * curtain * uIntensity;

  vec3 col = mix(uColorA, uColorB, clamp(n * 1.2, 0.0, 1.0));
  col += uColorB * glow * 0.55;
  col *= 0.35 + glow;

  gl_FragColor = vec4(col, 1.0);
}
`;
