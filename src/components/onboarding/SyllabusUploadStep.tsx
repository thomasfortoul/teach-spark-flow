
import React, { useRef, useState } from 'react';
import { CourseData } from '@/pages/CourseOnboarding';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface SyllabusUploadStepProps {
  data: CourseData;
  updateData: (data: Partial<CourseData>) => void;
  onExtract: () => void;
}

const educationLevels = [
  "Elementary School",
  "Middle School",
  "High School",
  "Undergraduate",
  "Graduate",
  "Doctoral",
  "Professional Development"
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Arabic",
  "Other"
];

const SyllabusUploadStep: React.FC<SyllabusUploadStepProps> = ({ data, updateData, onExtract }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      updateData({ documents: [...data.documents, ...newFiles] });
      setIsFileUploaded(true);
      setError("");
    }
  };

  const handleExtract = () => {
    if (!data.title.trim()) {
      setError("Please enter a course title before proceeding");
      return;
    }
    
    if (!isFileUploaded && data.documents.length === 0) {
      setError("Please upload a syllabus before extracting information");
      return;
    }

    setIsExtracting(true);
    
    // Simulate AI extraction process
    setTimeout(() => {
      setIsExtracting(false);
      
      // Mock data extraction - in a real app, this would come from an AI service
      const extractedData: Partial<CourseData> = {
        outcomes: ["Understand core concepts and principles", "Apply analytical thinking to real-world problems", "Develop critical reasoning skills"],
        duration: "16 weeks",
        weeklyStructure: "2 lectures (1hr), 1 lab (2hrs)",
        unitBreakdown: "Week 1-4: Foundations\nWeek 5-8: Applied Concepts\nWeek 9-12: Advanced Topics\nWeek 13-16: Project Work",
        evaluationTypes: ["Midterm Exam", "Final Exam", "Projects", "Participation"],
        gradingBreakdown: "Midterm: 25%, Final: 35%, Projects: 30%, Participation: 10%",
        teachingFormat: "Lectures with interactive discussions and hands-on labs",
        toolsPlatforms: ["Canvas", "Zoom", "GitHub"],
        lmsUsed: "Canvas",
        subject: data.title.includes(':') ? data.title.split(':')[0].trim() : data.title,
        studentCount: "25",
      };
      
      // Update course data with extracted information
      updateData(extractedData);
      
      // Proceed to the next step
      onExtract();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Get Started</h3>
      <p className="text-muted-foreground">
        Upload your syllabus and provide basic course information to get started. 
        Our AI will extract as much information as possible to save you time.
      </p>
      
      <div className="space-y-6">
        <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center bg-muted/30">
          <Upload size={32} className="mb-4 text-muted-foreground" />
          <h4 className="text-lg font-medium mb-1">Upload Your Syllabus</h4>
          <p className="text-muted-foreground mb-4">
            Upload your syllabus or course outline to help our AI extract course information
          </p>
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            variant="outline"
            className="gap-2"
          >
            <FileText size={16} />
            Select File
          </Button>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          
          {isFileUploaded && (
            <p className="text-sm text-green-600 mt-2">
              ✓ File uploaded successfully
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="required">Course Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => updateData({ title: e.target.value })}
              placeholder="Introduction to Psychology"
              required
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
            <Label htmlFor="language">Language of Instruction</Label>
            <Select 
              value={data.language} 
              onValueChange={(value) => updateData({ language: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="level">Education Level</Label>
            <Select 
              value={data.level} 
              onValueChange={(value) => updateData({ level: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {educationLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-2 text-destructive">
            <AlertCircle size={16} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="text-center pt-4">
          <Button 
            onClick={handleExtract}
            disabled={isExtracting}
            className="w-full md:w-auto"
          >
            {isExtracting ? (
              <>
                <span className="animate-pulse mr-2">•</span>
                <span className="animate-pulse delay-100 mr-2">•</span>
                <span className="animate-pulse delay-200 mr-2">•</span>
                Extracting Information
              </>
            ) : (
              'Extract Information & Continue'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SyllabusUploadStep;
