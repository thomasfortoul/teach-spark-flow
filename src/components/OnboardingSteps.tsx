
import React from 'react';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  description: string;
}

interface OnboardingStepsProps {
  steps: Step[];
  currentStep: number;
}

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={cn(
              "flex flex-col items-center relative",
              index > 0 && "flex-1"
            )}
          >
            {/* Line connecting steps */}
            {index > 0 && (
              <div 
                className={cn(
                  "absolute top-4 h-1 w-full -left-1/2",
                  currentStep >= index ? "bg-primary" : "bg-muted"
                )}
              />
            )}
            
            {/* Step indicator */}
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center z-10 mb-2",
                currentStep > index ? "bg-primary text-white" : 
                currentStep === index ? "bg-primary text-white" :
                "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            
            {/* Only show label for current, previous and next steps on mobile */}
            <div className={cn(
              "text-xs text-center transition-opacity",
              "hidden md:block", // Hide all labels on mobile by default
              // On mobile, conditionally show only a few labels
              (Math.abs(currentStep - index) <= 1) && "block",
              currentStep === index ? "text-primary font-medium" : "text-muted-foreground"
            )}>
              {step.label}
              <span className="hidden md:block text-xs text-muted-foreground">{step.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingSteps;
