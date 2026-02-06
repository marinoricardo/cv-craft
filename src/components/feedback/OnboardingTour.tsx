import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, Sparkles, FileText, Download, Zap } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Bem-vindo ao MeuCV! 👋',
    description: 'Crie currículos profissionais em minutos. Vamos mostrar-te como funciona.',
    icon: Sparkles,
  },
  {
    id: 'templates',
    title: 'Escolha um Modelo',
    description: 'Temos templates modernos e profissionais para diferentes áreas.',
    icon: FileText,
  },
  {
    id: 'builder',
    title: 'Editor Intuitivo',
    description: 'Preencha seus dados com ajuda de IA e veja o resultado em tempo real.',
    icon: Zap,
  },
  {
    id: 'export',
    title: 'Exporte em PDF',
    description: 'Baixe seu currículo pronto para enviar às empresas.',
    icon: Download,
  },
];

interface OnboardingTourProps {
  onComplete?: () => void;
}

export const OnboardingTour = ({ onComplete }: OnboardingTourProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('meucv_tour_completed');
    if (!hasSeenTour) {
      // Delay showing tour for smoother UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('meucv_tour_completed', 'true');
    onComplete?.();
  };

  const handleSkip = () => {
    handleClose();
  };

  const step = tourSteps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === tourSteps.length - 1;
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[101] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md"
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Progress bar */}
              <div className="h-1 bg-muted">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-xs text-muted-foreground font-medium">
                  Passo {currentStep + 1} de {tourSteps.length}
                </span>
                <button
                  onClick={handleClose}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border flex items-center justify-between gap-3">
                <Button variant="ghost" size="sm" onClick={handleSkip}>
                  Pular
                </Button>
                <div className="flex gap-1.5">
                  {tourSteps.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <Button size="sm" onClick={handleNext}>
                  {isLastStep ? 'Começar' : 'Próximo'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
