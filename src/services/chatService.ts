
import { Task, TaskStep, TaskProgress } from "@/types/task";

// This simulates an API response with a delay
export async function processChatMessage(
  message: string,
  task: Task,
  currentProgress: TaskProgress
): Promise<{
  response: string;
  isStepComplete: boolean;
  nextAction?: 'next_step' | 'complete_task';
}> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const currentStep = task.steps[currentProgress.currentStepIndex];
  
  // Simple rule-based response system (to be replaced with real AI)
  if (message.length < 5) {
    return {
      response: "Could you please provide more details? Your response seems very brief.",
      isStepComplete: false
    };
  }
  
  // Check if the message contains keywords related to completion or confirmation
  const completionKeywords = ['yes', 'done', 'complete', 'finished', 'ready', 'sure'];
  const hasCompletionKeyword = completionKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );
  
  if (hasCompletionKeyword) {
    // Check if this is the last step
    if (currentProgress.currentStepIndex === task.steps.length - 1) {
      return {
        response: `Great job! You've completed all steps for "${task.title}". Here's a summary of what we've accomplished:\n\n` +
                 task.steps.map(step => `- ${step.title}: Completed`).join('\n'),
        isStepComplete: true,
        nextAction: 'complete_task'
      };
    } else {
      const nextStep = task.steps[currentProgress.currentStepIndex + 1];
      return {
        response: `Excellent! Step "${currentStep.title}" is complete. Let's move on to the next step: "${nextStep.title}" - ${nextStep.description}`,
        isStepComplete: true,
        nextAction: 'next_step'
      };
    }
  }
  
  // Default response if no completion keyword is found
  return {
    response: `Thank you for your input on "${currentStep.title}". ${currentStep.checkpoint || 'Would you like to mark this step as complete?'}`,
    isStepComplete: false
  };
}
