import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AnimatedCard } from '@/components/AnimatedCard';
import {
  FileText,
  Zap,
  Download,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Globe,
  Smartphone,
  Shield,
  Star,
  Users,
  TrendingUp,
  Upload,
  Play,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Rápido e Fácil',
    description: 'Crie seu currículo profissional em menos de 10 minutos, sem complicações.',
  },
  {
    icon: Sparkles,
    title: 'Melhore com IA',
    description: 'Nossa inteligência artificial ajuda a otimizar suas descrições profissionais.',
  },
  {
    icon: Download,
    title: 'Exportar PDF',
    description: 'Baixe seu currículo em PDF de alta qualidade, pronto para enviar.',
  },
  {
    icon: Globe,
    title: 'Modelos Profissionais',
    description: 'Escolha entre vários templates modernos e elegantes.',
  },
  {
    icon: Smartphone,
    title: 'Acesse em Qualquer Lugar',
    description: 'Continue de onde parou, no computador ou no celular.',
  },
  {
    icon: Shield,
    title: 'Seus Dados Seguros',
    description: 'Suas informações são protegidas e nunca compartilhadas.',
  },
];

const steps = [
  { number: '1', title: 'Escolha um Modelo', description: 'Selecione entre nossos templates profissionais', icon: FileText },
  { number: '2', title: 'Preencha seus Dados', description: 'Adicione suas experiências e competências', icon: Users },
  { number: '3', title: 'Exporte em PDF', description: 'Baixe e envie para as empresas', icon: Download },
];

const testimonials = [
  {
    name: 'Maria Santos',
    role: 'Designer UX',
    content: 'Consegui meu emprego dos sonhos graças ao currículo que criei aqui. A análise de IA foi fundamental!',
    avatar: '👩‍💻',
  },
  {
    name: 'João Silva',
    role: 'Desenvolvedor',
    content: 'Simples, rápido e profissional. Em 15 minutos tinha um CV perfeito.',
    avatar: '👨‍💼',
  },
  {
    name: 'Ana Oliveira',
    role: 'Marketing Digital',
    content: 'Os modelos são lindos e a exportação em PDF fica impecável.',
    avatar: '👩‍🎨',
  },
];

const stats = [
  { value: '50K+', label: 'Currículos Criados' },
  { value: '92%', label: 'Taxa de Sucesso' },
  { value: '4.9', label: 'Avaliação Média', icon: Star },
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
            >
              <FileText className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="font-bold text-xl text-foreground">MeuCV</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
              Modelos
            </Link>
            <Link to="/cv-analysis" className="text-muted-foreground hover:text-foreground transition-colors">
              Analisar CV
            </Link>
            <Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">
              Entrar
            </Link>
            <ThemeToggle />
            <Button asChild>
              <Link to="/templates">
                Criar Currículo
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm">
              <Link to="/templates">Começar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-background to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Agora com Inteligência Artificial
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              Crie Currículos que{' '}
              <span className="text-primary relative">
                Impressionam
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-2 left-0 h-3 bg-primary/20 -z-10"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              A plataforma mais inteligente para criar, analisar e otimizar o seu currículo.
              Destaque-se da concorrência com IA.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" asChild className="text-base h-12 px-8">
                <Link to="/templates">
                  Criar Currículo Grátis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base h-12 px-8">
                <Link to="/cv-analysis">
                  <Upload className="w-5 h-5 mr-2" />
                  Analisar Meu CV
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Sem registo obrigatório
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                100% gratuito
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Exportar ilimitado
              </span>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                  {stat.icon && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div className="bg-muted px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-xs text-muted-foreground ml-2">MeuCV Editor</span>
              </div>
              <div className="p-8 bg-[hsl(var(--cv-preview-bg))]">
                <div className="cv-paper p-8 max-w-md mx-auto">
                  <div className="border-l-4 border-primary pl-4 mb-4">
                    <h3 className="font-bold text-lg text-foreground">João Silva</h3>
                    <p className="text-sm text-muted-foreground">Desenvolvedor Full Stack</p>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="h-2 bg-muted rounded w-full" />
                    <div className="h-2 bg-muted rounded w-5/6" />
                    <div className="h-2 bg-muted rounded w-4/5" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs font-medium text-primary mb-2">Experiência</p>
                    <div className="space-y-2">
                      <div className="h-2 bg-muted rounded w-full" />
                      <div className="h-2 bg-muted rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -left-4 md:-left-16 top-1/4 bg-card rounded-lg shadow-lg border border-border p-3 hidden lg:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pontuação</p>
                  <p className="font-bold text-foreground">92/100</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -right-4 md:-right-16 bottom-1/4 bg-card rounded-lg shadow-lg border border-border p-3 hidden lg:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Sugestões IA</p>
                  <p className="font-bold text-foreground">+15 melhorias</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CV Analysis CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-primary/10 via-accent to-primary/5 border-primary/20 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                      <Upload className="w-4 h-4" />
                      Novo
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      Já tem um CV? Analise com IA!
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Carregue o seu currículo atual e receba uma análise completa com pontuação,
                      compatibilidade ATS e sugestões de melhoria personalizadas.
                    </p>
                    <Button size="lg" asChild>
                      <Link to="/cv-analysis">
                        Analisar Meu CV
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <div className="relative">
                      <div className="w-48 h-64 bg-card rounded-lg shadow-lg border border-border p-4">
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded w-3/4" />
                          <div className="h-2 bg-muted rounded w-full" />
                          <div className="h-2 bg-muted rounded w-5/6" />
                        </div>
                      </div>
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -right-8 -top-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                      >
                        85/100
                      </motion.div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Três passos simples para criar o currículo perfeito
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative z-10"
                >
                  {step.number}
                </motion.div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo o que Precisa
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ferramentas poderosas para criar currículos que impressionam
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <AnimatedCard key={index} delay={index * 0.05} className="border-border hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent text-accent-foreground rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O que Dizem Sobre Nós
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Milhares de profissionais já transformaram as suas carreiras
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-foreground mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Pronto para Criar seu Currículo?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Junte-se a milhares de profissionais que já criaram currículos
                incríveis com o MeuCV.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="text-base">
                  <Link to="/templates">
                    Começar Agora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link to="/cv-analysis">
                    <Upload className="w-5 h-5 mr-2" />
                    Analisar CV Existente
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">MeuCV</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MeuCV. Design by Marino Ricardo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
