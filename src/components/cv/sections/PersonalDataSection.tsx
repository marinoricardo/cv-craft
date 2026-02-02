import { User } from 'lucide-react';
import { FormSection } from '../FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalData } from '@/types/cv';

interface PersonalDataSectionProps {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
}

export const PersonalDataSection = ({ data, onChange }: PersonalDataSectionProps) => {
  const handleChange = (field: keyof PersonalData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <FormSection
      title="Dados Pessoais"
      icon={<User size={20} />}
      defaultOpen={true}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome completo *</Label>
            <Input
              id="fullName"
              placeholder="Ex: Maria Silva"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Ex: maria@email.com"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              placeholder="Ex: +351 912 345 678"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              placeholder="Ex: Lisboa, Portugal"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn (opcional)</Label>
            <Input
              id="linkedin"
              placeholder="Ex: linkedin.com/in/mariasilva"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website (opcional)</Label>
            <Input
              id="website"
              placeholder="Ex: mariasilva.com"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};
