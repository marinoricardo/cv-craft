import { FileText, Sparkles } from 'lucide-react';
import { FormSection } from '../FormSection';
import { RichTextEditor } from '../RichTextEditor';
import { ProfessionalProfile } from '@/types/cv';

interface ProfessionalProfileSectionProps {
  data: ProfessionalProfile;
  onChange: (data: ProfessionalProfile) => void;
}

export const ProfessionalProfileSection = ({
  data,
  onChange,
}: ProfessionalProfileSectionProps) => {
  return (
    <FormSection
      title="Perfil Profissional"
      icon={<FileText size={20} />}
      defaultOpen={true}
    >
      <RichTextEditor
        value={data.summary}
        onChange={(summary) => onChange({ summary })}
        placeholder="Descreva brevemente quem você é, suas principais competências e objectivos profissionais..."
        maxChars={400}
        showAIHint={true}
        rows={5}
      />
    </FormSection>
  );
};
