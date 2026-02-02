import { CVData } from '@/types/cv';

interface CVProgressProps {
  cvData: CVData;
}

export const CVProgress = ({ cvData }: CVProgressProps) => {
  const calculateProgress = (): number => {
    let completed = 0;
    let total = 7;

    // Personal data (name and email required)
    if (cvData.personalData.fullName && cvData.personalData.email) completed++;
    
    // Professional profile
    if (cvData.professionalProfile.summary.length > 50) completed++;
    
    // Experience
    if (cvData.experiences.length > 0) completed++;
    
    // Education
    if (cvData.education.length > 0) completed++;
    
    // Skills
    if (cvData.skills.length >= 3) completed++;
    
    // Languages
    if (cvData.languages.length > 0) completed++;
    
    // Phone or location
    if (cvData.personalData.phone || cvData.personalData.location) completed++;

    return Math.round((completed / total) * 100);
  };

  const progress = calculateProgress();

  const getProgressMessage = () => {
    if (progress < 30) return 'Comece adicionando seus dados pessoais';
    if (progress < 60) return 'Bom progresso! Continue preenchendo';
    if (progress < 90) return 'Quase lá! Revise os detalhes';
    return 'CV completo! Pronto para exportar';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">
          Progresso do CV
        </span>
        <span className="text-sm font-semibold text-primary">
          {progress}%
        </span>
      </div>
      <div className="h-2 rounded-full progress-track overflow-hidden">
        <div
          className="h-full progress-fill rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {getProgressMessage()}
      </p>
    </div>
  );
};
