import { motion } from 'framer-motion';
import { CVData } from '@/types/cv';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CVCompletionScoreProps {
  cvData: CVData;
  className?: string;
}

interface ScoreSection {
  name: string;
  weight: number;
  check: (data: CVData) => boolean;
  tip: string;
}

const scoreSections: ScoreSection[] = [
  {
    name: 'Nome completo',
    weight: 10,
    check: (data) => data.personalData.fullName.length > 3,
    tip: 'Adicione seu nome completo',
  },
  {
    name: 'Email',
    weight: 10,
    check: (data) => data.personalData.email.includes('@'),
    tip: 'Adicione um email válido',
  },
  {
    name: 'Telefone',
    weight: 10,
    check: (data) => data.personalData.phone.length > 6,
    tip: 'Adicione seu telefone',
  },
  {
    name: 'Perfil profissional',
    weight: 20,
    check: (data) => data.professionalProfile.summary.length > 50,
    tip: 'Descreva seu perfil profissional (mín. 50 caracteres)',
  },
  {
    name: 'Experiência',
    weight: 20,
    check: (data) => data.experiences.length > 0 && data.experiences[0].company.length > 0,
    tip: 'Adicione pelo menos uma experiência',
  },
  {
    name: 'Educação',
    weight: 15,
    check: (data) => data.education.length > 0 && data.education[0].institution.length > 0,
    tip: 'Adicione sua formação acadêmica',
  },
  {
    name: 'Competências',
    weight: 10,
    check: (data) => data.skills.length >= 3,
    tip: 'Adicione pelo menos 3 competências',
  },
  {
    name: 'Idiomas',
    weight: 5,
    check: (data) => data.languages.length > 0,
    tip: 'Adicione os idiomas que fala',
  },
];

export const CVCompletionScore = ({ cvData, className }: CVCompletionScoreProps) => {
  const completedSections = scoreSections.filter((section) => section.check(cvData));
  const score = completedSections.reduce((acc, section) => acc + section.weight, 0);
  const incompleteSections = scoreSections.filter((section) => !section.check(cvData));

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getScoreLabel = () => {
    if (score >= 90) return 'Excelente!';
    if (score >= 70) return 'Muito bom';
    if (score >= 50) return 'Bom começo';
    return 'Continue preenchendo';
  };

  return (
    <div className={cn('bg-card rounded-xl border border-border p-4', className)}>
      {/* Score Circle */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              strokeWidth="6"
              fill="none"
              className="stroke-muted"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              strokeWidth="6"
              fill="none"
              className={cn('stroke-primary', getScoreColor().replace('text-', 'stroke-'))}
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 176' }}
              animate={{ strokeDasharray: `${(score / 100) * 176} 176` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn('text-lg font-bold', getScoreColor())}>{score}%</span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{getScoreLabel()}</h3>
          <p className="text-sm text-muted-foreground">
            {completedSections.length} de {scoreSections.length} secções completas
          </p>
        </div>
      </div>

      {/* Incomplete sections tips */}
      {incompleteSections.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary" />
            Próximos passos para melhorar:
          </p>
          {incompleteSections.slice(0, 3).map((section) => (
            <div
              key={section.name}
              className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2"
            >
              <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>{section.tip}</span>
            </div>
          ))}
        </div>
      )}

      {/* All complete */}
      {incompleteSections.length === 0 && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-500/10 rounded-lg px-3 py-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Parabéns! Seu CV está completo.</span>
        </div>
      )}
    </div>
  );
};
