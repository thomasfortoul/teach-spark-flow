
import React, { useState } from 'react';
import Header from '@/components/Header';
import PhaseCard from '@/components/PhaseCard';
import PhasePanel from '@/components/PhasePanel';

const Index = () => {
  const [activePhase, setActivePhase] = useState<'planning' | 'presentation' | 'evaluation' | null>(null);

  const handlePhaseClick = (phase: 'planning' | 'presentation' | 'evaluation') => {
    setActivePhase(phase);
  };

  const closePhasePanel = () => {
    setActivePhase(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-medium">Teaching Assistant Dashboard</h2>
          <p className="text-muted-foreground">Select a teaching phase to begin working with AI assistance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <PhaseCard phase="planning" onClick={() => handlePhaseClick('planning')} />
          <PhaseCard phase="presentation" onClick={() => handlePhaseClick('presentation')} />
          <PhaseCard phase="evaluation" onClick={() => handlePhaseClick('evaluation')} />
        </div>
      </main>
      
      {activePhase && (
        <PhasePanel phase={activePhase} onClose={closePhasePanel} />
      )}
    </div>
  );
};

export default Index;
