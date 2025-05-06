
import React from 'react';
import { taskLibrary } from '@/data/taskLibrary';
import { useTask } from '@/contexts/TaskContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TaskSelector: React.FC = () => {
  const { startTask } = useTask();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {taskLibrary.map((task) => (
        <Card key={task.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">Steps:</p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              {task.steps.map((step) => (
                <li key={step.id} className="truncate">{step.title}</li>
              ))}
            </ol>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => startTask(task)} 
              className="w-full"
            >
              Start Task
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TaskSelector;
