
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, TaskProgress } from '@/types/task';

interface TaskContextType {
  currentTask: Task | null;
  taskProgress: TaskProgress;
  setCurrentTask: (task: Task | null) => void;
  startTask: (task: Task) => void;
  completeStep: (stepId: string) => void;
  advanceToNextStep: () => void;
  resetTask: () => void;
  isTaskActive: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskProgress, setTaskProgress] = useState<TaskProgress>({
    currentStepIndex: 0,
    completedSteps: [],
  });

  const startTask = (task: Task) => {
    setCurrentTask(task);
    setTaskProgress({
      currentStepIndex: 0,
      completedSteps: [],
    });
  };

  const completeStep = (stepId: string) => {
    setTaskProgress(prev => ({
      ...prev,
      completedSteps: [...prev.completedSteps, stepId],
    }));
  };

  const advanceToNextStep = () => {
    if (currentTask && taskProgress.currentStepIndex < currentTask.steps.length - 1) {
      const currentStepId = currentTask.steps[taskProgress.currentStepIndex].id;
      setTaskProgress(prev => ({
        currentStepIndex: prev.currentStepIndex + 1,
        completedSteps: [...prev.completedSteps, currentStepId],
      }));
    }
  };

  const resetTask = () => {
    setCurrentTask(null);
    setTaskProgress({
      currentStepIndex: 0,
      completedSteps: [],
    });
  };

  return (
    <TaskContext.Provider
      value={{
        currentTask,
        taskProgress,
        setCurrentTask,
        startTask,
        completeStep,
        advanceToNextStep,
        resetTask,
        isTaskActive: !!currentTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
