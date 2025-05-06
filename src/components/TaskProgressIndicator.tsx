
import React from 'react';
import { Task, TaskProgress } from '@/types/task';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle } from 'lucide-react';

interface TaskProgressIndicatorProps {
  task: Task;
  progress: TaskProgress;
}

const TaskProgressIndicator: React.FC<TaskProgressIndicatorProps> = ({ task, progress }) => {
  const percentComplete = Math.round((progress.completedSteps.length / task.steps.length) * 100);

  return (
    <div className="space-y-2 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">Progress</h3>
        <span className="text-xs text-muted-foreground">
          {progress.completedSteps.length} of {task.steps.length} steps
        </span>
      </div>
      
      <Progress value={percentComplete} className="h-2" />
      
      <div className="grid grid-cols-1 gap-1 mt-2">
        {task.steps.map((step, index) => {
          const isCompleted = progress.completedSteps.includes(step.id);
          const isCurrent = index === progress.currentStepIndex;
          
          return (
            <div
              key={step.id}
              className={`flex items-center gap-2 p-1.5 rounded-md text-sm ${
                isCurrent ? 'bg-muted' : ''
              }`}
            >
              {isCompleted ? (
                <CheckCircle size={16} className="text-primary" />
              ) : (
                <Circle size={16} className={isCurrent ? 'text-primary' : 'text-muted-foreground'} />
              )}
              <span className={`${isCompleted ? 'line-through opacity-70' : ''} ${
                isCurrent ? 'font-medium' : ''
              }`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskProgressIndicator;
