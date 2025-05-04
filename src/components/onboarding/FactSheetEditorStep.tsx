
import React, { useState } from 'react';
import { CourseData } from '@/pages/CourseOnboarding';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Plus, Tag, X } from 'lucide-react';

interface FactSheetEditorStepProps {
  data: CourseData;
  updateData: (data: Partial<CourseData>) => void;
}

interface SectionProps {
  title: string;
  content: string;
  isCompleted: boolean;
  onContentChange: (content: string) => void;
  onToggleComplete: () => void;
}

const FactSheetSection: React.FC<SectionProps> = ({
  title,
  content,
  isCompleted,
  onContentChange,
  onToggleComplete
}) => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">{title}</Label>
        <Button
          variant={isCompleted ? "default" : "outline"}
          size="sm"
          className="flex gap-1 h-8"
          onClick={onToggleComplete}
        >
          {isCompleted ? (
            <>
              <Check size={14} /> Completed
            </>
          ) : (
            "Mark Complete"
          )}
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        rows={4}
        className={isCompleted ? "bg-muted/30" : ""}
      />
    </div>
  );
};

const FactSheetEditorStep: React.FC<FactSheetEditorStepProps> = ({ data, updateData }) => {
  const [newTag, setNewTag] = useState('');

  const handleSectionChange = (section: keyof CourseData['factSheet'], value: string) => {
    updateData({
      factSheet: {
        ...data.factSheet,
        [section]: value
      }
    });
  };

  const toggleSectionComplete = (section: string) => {
    const completedSections = [...data.factSheet.completedSections];
    
    if (completedSections.includes(section)) {
      const updatedSections = completedSections.filter(s => s !== section);
      updateData({
        factSheet: {
          ...data.factSheet,
          completedSections: updatedSections
        }
      });
    } else {
      const updatedSections = [...completedSections, section];
      updateData({
        factSheet: {
          ...data.factSheet,
          completedSections: updatedSections
        }
      });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !data.factSheet.tags.includes(newTag.trim())) {
      const updatedTags = [...data.factSheet.tags, newTag.trim()];
      updateData({
        factSheet: {
          ...data.factSheet,
          tags: updatedTags
        }
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = data.factSheet.tags.filter(tag => tag !== tagToRemove);
    updateData({
      factSheet: {
        ...data.factSheet,
        tags: updatedTags
      }
    });
  };

  const completionPercentage = data.factSheet.completedSections.length / 7 * 100;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Course Fact Sheet</h3>
      <p className="text-muted-foreground">
        Review and finalize your course fact sheet. This will be used to enhance AI assistance for your course.
      </p>
      
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">{data.title || 'Your Course'} Fact Sheet</h4>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">
            {data.factSheet.completedSections.length}/7 sections complete
          </div>
          <div className="w-20 h-2 bg-muted rounded-full">
            <div 
              className="h-2 bg-primary rounded-full" 
              style={{ width: `${completionPercentage}%` }} 
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <FactSheetSection
          title="Overview"
          content={data.factSheet.overview}
          isCompleted={data.factSheet.completedSections.includes('overview')}
          onContentChange={(value) => handleSectionChange('overview', value)}
          onToggleComplete={() => toggleSectionComplete('overview')}
        />
        
        <FactSheetSection
          title="Learning Outcomes"
          content={data.factSheet.learningOutcomes}
          isCompleted={data.factSheet.completedSections.includes('learningOutcomes')}
          onContentChange={(value) => handleSectionChange('learningOutcomes', value)}
          onToggleComplete={() => toggleSectionComplete('learningOutcomes')}
        />
        
        <FactSheetSection
          title="Course Sequence"
          content={data.factSheet.courseSequence}
          isCompleted={data.factSheet.completedSections.includes('courseSequence')}
          onContentChange={(value) => handleSectionChange('courseSequence', value)}
          onToggleComplete={() => toggleSectionComplete('courseSequence')}
        />
        
        <FactSheetSection
          title="Assessments"
          content={data.factSheet.assessments}
          isCompleted={data.factSheet.completedSections.includes('assessments')}
          onContentChange={(value) => handleSectionChange('assessments', value)}
          onToggleComplete={() => toggleSectionComplete('assessments')}
        />
        
        <FactSheetSection
          title="Teaching Modalities"
          content={data.factSheet.teachingModalities}
          isCompleted={data.factSheet.completedSections.includes('teachingModalities')}
          onContentChange={(value) => handleSectionChange('teachingModalities', value)}
          onToggleComplete={() => toggleSectionComplete('teachingModalities')}
        />
        
        <FactSheetSection
          title="Tools & Platforms"
          content={data.factSheet.toolsPlatforms}
          isCompleted={data.factSheet.completedSections.includes('toolsPlatforms')}
          onContentChange={(value) => handleSectionChange('toolsPlatforms', value)}
          onToggleComplete={() => toggleSectionComplete('toolsPlatforms')}
        />
        
        <FactSheetSection
          title="Notes & Considerations"
          content={data.factSheet.notes}
          isCompleted={data.factSheet.completedSections.includes('notes')}
          onContentChange={(value) => handleSectionChange('notes', value)}
          onToggleComplete={() => toggleSectionComplete('notes')}
        />
      </div>
      
      <div className="border-t pt-4 mt-6">
        <Label className="mb-2 block">Tags</Label>
        <div className="flex flex-wrap gap-2 mb-3">
          {data.factSheet.tags.map((tag, index) => (
            <div 
              key={index} 
              className="bg-muted px-2 py-1 rounded-md text-sm flex items-center gap-1"
            >
              <Tag size={12} />
              {tag}
              <button 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => handleRemoveTag(tag)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag (e.g. semester, difficulty level)"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button onClick={handleAddTag} type="button" variant="outline" size="sm">
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FactSheetEditorStep;
