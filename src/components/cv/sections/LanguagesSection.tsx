import { Languages, Plus, X } from 'lucide-react';
import { FormSection } from '../FormSection';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Language } from '@/types/cv';
import { useState } from 'react';

interface LanguagesSectionProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

const levelLabels = {
  basic: 'Básico',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
  fluent: 'Fluente',
  native: 'Nativo',
};

export const LanguagesSection = ({ data, onChange }: LanguagesSectionProps) => {
  const [newLanguage, setNewLanguage] = useState('');
  const [newLevel, setNewLevel] = useState<Language['level']>('intermediate');

  const addLanguage = () => {
    if (!newLanguage.trim()) return;
    
    const language: Language = {
      id: crypto.randomUUID(),
      name: newLanguage.trim(),
      level: newLevel,
    };
    onChange([...data, language]);
    setNewLanguage('');
  };

  const removeLanguage = (id: string) => {
    onChange(data.filter((lang) => lang.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLanguage();
    }
  };

  return (
    <FormSection
      title="Idiomas"
      icon={<Languages size={20} />}
      badge={data.length > 0 ? `${data.length}` : undefined}
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ex: Português, Inglês, Espanhol..."
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Select value={newLevel} onValueChange={(v) => setNewLevel(v as Language['level'])}>
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
          <Button type="button" onClick={addLanguage} size="icon">
            <Plus size={18} />
          </Button>
        </div>

        {data.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full text-sm"
              >
                <span className="text-foreground">{lang.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({levelLabels[lang.level]})
                </span>
                <button
                  type="button"
                  onClick={() => removeLanguage(lang.id)}
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
            Adicione os idiomas que você domina
          </p>
        )}
      </div>
    </FormSection>
  );
};
