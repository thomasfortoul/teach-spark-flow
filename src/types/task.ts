
export interface TaskStep {
  id: string;
  title: string;
  description: string;
  checkpoint?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  steps: TaskStep[];
}

export interface TaskProgress {
  currentStepIndex: number;
  completedSteps: string[];
}
