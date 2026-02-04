import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  BookOpen,
  Briefcase,
  Award,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileUp,
  X,
} from 'lucide-react';

interface AnalysisResult {
  overallScore: number;
  sections: {
    name: string;
    score: number;
    icon: React.ElementType;
    feedback: string[];
    improvements: string[];
  }[];
  strengths: string[];
  weaknesses: string[];
  keywords: string[];
  atsScore: number;
}

const mockAnalysis: AnalysisResult = {
  overallScore: 72,
  atsScore: 68,
  sections: [
    {
      name: 'Perfil Profissional',
      score: 80,
      icon: Target,
      feedback: ['Resumo claro e objetivo', 'Destaca competências-chave'],
      improvements: ['Adicionar métricas de impacto', 'Mencionar anos de experiência'],
    },
    {
      name: 'Experiência',
      score: 65,
      icon: Briefcase,
      feedback: ['Boa descrição de funções', 'Cronologia clara'],
      improvements: ['Usar mais verbos de ação', 'Quantificar resultados alcançados', 'Adicionar conquistas específicas'],
    },
    {
      name: 'Formação',
      score: 85,
      icon: BookOpen,
      feedback: ['Formação relevante para a área', 'Certificações bem destacadas'],
      improvements: ['Incluir projetos académicos relevantes'],
    },
    {
      name: 'Competências',
      score: 60,
      icon: Award,
      feedback: ['Lista abrangente de skills'],
      improvements: ['Organizar por categorias', 'Adicionar níveis de proficiência', 'Remover competências genéricas'],
    },
  ],
  strengths: [
    'Formatação limpa e profissional',
    'Informações de contacto completas',
    'Progressão de carreira clara',
  ],
  weaknesses: [
    'Faltam palavras-chave do setor',
    'Descrições muito genéricas',
    'Sem links para portfolio ou LinkedIn',
  ],
  keywords: ['React', 'JavaScript', 'TypeScript', 'Gestão de Projetos', 'Agile', 'Liderança'],
};

export const CVAnalysis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.docx'))) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysis(null);
    setActiveSection(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

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

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="outline">
              <Link to="/templates">Criar CV</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pt-24">
        <AnimatePresence mode="wait">
          {!file && !analysis && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto relative"
            >
              {/* Background Effects */}
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
              <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 border border-primary/20"
                >
                  <Sparkles className="w-4 h-4" />
                  Análise com Inteligência Artificial
                </motion.div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Analise o seu Currículo
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Carregue o seu CV e receba feedback detalhado com pontuação ATS, análise de competências e sugestões personalizadas de melhoria.
                </p>
              </div>

              <Card
                className={`border-2 border-dashed transition-all duration-300 ${
                  isDragging ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20' : 'border-primary/30 hover:border-primary/60 bg-gradient-to-br from-card/80 to-card/40'
                } backdrop-blur-sm`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <CardContent className="py-16 text-center">
                  <motion.div
                    animate={{ y: isDragging ? -10 : 0 }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/15 rounded-2xl flex items-center justify-center mx-auto border border-primary/20">
                      <FileUp className="w-10 h-10 text-primary" />
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Arraste o seu CV aqui
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    ou clique para selecionar um ficheiro PDF ou DOCX
                  </p>

                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload">
                    <Button asChild size="lg" className="cursor-pointer shadow-lg shadow-primary/25">
                      <span>
                        <Upload className="w-5 h-5 mr-2" />
                        Selecionar Ficheiro
                      </span>
                    </Button>
                  </label>

                  <p className="text-sm text-muted-foreground mt-4">
                    Formatos suportados: PDF, DOCX (máx. 5MB)
                  </p>
                </CardContent>
              </Card>

              <div className="mt-8 grid md:grid-cols-3 gap-4 relative z-10">
                {[
                  { icon: Target, title: 'Pontuação ATS', desc: 'Compatibilidade com sistemas de recrutamento' },
                  { icon: TrendingUp, title: 'Análise Detalhada', desc: 'Feedback para cada secção do CV' },
                  { icon: Sparkles, title: 'Sugestões IA', desc: 'Recomendações personalizadas de melhoria' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-gradient-to-br from-card/80 to-card/40 border border-primary/20 rounded-lg p-4 text-center backdrop-blur-sm hover:border-primary/40 transition-all"
                  >
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              </div>
            </motion.div>
          )}

          {file && !analysis && !isAnalyzing && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto text-center relative pt-8"
            >
              {/* Background Effects */}
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
              <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
              
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative z-10"
              >
                <Card className="bg-gradient-to-br from-card/95 via-card/80 to-card/50 border-primary/30 backdrop-blur-sm shadow-2xl shadow-primary/15 overflow-hidden">
                  {/* Decorative gradient line */}
                  <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                  
                  <CardContent className="py-12 px-8">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-6"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/30 via-primary/15 to-accent/20 rounded-3xl flex items-center justify-center mx-auto border-2 border-primary/30 shadow-xl shadow-primary/20">
                        <FileText className="w-12 h-12 text-primary" />
                      </div>
                    </motion.div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      Ficheiro Selecionado
                    </h2>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 mb-6 border border-primary/20">
                      <p className="text-lg font-semibold text-foreground mb-1">{file.name}</p>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          Pronto para análise
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="text-left">
                            <p className="font-medium text-foreground text-sm">Formato Válido</p>
                            <p className="text-xs text-muted-foreground">PDF ou DOCX compatível</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-left">
                            <p className="font-medium text-foreground text-sm">Análise IA Pronta</p>
                            <p className="text-xs text-muted-foreground">Avaliação automática incluída</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                      Sua análise incluirá pontuação ATS, compatibilidade com sistemas de recrutamento, palavras-chave detectadas e sugestões personalizadas de melhoria.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button 
                          onClick={startAnalysis} 
                          size="lg"
                          className="w-full shadow-lg shadow-primary/30 bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl hover:shadow-primary/40"
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Analisar Meu CV Agora
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant="outline" 
                          onClick={resetAnalysis}
                          size="lg"
                          className="w-full border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                        >
                          <X className="w-5 h-5 mr-2" />
                          Selecionar Outro
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {/* Info cards below */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid md:grid-cols-3 gap-3 mt-6"
                >
                  {[
                    { icon: Target, label: 'Pontuação ATS', color: 'from-primary/10 to-primary/5 border-primary/20' },
                    { icon: TrendingUp, label: 'Análise Detalhada', color: 'from-accent/10 to-accent/5 border-accent/20' },
                    { icon: Award, label: 'Sugestões IA', color: 'from-green-500/10 to-green-500/5 border-green-500/20' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className={`bg-gradient-to-br ${item.color} border rounded-lg p-3 text-center backdrop-blur-sm`}
                    >
                      <item.icon className="w-5 h-5 mx-auto mb-1.5 text-primary" />
                      <p className="text-xs font-medium text-foreground">{item.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto text-center relative py-16"
            >
              {/* Background Effects */}
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
              <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <Card className="bg-gradient-to-br from-card/95 via-card/80 to-card/50 border-primary/30 backdrop-blur-sm shadow-2xl shadow-primary/15 overflow-hidden mb-6">
                  {/* Decorative gradient line */}
                  <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                  
                  <CardContent className="py-12 px-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-8"
                    >
                      <LoadingSpinner size="lg" className="mx-auto text-primary" />
                    </motion.div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      A Analisar o Seu Currículo
                    </h2>
                    
                    <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                      A nossa Inteligência Artificial está a avaliar cada detalhe do seu CV
                    </p>

                    {/* Progress steps */}
                    <div className="space-y-3">
                      {['Estrutura e formatação', 'Análise de palavras-chave', 'Compatibilidade ATS', 'Sugestões personalizadas'].map(
                        (step, i) => (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.3 }}
                            className="flex items-center justify-start gap-3 text-sm text-foreground bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            >
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                            </motion.div>
                            <span className="font-medium">{step}</span>
                          </motion.div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Info cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {[
                    { icon: Target, label: 'Pontuação ATS', desc: 'Compatibilidade com sistemas' },
                    { icon: TrendingUp, label: 'Feedback Completo', desc: 'Análise por secção' },
                    { icon: Sparkles, label: 'Sugestões IA', desc: 'Recomendações inteligentes' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="bg-gradient-to-br from-card/80 to-card/40 border border-primary/20 rounded-lg p-4 backdrop-blur-sm"
                    >
                      <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="font-medium text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Time estimate */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-muted-foreground mt-6"
                >
                  Tempo estimado: <span className="font-medium text-foreground">15-30 segundos</span>
                </motion.p>
              </div>
            </motion.div>
          )}

          {analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto relative pt-8"
            >
              {/* Background Effects */}
              <div className="fixed top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -z-10" />
              <div className="fixed bottom-0 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10" />
              <div className="flex items-center justify-between mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">Resultados da Análise</h1>
                  <p className="text-muted-foreground text-sm">{file?.name}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Button variant="outline" onClick={resetAnalysis} className="border-primary/30 hover:border-primary/60 hover:bg-primary/5">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Nova Análise
                  </Button>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Score Overview */}
                <div className="lg:col-span-1 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-card/95 via-card/80 to-card/50 border-primary/20 backdrop-blur-sm shadow-2xl shadow-primary/15">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Pontuação Geral</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-6">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', duration: 0.7, delay: 0.2 }}
                            className={`inline-flex items-center justify-center w-32 h-32 rounded-full font-bold text-5xl ${getScoreBg(analysis.overallScore)} border-2 border-current`}
                          >
                            <span className={getScoreColor(analysis.overallScore)}>
                              {analysis.overallScore}
                            </span>
                          </motion.div>
                          <p className="text-muted-foreground mt-3 text-sm">de 100 pontos</p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/50">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-foreground font-medium">Compatibilidade ATS</span>
                              <span className={`${getScoreColor(analysis.atsScore)} font-bold`}>{analysis.atsScore}%</span>
                            </div>
                            <Progress value={analysis.atsScore} className="h-2.5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-green-500/10 via-green-500/5 to-card/30 border-green-500/30 backdrop-blur-sm shadow-lg shadow-green-500/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          Pontos Fortes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2.5">
                          {analysis.strengths.map((s, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="flex items-start gap-2.5 text-sm text-foreground"
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{s}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="bg-gradient-to-br from-yellow-500/10 via-yellow-500/5 to-card/30 border-yellow-500/30 backdrop-blur-sm shadow-lg shadow-yellow-500/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                          A Melhorar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2.5">
                          {analysis.weaknesses.map((w, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                              className="flex items-start gap-2.5 text-sm text-foreground"
                            >
                              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <span>{w}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="bg-gradient-to-br from-card/95 via-card/80 to-card/50 border-primary/20 backdrop-blur-sm shadow-lg shadow-primary/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Palavras-chave Detectadas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {analysis.keywords.map((k, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.05 }}
                            >
                              <Badge variant="secondary" className="bg-primary/15 text-primary border-primary/30">{k}</Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Detailed Sections */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-card/95 via-card/80 to-card/50 border-primary/20 backdrop-blur-sm shadow-2xl shadow-primary/15">
                      <CardHeader className="pb-4 border-b border-border/50">
                        <CardTitle className="text-xl">Análise por Secção</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                          {analysis.sections.map((section, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + i * 0.05 }}
                            >
                              <Button
                                variant={activeSection === i ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setActiveSection(i)}
                                className="flex-shrink-0 transition-all"
                              >
                                <section.icon className="w-4 h-4 mr-2" />
                                {section.name}
                              </Button>
                            </motion.div>
                          ))}
                        </div>

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            {(() => {
                              const section = analysis.sections[activeSection];
                              return (
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg border-2 border-current ${getScoreBg(section.score)}`}>
                                        <section.icon className={`w-6 h-6 ${getScoreColor(section.score)}`} />
                                      </div>
                                      <div className="text-left">
                                        <h3 className="font-bold text-foreground text-lg">{section.name}</h3>
                                        <p className={`text-sm font-semibold ${getScoreColor(section.score)}`}>
                                          {section.score}/100 pontos
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <Progress value={section.score} className="h-3" />

                                  <div className="grid md:grid-cols-2 gap-6 pt-4">
                                    <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-lg p-4">
                                      <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        O que está bem
                                      </h4>
                                      <ul className="space-y-2.5">
                                        {section.feedback.map((f, i) => (
                                          <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className="text-sm text-foreground flex items-start gap-2"
                                          >
                                            <span className="w-2 h-2 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                                            {f}
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                                      <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-primary" />
                                        Sugestões de Melhoria
                                      </h4>
                                      <ul className="space-y-2.5">
                                        {section.improvements.map((imp, i) => (
                                          <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className="text-sm text-foreground flex items-start gap-2"
                                          >
                                            <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            {imp}
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </motion.div>
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 flex flex-col sm:flex-row gap-4"
                  >
                    <Button asChild className="flex-1 h-12 text-base shadow-lg shadow-primary/30 bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl hover:shadow-primary/40">
                      <Link to="/templates">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Criar Novo CV Otimizado
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 text-base border-primary/30 hover:border-primary/60 hover:bg-primary/5">
                      <Upload className="w-5 h-5 mr-2" />
                      Exportar Relatório
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12 bg-gradient-to-b from-background to-muted/40 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Design by Marino Ricardo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CVAnalysis;
