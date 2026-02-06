import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Target, Award, Crown, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  unlocked: boolean;
}

export const defaultBadges: Badge[] = [
  {
    id: 'first_cv',
    name: 'Primeiro CV',
    description: 'Criou seu primeiro currículo',
    icon: Star,
    color: 'text-yellow-500 bg-yellow-500/10',
    unlocked: false,
  },
  {
    id: 'complete_profile',
    name: 'Perfil Completo',
    description: 'Preencheu 100% do currículo',
    icon: CheckCircle2,
    color: 'text-green-500 bg-green-500/10',
    unlocked: false,
  },
  {
    id: 'ai_user',
    name: 'Amigo da IA',
    description: 'Usou sugestões de IA 5 vezes',
    icon: Sparkles,
    color: 'text-purple-500 bg-purple-500/10',
    unlocked: false,
  },
  {
    id: 'export_master',
    name: 'Mestre do Export',
    description: 'Exportou 3 currículos em PDF',
    icon: Zap,
    color: 'text-blue-500 bg-blue-500/10',
    unlocked: false,
  },
  {
    id: 'multi_template',
    name: 'Explorador',
    description: 'Usou 3 templates diferentes',
    icon: Target,
    color: 'text-orange-500 bg-orange-500/10',
    unlocked: false,
  },
  {
    id: 'top_score',
    name: 'Top 10%',
    description: 'Pontuação ATS acima de 90',
    icon: Trophy,
    color: 'text-amber-500 bg-amber-500/10',
    unlocked: false,
  },
];

interface BadgeDisplayProps {
  badges?: Badge[];
  compact?: boolean;
  className?: string;
}

export const BadgeDisplay = ({ badges = defaultBadges, compact = false, className }: BadgeDisplayProps) => {
  const unlockedBadges = badges.filter((b) => b.unlocked);
  const lockedBadges = badges.filter((b) => !b.unlocked);

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {unlockedBadges.slice(0, 3).map((badge) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cn('w-8 h-8 rounded-lg flex items-center justify-center', badge.color)}
              title={badge.name}
            >
              <Icon className="w-4 h-4" />
            </motion.div>
          );
        })}
        {unlockedBadges.length > 3 && (
          <span className="text-xs text-muted-foreground">+{unlockedBadges.length - 3}</span>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="font-semibold text-foreground flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        Conquistas ({unlockedBadges.length}/{badges.length})
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                'flex flex-col items-center p-3 rounded-xl border transition-all',
                badge.unlocked
                  ? 'border-primary/30 bg-card'
                  : 'border-border bg-muted/30 opacity-50'
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-2',
                  badge.unlocked ? badge.color : 'bg-muted text-muted-foreground'
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-center text-foreground">{badge.name}</span>
              <span className="text-[10px] text-muted-foreground text-center mt-0.5 line-clamp-2">
                {badge.description}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
