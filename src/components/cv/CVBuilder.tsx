import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CVData, defaultCVData } from '@/types/cv';
import { CVForm } from './CVForm';
import { CVPreview } from './CVPreview';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { Button } from '@/components/ui/button';
import { Download, Save, Sparkles } from 'lucide-react';

interface ExtendedCVData extends CVData {
  photo?: string;
}

export const CVBuilder = () => {
  const [cvData, setCVData] = useState<ExtendedCVData>({ ...defaultCVData, photo: '' });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <AppHeader showBackButton backTo="/templates" showAuth={false}>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Sparkles className="w-4 h-4 mr-1.5" />
            Melhorar com IA
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Guardar</span>
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Exportar PDF</span>
          </Button>
        </div>
      </AppHeader>

      <main className="flex-1 container mx-auto px-4 py-6 pt-24">
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
            className="order-2 lg:order-1"
          >
            <CVForm cvData={cvData} onChange={setCVData} />
          </motion.div>

          {/* Right Column - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="order-1 lg:order-2 lg:sticky lg:top-24 lg:h-fit"
          >
            <CVPreview cvData={cvData} photo={cvData.photo} />
          </motion.div>
        </motion.div>
      </main>

      <AppFooter />
    </div>
  );
};
