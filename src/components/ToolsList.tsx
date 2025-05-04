
import React from 'react';
import { Calendar, Target, BookOpen, Brain, Puzzle, Layers, FileText, Activity, MessageSquare, ChartBar } from 'lucide-react';

interface ToolsListProps {
  phase: 'planning' | 'presentation' | 'evaluation';
}

const ToolsList: React.FC<ToolsListProps> = ({ phase }) => {
  const toolsConfig = {
    planning: [
      {
        id: 'lesson-plan',
        title: 'Generate a Lesson Plan',
        description: 'Based on topic, time, and goals',
        icon: <Calendar />,
        bgColor: 'bg-planning'
      },
      {
        id: 'learning-outcomes',
        title: 'Map Learning Outcomes',
        description: 'Based on Bloom\'s taxonomy',
        icon: <Target />,
        bgColor: 'bg-planning'
      },
      {
        id: 'syllabus',
        title: 'Draft Syllabus',
        description: 'Create or extract from PDF',
        icon: <FileText />,
        bgColor: 'bg-planning'
      },
      {
        id: 'content-sequence',
        title: 'Organize Course Content',
        description: 'Structure into a sequence',
        icon: <Layers />,
        bgColor: 'bg-planning'
      },
      {
        id: 'prerequisites',
        title: 'Prerequisite Concepts',
        description: 'Identify required skills',
        icon: <Puzzle />,
        bgColor: 'bg-planning'
      },
      {
        id: 'active-learning',
        title: 'Active Learning Ideas',
        description: 'Generate engagement activities',
        icon: <Brain />,
        bgColor: 'bg-planning'
      }
    ],
    presentation: [
      {
        id: 'slides',
        title: 'Generate Slides',
        description: 'Create visual aids',
        icon: <Activity />,
        bgColor: 'bg-presentation'
      },
      {
        id: 'lecture-notes',
        title: 'Lecture Notes',
        description: 'Create scripts and notes',
        icon: <FileText />,
        bgColor: 'bg-presentation'
      },
      {
        id: 'interactive-activities',
        title: 'Interactive Activities',
        description: 'Design polls, debates, etc.',
        icon: <Activity />,
        bgColor: 'bg-presentation'
      },
      {
        id: 'examples',
        title: 'Find Examples',
        description: 'Examples or analogies for concepts',
        icon: <Puzzle />,
        bgColor: 'bg-presentation'
      },
      {
        id: 'adapt-content',
        title: 'Adapt Content',
        description: 'For different learning styles',
        icon: <Layers />,
        bgColor: 'bg-presentation'
      },
      {
        id: 'worksheets',
        title: 'Build Worksheets',
        description: 'Student handouts and materials',
        icon: <FileText />,
        bgColor: 'bg-presentation'
      }
    ],
    evaluation: [
      {
        id: 'quiz-questions',
        title: 'Generate Questions',
        description: 'Quizzes and short answers',
        icon: <MessageSquare />,
        bgColor: 'bg-evaluation'
      },
      {
        id: 'auto-grade',
        title: 'Auto-Grade',
        description: 'Grade with rubrics',
        icon: <ChartBar />,
        bgColor: 'bg-evaluation'
      },
      {
        id: 'write-feedback',
        title: 'Write Feedback',
        description: 'Feedback from answer samples',
        icon: <FileText />,
        bgColor: 'bg-evaluation'
      },
      {
        id: 'analyze-answers',
        title: 'Analyze Answers',
        description: 'Identify misconceptions',
        icon: <Brain />,
        bgColor: 'bg-evaluation'
      },
      {
        id: 'recommend-interventions',
        title: 'Recommend Next Steps',
        description: 'Suggest interventions',
        icon: <Target />,
        bgColor: 'bg-evaluation'
      },
      {
        id: 'track-progress',
        title: 'Track Outcomes',
        description: 'Monitor progress over time',
        icon: <ChartBar />,
        bgColor: 'bg-evaluation'
      }
    ]
  };

  const tools = toolsConfig[phase];

  return (
    <div className="space-y-2">
      {tools.map((tool) => (
        <div key={tool.id} className="tool-card">
          <div className={`tool-card-icon ${tool.bgColor}`}>
            {tool.icon}
          </div>
          <div>
            <h4 className="font-medium">{tool.title}</h4>
            <p className="text-xs text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsList;
