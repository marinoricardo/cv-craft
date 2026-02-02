import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { FormSection } from '../FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Education } from '@/types/cv';

interface EducationSectionProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationSection = ({ data, onChange }: EducationSectionProps) => {
  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    onChange([...data, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    onChange(
      data.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  return (
    <FormSection
      title="Educação"
      icon={<GraduationCap size={20} />}
      badge={data.length > 0 ? `${data.length}` : undefined}
    >
      <div className="space-y-6">
        {data.map((edu, index) => (
          <div
            key={edu.id}
            className="p-4 bg-secondary/50 rounded-lg space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Formação {index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Instituição *</Label>
                <Input
                  placeholder="Ex: Universidade de Lisboa"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, 'institution', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Grau *</Label>
                <Input
                  placeholder="Ex: Licenciatura"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, 'degree', e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Área de estudo</Label>
              <Input
                placeholder="Ex: Engenharia Informática"
                value={edu.field}
                onChange={(e) =>
                  updateEducation(edu.id, 'field', e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data de início</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(edu.id, 'startDate', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Data de fim</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(edu.id, 'endDate', e.target.value)
                  }
                  disabled={edu.current}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id={`current-edu-${edu.id}`}
                checked={edu.current}
                onCheckedChange={(checked) =>
                  updateEducation(edu.id, 'current', checked as boolean)
                }
              />
              <Label htmlFor={`current-edu-${edu.id}`} className="text-sm cursor-pointer">
                A frequentar
              </Label>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addEducation}
          className="w-full"
        >
          <Plus size={18} className="mr-2" />
          Adicionar formação
        </Button>
      </div>
    </FormSection>
  );
};
