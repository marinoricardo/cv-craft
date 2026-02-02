import { FileText } from 'lucide-react';
import { FormSection } from '../FormSection';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ProfessionalProfile } from '@/types/cv';

interface ProfessionalProfileSectionProps {
  data: ProfessionalProfile;
  onChange: (data: ProfessionalProfile) => void;
}

export const ProfessionalProfileSection = ({
  data,
  onChange,
}: ProfessionalProfileSectionProps) => {
  const maxChars = 300;
  const charCount = data.summary.length;

  return (
    <FormSection
      title="Perfil Profissional"
      icon={<FileText size={20} />}
      defaultOpen={true}
    >
      <div className="space-y-2">
        <Label htmlFor="summary">Resumo profissional</Label>
        <Textarea
          id="summary"
          placeholder="Descreva brevemente quem você é, suas principais competências e objetivos profissionais..."
          value={data.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
          rows={4}
          className="resize-none"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Seja breve e objetivo</span>
          <span className={charCount > maxChars ? 'text-destructive' : ''}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>
    </FormSection>
  );
};
