import { CVData } from '@/types/cv';
import { CVProgress } from './CVProgress';
import { PersonalDataSection } from './sections/PersonalDataSection';
import { ProfessionalProfileSection } from './sections/ProfessionalProfileSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { LanguagesSection } from './sections/LanguagesSection';

interface CVFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const CVForm = ({ cvData, onChange }: CVFormProps) => {
  return (
    <div className="space-y-4">
      <CVProgress cvData={cvData} />
      
      <PersonalDataSection
        data={cvData.personalData}
        onChange={(personalData) => onChange({ ...cvData, personalData })}
      />
      
      <ProfessionalProfileSection
        data={cvData.professionalProfile}
        onChange={(professionalProfile) => onChange({ ...cvData, professionalProfile })}
      />
      
      <ExperienceSection
        data={cvData.experiences}
        onChange={(experiences) => onChange({ ...cvData, experiences })}
      />
      
      <EducationSection
        data={cvData.education}
        onChange={(education) => onChange({ ...cvData, education })}
      />
      
      <SkillsSection
        data={cvData.skills}
        onChange={(skills) => onChange({ ...cvData, skills })}
      />
      
      <LanguagesSection
        data={cvData.languages}
        onChange={(languages) => onChange({ ...cvData, languages })}
      />
    </div>
  );
};
