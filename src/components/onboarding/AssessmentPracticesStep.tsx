
import React, { useState } from 'react';
import { CourseData } from '@/pages/CourseOnboarding';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface AssessmentPracticesStepProps {
  data: CourseData;
  updateData: (data: Partial<CourseData>) => void;
}

const evaluationOptions = [
  { id: "quizzes", label: "Quizzes" },
  { id: "assignments", label: "Assignments" },
  { id: "midterm", label: "Midterm" },
  { id: "final-exam", label: "Final Exam" },
  { id: "projects", label: "Projects" },
  { id: "presentations", label: "Presentations" },
  { id: "participation", label: "Participation" }
];

const AssessmentPracticesStep: React.FC<AssessmentPracticesStepProps> = ({ data, updateData }) => {
  const [customEvalType, setCustomEvalType] = useState('');

  const handleCheckboxChange = (evalType: string) => {
    const currentTypes = [...data.evaluationTypes];
    
    if (currentTypes.includes(evalType)) {
      const updatedTypes = currentTypes.filter(type => type !== evalType);
      updateData({ evaluationTypes: updatedTypes });
    } else {
      const updatedTypes = [...currentTypes, evalType];
      updateData({ evaluationTypes: updatedTypes });
    }
  };

  const handleAddCustomType = () => {
    if (customEvalType.trim()) {
      const updatedTypes = [...data.evaluationTypes, customEvalType.trim()];
      updateData({ evaluationTypes: updatedTypes });
      setCustomEvalType('');
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Assessment Practices</h3>
      <p className="text-muted-foreground">Define how you will evaluate student learning.</p>
      
      <div className="space-y-4">
        <Label>Evaluation Types</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {evaluationOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox 
                id={option.id} 
                checked={data.evaluationTypes.includes(option.label)}
                onCheckedChange={() => handleCheckboxChange(option.label)}
              />
              <label 
                htmlFor={option.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mt-3">
          <Input
            value={customEvalType}
            onChange={(e) => setCustomEvalType(e.target.value)}
            placeholder="Add other evaluation type"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustomType();
              }
            }}
          />
          <Button onClick={handleAddCustomType} type="button" size="sm">Add</Button>
        </div>
        
        {data.evaluationTypes.some(type => !evaluationOptions.map(opt => opt.label).includes(type)) && (
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm font-medium mb-2">Custom Evaluation Types:</p>
            <div className="flex flex-wrap gap-2">
              {data.evaluationTypes
                .filter(type => !evaluationOptions.map(opt => opt.label).includes(type))
                .map((type, index) => (
                  <div key={index} className="bg-background px-2 py-1 rounded-md text-sm flex items-center gap-1">
                    {type}
                    <button 
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => handleCheckboxChange(type)}
                    >
                      ×
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gradingBreakdown">Grading Breakdown</Label>
        <Textarea
          id="gradingBreakdown"
          value={data.gradingBreakdown}
          onChange={(e) => updateData({ gradingBreakdown: e.target.value })}
          placeholder="Example: Quizzes (20%), Midterm (30%), Final (40%), Participation (10%)"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="rubricStrategies">Rubric Strategies</Label>
        <Textarea
          id="rubricStrategies"
          value={data.rubricStrategies}
          onChange={(e) => updateData({ rubricStrategies: e.target.value })}
          placeholder="Describe your approach to creating and using rubrics"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="feedbackMethods">Feedback Methods</Label>
        <Textarea
          id="feedbackMethods"
          value={data.feedbackMethods}
          onChange={(e) => updateData({ feedbackMethods: e.target.value })}
          placeholder="How do you provide feedback to students?"
          rows={3}
        />
      </div>
    </div>
  );
};

export default AssessmentPracticesStep;
