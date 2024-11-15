import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
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
    ['purkinje-fiber-l']: THREE.Mesh
    ['purkinje-fiber-r']: THREE.Mesh
    ['tail-l-1']: THREE.Mesh
    ['tail-l-2']: THREE.Mesh
    ['tail-l-3']: THREE.Mesh
    ['tail-l-4']: THREE.Mesh
    ['tail-r']: THREE.Mesh
    ['tail-r-1']: THREE.Mesh
    ['tail-r-2']: THREE.Mesh
    ['tail-r-3']: THREE.Mesh
    ['tail-r-3b']: THREE.Mesh
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
  'right-atrium': 'right-atrium',
  'purkinje-fiber-l': 'purkinje-fiber-l',
  'purkinje-fiber-r': 'purkinje-fiber-r',
  'tail-l-1': 'tail-l-1',
  'tail-l-2': 'tail-l-2',
  'tail-l-3': 'tail-l-3',
  'tail-l-4': 'tail-l-4',
  'tail-r': 'tail-r',
  'tail-r-1': 'tail-r-1',
  'tail-r-2': 'tail-r-2',
  'tail-r-3': 'tail-r-3',
  'tail-r-3b': 'tail-r-3b',
};

export function HeartModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('3d-models/heart-cross-full-mesh.glb') as GLTFResult;

  // Create refs for all meshes we want to manipulate
  const meshRefs: MeshRefs = Object.keys(STRUCTURE_MESH_MAP).reduce((acc, key) => {
    acc[STRUCTURE_MESH_MAP[key]] = useRef<THREE.Mesh | THREE.SkinnedMesh>(null);
    return acc;
  }, {} as MeshRefs);

  console.log('meshRefs', meshRefs);

  // Get highlighted structures from store
  const highlightedStructures = useLearningStore(state => state.highlightedStructures);
  console.log('highlightedStructures', highlightedStructures);

  // Clone materials on mount to prevent shared states
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
          material.emissive.set('#ffffff');
          material.emissiveIntensity = 0.4;
          // Reset material properties
          material.metalness = 0.4;
          material.roughness = 0.3;
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
          material.color.set('#4287f5');
          material.emissive.set('#4287f5');
          material.emissiveIntensity = 0.6;
          // Adjust material properties for highlight effect
          material.metalness = 0.7;
          material.roughness = 0.3;
          material.opacity = 1.0;
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
                      ref={meshRefs['llb-post-fascicle']}
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
                    <group position={[-1.1, -0.8, 0]}>
                      <mesh
                        ref={meshRefs['purkinje-fiber-l']}
                        name="purkinje-fiber-l"
                        castShadow
                        receiveShadow
                        geometry={nodes['purkinje-fiber-l'].geometry}
                        material={materials.nodes}
                        position={[82.634, 64.091, 44.727]}
                        rotation={[1.551, -0.14, -0.003]}
                        scale={-13.01}
                      />
                      <mesh
                        ref={meshRefs['tail-l-1']}
                        name="tail-l-1"
                        castShadow
                        receiveShadow
                        geometry={nodes['tail-l-1'].geometry}
                        material={materials.nodes}
                        position={[97.989, 107.49, 44.987]}
                        rotation={[-1.633, 0.522, 0.031]}
                        scale={3.869}
                      />
                      <mesh
                        ref={meshRefs['tail-l-2']}
                        name="tail-l-2"
                        castShadow
                        receiveShadow
                        geometry={nodes['tail-l-2'].geometry}
                        material={materials.nodes}
                        position={[104.836, 117.705, 44.981]}
                        rotation={[1.565, 0.718, 0.004]}
                        scale={-4.125}
                      />
                      <mesh
                        ref={meshRefs['tail-l-3']}
                        name="tail-l-3"
                        castShadow
                        receiveShadow
                        geometry={nodes['tail-l-3'].geometry}
                        material={materials.nodes}
                        position={[105.342, 103.451, 44.824]}
                        rotation={[1.565, 0.718, 0.004]}
                        scale={-4.125}
                      />
                      <mesh
                        ref={meshRefs['tail-l-4']}
                        name="tail-l-4"
                        castShadow
                        receiveShadow
                        geometry={nodes['tail-l-4'].geometry}
                        material={materials.nodes}
                        position={[103.214, 70.454, 45.228]}
                        rotation={[-1.731, 0.376, 0.048]}
                        scale={-4.125}
                      />
                    </group>
                    <group position={[-8.6, -0.5, -0.3]} rotation={[0.0, 0.0, -0.1]}>
                      <mesh
                        ref={meshRefs['purkinje-fiber-r']}
                        name="purkinje-fiber-r"
                        castShadow
                        receiveShadow
                        geometry={nodes['purkinje-fiber-r'].geometry}
                        material={materials.nodes}
                        position={[26.623, 39.065, 45.429]}
                        rotation={[-1.734, -1.181, 2.989]}
                        scale={14.222}
                      />
                      <mesh
                        ref={meshRefs['tail-r']}
                        name="tail-r"
                        castShadow
                        receiveShadow
                        geometry={nodes['tail-r'].geometry}
                        material={materials.nodes}
                        position={[-29.331, 46.655, 46.115]}
                        rotation={[1.425, -0.939, -0.118]}
                        scale={8.297}
                      />
                      <mesh
                        ref={meshRefs['tail-r-1']}
                        name="tail-r-1"
                        castShadow
                        receiveShadow
                        geometry={nodes['tail-r-1'].geometry}
                        material={materials.nodes}
                        position={[-3.555, 37.879, 46.115]}
                        rotation={[1.425, -0.939, -0.118]}
                        scale={8.297}
                      />
                      <mesh
                        ref={meshRefs['tail-r-2']}
                        name="tail-r-2"
                        castShadow
                        receiveShadow
                        geometry={nodes['tail-r-2'].geometry}
                        material={materials.nodes}
                        position={[-18.596, 33.67, 46.115]}
                        rotation={[1.485, 0.074, 0.006]}
                        scale={8.297}
                      />
                      <mesh
                        ref={meshRefs['tail-r-3']}
                        name="tail-r-3"
                        castShadow
                        receiveShadow
                        geometry={nodes['tail-r-3'].geometry}
                        material={materials.nodes}
                        position={[14.036, 25.23, 46.115]}
                        rotation={[1.47, 0.544, 0.052]}
                        scale={8.297}
                      />
                      <mesh
                        ref={meshRefs['tail-r-3b']}
                        name="tail-r-3b"
                        castShadow
                        receiveShadow
                        geometry={nodes['tail-r-3b'].geometry}
                        material={materials.nodes}
                        position={[13.067, 25.23, 46.115]}
                        rotation={[-1.726, -0.084, -0.007]}
                        scale={2.353}
                      />
                    </group>
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

useGLTF.preload('3d-models/heart-cross-full-mesh.glb')