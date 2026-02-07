import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCard } from '@/components/AnimatedCard';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  FileText,
  Zap,
  Download,
  Sparkles,
  ArrowRight,
  Smartphone,
  Shield,
  Star,
  Users,
  TrendingUp,
  Upload,
  Check,
  Crown,
} from 'lucide-react';

const featureIcons = [Zap, Sparkles, Download, Smartphone, Smartphone, Shield];
const stepIcons = [FileText, Users, Download];

export const Landing = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const l = t.landing;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
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

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.common.templates}
            </Link>
            <Link to="/cv-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.common.analyzeCV}
            </Link>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.common.prices}
            </a>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language === 'pt' ? 'EN' : 'PT'}</span>
            </button>
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link to="/auth">{t.common.login}</Link>
            </Button>
            <Button asChild className="shadow-lg shadow-primary/25">
              <Link to="/templates">
                {t.common.createCV}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language === 'pt' ? 'EN' : 'PT'}</span>
            </button>
            <ThemeToggle />
            <Button asChild size="sm">
              <Link to="/templates">{t.common.start}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background via-80% to-accent/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20"
            >
              <Sparkles className="w-4 h-4" />
              {l.heroTag}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight"
            >
              {l.heroTitle}{' '}
              <span className="text-primary">{l.heroTitleHighlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {l.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" asChild className="text-base h-14 px-8 shadow-xl shadow-primary/25">
                <Link to="/templates">
                  {l.ctaCreate}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base h-14 px-8">
                <Link to="/cv-analysis">
                  <Upload className="w-5 h-5 mr-2" />
                  {l.ctaAnalyze}
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-sm text-muted-foreground"
            >
              {[l.noCreditCard, l.freeToStart, l.readyInMinutes].map((text, i) => (
                <span key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  {text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-16"
          >
            {[
              { value: '50K+', label: l.cvsCreated },
              { value: '92%', label: l.successRate },
              { value: '4.9', label: l.avgRating, hasStar: true },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-card/50 backdrop-blur border border-border/50">
                <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                  {stat.hasStar && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 bg-gradient-to-b from-background via-accent/10 to-muted/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
              <div className="bg-muted/50 px-6 py-4 flex items-center gap-3 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">{l.editorPreview}</span>
              </div>
              <div className="p-8 md:p-12 bg-gradient-to-br from-muted/30 to-background">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="bg-card p-4 rounded-xl border border-border">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">{l.personalData}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-8 bg-muted rounded-lg" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-8 bg-muted rounded-lg" />
                          <div className="h-8 bg-muted rounded-lg" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-card p-4 rounded-xl border border-border">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-sm">{l.experience}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-8 bg-muted rounded-lg" />
                        <div className="h-8 bg-muted rounded-lg w-3/4" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-card rounded-xl shadow-xl p-6 border">
                    <div className="border-l-4 border-primary pl-4 mb-4">
                      <h3 className="font-bold text-lg text-foreground">João Silva</h3>
                      <p className="text-sm text-muted-foreground">Desenvolvedor Full Stack</p>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <div className="h-2 bg-muted rounded w-full" />
                        <div className="h-2 bg-muted rounded w-5/6" />
                        <div className="h-2 bg-muted rounded w-4/5" />
                      </div>
                      <div className="pt-3 border-t border-border">
                        <p className="text-xs font-semibold text-primary mb-2">{l.experience.toUpperCase()}</p>
                        <div className="space-y-1.5">
                          <div className="h-2 bg-muted rounded w-full" />
                          <div className="h-2 bg-muted rounded w-3/4" />
                        </div>
                      </div>
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
              className="absolute -left-4 md:-left-12 top-1/3 bg-card rounded-2xl shadow-xl border border-border p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{l.atsScore}</p>
                  <p className="text-2xl font-bold text-foreground">92<span className="text-sm text-muted-foreground">/100</span></p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -right-4 md:-right-12 bottom-1/4 bg-card rounded-2xl shadow-xl border border-border p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{l.aiSuggestions}</p>
                  <p className="text-lg font-bold text-foreground">+15 {l.improvements}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CV Analysis CTA */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/20 border-primary/20 overflow-hidden backdrop-blur-sm shadow-2xl shadow-primary/10">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">
                      <Upload className="w-3 h-3 mr-1" />
                      {l.newBadge}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {l.alreadyHaveCV}
                    </h2>
                    <p className="text-muted-foreground mb-6 text-lg">
                      {l.alreadyHaveCVDesc}
                    </p>
                    <Button size="lg" asChild className="shadow-lg shadow-primary/25">
                      <Link to="/cv-analysis">
                        {l.analyzeFree}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <div className="relative">
                      <motion.div
                        className="w-56 h-72 bg-card rounded-2xl shadow-2xl border border-border p-6"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      >
                        <div className="space-y-3">
                          <div className="h-4 bg-primary/20 rounded w-3/4" />
                          <div className="h-3 bg-muted rounded w-full" />
                          <div className="h-3 bg-muted rounded w-5/6" />
                          <div className="h-3 bg-muted rounded w-4/5" />
                          <div className="pt-2 border-t border-border mt-4">
                            <div className="h-3 bg-muted rounded w-1/2 mb-2" />
                            <div className="h-2 bg-muted rounded w-full" />
                            <div className="h-2 bg-muted rounded w-3/4 mt-1" />
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="absolute -right-6 -top-4 bg-green-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg"
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
      <section className="py-20 bg-gradient-to-r from-muted/40 via-background to-muted/40 relative overflow-hidden">
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-0 -left-32 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">{l.howItWorks}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {l.howItWorksTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              {l.howItWorksDesc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { number: '01', title: l.step1Title, description: l.step1Desc },
              { number: '02', title: l.step2Title, description: l.step2Desc },
              { number: '03', title: l.step3Title, description: l.step3Desc },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
                )}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -3 }}
                  className="w-24 h-24 bg-gradient-to-br from-primary via-primary to-primary/70 text-primary-foreground rounded-3xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-2xl shadow-primary/40 border border-white/20"
                >
                  {step.number}
                </motion.div>
                <h3 className="font-bold text-xl text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">{l.features}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {l.featuresTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              {l.featuresDesc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
            {l.featuresList.map((feature, index) => {
              const Icon = featureIcons[index] || Zap;
              return (
                <AnimatedCard key={index} delay={index * 0.05} className="border-primary/20 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 transition-all bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/15 flex items-center justify-center mb-4 rounded-2xl border border-primary/20">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-background from-50% via-primary/5 to-accent/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">{t.common.prices}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {l.pricingTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              {l.pricingDesc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
            {l.plans.map((plan, index) => {
              const isPopular = index === 1;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative overflow-hidden backdrop-blur-sm ${isPopular ? 'border-primary/50 shadow-2xl shadow-primary/20 bg-gradient-to-br from-primary/15 to-primary/5' : 'border-border/50 bg-gradient-to-br from-card/80 to-card/40'}`}>
                    {isPopular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-lg flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          {l.popular}
                        </div>
                      </div>
                    )}
                    <CardContent className="p-8">
                      <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                      <div className="mb-6">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">MZN{plan.period}</span>
                      </div>

                      <Button
                        className={`w-full mb-6 ${isPopular ? 'shadow-lg shadow-primary/25' : ''}`}
                        variant={isPopular ? 'default' : 'outline'}
                        asChild
                      >
                        <Link to="/templates">{plan.cta}</Link>
                      </Button>

                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-background via-accent/5 to-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent/12 rounded-full blur-3xl" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">{l.testimonialsLabel}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {l.testimonialsTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              {l.testimonialsDesc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
            {l.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl hover:shadow-primary/15 transition-all bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-foreground mb-6 text-lg leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
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
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                {l.ctaTitle}
              </h2>
              <p className="text-primary-foreground/90 mb-10 max-w-xl mx-auto text-lg">
                {l.ctaDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="text-lg h-14 px-10">
                  <Link to="/templates">
                    {l.ctaButton}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-gradient-to-b from-background to-muted/40 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">MeuCV</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
              <Link to="/templates" className="hover:text-foreground transition-colors">{t.common.templates}</Link>
              <Link to="/cv-analysis" className="hover:text-foreground transition-colors">{t.common.analyzeCV}</Link>
              <a href="#pricing" className="hover:text-foreground transition-colors">{t.common.prices}</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MeuCV. {t.footer.designBy}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
