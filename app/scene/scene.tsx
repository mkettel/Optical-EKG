'use client';

import { Canvas } from "@react-three/fiber";
import { HeartModel } from "@/components/heart-model";
import { Center, OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function Scene() {

  
  return (
    <Canvas 
      shadows
      camera={{ position: [0, 0, 5], fov: 65 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls 
        target={[0, 1.5, 0]}
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={10}
      />
      <Center>
        <group position={[0, -0.5, 0]}>
          <HeartModel />
        </group>
      </Center>
    </Canvas>
  );
}