export const RIPPLE_FRAGMENT = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uAmplitude;
uniform float uFrequency;
uniform float uThickness;
uniform float uDecay;
uniform float uVelocityAmp;
uniform float uVelocityFreq;
uniform vec2 uOrigin;
uniform float uActive;
uniform vec2 uVelocity;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 uv = (vUv - 0.5) * vec2(aspect, 1.0) + 0.5;
  vec2 origin = uOrigin;
  origin.x = (origin.x - 0.5) * aspect + 0.5;

  float speed = length(uVelocity);
  float amp = uAmplitude * (1.0 + speed * uVelocityAmp);
  float freq = uFrequency * (1.0 + speed * uVelocityFreq * 0.15);

  float d = distance(uv, origin);
  float wave = sin(d * freq - uTime * 3.0);
  float envelope = exp(-d * uDecay);
  float ring = abs(wave);
  float band = 1.0 - smoothstep(0.0, uThickness * 0.08, ring);
  float pulse = band * envelope * amp * mix(0.55, 1.0, uActive);

  vec3 col = mix(uColorA, uColorB, clamp(pulse + (1.0 - d) * 0.25, 0.0, 1.0));
  col += uColorB * pulse * 0.65;

  gl_FragColor = vec4(col, 1.0);
}
`;
