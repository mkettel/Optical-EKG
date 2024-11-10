// components/learning/module-selector.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useLearningStore } from '@/store/learning-store';

export function ModuleSelector() {
  const { modules, setCurrentModule, currentModuleId } = useLearningStore();

  

  return (
    <div className="space-y-2">
      {/* <h2 className="text-lg font-semibold">Learning Modules</h2> */}
      <div className="space-y-2">
        {modules.map((module) => (
          <Button
            key={module.id}
            variant={currentModuleId === module.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => setCurrentModule(module.id)}
          >
            {module.title}
          </Button>
        ))}
      </div>
    </div>
  );
}