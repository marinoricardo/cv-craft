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

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="outline">
              <Link to="/templates">Criar CV</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!file && !analysis && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4"
                >
                  <Sparkles className="w-4 h-4" />
                  Análise com Inteligência Artificial
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Analise o seu Currículo
                </h1>
                <p className="text-muted-foreground text-lg">
                  Carregue o seu CV e receba feedback detalhado para melhorar as suas chances de sucesso
                </p>
              </div>

              <Card
                className={`border-2 border-dashed transition-all duration-300 ${
                  isDragging ? 'border-primary bg-accent/50' : 'border-border hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <CardContent className="py-16 text-center">
                  <motion.div
                    animate={{ y: isDragging ? -10 : 0 }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mx-auto">
                      <FileUp className="w-10 h-10 text-accent-foreground" />
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Arraste o seu CV aqui
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    ou clique para selecionar um ficheiro
                  </p>

                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload">
                    <Button asChild variant="default" size="lg" className="cursor-pointer">
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

              <div className="mt-8 grid md:grid-cols-3 gap-4">
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
                    className="bg-card border border-border rounded-lg p-4 text-center"
                  >
                    <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {file && !analysis && !isAnalyzing && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto text-center"
            >
              <Card>
                <CardContent className="py-8">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{file.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={resetAnalysis}>
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button onClick={startAnalysis}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analisar CV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto text-center py-16"
            >
              <LoadingSpinner size="lg" className="mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                A analisar o seu CV...
              </h3>
              <p className="text-muted-foreground">
                A nossa IA está a avaliar cada secção do seu currículo
              </p>
              <div className="mt-6 space-y-2">
                {['Estrutura e formatação', 'Palavras-chave', 'Compatibilidade ATS', 'Sugestões de melhoria'].map(
                  (step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.5 }}
                      className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {step}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}

          {analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Resultados da Análise</h1>
                  <p className="text-muted-foreground">{file?.name}</p>
                </div>
                <Button variant="outline" onClick={resetAnalysis}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Nova Análise
                </Button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Score Overview */}
                <div className="lg:col-span-1 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pontuação Geral</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', duration: 0.5 }}
                          className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBg(analysis.overallScore)}`}
                        >
                          <span className={`text-5xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                            {analysis.overallScore}
                          </span>
                        </motion.div>
                        <p className="text-muted-foreground mt-2">de 100 pontos</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-foreground">Compatibilidade ATS</span>
                            <span className={getScoreColor(analysis.atsScore)}>{analysis.atsScore}%</span>
                          </div>
                          <Progress value={analysis.atsScore} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Pontos Fortes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.strengths.map((s, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-sm text-foreground"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {s}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        A Melhorar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.weaknesses.map((w, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-sm text-foreground"
                          >
                            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            {w}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Palavras-chave Detectadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.map((k, i) => (
                          <Badge key={i} variant="secondary">{k}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Sections */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Análise por Secção</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {analysis.sections.map((section, i) => (
                          <Button
                            key={i}
                            variant={activeSection === i ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setActiveSection(i)}
                            className="flex-shrink-0"
                          >
                            <section.icon className="w-4 h-4 mr-2" />
                            {section.name}
                          </Button>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSection}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {(() => {
                            const section = analysis.sections[activeSection];
                            return (
                              <div>
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getScoreBg(section.score)}`}>
                                      <section.icon className={`w-6 h-6 ${getScoreColor(section.score)}`} />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-foreground">{section.name}</h3>
                                      <p className={`text-sm font-medium ${getScoreColor(section.score)}`}>
                                        {section.score}/100 pontos
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <Progress value={section.score} className="h-2 mb-6" />

                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                                      O que está bem
                                    </h4>
                                    <ul className="space-y-2">
                                      {section.feedback.map((f, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                          {f}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                                      <TrendingUp className="w-4 h-4 text-primary" />
                                      Sugestões de Melhoria
                                    </h4>
                                    <ul className="space-y-2">
                                      {section.improvements.map((imp, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                          <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                          {imp}
                                        </li>
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

                  <div className="mt-6 flex gap-4">
                    <Button asChild className="flex-1">
                      <Link to="/templates">
                        Criar Novo CV Otimizado
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      Exportar Relatório
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
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
