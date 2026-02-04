import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { FormSection } from '../FormSection';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Education } from '@/types/cv';
import { motion, AnimatePresence } from 'framer-motion';

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
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {data.map((edu, index) => (
            <motion.div
              key={edu.id}
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
                  Formação {index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Instituição *</Label>
                  <Input
                    placeholder="Ex: Universidade Eduardo Mondlane"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, 'institution', e.target.value)
                    }
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Grau *</Label>
                  <Input
                    placeholder="Ex: Licenciatura"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, 'degree', e.target.value)
                    }
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Área de estudo</Label>
                <Input
                  placeholder="Ex: Engenharia Informática"
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(edu.id, 'field', e.target.value)
                  }
                  className="h-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Data de início</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, 'startDate', e.target.value)
                    }
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Data de fim</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, 'endDate', e.target.value)
                    }
                    disabled={edu.current}
                    className="h-10"
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
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          type="button"
          variant="outline"
          onClick={addEducation}
          className="w-full h-12 border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Adicionar formação
        </Button>
      </div>
    </FormSection>
  );
};
