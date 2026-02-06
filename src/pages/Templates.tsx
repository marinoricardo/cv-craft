import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import {
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
    <div className="min-h-screen bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <AppHeader showBackButton backTo="/" showMyCVs showAuth />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 pt-24 pb-24 md:pb-12 relative overflow-hidden">
        {/* Background Effects - Full coverage */}
        <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-muted/20 -z-20" />
        <div className="fixed -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-20" />
        <div className="fixed -bottom-32 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl -z-20" />
        <div className="fixed top-1/3 right-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl -z-20" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 border border-primary/20"
            >
              <Sparkles className="w-4 h-4" />
              Templates Profissionais
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Escolha o Seu Modelo
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Selecione um dos nossos templates profissionais e comece a criar o seu currículo
              perfeito. Cada modelo foi cuidadosamente desenvolvido para destacar as suas qualificações.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <Button
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="transition-all border-primary/30 hover:border-primary/60"
                >
                  {category.id === 'all' && <Filter className="w-4 h-4 mr-1" />}
                  {category.label}
                </Button>
              </motion.div>
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
                    className={`cursor-pointer transition-all hover:shadow-2xl hover:shadow-primary/20 group overflow-hidden ${selectedTemplate === template.id
                        ? 'ring-2 ring-primary border-primary shadow-xl shadow-primary/20'
                        : 'border-primary/20 hover:border-primary/50 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm'
                      }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-0">
                      {/* Template Preview */}
                      <div className="aspect-[4/4.5] bg-gradient-to-br from-white dark:from-card to-muted/10 p-3 relative overflow-hidden">
                        {/* Badges */}
                        <motion.div
                          className="absolute top-2 right-2 flex gap-1 z-10"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {template.isPopular && (
                            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Popular
                            </Badge>
                          )}
                          {template.isPremium && (
                            <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white shadow-lg shadow-amber-500/30">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </motion.div>

                        {/* Selected indicator */}
                        <AnimatePresence>
                          {selectedTemplate === template.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute top-2 left-2 z-10"
                            >
                              <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/40">
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
                            className="border-l-3 pl-2.5 mb-2.5"
                            style={{ borderColor: template.preview.accentColor }}
                          >
                            <div className="font-bold text-[8px] text-foreground">Nome Completo</div>
                            <div className="text-muted-foreground text-[7px]">Profissão</div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div
                                className="font-semibold text-[7px] mb-1"
                                style={{ color: template.preview.accentColor }}
                              >
                                SOBRE
                              </div>
                              <div className="h-0.5 bg-muted rounded w-full" />
                              <div className="h-0.5 bg-muted rounded w-4/5 mt-0.5" />
                            </div>

                            <div>
                              <div
                                className="font-semibold text-[7px] mb-1"
                                style={{ color: template.preview.accentColor }}
                              >
                                EXPERIÊNCIA
                              </div>
                              <div className="h-0.5 bg-muted rounded w-full" />
                              <div className="h-0.5 bg-muted rounded w-3/4 mt-0.5" />
                            </div>

                            <div>
                              <div
                                className="font-semibold text-[7px] mb-1"
                                style={{ color: template.preview.accentColor }}
                              >
                                EDUCAÇÃO
                              </div>
                              <div className="h-0.5 bg-muted rounded w-full" />
                              <div className="h-0.5 bg-muted rounded w-2/3 mt-0.5" />
                            </div>
                          </div>
                        </motion.div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Template Info */}
                      <div className="p-4 border-t border-border/50 bg-gradient-to-b from-card/50 to-transparent">
                        <h3 className="font-bold text-foreground mb-1.5 text-sm">{template.name}</h3>
                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                          {template.description}
                        </p>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            className="w-full h-9 text-sm shadow-lg shadow-primary/25 bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl hover:shadow-primary/40"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUseTemplate(template.id);
                            }}
                          >
                            <Sparkles className="w-3 h-3 mr-1.5" />
                            Usar este Modelo
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Templates;
