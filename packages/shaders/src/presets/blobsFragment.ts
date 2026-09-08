export const BLOBS_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uIntensity;
uniform float uThreshold;
uniform float uAttract;
uniform float uVelocityForce;
uniform vec2 uPointer;
uniform float uActive;
uniform vec2 uVelocity;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = (vUv - 0.5) * vec2(aspect, 1.0);
  float t = uTime * 0.35;

  vec2 ptr = (uPointer - 0.5) * vec2(aspect, 1.0);
  vec2 force = uVelocity * uVelocityForce * 0.12;

  vec2 b0 = vec2(sin(t) * 0.35, cos(t * 0.8) * 0.25) + ptr * uAttract * uActive + force;
  vec2 b1 = vec2(cos(t * 1.1) * 0.3, sin(t * 0.9) * 0.3) - ptr * uAttract * 0.5 * uActive + force * 0.5;
  vec2 b2 = vec2(sin(t * 0.7 + 1.5) * 0.4, cos(t * 1.2) * 0.2);

  float f0 = 0.12 / (dot(uv - b0, uv - b0) + 0.02);
  float f1 = 0.1 / (dot(uv - b1, uv - b1) + 0.02);
  float f2 = 0.09 / (dot(uv - b2, uv - b2) + 0.02);
  float field = f0 + f1 + f2;

  float mask = smoothstep(uThreshold - 0.15, uThreshold + 0.35, field);
  vec3 col = mix(uColorA, uColorB, clamp(f0 / max(field, 1e-3), 0.0, 1.0));
  col = mix(col, uColorC, clamp(f1 / max(field, 1e-3), 0.0, 1.0));
  col *= mask * (0.45 + uIntensity * 0.8);
  col += uColorB * mask * 0.15;

  gl_FragColor = vec4(col, 1.0);
}
`;
