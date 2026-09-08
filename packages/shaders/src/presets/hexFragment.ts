export const HEX_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColorLine;
uniform vec3 uColorFill;
uniform float uScale;
uniform float uThickness;
uniform float uGlow;
uniform vec2 uResolution;

varying vec2 vUv;

vec2 hexCenter(vec2 p) {
  vec2 r = vec2(1.0, 1.7320508);
  vec2 h = r * 0.5;
  vec2 a = mod(p, r) - h;
  vec2 b = mod(p - h, r) - h;
  return dot(a, a) < dot(b, b) ? a : b;
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = (vUv - 0.5) * vec2(aspect, 1.0) * uScale;
  float breathe = 1.0 + 0.04 * sin(uTime * 0.8);
  uv *= breathe;

  vec2 g = hexCenter(uv);
  float d = length(g);
  float edge = abs(d - 0.42);
  float line = 1.0 - smoothstep(0.0, uThickness * 0.08, edge);
  float fill = 1.0 - smoothstep(0.38, 0.45, d);
  float glow = exp(-edge * 18.0) * uGlow;

  vec3 col = mix(uColorFill, uColorLine, clamp(line + glow, 0.0, 1.0));
  col = mix(uColorFill * 0.85, col, max(fill, line));

  gl_FragColor = vec4(col, 1.0);
}
`;
