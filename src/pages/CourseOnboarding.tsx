
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import OnboardingSteps from '@/components/OnboardingSteps';
import SyllabusUploadStep from '@/components/onboarding/SyllabusUploadStep';
import CourseOverviewStep from '@/components/onboarding/CourseOverviewStep';
import LearningGoalsStep from '@/components/onboarding/LearningGoalsStep';
import AssessmentPracticesStep from '@/components/onboarding/AssessmentPracticesStep';
import DeliveryContextStep from '@/components/onboarding/DeliveryContextStep';
import DocumentUploadStep from '@/components/onboarding/DocumentUploadStep';
import AIReviewStep from '@/components/onboarding/AIReviewStep';
import FactSheetEditorStep from '@/components/onboarding/FactSheetEditorStep';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

const steps = [
  { label: 'Get Started', description: 'Upload syllabus' },
  { label: 'Course Overview', description: 'Basic information' },
  { label: 'Learning Goals', description: 'Outcomes and structure' },
  { label: 'Assessment', description: 'Evaluation methods' },
  { label: 'Delivery Context', description: 'Teaching environment' },
  { label: 'Documents', description: 'Upload materials' },
  { label: 'AI Review', description: 'Review and fill gaps' },
  { label: 'Fact Sheet', description: 'Finalize course profile' }
];

export type CourseData = {
  // Course Overview
  title: string;
  code: string;
  level: string;
  subject: string;
  studentCount: string;
  language: string;
  duration: string;
  weeklyStructure: string;
  
  // Learning Goals & Structure
  outcomes: string[];
  unitBreakdown: string;
  prerequisites: string;
  teachingFormat: string;
  
  // Assessment Practices
  evaluationTypes: string[];
  gradingBreakdown: string;
  rubricStrategies: string;
  feedbackMethods: string;
  
  // Delivery Context
  deliveryMode: 'in-person' | 'online' | 'hybrid';
  lmsUsed: string;
  toolsPlatforms: string[];
  accessibilityConsiderations: string;
  
  // Documents
  documents: File[];
  
  // AI Generated & Edited
  factSheet: {
    overview: string;
    learningOutcomes: string;
    courseSequence: string;
    assessments: string;
    teachingModalities: string;
    toolsPlatforms: string;
    notes: string;
    completedSections: string[];
    tags: string[];
  }
}

const CourseOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [courseData, setCourseData] = useState<CourseData>({
    title: '',
    code: '',
    level: '',
    subject: '',
    studentCount: '',
    language: '',
    duration: '',
    weeklyStructure: '',
    
    outcomes: [],
    unitBreakdown: '',
    prerequisites: '',
    teachingFormat: '',
    
    evaluationTypes: [],
    gradingBreakdown: '',
    rubricStrategies: '',
    feedbackMethods: '',
    
    deliveryMode: 'in-person',
    lmsUsed: '',
    toolsPlatforms: [],
    accessibilityConsiderations: '',
    
    documents: [],
    
    factSheet: {
      overview: '',
      learningOutcomes: '',
      courseSequence: '',
      assessments: '',
      teachingModalities: '',
      toolsPlatforms: '',
      notes: '',
      completedSections: [],
      tags: []
    }
  });

  const updateCourseData = (data: Partial<CourseData>) => {
    setCourseData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSave = () => {
    // In a real implementation, we would save to a database
    // For now, save to localStorage as demo
    const courseId = `course_${Date.now()}`;
    localStorage.setItem(courseId, JSON.stringify(courseData));
    navigate('/');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SyllabusUploadStep 
                data={courseData} 
                updateData={updateCourseData} 
                onExtract={() => setCurrentStep(1)}
              />;
      case 1:
        return <CourseOverviewStep data={courseData} updateData={updateCourseData} />;
      case 2:
        return <LearningGoalsStep data={courseData} updateData={updateCourseData} />;
      case 3:
        return <AssessmentPracticesStep data={courseData} updateData={updateCourseData} />;
      case 4:
        return <DeliveryContextStep data={courseData} updateData={updateCourseData} />;
      case 5:
        return <DocumentUploadStep data={courseData} updateData={updateCourseData} />;
      case 6:
        return <AIReviewStep data={courseData} updateData={updateCourseData} />;
      case 7:
        return <FactSheetEditorStep data={courseData} updateData={updateCourseData} />;
      default:
        return <SyllabusUploadStep data={courseData} updateData={updateCourseData} onExtract={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-medium">Course Setup</h2>
          <p className="text-muted-foreground">Create your course profile to enhance AI assistance</p>
        </div>
        
        <OnboardingSteps steps={steps} currentStep={currentStep} />
        
        <div className="mt-8 bg-white rounded-lg border p-6">
          {renderStep()}
        </div>
        
        <div className="mt-6 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          
          <div className="flex gap-3">
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save size={16} />
                Save Course
              </Button>
            ) : currentStep === 0 ? (
              <Button onClick={() => setCurrentStep(1)} className="flex items-center gap-2">
                Skip AI Extraction
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex items-center gap-2">
                Next
                <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseOnboarding;
