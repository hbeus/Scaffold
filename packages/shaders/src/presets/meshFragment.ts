export const MESH_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uColorD;
uniform float uIntensity;
uniform float uSoftness;
uniform float uAttract;
uniform float uVelocityBias;
uniform vec2 uPointer;
uniform float uActive;
uniform vec2 uVelocity;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = uTime * 0.15;
  vec2 vel = uVelocity * uVelocityBias * 0.08;
  vec2 attract = (uPointer - 0.5) * vec2(aspect, 1.0) * uAttract * uActive;

  vec2 c0 = vec2(sin(t * 0.9), -0.35 + cos(t * 0.7) * 0.12) + attract * 0.55 + vel;
  vec2 c1 = vec2(0.35 + cos(t * 1.1) * 0.2, -0.15 + sin(t * 0.8) * 0.1) - attract * 0.35 + vel * 0.6;
  vec2 c2 = vec2(-0.4 + sin(t * 0.75) * 0.15, 0.05 + cos(t * 1.05) * 0.12) + attract * 0.25;
  vec2 c3 = vec2(cos(t * 0.65) * 0.25, -0.55 + sin(t * 0.9) * 0.08) + attract * 0.4 - vel * 0.4;

  float s = max(uSoftness, 0.05);
  float w0 = exp(-dot(p - c0, p - c0) / (s * 0.55));
  float w1 = exp(-dot(p - c1, p - c1) / (s * 0.7));
  float w2 = exp(-dot(p - c2, p - c2) / (s * 0.65));
  float w3 = exp(-dot(p - c3, p - c3) / (s * 0.9));

  float sum = w0 + w1 + w2 + w3 + 1e-4;
  vec3 col = (uColorA * w0 + uColorB * w1 + uColorC * w2 + uColorD * w3) / sum;
  float wash = smoothstep(0.85, 0.05, uv.y);
  col = mix(col * 0.35, col, wash);
  col *= 0.55 + uIntensity * 0.7;

  gl_FragColor = vec4(col, 1.0);
}
`;
