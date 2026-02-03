import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  FileText,
  ArrowLeft,
  Check,
  Sparkles,
  Star,
  Filter,
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'minimal' | 'creative';
  isPremium: boolean;
  isPopular: boolean;
  preview: {
    accentColor: string;
    layout: 'single' | 'double';
  };
}

const templates: Template[] = [
  {
    id: 'modern-1',
    name: 'Moderno Profissional',
    description: 'Design limpo e contemporâneo, ideal para áreas de tecnologia e inovação.',
    category: 'modern',
    isPremium: false,
    isPopular: true,
    preview: { accentColor: 'hsl(var(--primary))', layout: 'single' },
  },
  {
    id: 'classic-1',
    name: 'Clássico Elegante',
    description: 'Estilo tradicional e sofisticado, perfeito para áreas corporativas.',
    category: 'classic',
    isPremium: false,
    isPopular: false,
    preview: { accentColor: 'hsl(220 15% 30%)', layout: 'single' },
  },
  {
    id: 'minimal-1',
    name: 'Minimalista',
    description: 'Simplicidade e foco no conteúdo, ideal para qualquer profissão.',
    category: 'minimal',
    isPremium: false,
    isPopular: true,
    preview: { accentColor: 'hsl(220 10% 40%)', layout: 'single' },
  },
  {
    id: 'modern-2',
    name: 'Tech Pro',
    description: 'Design arrojado para profissionais de tecnologia e startups.',
    category: 'modern',
    isPremium: true,
    isPopular: false,
    preview: { accentColor: 'hsl(200 80% 50%)', layout: 'double' },
  },
  {
    id: 'creative-1',
    name: 'Criativo',
    description: 'Layout diferenciado para designers e profissionais criativos.',
    category: 'creative',
    isPremium: true,
    isPopular: false,
    preview: { accentColor: 'hsl(280 60% 50%)', layout: 'double' },
  },
  {
    id: 'classic-2',
    name: 'Executivo',
    description: 'Elegância e profissionalismo para cargos de liderança.',
    category: 'classic',
    isPremium: false,
    isPopular: false,
    preview: { accentColor: 'hsl(35 50% 40%)', layout: 'single' },
  },
];

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'modern', label: 'Modernos' },
  { id: 'classic', label: 'Clássicos' },
  { id: 'minimal', label: 'Minimalistas' },
  { id: 'creative', label: 'Criativos' },
];

export const Templates = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredTemplates = templates.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  const handleUseTemplate = (templateId: string) => {
    localStorage.setItem('meucv_selected_template', templateId);
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">MeuCV</span>
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <Link
              to="/my-cvs"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden md:block"
            >
              Meus CVs
            </Link>
            <Link
              to="/auth"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm hidden md:block"
            >
              Entrar
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Escolha o seu Modelo
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Selecione um dos nossos templates profissionais e comece a criar o seu currículo
            perfeito.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all"
            >
              {category.id === 'all' && <Filter className="w-4 h-4 mr-1" />}
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-xl group ${
                    selectedTemplate === template.id
                      ? 'ring-2 ring-primary border-primary'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-0">
                    {/* Template Preview */}
                    <div className="aspect-[3/4] bg-[hsl(var(--cv-preview-bg))] p-4 relative overflow-hidden">
                      {/* Badges */}
                      <div className="absolute top-2 right-2 flex gap-1 z-10">
                        {template.isPopular && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Popular
                          </Badge>
                        )}
                        {template.isPremium && (
                          <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 border-0">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>

                      {/* Selected indicator */}
                      <AnimatePresence>
                        {selectedTemplate === template.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute top-2 left-2 z-10"
                          >
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Mini CV Preview */}
                      <motion.div
                        className="cv-paper h-full p-3 text-[6px]"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div
                          className="border-l-2 pl-2 mb-2"
                          style={{ borderColor: template.preview.accentColor }}
                        >
                          <div className="font-bold text-[8px] text-foreground">Nome Completo</div>
                          <div className="text-muted-foreground">Profissão</div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div
                              className="font-medium text-[7px] mb-1"
                              style={{ color: template.preview.accentColor }}
                            >
                              Sobre
                            </div>
                            <div className="h-1 bg-muted rounded w-full" />
                            <div className="h-1 bg-muted rounded w-4/5 mt-0.5" />
                          </div>

                          <div>
                            <div
                              className="font-medium text-[7px] mb-1"
                              style={{ color: template.preview.accentColor }}
                            >
                              Experiência
                            </div>
                            <div className="h-1 bg-muted rounded w-full" />
                            <div className="h-1 bg-muted rounded w-3/4 mt-0.5" />
                            <div className="h-1 bg-muted rounded w-5/6 mt-0.5" />
                          </div>

                          <div>
                            <div
                              className="font-medium text-[7px] mb-1"
                              style={{ color: template.preview.accentColor }}
                            >
                              Educação
                            </div>
                            <div className="h-1 bg-muted rounded w-full" />
                            <div className="h-1 bg-muted rounded w-2/3 mt-0.5" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Template Info */}
                    <div className="p-4 border-t border-border">
                      <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {template.description}
                      </p>
                      <Button
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUseTemplate(template.id);
                        }}
                      >
                        Usar este Modelo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">Design by Marino Ricardo</p>
        </div>
      </footer>
    </div>
  );
};

export default Templates;
