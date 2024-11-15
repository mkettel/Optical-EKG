import React, { useEffect, useState } from 'react';
import { useLearningStore } from '@/store/learning-store';
import { motion } from 'framer-motion';

const EKGVisualization = () => {
  const { 
    currentModuleId, 
    currentStepIndex, 
    modules,
    ekgPatterns,
    currentEKGPattern
  } = useLearningStore();

  const currentModule = modules.find(m => m.id === currentModuleId);
  const currentStep = currentModule?.steps[currentStepIndex];
  const pattern = ekgPatterns[currentEKGPattern];
  
  // Calculate the cumulative progress based on current step
  const calculateProgress = () => {
    if (!currentStep || !pattern?.segments) return 0;
    
    const currentSegmentIndex = pattern.segments.findIndex(s => s.id === currentStep.id);
    if (currentSegmentIndex === -1) return 0;
    
    return pattern.segments[currentSegmentIndex].percentEnd;
  };

  const progress = calculateProgress();

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="relative w-full h-32">
        {/* Background Grid */}
        <svg width="100%" height="100%" className="absolute">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* EKG Trace */}
        <svg width="100%" height="100%" className="absolute" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Base EKG line in light gray */}
          <path
            d={pattern.path}
            fill="none"
            stroke="#d0d0d0"
            strokeWidth="1"
          />

          {/* Animated progress path */}
          <motion.path
            d={pattern.path}
            fill="none"
            stroke="#4287f5"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: progress / 100
            }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
          />
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
          <span>P</span>
          <span>PR</span>
          <span>QRS</span>
          <span>ST</span>
          <span>T</span>
        </div>
      </div>

      {/* Pattern indicator */}
      <div className="mt-2 text-sm text-center text-blue-600 font-medium">
        {pattern.title} - {currentStep?.title || 'Select a step'}
      </div>
    </div>
  );
};

export default EKGVisualization;