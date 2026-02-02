import { FileText, Sparkles, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CVHeader = () => {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="text-primary-foreground" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MeuCV</h1>
              <p className="text-xs text-muted-foreground">Crie seu currículo profissional</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:flex">
              <Sparkles size={18} className="mr-2" />
              Melhorar com IA
            </Button>
            <Button>
              <Download size={18} className="mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
