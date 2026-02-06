import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  lastSaved?: Date;
  className?: string;
}

export const AutoSaveIndicator = ({ isSaving, lastSaved, className }: AutoSaveIndicatorProps) => {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (!isSaving && lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSaving, lastSaved]);

  const getTimeAgo = () => {
    if (!lastSaved) return '';
    const seconds = Math.floor((new Date().getTime() - lastSaved.getTime()) / 1000);
    if (seconds < 5) return 'agora';
    if (seconds < 60) return `há ${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    return `há ${minutes}min`;
  };

  return (
    <div className={cn('flex items-center gap-2 text-xs', className)}>
      <AnimatePresence mode="wait">
        {isSaving ? (
          <motion.div
            key="saving"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 text-muted-foreground"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>A guardar...</span>
          </motion.div>
        ) : showSaved ? (
          <motion.div
            key="saved"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 text-green-600"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Guardado {getTimeAgo()}</span>
          </motion.div>
        ) : lastSaved ? (
          <motion.div
            key="cloud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1.5 text-muted-foreground"
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Guardado {getTimeAgo()}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
