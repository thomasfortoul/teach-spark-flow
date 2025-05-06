
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import TaskProgressIndicator from './TaskProgressIndicator';
import { useTask } from '@/contexts/TaskContext';
import { processChatMessage } from '@/services/chatService';

interface ChatInterfaceProps {
  phase?: 'planning' | 'presentation' | 'evaluation';
  promptSuggestions?: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  phase, 
  promptSuggestions = [] 
}) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    currentTask, 
    taskProgress,
    advanceToNextStep, 
    resetTask,
    isTaskActive
  } = useTask();

  // Initialize chat with welcome message
  useEffect(() => {
    if (currentTask) {
      const currentStep = currentTask.steps[taskProgress.currentStepIndex];
      setMessages([
        {
          role: 'assistant',
          content: `Welcome to the "${currentTask.title}" task! Let's get started.\n\n**Step ${taskProgress.currentStepIndex + 1}: ${currentStep.title}**\n\n${currentStep.description}`
        }
      ]);
    } else if (phase) {
      setMessages([
        {
          role: 'assistant',
          content: `Welcome to the ${phase} phase! How can I help you today?`
        }
      ]);
    }
  }, [currentTask, taskProgress.currentStepIndex, phase]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;
    
    const userMessage = { 
      role: 'user' as const, 
      content: input 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    try {
      if (currentTask) {
        // Process the message using our chat service
        const response = await processChatMessage(
          input,
          currentTask,
          taskProgress
        );
        
        const aiMessage = { 
          role: 'assistant' as const, 
          content: response.response 
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        // Handle step completion
        if (response.isStepComplete) {
          if (response.nextAction === 'next_step') {
            // Small delay before advancing to next step
            setTimeout(() => {
              advanceToNextStep();
            }, 1000);
          } else if (response.nextAction === 'complete_task') {
            // Complete the task after a delay
            setTimeout(() => {
              setMessages(prev => [
                ...prev, 
                { 
                  role: 'assistant', 
                  content: "Task completed! Would you like to start another task?" 
                }
              ]);
              resetTask();
            }, 2000);
          }
        }
      } else {
        // Default behavior for non-task interactions
        const aiMessage = { 
          role: 'assistant' as const, 
          content: `This is a placeholder response for "${input}". In a real implementation, this would call the AI model to generate a helpful response${phase ? ` for the ${phase} phase` : ''}.` 
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: "Sorry, I encountered an error processing your message. Please try again." 
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePromptSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Task info and progress indicator */}
      {currentTask && (
        <div className="border-b p-4">
          <h2 className="font-semibold text-lg mb-2">{currentTask.title}</h2>
          <p className="text-sm text-muted-foreground mb-4">{currentTask.description}</p>
          <TaskProgressIndicator task={currentTask} progress={taskProgress} />
        </div>
      )}
      
      {/* Prompt suggestions */}
      {promptSuggestions.length > 0 && (
        <div className="p-4 overflow-x-auto flex gap-2">
          {promptSuggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="prompt-suggestion"
              onClick={() => handlePromptSuggestion(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      
      {/* Chat messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-muted'
                }`}
              >
                {/* Support for markdown-style formatting */}
                {message.content.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={i} className="font-bold">{line.slice(2, -2)}</p>;
                  }
                  return <p key={i}>{line}</p>;
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex flex-col gap-2">
          {isTaskActive ? (
            <>
              <Textarea 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Respond to the current step...`}
                className="min-h-[100px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    handleSendMessage();
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">Press Ctrl+Enter to send</p>
            </>
          ) : (
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
          )}
          
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isProcessing}
            className="w-full sm:w-auto ml-auto"
          >
            {isProcessing ? "Processing..." : "Send"}
            {!isProcessing && <Send size={18} className="ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
