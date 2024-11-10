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
}

const useLearningStore = create<LearningState>()((set, get) => ({
  currentModuleId: null,
  currentStepIndex: 0,
  isPlaying: false,
  highlightedStructures: [],
  modules: [
    {
      id: 'electrical-conduction',
      title: 'Electrical Conduction',
      description: 'Learn about the cardiac conduction system',
      steps: [
        {
          id: 'sa-node',
          title: 'Sinoatrial Node',
          description: "The heartbeat begins in the SA node, the heart's natural pacemaker.",
          highlightedStructures: ['sa-node'],
          cameraPosition: [0, 2, 4],
          cameraTarget: [0, 0, 0]
        },
        {
          id: 'av-node',
          title: 'Atrioventricular Node',
          description: "The AV node is the gateway between the atria and the ventricles.",
          highlightedStructures: ['av-node'],
          cameraPosition: [0, 2, 4],
          cameraTarget: [0, 0, 0]
        },
        {
          id: 'bundle-of-his',
          title: 'Bundle of His',
          description: "The Bundle of His is a collection of heart muscle cells specialized for electrical conduction.",
          highlightedStructures: ['bundle-of-his'],
          cameraPosition: [0, 2, 4],
          cameraTarget: [0, 0, 0]
        }
      ]
    }
  ],
  setCurrentModule: (moduleId) => {
    const module = get().modules.find(m => m.id === moduleId);
    set({ 
      currentModuleId: moduleId, 
      currentStepIndex: 0,
      isPlaying: false,
      // Set initial highlighted structures
      highlightedStructures: module?.steps[0]?.highlightedStructures || []
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