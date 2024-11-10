// components/learning/learning-wrapper.tsx
'use client';

import React from 'react';
import { ModuleSelector } from './module-selector';
import { LessonControls } from './lesson-controls';
import { useLearningStore } from '@/store/learning-store';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function LearningWrapper() {
  const { currentModuleId, setCurrentModule } = useLearningStore();

  if (!currentModuleId) {
    return <ModuleSelector />;
  }

  return (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 mb-4" 
        onClick={() => setCurrentModule(null)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Modules
      </Button>
      <LessonControls />
    </div>
  );
}