'use client';

// store/learning-store.ts
import { create } from 'zustand';
import { LessonModule } from '@/lib/types/learning';
import { EKGPattern, EKGSegment, normalSinusRhythm } from '@/lib/constants/ekg-patterns';


interface LearningState {
  currentModuleId: string | null;
  currentStepIndex: number;
  isPlaying: boolean;
  highlightedStructures: string[];
  modules: LessonModule[];
  setCurrentModule: (moduleId: string | null) => void;
  nextStep: () => void;
  previousStep: () => void;
  setPlaying: (playing: boolean) => void;
  reset: () => void;
  cameraReset?: boolean;
  ekgPatterns: {
    [key: string]: EKGPattern;
  };
  currentEKGPattern: string;
}

export const CAMERA_CONFIG = {
  default: {
    position: [0, 1.5, 3.5] as [number, number, number],
    target: [0, 1.5, 0] as [number, number, number],
  },
  limits: {
    minDistance: 0.7,
    maxDistance: 4.5,
    fov: 65,
    near: 0.1,
    far: 1000
  }
} as const;

export const DEFAULT_CAMERA_POSITION = CAMERA_CONFIG.default.position;
export const DEFAULT_CAMERA_TARGET = CAMERA_CONFIG.default.target;



const useLearningStore = create<LearningState>()((set, get) => ({
  currentModuleId: null,
  currentStepIndex: 0,
  isPlaying: false,
  highlightedStructures: [],
  ekgPatterns: {
    'normal-sinus-rhythm': normalSinusRhythm,
  },
  currentEKGPattern: 'normal-sinus-rhythm',
  modules: [
    {
      id: 'electrical-conduction-components',
      title: 'Electrical Conduction Components',
      description: 'Learn about the cardiac conduction system',
      steps: [
        {
          id: 'sa-node',
          title: 'Sinoatrial Node',
          description: "The sinoatrial (SA) node, located in the right atrial wall near the superior vena cava, is the heart's natural pacemaker. It generates electrical impulses at a rate of 60-100 beats per minute, initiating each normal heartbeat. The SA node's unique cells automatically depolarize, creating the heart's natural rhythm. Dysfunction of the SA node can lead to various arrhythmias, including sick sinus syndrome.",
          highlightedStructures: ['sa-node'],
          cameraPosition: [-0.3, 1.7, 0.7],
          cameraTarget: [-0.6, 1.8, 0]
        },
        {
          id: 'bachman-pathway',
          title: 'Bachman Bundle',
          description: "Bachmann's bundle is a specialized interatrial conduction pathway that rapidly conducts electrical impulses from the right to left atrium. Located in the anterior wall of the atria, it ensures synchronized contraction of both atrial chambers. This coordination is crucial for optimal filling of the ventricles. Disruption of this pathway can lead to interatrial conduction block and contribute to conditions like atrial fibrillation.",
          highlightedStructures: ['bachman-pathway'],
          cameraPosition: [-0.7, 1.7, 0.7],
          cameraTarget: [-0.6, 1.8, 0]
        },
        {
          id: 'internodal-pathways',
          title: 'Internodal Pathways',
          description: "The internodal pathways consist of three main routes (anterior, middle, and posterior) that conduct impulses from the SA node to the AV node. These specialized pathways ensure rapid and coordinated conduction through the right atrium. The anterior pathway runs through Bachmann's bundle, the middle follows the septum, and the posterior travels along the crista terminalis. Together, they facilitate organized atrial depolarization and proper timing of the cardiac cycle.",
          highlightedStructures: ['anterior-internodal', 'middle-internodal', 'posterior-internodal'],
          cameraPosition: [-0.55, 1.7, 1.1],
          cameraTarget: [-0.5, 1.8, 0]
        },
        {
          id: 'av-node',
          title: 'Atrioventricular Node',
          description: "The atrioventricular (AV) node, located in the interatrial septum, acts as the electrical bridge between the atria and ventricles. It performs two crucial functions: delaying impulse conduction by about 0.1 seconds (allowing atrial contraction to complete before ventricular contraction begins) and filtering rapid atrial impulses to protect the ventricles. The AV node also serves as a backup pacemaker at 40-60 beats per minute if the SA node fails. Disorders of the AV node can result in various degrees of heart block.",
          highlightedStructures: ['av-node'],
          cameraPosition: [-1.1, 1.7, 0.8],
          cameraTarget: [-0.1, 1.5, 0]
        },
        {
          id: 'bundle-of-his',
          title: 'Bundle of His',
          description: "The Bundle of His, discovered by Wilhelm His Jr., is a critical continuation of the cardiac conduction system after the AV node. It penetrates the cardiac skeleton and divides into the right and left bundle branches. This specialized tissue is the only electrical connection between the atria and ventricles, insulated by fibrous tissue to prevent inappropriate conduction. Damage to the Bundle of His can result in complete heart block (third-degree AV block), requiring pacemaker implantation.",
          highlightedStructures: ['bundle-of-his'],
          cameraPosition: [-0.2, 1.5, 0.9],
          cameraTarget: [0.2, 1.3, 0]
        },
        {
          id: 'right-bundle-branch',
          title: 'Right Bundle Branch',
          description: "The right bundle branch extends from the Bundle of His through the interventricular septum to the right ventricle. It conducts electrical impulses specifically to the right ventricular muscle, ensuring coordinated contraction. This branch is a thin, single pathway that can be vulnerable to injury. Right bundle branch block (RBBB) occurs when conduction is delayed or blocked, leading to characteristic ECG changes including a widened QRS complex and terminal R wave in V1.",
          highlightedStructures: ['right-bundle-branch'],
          cameraPosition: [0.3, 1.0, 1.32],
          cameraTarget: [0.2, 0.8, 0]
        },
        {
          id: 'left-bundle-branch',
          title: 'Left Bundle Branch',
          description: "The left bundle branch divides early into anterior and posterior fascicles to supply the left ventricle. It carries impulses to the larger, more muscular left ventricle, which is responsible for pumping blood to the systemic circulation. The left bundle branch has a wider distribution than the right, reflecting the greater mass and importance of left ventricular contraction. Left bundle branch block (LBBB) can indicate underlying heart disease and affects ventricular synchrony.",
          highlightedStructures: ['left-bundle-branch'],
          cameraPosition: [0.8, 1.0, 1.2],
          cameraTarget: [0.3, 0.8, 0]
        },
        {
          id: 'llb-posterior-fascicles',
          title: 'Left Posterior Fascicle',
          description: "The left posterior fascicle is one of two main divisions of the left bundle branch, supplying the posterior and inferior walls of the left ventricle. This fascicle is typically thicker and less vulnerable to injury than the anterior fascicle. Left posterior fascicular block is relatively rare compared to anterior fascicular block, but when present, it can cause subtle ECG changes including right axis deviation and small q waves in leads II, III, and aVF.",
          highlightedStructures: ['llb-post-fascicle', 'llb-post-fascicle-sup'],
          cameraPosition: [1.0, 1.0, 1.2],
          cameraTarget: [0.3, 0.8, 0]
        },
        {
          id: 'purkinje-fibers',
          title: 'Purkinje Fibers',
          description: "Purkinje fibers are specialized muscle fibers that rapidly conduct electrical impulses to the ventricular myocardium. These fibers are larger and more extensive in the left ventricle, reflecting the greater demands of systemic circulation. Purkinje fibers ensure rapid and synchronized ventricular depolarization, leading to efficient contraction. Dysfunction of Purkinje fibers can result in ventricular arrhythmias and impaired cardiac function.",
          highlightedStructures: ['purkinje-fiber-l', 'purkinje-fiber-r', 'tail-l-1', 'tail-l-2', 'tail-l-3', 'tail-l-4', 'tail-r', 'tail-r-1', 'tail-r-2', 'tail-r-3', 'tail-r-3b'],
          cameraPosition: [0.5, 0.5, 1.5],
          cameraTarget: [0.3, 0.8, 0]
        }
      ]
    },
    {
      id: 'normal-sinus-rhythm',
      title: 'Normal Sinus Rhythm',
      description: 'Normal electrical activity of the heart',
      steps: [
        {
          id: 'sa-node',
          title: 'Sinoatrial Node',
          description: "The heartbeat begins in the SA node, the heart's natural pacemaker.",
          highlightedStructures: ['sa-node'],
          cameraPosition: [-0.2, 1.5, 2.0],
          cameraTarget: [-0.2, 1.5, 0]
        },
        {
          id: 'av-node',
          title: 'Atrioventricular Node',
          description: "The AV node is the gateway between the atria and the ventricles.",
          highlightedStructures: ['av-node'],
          cameraPosition: [0, 1.5, 2.2],
          cameraTarget: [0, 1.5, 0]
        },
        {
          id: 'bundle-of-his',
          title: 'Bundle of His',
          description: "The Bundle of His is a collection of heart muscle cells specialized for electrical conduction.",
          highlightedStructures: ['bundle-of-his'],
          cameraPosition: [0, 1, 3],
          cameraTarget: [0, 1.5, 0]
        },
        {
          id: 'purkinje-fibers',
          title: 'Purkinje Fibers',
          description: "Purkinje fibers are specialized muscle fibers that conduct the cardiac impulse.",
          highlightedStructures: ['purkinje-fibers'],
          cameraPosition: [0, 1, 3],
          cameraTarget: [0, 1.5, 0]
        }
      ]
    },
  ],
  setCurrentModule: (moduleId) => {
    const module = get().modules.find(m => m.id === moduleId);
    set({ 
      currentModuleId: moduleId, 
      currentStepIndex: 0,
      isPlaying: false,
      // Set initial highlighted structures
      highlightedStructures: module?.steps[0]?.highlightedStructures || [],
      cameraReset: moduleId === null
    });
  },
  setEkgPattern: (patternId: string) => {
    set({ currentEKGPattern: patternId });
  },
  nextStep: () => {
    const { currentStepIndex, modules, currentModuleId } = get();
    const currentModule = modules.find(m => m.id === currentModuleId);
    if (currentModule && currentStepIndex < currentModule.steps.length - 1) {
      const nextStep = currentModule.steps[currentStepIndex + 1];
      set({ 
        currentStepIndex: currentStepIndex + 1,
        // Update highlighted structures
        highlightedStructures: nextStep.highlightedStructures || []
      });
    }
  },
  previousStep: () => {
    const { currentStepIndex, modules, currentModuleId } = get();
    if (currentStepIndex > 0) {
      const currentModule = modules.find(m => m.id === currentModuleId);
      const previousStep = currentModule?.steps[currentStepIndex - 1];
      set({ 
        currentStepIndex: currentStepIndex - 1,
        // Update highlighted structures
        highlightedStructures: previousStep?.highlightedStructures || []
      });
    }
  },
  setPlaying: (playing) => set({ isPlaying: playing }),
  reset: () => {
    const { currentModuleId, modules } = get();
    const currentModule = modules.find(m => m.id === currentModuleId);
    const firstStep = currentModule?.steps[0];
    
    set({ 
      currentStepIndex: 0, 
      isPlaying: false,
      highlightedStructures: firstStep?.highlightedStructures || []
    });
  }
}));

export { useLearningStore };