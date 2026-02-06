import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { CVData, defaultCVData } from '@/types/cv';
import { CVForm } from './CVForm';
import { CVPreview } from './CVPreview';
import { CVCompletionScore } from './CVCompletionScore';
import { AutoSaveIndicator } from './AutoSaveIndicator';
import { MobilePreviewDrawer } from './MobilePreviewDrawer';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { Button } from '@/components/ui/button';
import { Download, Save, Sparkles, Monitor, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExtendedCVData extends CVData {
  photo?: string;
}

export const CVBuilder = () => {
  const [cvData, setCVData] = useState<ExtendedCVData>(() => {
    const saved = localStorage.getItem('meucv_current_cv');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { ...defaultCVData, photo: '' };
      }
    }
    return { ...defaultCVData, photo: '' };
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const isMobile = useIsMobile();

  // Auto-save functionality
  const autoSave = useCallback((data: ExtendedCVData) => {
    setIsSaving(true);
    
    // Debounce save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('meucv_current_cv', JSON.stringify(data));
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000);
  }, []);

  const handleDataChange = useCallback((data: ExtendedCVData) => {
    setCVData(data);
    autoSave(data);
  }, [autoSave]);

  const handleManualSave = () => {
    setIsSaving(true);
    localStorage.setItem('meucv_current_cv', JSON.stringify(cvData));
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
      toast.success('Currículo guardado com sucesso!');
    }, 500);
  };

  const handleExportPDF = () => {
    toast.info('Funcionalidade de exportação PDF em breve!');
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <AppHeader showBackButton backTo="/templates" showAuth={false}>
        <div className="flex items-center gap-2">
          <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} className="hidden sm:flex" />
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Sparkles className="w-4 h-4 mr-1.5" />
            Melhorar com IA
          </Button>
          <Button variant="outline" size="sm" onClick={handleManualSave}>
            <Save className="w-4 h-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Guardar</span>
          </Button>
          <Button size="sm" onClick={handleExportPDF}>
            <Download className="w-4 h-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Exportar PDF</span>
          </Button>
        </div>
      </AppHeader>

      <main className="flex-1 container mx-auto px-4 py-6 pt-24 pb-24 md:pb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="order-2 lg:order-1 space-y-4"
          >
            {/* Score on mobile */}
            <div className="lg:hidden">
              <CVCompletionScore cvData={cvData} />
            </div>
            
            <CVForm cvData={cvData} onChange={handleDataChange} />
          </motion.div>

          {/* Right Column - Preview (Desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="order-1 lg:order-2 lg:sticky lg:top-24 lg:h-fit hidden lg:block space-y-4"
          >
            {/* Score + Preview toggle */}
            <div className="flex items-center justify-between gap-4">
              <CVCompletionScore cvData={cvData} className="flex-1" />
              
              {/* Preview mode toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    previewMode === 'desktop' ? 'bg-card shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  )}
                  title="Vista Desktop"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={cn(
                    'p-2 rounded-md transition-colors',
                    previewMode === 'mobile' ? 'bg-card shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  )}
                  title="Vista Mobile"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div
              className={cn(
                'mx-auto transition-all duration-300',
                previewMode === 'mobile' ? 'max-w-[360px]' : 'max-w-full'
              )}
            >
              <CVPreview cvData={cvData} photo={cvData.photo} />
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Mobile Preview Drawer */}
      {isMobile && <MobilePreviewDrawer cvData={cvData} photo={cvData.photo} />}

      <div className="hidden lg:block">
        <AppFooter />
      </div>
    </div>
  );
};