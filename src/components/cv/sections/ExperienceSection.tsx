import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { FormSection } from '../FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Experience } from '@/types/cv';

interface ExperienceSectionProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceSection = ({ data, onChange }: ExperienceSectionProps) => {
  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange(
      data.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  return (
    <FormSection
      title="Experiência Profissional"
      icon={<Briefcase size={20} />}
      badge={data.length > 0 ? `${data.length}` : undefined}
    >
      <div className="space-y-6">
        {data.map((exp, index) => (
          <div
            key={exp.id}
            className="p-4 bg-secondary/50 rounded-lg space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Experiência {index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Empresa *</Label>
                <Input
                  placeholder="Ex: Empresa ABC"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, 'company', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Cargo *</Label>
                <Input
                  placeholder="Ex: Desenvolvedor Frontend"
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(exp.id, 'position', e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data de início</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, 'startDate', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Data de fim</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(exp.id, 'endDate', e.target.value)
                  }
                  disabled={exp.current}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) =>
                  updateExperience(exp.id, 'current', checked as boolean)
                }
              />
              <Label htmlFor={`current-${exp.id}`} className="text-sm cursor-pointer">
                Trabalho atual
              </Label>
            </div>

            <div className="space-y-2">
              <Label>Descrição das atividades</Label>
              <Textarea
                placeholder="Descreva suas principais responsabilidades e conquistas..."
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, 'description', e.target.value)
                }
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addExperience}
          className="w-full"
        >
          <Plus size={18} className="mr-2" />
          Adicionar experiência
        </Button>
      </div>
    </FormSection>
  );
};
