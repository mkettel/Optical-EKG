import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useLearningStore } from '@/store/learning-store'

type GLTFResult = GLTF & {
  nodes: {
    ['anterior-internodal']: THREE.Mesh
    ['av-node']: THREE.Mesh
    ['bachman-pathway']: THREE.Mesh
    ['bundle-of-his']: THREE.Mesh
    ['heart-muscle']: THREE.SkinnedMesh
    ['left-bundle-branch']: THREE.Mesh
    ['llb-post-fascicle']: THREE.Mesh
    ['llb-post-fascicle-sup']: THREE.Mesh
    ['middle-internodal']: THREE.Mesh
    Object_30: THREE.SkinnedMesh
    ['posterior-internodal']: THREE.Mesh
    ['right-atrium']: THREE.SkinnedMesh
    ['right-bundle-branch']: THREE.Mesh
    ['sa-node']: THREE.Mesh
    GLTF_created_0_rootJoint: THREE.Bone
  }
  materials: {
    nodes: THREE.MeshStandardMaterial
    ['material_0.001']: THREE.MeshPhysicalMaterial
    material_0: THREE.MeshPhysicalMaterial
  }
}

interface MeshRefs {
  [key: string]: React.MutableRefObject<THREE.Mesh | THREE.SkinnedMesh | null>;
}

// Updated map to include all structures from the new model
const STRUCTURE_MESH_MAP: { [key: string]: string } = {
  'sa-node': 'sa-node',
  'av-node': 'av-node',
  'bundle-of-his': 'bundle-of-his',
  'anterior-internodal': 'anterior-internodal',
  'middle-internodal': 'middle-internodal',
  'posterior-internodal': 'posterior-internodal',
  'bachman-pathway': 'bachman-pathway',
  'left-bundle-branch': 'left-bundle-branch',
  'right-bundle-branch': 'right-bundle-branch',
  'llb-post-fascicle': 'llb-post-fascicle',
  'llb-post-fascicle-sup': 'llb-post-fascicle-sup',
  'heart-muscle': 'heart-muscle',
  'right-atrium': 'right-atrium'
};

export function HeartModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('3d-models/heart-cross-grouped.glb') as GLTFResult;

  useEffect(() => {
    // Clone materials for each mesh to prevent shared states
    Object.values(meshRefs).forEach(meshRef => {
      if (meshRef.current) {
        const material = meshRef.current.material as THREE.Material;
        if (material instanceof THREE.MeshStandardMaterial || 
            material instanceof THREE.MeshPhysicalMaterial) {
          meshRef.current.material = material.clone();
        }
      }
    });
  }, []);
  
  // Get highlighted structures from store
  const highlightedStructures = useLearningStore(state => state.highlightedStructures);
  console.log('highlightedStructures', highlightedStructures);

  // Create refs for all meshes we want to manipulate
  const meshRefs: MeshRefs = Object.keys(STRUCTURE_MESH_MAP).reduce((acc, key) => {
    acc[STRUCTURE_MESH_MAP[key]] = useRef<THREE.Mesh | THREE.SkinnedMesh>(null);
    return acc;
  }, {} as MeshRefs);

  // Effect to handle highlighting
  useEffect(() => {
    // Reset all materials to default state
    Object.values(meshRefs).forEach(meshRef => {
      if (meshRef.current) {
        const material = meshRef.current.material as THREE.Material;
        if (material instanceof THREE.MeshStandardMaterial || 
            material instanceof THREE.MeshPhysicalMaterial) {
          // Reset base color
          material.color.set('#ffffff');
          // Reset emissive
          material.emissive.set('#000000');
          material.emissiveIntensity = 0;
          // Reset material properties
          material.metalness = 0.5;
          material.roughness = 0.8;
          material.opacity = 1;
          material.transparent = true;
        }
      }
    });

    // Apply highlighting to selected structures
    highlightedStructures.forEach(structureId => {
      const meshName = STRUCTURE_MESH_MAP[structureId];
      const meshRef = meshRefs[meshName];
      console.log('Highlighting:', meshName);
      
      if (meshRef?.current) {
        const material = meshRef.current.material as THREE.Material;
        if (material instanceof THREE.MeshStandardMaterial || 
            material instanceof THREE.MeshPhysicalMaterial) {
          // Set both base color and emissive for better visibility
          material.color.set('#87eb1c');
          material.emissive.set('#87eb1c');
          material.emissiveIntensity = 0.5;
          // Adjust material properties for highlight effect
          material.metalness = 0.1;
          material.roughness = 0.3;
          material.opacity = 0.8;
          material.transparent = true;
        }
      }
    });
  }, [highlightedStructures]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          position={[0.025, 0.0, -0.02]}
          rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="RootNode0_0" scale={0.01}>
                <group name="skeletal3_3">
                  <group name="GLTF_created_0">
                    <mesh
                      ref={meshRefs['anterior-internodal']}
                      name="anterior-internodal"
                      castShadow
                      receiveShadow
                      geometry={nodes['anterior-internodal'].geometry}
                      material={materials.nodes}
                      position={[-72.883, 180.717, 30.743]}
                      scale={15.711}
                    />
                    <mesh
                      ref={meshRefs['av-node']}
                      name="av-node"
                      castShadow
                      receiveShadow
                      geometry={nodes['av-node'].geometry}
                      material={materials.nodes}
                      position={[-55.527, 161.223, -3.817]}
                      rotation={[0, 0, 1.318]}
                      scale={-7.643}
                    />
                    <mesh
                      ref={meshRefs['bachman-pathway']}
                      name="bachman-pathway"
                      castShadow
                      receiveShadow
                      geometry={nodes['bachman-pathway'].geometry}
                      material={materials.nodes}
                      position={[-60.586, 193.174, -17.555]}
                      scale={[27.82, 100, 100]}
                    />
                    <mesh
                      ref={meshRefs['bundle-of-his']}
                      name="bundle-of-his"
                      castShadow
                      receiveShadow
                      geometry={nodes['bundle-of-his'].geometry}
                      material={materials.nodes}
                      position={[-51.048, 156.0, 10.984]}
                      rotation={[-Math.PI, 1.536, -Math.PI]}
                      scale={8.8}
                    />
                    <skinnedMesh

                      name="heart-muscle"
                      geometry={nodes['heart-muscle'].geometry}
                      material={materials['material_0.001']}
                      skeleton={nodes['heart-muscle'].skeleton}
                    />
                    <group name="heart2_2_correction">
                      <group name="heart2_2" />
                    </group>
                    <mesh
                      ref={meshRefs['left-bundle-branch']}
                      name="left-bundle-branch"
                      castShadow
                      receiveShadow
                      geometry={nodes['left-bundle-branch'].geometry}
                      material={materials.nodes}
                      position={[6.099, 128.12, 43.208]}
                      rotation={[0.909, -0.602, -0.19]}
                      scale={7.126}
                    />
                    <mesh
                      name="llb-post-fascicle"
                      castShadow
                      receiveShadow
                      geometry={nodes['llb-post-fascicle'].geometry}
                      material={materials.nodes}
                      position={[30.711, 106.425, 34.967]}
                      rotation={[2.504, -1.414, -0.629]}
                      scale={[9.217, 39.597, 31.084]}
                    />
                    <mesh
                      ref={meshRefs['llb-post-fascicle-sup']}
                      name="llb-post-fascicle-sup"
                      castShadow
                      receiveShadow
                      geometry={nodes['llb-post-fascicle-sup'].geometry}
                      material={materials.nodes}
                      position={[32.056, 108.551, 31.2]}
                      rotation={[-0.235, -0.438, 2.215]}
                      scale={6.18}
                    />
                    <mesh
                      ref={meshRefs['middle-internodal']}
                      name="middle-internodal"
                      castShadow
                      receiveShadow
                      geometry={nodes['middle-internodal'].geometry}
                      material={materials.nodes}
                      position={[-97.558, 180.08, -3.868]}
                      rotation={[-0.361, -0.04, -1.744]}
                      scale={10.808}
                    />
                    <skinnedMesh
                      name="Object_30"
                      geometry={nodes.Object_30.geometry}
                      material={materials.material_0}
                      skeleton={nodes.Object_30.skeleton}
                    />
                    <mesh
                      ref={meshRefs['posterior-internodal']}
                      name="posterior-internodal"
                      castShadow
                      receiveShadow
                      geometry={nodes['posterior-internodal'].geometry}
                      material={materials.nodes}
                      position={[-96.217, 181.473, 16.676]}
                      rotation={[-0.723, 0.723, -1.842]}
                      scale={[11.448, 9.663, 13.002]}
                    />
                    <skinnedMesh
                      name="right-atrium"
                      geometry={nodes['right-atrium'].geometry}
                      material={materials.material_0}
                      skeleton={nodes['right-atrium'].skeleton}
                    />
                    <mesh
                      ref={meshRefs['right-bundle-branch']}
                      name="right-bundle-branch"
                      castShadow
                      receiveShadow
                      geometry={nodes['right-bundle-branch'].geometry}
                      material={materials.nodes}
                      position={[2.512, 125.996, 44.597]}
                      rotation={[-1.249, 1.156, -0.078]}
                      scale={7.326}
                    />
                    <mesh
                      ref={meshRefs['sa-node']}
                      name="sa-node"
                      castShadow
                      receiveShadow
                      geometry={nodes['sa-node'].geometry}
                      material={materials.nodes}
                      position={[-93.379, 191.977, -9.566]}
                      rotation={[2.223, -0.309, -1.191]}
                      scale={[23.786, 21.812, 25.176]}
                    />
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('3d-models/heart-cross-grouped.glb')