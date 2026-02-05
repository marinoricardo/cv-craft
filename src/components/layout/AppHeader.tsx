import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ArrowLeft, Plus, Upload } from 'lucide-react';

interface AppHeaderProps {
  showBackButton?: boolean;
  backTo?: string;
  showAuth?: boolean;
  showNewCV?: boolean;
  showAnalyzeCV?: boolean;
  showTemplates?: boolean;
  showMyCVs?: boolean;
  children?: React.ReactNode;
}

export const AppHeader = ({
  showBackButton = false,
  backTo = '/',
  showAuth = true,
  showNewCV = false,
  showAnalyzeCV = false,
  showTemplates = false,
  showMyCVs = false,
  children,
}: AppHeaderProps) => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button variant="ghost" size="icon" asChild>
              <Link to={backTo}>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
          )}
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

        <nav className="flex items-center gap-3">
          {showAnalyzeCV && (
            <Link
              to="/cv-analysis"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden md:flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4" />
              Analisar CV
            </Link>
          )}
          {showTemplates && (
            <Link
              to="/templates"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden md:block"
            >
              Modelos
            </Link>
          )}
          {showMyCVs && (
            <Link
              to="/my-cvs"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden md:block"
            >
              Meus CVs
            </Link>
          )}
          {showAuth && (
            <Link
              to="/auth"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden md:block"
            >
              Entrar
            </Link>
          )}
          <ThemeToggle />
          {showNewCV && (
            <Button asChild size="sm">
              <Link to="/templates">
                <Plus className="w-4 h-4 mr-1.5" />
                Novo CV
              </Link>
            </Button>
          )}
          {children}
        </nav>
      </div>
    </header>
  );
};
