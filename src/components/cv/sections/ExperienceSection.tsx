import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { FormSection } from '../FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Experience } from '@/types/cv';
import { motion, AnimatePresence } from 'framer-motion';

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
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {data.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-muted/50 rounded-xl space-y-4 border border-border/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center text-xs text-primary font-bold">
                    {index + 1}
                  </span>
                  Experiência {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Empresa *</Label>
                  <Input
                    placeholder="Ex: Empresa ABC"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, 'company', e.target.value)
                    }
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Cargo *</Label>
                  <Input
                    placeholder="Ex: Desenvolvedor Frontend"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(exp.id, 'position', e.target.value)
                    }
                    className="h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Data de início</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, 'startDate', e.target.value)
                    }
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Data de fim</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, 'endDate', e.target.value)
                    }
                    disabled={exp.current}
                    className="h-10"
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
                <Label className="text-xs font-medium">Descrição das atividades</Label>
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
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          type="button"
          variant="outline"
          onClick={addExperience}
          className="w-full h-12 border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Adicionar experiência
        </Button>
      </div>
    </FormSection>
  );
};
