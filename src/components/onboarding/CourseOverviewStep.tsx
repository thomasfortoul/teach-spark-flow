
import React from 'react';
import { CourseData } from '@/pages/CourseOnboarding';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CourseOverviewStepProps {
  data: CourseData;
  updateData: (data: Partial<CourseData>) => void;
}

const CourseOverviewStep: React.FC<CourseOverviewStepProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Course Overview</h3>
      <p className="text-muted-foreground">Provide basic information about your course.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
            placeholder="Introduction to Psychology"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="code">Course Code</Label>
          <Input
            id="code"
            value={data.code}
            onChange={(e) => updateData({ code: e.target.value })}
            placeholder="PSY101"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="level">Education Level</Label>
          <Input
            id="level"
            value={data.level}
            onChange={(e) => updateData({ level: e.target.value })}
            placeholder="Undergraduate, High School, etc."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Subject Area</Label>
          <Input
            id="subject"
            value={data.subject}
            onChange={(e) => updateData({ subject: e.target.value })}
            placeholder="Psychology"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="studentCount">Number of Students</Label>
          <Input
            id="studentCount"
            type="text"
            value={data.studentCount}
            onChange={(e) => updateData({ studentCount: e.target.value })}
            placeholder="25"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language">Language of Instruction</Label>
          <Input
            id="language"
            value={data.language}
            onChange={(e) => updateData({ language: e.target.value })}
            placeholder="English"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration">Course Duration</Label>
          <Input
            id="duration"
            value={data.duration}
            onChange={(e) => updateData({ duration: e.target.value })}
            placeholder="16 weeks"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weeklyStructure">Weekly Structure</Label>
          <Input
            id="weeklyStructure"
            value={data.weeklyStructure}
            onChange={(e) => updateData({ weeklyStructure: e.target.value })}
            placeholder="2 lectures (1hr), 1 lab (2hrs)"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseOverviewStep;
