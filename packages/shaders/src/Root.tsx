import { Mesh, Program, Renderer, Triangle } from 'ogl';
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ClientGuard } from './ClientGuard';
import { ShaderContext } from './context';
import { DEFAULT_VERTEX } from './defaultVertex';
import type { PointerState, PresetRegistration, UniformMap } from './types';

const MAX_DPR = 1.5;
const VELOCITY_RESPONSIVENESS = 14;
const VELOCITY_DECAY = 5;

export type RootProps = {
  className?: string;
  style?: CSSProperties;
  fallback?: ReactNode;
  children?: ReactNode;
};

type HostInnerProps = {
  className?: string;
  style?: CSSProperties;
  fallback?: ReactNode;
  children?: ReactNode;
};

function HostInner({ className, style, fallback, children }: HostInnerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const presetRef = useRef<PresetRegistration | null>(null);
  const programRef = useRef<Program | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const geometryRef = useRef<Triangle | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hasPreset, setHasPreset] = useState(false);
  const [programEpoch, setProgramEpoch] = useState(0);
  const intersectingRef = useRef(true);
  const visibleRef = useRef(
    typeof document === 'undefined' ? true : document.visibilityState === 'visible',
  );
  const reducedMotionRef = useRef(false);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const pointerRef = useRef<PointerState>({
    x: 0.5,
    y: 0.5,
    vx: 0,
    vy: 0,
    active: false,
  });
  const pointerSampleRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const lastPointerMoveAtRef = useRef(0);
  const wantsPointerRef = useRef(false);

  const register = useCallback((preset: PresetRegistration) => {
    if (presetRef.current && presetRef.current.id !== preset.id) {
      console.error(
        `[Shader.Root] ignored second Preset "${preset.id}" (keeping "${presetRef.current.id}")`,
      );
      return () => {};
    }
    const sourcesChanged =
      !presetRef.current ||
      presetRef.current.fragment !== preset.fragment ||
      presetRef.current.vertex !== preset.vertex;
    presetRef.current = preset;
    wantsPointerRef.current = Boolean(preset.pointer);
    setHasPreset(true);
    if (sourcesChanged) {
      setRevealed(false);
      setProgramEpoch(n => n + 1);
    }
    return () => {
      if (presetRef.current?.id === preset.id) {
        presetRef.current = null;
        wantsPointerRef.current = false;
        setHasPreset(false);
        setRevealed(false);
        setProgramEpoch(n => n + 1);
      }
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      reducedMotionRef.current = mq.matches;
    };
    syncMotion();
    mq.addEventListener('change', syncMotion);

    const onVisibility = () => {
      visibleRef.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        intersectingRef.current = entry?.isIntersecting ?? false;
      },
      { threshold: 0 },
    );
    io.observe(host);

    return () => {
      mq.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !hasPreset) return;

    const onMove = (event: PointerEvent) => {
      if (!wantsPointerRef.current || reducedMotionRef.current) return;
      if (!visibleRef.current || !intersectingRef.current) return;
      const rect = host.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
      const now = performance.now();
      const prev = pointerSampleRef.current;
      let vx = pointerRef.current.vx;
      let vy = pointerRef.current.vy;
      if (prev) {
        const dt = (now - prev.t) / 1000;
        if (dt > 0 && dt < 0.1) {
          const instVx = (x - prev.x) / dt;
          const instVy = (y - prev.y) / dt;
          const alpha = 1 - Math.exp(-dt * VELOCITY_RESPONSIVENESS);
          vx += (instVx - vx) * alpha;
          vy += (instVy - vy) * alpha;
        }
      }
      pointerSampleRef.current = { x, y, t: now };
      lastPointerMoveAtRef.current = now;
      pointerRef.current = { x, y, vx, vy, active: true };
    };

    const onLeave = () => {
      pointerSampleRef.current = null;
      pointerRef.current = { ...pointerRef.current, active: false };
    };

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      pointerSampleRef.current = null;
      pointerRef.current = { ...pointerRef.current, active: false, vx: 0, vy: 0 };
    };
  }, [hasPreset, programEpoch]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !hasPreset || !presetRef.current) return;

    let disposed = false;
    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, MAX_DPR),
      powerPreference: 'low-power',
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 200ms ease';
    host.appendChild(canvas);

    const geometry = new Triangle(gl);
    const preset = presetRef.current;
    const uniforms: UniformMap = {
      uTime: { value: 0 },
      uResolution: { value: [1, 1] },
      ...preset.uniforms,
    };

    let program: Program;
    try {
      program = new Program(gl, {
        vertex: preset.vertex ?? DEFAULT_VERTEX,
        fragment: preset.fragment,
        uniforms,
      });
    } catch (error) {
      console.error('[Shader.Root] failed to compile program', error);
      host.removeChild(canvas);
      return;
    }

    const mesh = new Mesh(gl, { geometry, program });
    rendererRef.current = renderer;
    geometryRef.current = geometry;
    programRef.current = program;
    meshRef.current = mesh;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height);
      const res = program.uniforms.uResolution as { value: [number, number] };
      res.value = [width, height];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const stopLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const framePointer = (): PointerState | null => {
      if (!wantsPointerRef.current || reducedMotionRef.current) return null;
      return pointerRef.current;
    };

    const tick = (t: number) => {
      rafRef.current = 0;
      if (disposed) return;

      const canRun = visibleRef.current && intersectingRef.current && !reducedMotionRef.current;
      if (!canRun) {
        if (reducedMotionRef.current && programRef.current && meshRef.current) {
          const p = presetRef.current;
          if (p) {
            p.sync(program.uniforms as UniformMap, {
              time: 0,
              delta: 0,
              pointer: null,
            });
            renderer.render({ scene: mesh });
            if (!revealed) {
              canvas.style.opacity = '1';
              setRevealed(true);
            }
          }
        }
        return;
      }

      const delta = lastTimeRef.current ? (t - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = t;

      if (wantsPointerRef.current && !reducedMotionRef.current && delta > 0) {
        const idle = t - lastPointerMoveAtRef.current > 32;
        if (idle || !pointerRef.current.active) {
          const decay = Math.exp(-VELOCITY_DECAY * delta);
          pointerRef.current = {
            ...pointerRef.current,
            vx: pointerRef.current.vx * decay,
            vy: pointerRef.current.vy * decay,
          };
        }
      }

      const p = presetRef.current;
      if (p && programRef.current && meshRef.current) {
        p.sync(program.uniforms as UniformMap, {
          time: t * 0.001,
          delta,
          pointer: framePointer(),
        });
        renderer.render({ scene: mesh });
        if (canvas.style.opacity !== '1') {
          canvas.style.opacity = '1';
          setRevealed(true);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const ensureLoop = () => {
      if (disposed) return;
      if (!rafRef.current) {
        lastTimeRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    ensureLoop();
    const wake = () => ensureLoop();
    document.addEventListener('visibilitychange', wake);
    const wakeIo = new IntersectionObserver(wake, { threshold: 0 });
    wakeIo.observe(host);

    return () => {
      disposed = true;
      stopLoop();
      document.removeEventListener('visibilitychange', wake);
      wakeIo.disconnect();
      ro.disconnect();
      programRef.current = null;
      meshRef.current = null;
      geometryRef.current = null;
      rendererRef.current = null;
      if (canvas.parentNode === host) {
        host.removeChild(canvas);
      }
      const ext = gl.getExtension('WEBGL_lose_context');
      ext?.loseContext();
    };
  }, [hasPreset, programEpoch]);

  return (
    <ShaderContext.Provider value={{ register, hostRef }}>
      <div
        ref={hostRef}
        className={className}
        style={{ position: 'relative', overflow: 'hidden', ...style }}
        data-shader-root
      >
        {!revealed ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none',
            }}
            data-shader-fallback
          >
            {fallback}
          </div>
        ) : null}
        {children}
      </div>
    </ShaderContext.Provider>
  );
}

export function Root(props: RootProps) {
  return (
    <ClientGuard fallback={props.fallback}>
      <HostInner {...props} />
    </ClientGuard>
  );
}
