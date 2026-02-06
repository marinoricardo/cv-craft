import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CVData } from '@/types/cv';
import { CVPreview } from './CVPreview';
import { X, Eye, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobilePreviewDrawerProps {
  cvData: CVData;
  photo?: string;
}

export const MobilePreviewDrawer = ({ cvData, photo }: MobilePreviewDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <>
      {/* Trigger Button - Fixed at bottom on mobile */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-4 z-40 md:hidden flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-xl"
        whileTap={{ scale: 0.95 }}
      >
        <Eye className="w-5 h-5" />
        <span className="font-medium text-sm">Ver Preview</span>
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 md:hidden bg-card rounded-t-3xl border-t border-border max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-muted rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
                <h3 className="font-semibold text-foreground">Preview do CV</h3>
                <div className="flex items-center gap-2">
                  {/* Preview mode toggle */}
                  <div className="flex items-center bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={cn(
                        'p-1.5 rounded-md transition-colors',
                        previewMode === 'mobile' ? 'bg-card shadow-sm' : 'text-muted-foreground'
                      )}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={cn(
                        'p-1.5 rounded-md transition-colors',
                        previewMode === 'desktop' ? 'bg-card shadow-sm' : 'text-muted-foreground'
                      )}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-auto p-4 bg-muted/30">
                <div
                  className={cn(
                    'mx-auto transition-all duration-300',
                    previewMode === 'mobile' ? 'max-w-[320px]' : 'max-w-full'
                  )}
                >
                  <CVPreview cvData={cvData} photo={photo} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
