
import React, { useRef } from 'react';
import { CourseData } from '@/pages/CourseOnboarding';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, FilePlus, X } from 'lucide-react';

interface DocumentUploadStepProps {
  data: CourseData;
  updateData: (data: Partial<CourseData>) => void;
}

const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({ data, updateData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const updatedDocuments = [...data.documents, ...newFiles];
      updateData({ documents: updatedDocuments });
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedDocuments = data.documents.filter((_, i) => i !== index);
    updateData({ documents: updatedDocuments });
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText size={18} />;
    if (fileType.includes('doc')) return <FileText size={18} />;
    if (fileType.includes('txt')) return <FileText size={18} />;
    return <FilePlus size={18} />;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Document Upload</h3>
      <p className="text-muted-foreground">Upload relevant teaching materials to help generate your course fact sheet.</p>
      
      <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center bg-muted/30">
        <Upload size={32} className="mb-4 text-muted-foreground" />
        <h4 className="text-lg font-medium mb-1">Upload Course Documents</h4>
        <p className="text-muted-foreground mb-4">
          Upload syllabus, assignments, rubrics, or other course materials
        </p>
        <Button 
          onClick={() => fileInputRef.current?.click()} 
          variant="outline"
          className="gap-2"
        >
          <FilePlus size={16} />
          Select Files
        </Button>
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
        />
      </div>
      
      {data.documents.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Uploaded Documents ({data.documents.length})</h4>
          <ul className="space-y-2">
            {data.documents.map((file, index) => (
              <li 
                key={index} 
                className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveFile(index)}
                >
                  <X size={16} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUploadStep;
