import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CVData, defaultCVData } from '@/types/cv';
import { CVHeader } from './CVHeader';
import { CVForm } from './CVForm';
import { CVPreview } from './CVPreview';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { FileText, Download, Save, ArrowLeft } from 'lucide-react';

export const CVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/templates">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-9 h-9 rounded-xl overflow-hidden shadow-lg shadow-primary/25"
              >
                <img
                  src="https://play-lh.googleusercontent.com/z81hJTceXbEjcaqkxbOpSrG1eps7Yprf_VsBrT1wnJ1YK_vQOcFLkME5P8tozRPosA=w480-h960-rw"
                  alt="MeuCV"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <span className="font-bold text-xl text-foreground">MeuCV</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Guardar</span>
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Exportar PDF</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
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
            <CVPreview cvData={cvData} />
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">Design by Marino Ricardo</p>
        </div>
      </footer>
    </div>
  );
};
