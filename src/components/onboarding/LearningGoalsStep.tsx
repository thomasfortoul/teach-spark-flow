
import React, { useState } from 'react';
import { CourseData } from '@/pages/CourseOnboarding';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface LearningGoalsStepProps {
  data: CourseData;
  updateData: (data: Partial<CourseData>) => void;
}

const LearningGoalsStep: React.FC<LearningGoalsStepProps> = ({ data, updateData }) => {
  const [newOutcome, setNewOutcome] = useState('');

  const handleAddOutcome = () => {
    if (newOutcome.trim()) {
      const updatedOutcomes = [...data.outcomes, newOutcome.trim()];
      updateData({ outcomes: updatedOutcomes });
      setNewOutcome('');
    }
  };

  const handleRemoveOutcome = (index: number) => {
    const updatedOutcomes = data.outcomes.filter((_, i) => i !== index);
    updateData({ outcomes: updatedOutcomes });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Learning Goals & Structure</h3>
      <p className="text-muted-foreground">Define what students will learn and how the course is organized.</p>
      
      <div className="space-y-4">
        <Label>Learning Outcomes</Label>
        <div className="flex gap-2">
          <Input
            value={newOutcome}
            onChange={(e) => setNewOutcome(e.target.value)}
            placeholder="Students will be able to..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddOutcome();
              }
            }}
          />
          <Button onClick={handleAddOutcome} type="button">
            <Plus size={16} />
          </Button>
        </div>
        
        <ul className="space-y-2 mt-2">
          {data.outcomes.map((outcome, index) => (
            <li key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
              <span>{outcome}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveOutcome(index)}
              >
                ×
              </Button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="unitBreakdown">Unit Breakdown</Label>
        <Textarea
          id="unitBreakdown"
          value={data.unitBreakdown}
          onChange={(e) => updateData({ unitBreakdown: e.target.value })}
          placeholder="Describe how your course is divided into units or modules"
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="prerequisites">Prerequisites</Label>
        <Textarea
          id="prerequisites"
          value={data.prerequisites}
          onChange={(e) => updateData({ prerequisites: e.target.value })}
          placeholder="What should students know before taking this course?"
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="teachingFormat">Teaching Format</Label>
        <Textarea
          id="teachingFormat"
          value={data.teachingFormat}
          onChange={(e) => updateData({ teachingFormat: e.target.value })}
          placeholder="Describe your teaching approach (lecture, discussion, group work, etc.)"
          rows={4}
        />
      </div>
    </div>
  );
};

export default LearningGoalsStep;
