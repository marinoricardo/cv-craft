import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Zap, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  Smartphone,
  Shield
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
  { number: '1', title: 'Escolha um Modelo', description: 'Selecione entre nossos templates profissionais' },
  { number: '2', title: 'Preencha seus Dados', description: 'Adicione suas experiências e competências' },
  { number: '3', title: 'Exporte em PDF', description: 'Baixe e envie para as empresas' },
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">MeuCV</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
              Modelos
            </Link>
            <Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">
              Entrar
            </Link>
            <Button asChild>
              <Link to="/templates">
                Criar Currículo
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </nav>

          <div className="md:hidden">
            <Button asChild size="sm">
              <Link to="/templates">Começar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-accent/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Agora com Inteligência Artificial
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight">
            Crie seu Currículo Profissional em{' '}
            <span className="text-primary">Minutos</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simples, rápido e elegante. Escolha entre modelos profissionais, 
            preencha seus dados e exporte em PDF de alta qualidade.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base">
              <Link to="/templates">
                Começar Gratuitamente
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link to="/templates">Ver Modelos</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
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
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div className="bg-muted px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
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
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Três passos simples para criar o currículo perfeito
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tudo o que Precisa
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ferramentas poderosas para criar currículos que impressionam
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent text-accent-foreground rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Pronto para Criar seu Currículo?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Junte-se a milhares de profissionais que já criaram currículos 
              incríveis com o MeuCV.
            </p>
            <Button size="lg" variant="secondary" asChild className="text-base">
              <Link to="/templates">
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
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
              © 2024 MeuCV. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
