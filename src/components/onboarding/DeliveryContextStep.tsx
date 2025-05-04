
import React, { useState } from 'react';
import { CourseData } from '@/pages/CourseOnboarding';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus } from 'lucide-react';

interface DeliveryContextStepProps {
  data: CourseData;
  updateData: (data: Partial<CourseData>) => void;
}

const DeliveryContextStep: React.FC<DeliveryContextStepProps> = ({ data, updateData }) => {
  const [newTool, setNewTool] = useState('');

  const handleAddTool = () => {
    if (newTool.trim()) {
      const updatedTools = [...data.toolsPlatforms, newTool.trim()];
      updateData({ toolsPlatforms: updatedTools });
      setNewTool('');
    }
  };

  const handleRemoveTool = (index: number) => {
    const updatedTools = data.toolsPlatforms.filter((_, i) => i !== index);
    updateData({ toolsPlatforms: updatedTools });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Delivery Context</h3>
      <p className="text-muted-foreground">Define how your course will be delivered and what tools you'll use.</p>
      
      <div className="space-y-4">
        <Label>Delivery Mode</Label>
        <RadioGroup
          value={data.deliveryMode}
          onValueChange={(value: 'in-person' | 'online' | 'hybrid') => updateData({ deliveryMode: value })}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in-person" id="in-person" />
            <Label htmlFor="in-person">In-person</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online">Online</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hybrid" id="hybrid" />
            <Label htmlFor="hybrid">Hybrid</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lmsUsed">Learning Management System (LMS)</Label>
        <Input
          id="lmsUsed"
          value={data.lmsUsed}
          onChange={(e) => updateData({ lmsUsed: e.target.value })}
          placeholder="Canvas, Blackboard, Moodle, etc."
        />
      </div>
      
      <div className="space-y-4">
        <Label>Tools & Platforms</Label>
        <div className="flex gap-2">
          <Input
            value={newTool}
            onChange={(e) => setNewTool(e.target.value)}
            placeholder="Add a tool or platform you use"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTool();
              }
            }}
          />
          <Button onClick={handleAddTool} type="button">
            <Plus size={16} />
          </Button>
        </div>
        
        <ul className="space-y-2 mt-2">
          {data.toolsPlatforms.map((tool, index) => (
            <li key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
              <span>{tool}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveTool(index)}
              >
                ×
              </Button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accessibilityConsiderations">Accessibility Considerations</Label>
        <Textarea
          id="accessibilityConsiderations"
          value={data.accessibilityConsiderations}
          onChange={(e) => updateData({ accessibilityConsiderations: e.target.value })}
          placeholder="Describe any accessibility considerations for your course"
          rows={4}
        />
      </div>
    </div>
  );
};

export default DeliveryContextStep;
