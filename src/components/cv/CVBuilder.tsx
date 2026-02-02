import { useState } from 'react';
import { CVData, defaultCVData } from '@/types/cv';
import { CVHeader } from './CVHeader';
import { CVForm } from './CVForm';
import { CVPreview } from './CVPreview';

export const CVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);

  return (
    <div className="min-h-screen bg-background">
      <CVHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1">
            <CVForm cvData={cvData} onChange={setCVData} />
          </div>

          {/* Right Column - Preview */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:h-fit">
            <CVPreview cvData={cvData} />
          </div>
        </div>
      </main>
    </div>
  );
};
