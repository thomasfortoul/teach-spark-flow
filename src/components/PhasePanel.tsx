
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ToolsList from './ToolsList';
import ChatInterface from './ChatInterface';

interface PhasePanelProps {
  phase: 'planning' | 'presentation' | 'evaluation' | null;
  onClose: () => void;
}

const PhasePanel: React.FC<PhasePanelProps> = ({ phase, onClose }) => {
  if (!phase) return null;

  const phaseConfig = {
    planning: {
      title: 'Planning',
      bgColor: 'bg-planning',
      promptSuggestions: [
        "Create a lesson plan on [topic] for a 90-minute session.",
        "Help me align this unit with Bloom's taxonomy.",
        "What should students know before learning [concept]?",
      ]
    },
    presentation: {
      title: 'Presentation',
      bgColor: 'bg-presentation',
      promptSuggestions: [
        "Make a visual explanation of [concept].",
        "Design a 10-min interactive activity for a large class.",
        "Give me three analogies to teach [abstract idea].",
      ]
    },
    evaluation: {
      title: 'Evaluation',
      bgColor: 'bg-evaluation',
      promptSuggestions: [
        "Create a 5-question quiz on [topic].",
        "Grade this short answer using this rubric.",
        "Give feedback for this student response.",
      ]
    }
  };

  const { title, bgColor, promptSuggestions } = phaseConfig[phase];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-fade-in">
      <div className="fixed inset-y-0 right-0 w-full md:w-[600px] lg:w-[800px] bg-card shadow-lg flex flex-col h-full">
        <div className={`${bgColor} p-4 text-white flex items-center justify-between`}>
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X size={20} />
          </Button>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Tools Section */}
          <div className="w-1/3 border-r overflow-y-auto p-4">
            <h3 className="text-lg font-medium mb-4">Tools</h3>
            <ToolsList phase={phase} />
          </div>
          
          {/* Chat Section */}
          <div className="flex-1 flex flex-col">
            <ChatInterface phase={phase} promptSuggestions={promptSuggestions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhasePanel;
