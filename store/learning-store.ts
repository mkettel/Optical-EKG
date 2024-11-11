'use client';

// store/learning-store.ts
import { create } from 'zustand';
import { LessonModule } from '@/lib/types/learning';

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
}
// 
// store/learning-store.ts
export const CAMERA_CONFIG = {
  default: {
    position: [0, 1.5, 4] as [number, number, number],
    target: [0, 1.5, 0] as [number, number, number],
  },
  limits: {
    minDistance: 1.0,
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
  modules: [
    {
      id: 'electrical-conduction-components',
      title: 'Electrical Conduction Components',
      description: 'Learn about the cardiac conduction system',
      steps: [
        {
          id: 'sa-node',
          title: 'Sinoatrial Node',
          description: "The heartbeat begins in the SA node, the heart's natural pacemaker.",
          highlightedStructures: ['sa-node'],
          cameraPosition: [-0.1, 1.5, 1.2],
          cameraTarget: [-0.4, 1.6, 0]
        },
        {
          id: 'av-node',
          title: 'Atrioventricular Node',
          description: "The AV node is the gateway between the atria and the ventricles.",
          highlightedStructures: ['av-node'],
          cameraPosition: [-0.2, 1.5, 2.0],
          cameraTarget: [0, 1.5, 0]
        },
        {
          id: 'bundle-of-his',
          title: 'Bundle of His',
          description: "The Bundle of His is a collection of heart muscle cells specialized for electrical conduction.",
          highlightedStructures: ['bundle-of-his'],
          cameraPosition: [0, 1.5, 2.1],
          cameraTarget: [0, 1.5, 0]
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
  reset: () => set({ currentStepIndex: 0, isPlaying: false })
}));

export { useLearningStore };