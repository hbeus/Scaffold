export const PALETTE_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uIntensity;
uniform float uMode;
uniform float uStops;
uniform vec2 uResolution;

varying vec2 vUv;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  float t = uTime * 0.12;

  float field = uv.x * 0.65 + uv.y * 0.35 + t;
  float ang = atan(uv.y - 0.5, (uv.x - 0.5) * aspect) / 6.28318 + 0.5 + t * 0.35;
  float idx = mix(field, ang, clamp(uMode, 0.0, 1.0));
  idx = fract(idx * max(uStops, 1.0) / max(uStops, 1.0));

  vec3 a = mix(uColorA, vec3(0.5), 0.35);
  vec3 b = abs(uColorB - uColorA) * 0.55 + 0.2;
  vec3 c = vec3(1.0, 0.85, 0.65);
  vec3 d = uColorC;
  vec3 col = palette(idx, a, b, c, d);
  col = mix(col, mix(uColorA, uColorB, uv.y), 0.25);
  col *= 0.5 + uIntensity * 0.75;

  gl_FragColor = vec4(col, 1.0);
}
`;
