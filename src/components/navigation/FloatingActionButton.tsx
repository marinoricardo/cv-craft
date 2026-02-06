import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, FileText, Upload, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const fabActions = [
  { icon: FileText, label: 'Novo CV', path: '/templates', color: 'bg-primary' },
  { icon: Upload, label: 'Analisar CV', path: '/cv-analysis', color: 'bg-green-600' },
];

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Don't show on builder or landing page
  if (location.pathname === '/builder' || location.pathname === '/') return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm -z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Action buttons */}
            <motion.div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end">
              {fabActions.map((action, index) => (
                <motion.div
                  key={action.path}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="bg-card px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg border border-border whitespace-nowrap">
                    {action.label}
                  </span>
                  <Link
                    to={action.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center shadow-lg',
                      action.color,
                      'text-white'
                    )}
                  >
                    <action.icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center shadow-xl',
          'bg-primary text-primary-foreground',
          'transition-transform duration-200'
        )}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};
