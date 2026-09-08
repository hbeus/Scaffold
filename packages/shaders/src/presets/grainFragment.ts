export const GRAIN_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform float uAmount;
uniform float uSize;
uniform float uLumaResponse;
uniform vec2 uResolution;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv * uResolution / max(uSize, 0.001);
  float n = hash(floor(uv) + floor(uTime * 60.0));
  float luma = dot(uColor, vec3(0.299, 0.587, 0.114));
  float response = mix(1.0, 1.0 - luma, clamp(uLumaResponse, 0.0, 1.0));
  float grain = (n - 0.5) * uAmount * response;
  vec3 col = clamp(uColor + grain, 0.0, 1.0);
  gl_FragColor = vec4(col, 1.0);
}
`;
