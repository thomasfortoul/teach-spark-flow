
import React, { useState, useEffect } from 'react';
import { CourseData } from '@/pages/CourseOnboarding';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface AIReviewStepProps {
  data: CourseData;
  updateData: (data: Partial<CourseData>) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIReviewStep: React.FC<AIReviewStepProps> = ({ data, updateData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "I'm reviewing your course information..."
    }
  ]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [missingInfo, setMissingInfo] = useState<string[]>([]);

  // Simulate AI analysis
  useEffect(() => {
    setTimeout(() => {
      const generatedFactSheet = {
        overview: `${data.title} (${data.code}) is a ${data.level} course in ${data.subject}, spanning ${data.duration} with ${data.weeklyStructure}. The course is taught in ${data.language} and has approximately ${data.studentCount} students.`,
        learningOutcomes: data.outcomes.length > 0 
          ? data.outcomes.map(outcome => `- ${outcome}`).join('\n') 
          : 'No specific learning outcomes provided.',
        courseSequence: data.unitBreakdown || 'Course sequence information not provided.',
        assessments: data.evaluationTypes.length > 0 
          ? `Assessment includes ${data.evaluationTypes.join(', ')}. ${data.gradingBreakdown}` 
          : 'Assessment information not provided.',
        teachingModalities: `This course is delivered ${data.deliveryMode} with ${data.teachingFormat || 'no specific teaching format provided'}.`,
        toolsPlatforms: data.toolsPlatforms.length > 0 
          ? `Tools used include ${data.toolsPlatforms.join(', ')}. LMS: ${data.lmsUsed || 'Not specified'}` 
          : 'No tools or platforms specified.',
        notes: data.accessibilityConsiderations || 'No additional notes provided.',
        completedSections: [],
        tags: [data.subject, data.level, data.deliveryMode]
      };

      // Find missing information
      const missing = [];
      if (!data.title) missing.push('Course title');
      if (!data.code) missing.push('Course code');
      if (!data.level) missing.push('Education level');
      if (data.outcomes.length === 0) missing.push('Learning outcomes');
      if (!data.unitBreakdown) missing.push('Unit breakdown');
      if (data.evaluationTypes.length === 0) missing.push('Evaluation types');
      
      setMissingInfo(missing);
      
      // Update with generated fact sheet
      updateData({
        factSheet: generatedFactSheet
      });

      // Add AI message
      const newAssistantMessage: Message = {
        role: 'assistant',
        content: missing.length > 0
          ? `I've analyzed your course information and created a draft fact sheet. However, I noticed some important information is missing: ${missing.join(', ')}. Would you like to provide any of this information now?`
          : "I've analyzed your course information and created a comprehensive fact sheet. Would you like to review it or make any adjustments before finalizing?"
      };
      
      setMessages(prevMessages => [...prevMessages, newAssistantMessage]);
      setIsAnalyzing(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const assistantResponse: Message = { 
        role: 'assistant', 
        content: "Thank you for that additional information. I've updated your course fact sheet with these details. You can review and edit it in the next step."
      };
      
      setMessages(prevMessages => [...prevMessages, assistantResponse]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">AI Review</h3>
      <p className="text-muted-foreground">
        Our AI is analyzing your course information to create a comprehensive fact sheet.
      </p>
      
      <div className="border rounded-lg flex flex-col h-[400px]">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isAnalyzing && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl p-4 bg-muted">
                <div className="flex gap-1">
                  <span className="animate-pulse">•</span>
                  <span className="animate-pulse delay-100">•</span>
                  <span className="animate-pulse delay-200">•</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder={isAnalyzing ? "Analysis in progress..." : "Type additional information..."}
              className="flex-1"
              disabled={isAnalyzing}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isAnalyzing) {
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isAnalyzing || !input.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      {missingInfo.length > 0 && !isAnalyzing && (
        <div className="bg-muted p-4 rounded-md">
          <p className="font-medium mb-2">Missing Information</p>
          <ul className="list-disc pl-5 space-y-1">
            {missingInfo.map((item, index) => (
              <li key={index} className="text-sm">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIReviewStep;
