"use client";

import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface HeroSceneProps {
  /** Pauses rendering entirely when false (off-screen / hidden tab). */
  active: boolean;
  reduceMotion: boolean;
  /** Element that receives pointer events, so the whole hero drives the object. */
  eventSource: HTMLElement;
  onReady: () => void;
}

const ORBITERS = [
  { r: 2.45, y: 0.5, a: 0.0, c: "#8B5CF6" },
  { r: 2.45, y: -0.6, a: 1.7, c: "#3B82F6" },
  { r: 2.45, y: 0.1, a: 3.3, c: "#A78BFA" },
  { r: 2.45, y: -0.2, a: 4.9, c: "#60A5FA" },
] as const;

/** Deterministic pseudo-random so particle layout is stable between renders. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function DigitalObject({ reduce }: { reduce: boolean }) {
  const root = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const orbit = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const wide = viewport.width > 7.5;

  useFrame((state, dt) => {
    const g = root.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    // Mouse-reactive tilt (smoothly damped)
    const px = reduce ? 0 : state.pointer.x;
    const py = reduce ? 0 : state.pointer.y;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, px * 0.55, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.35, 3, dt);

    // Responsive composition: right-of-centre on desktop, above the copy on mobile
    const tx = wide ? viewport.width * 0.2 : 0;
    const ty = wide ? 0 : viewport.height * 0.2;
    g.position.x = THREE.MathUtils.damp(g.position.x, tx, 4, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, ty, 4, dt);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, wide ? 1 : 0.62, 4, dt));

    if (!reduce) {
      if (shell.current) {
        shell.current.rotation.y = t * 0.12;
        shell.current.rotation.x = t * 0.07;
      }
      if (ringA.current) ringA.current.rotation.z = t * 0.25;
      if (ringB.current) ringB.current.rotation.x = Math.PI / 1.9 + t * 0.18;
      if (orbit.current) orbit.current.rotation.y = t * 0.35;
    }
  });

  return (
    <group ref={root}>
      <Float
        speed={reduce ? 0 : 1.4}
        rotationIntensity={reduce ? 0 : 0.25}
        floatIntensity={reduce ? 0 : 0.9}
      >
        {/* Liquid-metal core */}
        <mesh>
          <icosahedronGeometry args={[1, 8]} />
          <MeshDistortMaterial
            color="#6d4df2"
            distort={0.32}
            speed={reduce ? 0 : 1.6}
            roughness={0.12}
            metalness={0.85}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Wireframe lattice shell */}
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.28} />
        </mesh>

        {/* Orbit rings */}
        <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.15, 0.012, 16, 200]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.9} />
        </mesh>
        <mesh ref={ringB} rotation={[Math.PI / 1.9, 0.6, 0]}>
          <torusGeometry args={[2.65, 0.008, 16, 200]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
        </mesh>

        {/* Small orbiting facets */}
        <group ref={orbit}>
          {ORBITERS.map((o) => (
            <mesh key={o.a} position={[Math.cos(o.a) * o.r, o.y, Math.sin(o.a) * o.r]}>
              <octahedronGeometry args={[0.09]} />
              <meshStandardMaterial color={o.c} emissive={o.c} emissiveIntensity={1.4} roughness={0.3} />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}

function Particles({ count, reduce }: { count: number; reduce: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rnd = seeded(42);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + rnd() * 6;
      const theta = rnd() * Math.PI * 2;
      const phi = Math.acos(2 * rnd() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, dt) => {
    const p = ref.current;
    if (!p || reduce) return;
    p.rotation.y += dt * 0.02;
    p.rotation.x = THREE.MathUtils.damp(p.rotation.x, -state.pointer.y * 0.08, 2, dt);
    p.position.x = THREE.MathUtils.damp(p.position.x, state.pointer.x * 0.25, 2, dt);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        color="#b4a6ff"
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#8B5CF6" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#3B82F6" />
      {/* Procedural studio environment — no external HDR download needed */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="rect" intensity={4} position={[2, 2, 3]} scale={[6, 2, 1]} color="#8B5CF6" />
          <Lightformer form="rect" intensity={3} position={[-3, -1, 2]} scale={[5, 1.5, 1]} color="#3B82F6" />
          <Lightformer form="ring" intensity={2} position={[0, 4, -2]} scale={4} color="#ffffff" />
        </group>
      </Environment>
    </>
  );
}

export default function HeroScene({ active, reduceMotion, eventSource, onReady }: HeroSceneProps) {
  const isSmall = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, isSmall ? 1.5 : 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      eventSource={eventSource}
      eventPrefix="client"
      onCreated={onReady}
      aria-hidden="true"
    >
      <Lighting />
      <DigitalObject reduce={reduceMotion} />
      <Particles count={isSmall ? 450 : 900} reduce={reduceMotion} />
    </Canvas>
  );
}
