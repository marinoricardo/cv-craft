import { Wrench, Plus, X } from 'lucide-react';
import { FormSection } from '../FormSection';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skill } from '@/types/cv';
import { useState } from 'react';

interface SkillsSectionProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

const levelLabels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
  expert: 'Especialista',
};

export const SkillsSection = ({ data, onChange }: SkillsSectionProps) => {
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState<Skill['level']>('intermediate');

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const skill: Skill = {
      id: crypto.randomUUID(),
      name: newSkill.trim(),
      level: newLevel,
    };
    onChange([...data, skill]);
    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <FormSection
      title="Competências"
      icon={<Wrench size={20} />}
      badge={data.length > 0 ? `${data.length}` : undefined}
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ex: JavaScript, Gestão de projetos..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Select value={newLevel} onValueChange={(v) => setNewLevel(v as Skill['level'])}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(levelLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" onClick={addSkill} size="icon">
            <Plus size={18} />
          </Button>
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full text-sm"
              >
                <span className="text-foreground">{skill.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({levelLabels[skill.level]})
                </span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {data.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Adicione suas competências técnicas e pessoais
          </p>
        )}
      </div>
    </FormSection>
  );
};
