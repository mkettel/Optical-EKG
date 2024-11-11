// components/learning/lesson-controls.tsx
'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLearningStore } from '@/store/learning-store';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

export function LessonControls() {
  const { 
    isPlaying, 
    setPlaying, 
    nextStep, 
    previousStep, 
    reset,
    currentModuleId,
    currentStepIndex,
    modules 
  } = useLearningStore();

  const currentModule = modules.find(m => m.id === currentModuleId);
  const currentStep = currentModule?.steps[currentStepIndex];


  if (!currentModule || !currentStep) return null;

  return (
    <div className="space-y-4">
      <h2 className='text-xl font-bold bg-red-300 rounded-md p-2'>{currentModule.title}</h2>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{currentStep.title}</h3>
        <p className="text-sm text-muted-foreground">{currentStep.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={reset}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={previousStep}
            disabled={currentStepIndex === 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextStep}
            disabled={currentStepIndex === currentModule.steps.length - 1}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all"
          style={{
            width: `${((currentStepIndex + 1) / currentModule.steps.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
}