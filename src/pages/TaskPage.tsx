
import React from 'react';
import { useTask } from '@/contexts/TaskContext';
import TaskSelector from '@/components/TaskSelector';
import ChatInterface from '@/components/ChatInterface';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const TaskPage: React.FC = () => {
  const { currentTask, resetTask, isTaskActive } = useTask();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-medium">
            {isTaskActive ? 'Task: ' + currentTask?.title : 'Task Library'}
          </h1>
          {isTaskActive && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetTask}
              className="flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Back to Tasks
            </Button>
          )}
        </div>
      </header>
      
      <main className="flex-1 container py-8">
        {isTaskActive ? (
          <div className="h-[calc(100vh-8rem)] border rounded-lg overflow-hidden">
            <ChatInterface />
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-8">
              Select a task below to begin a guided conversation with our AI assistant.
            </p>
            <TaskSelector />
          </>
        )}
      </main>
    </div>
  );
};

export default TaskPage;
