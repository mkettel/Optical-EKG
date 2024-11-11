// scene/scene.tsx
'use client';

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { HeartModel } from "@/components/heart/heart-model";
import { Center, OrbitControls, PerspectiveCamera, Grid } from "@react-three/drei";
import { useLearningStore, DEFAULT_CAMERA_POSITION, DEFAULT_CAMERA_TARGET, CAMERA_CONFIG } from "@/store/learning-store";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function lerpVectors(
  current: THREE.Vector3,
  target: THREE.Vector3,
  alpha: number
): THREE.Vector3 {
  return current.clone().lerp(target, alpha);
}

function CameraController() {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const { currentModuleId, currentStepIndex, modules } = useLearningStore();

  
  // Refs to store current camera positions
  const currentPosition = useRef(new THREE.Vector3(...DEFAULT_CAMERA_POSITION));
  const currentTarget = useRef(new THREE.Vector3(...DEFAULT_CAMERA_TARGET));
  
  // Refs to store target positions
  const targetPosition = useRef(new THREE.Vector3(...DEFAULT_CAMERA_POSITION));
  const targetLookAt = useRef(new THREE.Vector3(...DEFAULT_CAMERA_TARGET));
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const animationProgress = useRef(0);
  
  // Get current step data
  const currentModule = modules.find(m => m.id === currentModuleId);
  const currentStep = currentModule?.steps[currentStepIndex];

  // Effect to handle returning to default position
  useEffect(() => {
    if (currentModuleId === null) {
      // Store current position before starting new animation
      if (controlsRef.current) {
        currentPosition.current.copy(camera.position);
        currentTarget.current.copy(controlsRef.current.target);
      }

      // Set new target positions to default
      targetPosition.current.set(...DEFAULT_CAMERA_POSITION);
      targetLookAt.current.set(...DEFAULT_CAMERA_TARGET);

      // Reset and start animation
      animationProgress.current = 0;
      setIsAnimating(true);
    }
  }, [currentModuleId, camera]);

  // Initialize controls position
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.copy(...DEFAULT_CAMERA_TARGET);
    }
  }, []);

  // Update target positions when step changes
  useEffect(() => {
    if (currentStep?.cameraPosition) {
      const [x, y, z] = currentStep.cameraPosition;
      const [targetX, targetY, targetZ] = currentStep.cameraTarget || [0, 0, 0];

      // Store current position before starting new animation
      if (controlsRef.current) {
        currentPosition.current.copy(camera.position);
        currentTarget.current.copy(controlsRef.current.target);
      }

      // Set new target positions
      targetPosition.current.set(x, y, z);
      targetLookAt.current.set(targetX, targetY, targetZ);

      // Reset and start animation
      animationProgress.current = 0;
      setIsAnimating(true);
    }
  }, [currentStep, camera]);

  // Animation loop
  useFrame((state, delta) => {
    if (isAnimating && controlsRef.current) {
      // Increment progress with easing
      animationProgress.current += delta * 1.5; // Adjusted for smoother movement
      const alpha = easeInOutCubic(Math.min(1, animationProgress.current));

      // Calculate new positions
      const newPosition = lerpVectors(
        currentPosition.current,
        targetPosition.current,
        alpha
      );
      
      const newTarget = lerpVectors(
        currentTarget.current,
        targetLookAt.current,
        alpha
      );

      // Update camera and controls
      camera.position.copy(newPosition);
      controlsRef.current.target.copy(newTarget);
      
      // Force controls update
      controlsRef.current.update();

      // Check if animation is complete
      if (alpha === 1) {
        // Ensure final positions are exact
        camera.position.copy(targetPosition.current);
        controlsRef.current.target.copy(targetLookAt.current);
        controlsRef.current.update();
        setIsAnimating(false);
      }
    }
  });

  return (
    <OrbitControls 
      ref={controlsRef}
      enableDamping
      dampingFactor={0.04}
      minDistance={CAMERA_CONFIG.limits.minDistance}
      maxDistance={CAMERA_CONFIG.limits.maxDistance}
      enabled={!isAnimating}
      // Set initial target position
      target={DEFAULT_CAMERA_TARGET}
      // Prevent auto-rotation
      autoRotate={false}
    />
  );
}

export default function Scene() {
  return (
    <Canvas 
      className="w-full h-full bg-white rounded-md"
      shadows
      // Set initial camera position
      camera={{ 
        position: DEFAULT_CAMERA_POSITION, 
        fov: CAMERA_CONFIG.limits.fov,
        near: CAMERA_CONFIG.limits.near,
        far: CAMERA_CONFIG.limits.far
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <CameraController />
      <Center>
        <group position={[0, -0.5, 0]}>
          <HeartModel />
        </group>
      </Center>
      {/* Ground plane setup */}
      <group position={[0, -0.2, 0]}>
        {/* Infinite grid for reference */}
        <Grid
          position={[0, 0.01, 0]}
          args={[25, 25]}
          cellSize={0.4}
          cellThickness={0.4}
          cellColor="#fc4e4e"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#202020"
          fadeDistance={15}
          fadeStrength={1}
          followCamera={false}
        />        
      </group>
    </Canvas>
  );
}