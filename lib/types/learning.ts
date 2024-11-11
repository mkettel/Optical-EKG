// types/learning.ts


export interface LearningStep {
  id: string;
  title: string;
  description: string;
  highlightedStructures?: string[];
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  steps: LearningStep[];
}