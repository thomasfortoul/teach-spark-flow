
import React from 'react';
import { Target, BookOpen, Brain } from 'lucide-react';

interface PhaseCardProps {
  phase: 'planning' | 'presentation' | 'evaluation';
  onClick: () => void;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, onClick }) => {
  const phaseConfig = {
    planning: {
      title: 'Planning',
      subtitle: 'Design your course materials, align with objectives, and structure your lessons.',
      icon: <Target size={28} />,
      bgColor: 'bg-planning',
      lightColor: 'bg-planning-light',
      textColor: 'text-planning'
    },
    presentation: {
      title: 'Presentation',
      subtitle: 'Deliver engaging instruction with ready-to-use materials and activities.',
      icon: <BookOpen size={28} />,
      bgColor: 'bg-presentation',
      lightColor: 'bg-presentation-light',
      textColor: 'text-presentation'
    },
    evaluation: {
      title: 'Evaluation',
      subtitle: 'Assess, grade, and provide meaningful feedback efficiently.',
      icon: <Brain size={28} />,
      bgColor: 'bg-evaluation',
      lightColor: 'bg-evaluation-light',
      textColor: 'text-evaluation'
    }
  };

  const { title, subtitle, icon, bgColor, lightColor } = phaseConfig[phase];

  return (
    <div
      className={`phase-card ${lightColor} h-full`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className={`${bgColor} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

export default PhaseCard;
