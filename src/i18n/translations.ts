export type Language = 'pt' | 'en';

// Use a generic type for translations to allow different string values per language
type TranslationValue = string | readonly TranslationValue[] | { [key: string]: TranslationValue } | ((...args: any[]) => string);

interface TranslationCommon {
  appName: string;
  login: string;
  register: string;
  templates: string;
  myCVs: string;
  analyzeCV: string;
  newCV: string;
  save: string;
  exportPDF: string;
  back: string;
  next: string;
  skip: string;
  start: string;
  cancel: string;
  delete: string;
  edit: string;
  duplicate: string;
  search: string;
  close: string;
  loading: string;
  prices: string;
  createCV: string;
  improveWithAI: string;
  home: string;
  analyze: string;
  account: string;
  draft: string;
}

interface OnboardingStep {
  title: string;
  description: string;
}

interface TranslationOnboarding {
  step: string;
  of: string;
  steps: OnboardingStep[];
}

interface TranslationBuilder {
  keepFilling: string;
  cvSaved: string;
  exportSoon: string;
  autoSaving: string;
  saved: string;
  savedAt: string;
  progress: string;
  progressMessages: {
    low: string;
    medium: string;
    high: string;
    complete: string;
  };
}

interface TranslationFooter {
  terms: string;
  privacy: string;
  designBy: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface PlanItem {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  content: string;
}

interface TranslationLanding {
  heroTag: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  ctaCreate: string;
  ctaAnalyze: string;
  noCreditCard: string;
  freeToStart: string;
  readyInMinutes: string;
  cvsCreated: string;
  successRate: string;
  avgRating: string;
  editorPreview: string;
  personalData: string;
  experience: string;
  atsScore: string;
  aiSuggestions: string;
  improvements: string;
  alreadyHaveCV: string;
  alreadyHaveCVDesc: string;
  analyzeFree: string;
  newBadge: string;
  howItWorks: string;
  howItWorksTitle: string;
  howItWorksDesc: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  features: string;
  featuresTitle: string;
  featuresDesc: string;
  featuresList: FeatureItem[];
  pricingTitle: string;
  pricingDesc: string;
  plans: PlanItem[];
  popular: string;
  testimonialsTitle: string;
  testimonialsLabel: string;
  testimonialsDesc: string;
  testimonials: TestimonialItem[];
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
}

interface TemplateNameItem {
  name: string;
  description: string;
}

interface TranslationTemplates {
  badge: string;
  title: string;
  description: string;
  categories: {
    all: string;
    modern: string;
    classic: string;
    minimal: string;
    creative: string;
  };
  useTemplate: string;
  premium: string;
  templateNames: Record<string, TemplateNameItem>;
}

interface TranslationMyCVs {
  title: string;
  cvCount: (count: number) => string;
  searchPlaceholder: string;
  noResults: string;
  noCVs: string;
  noCVsDesc: string;
  tryOtherSearch: string;
  createFirst: string;
  createNew: string;
  chooseTemplate: string;
  edited: string;
}

interface AuthBenefit {
  title: string;
  desc: string;
}

interface TranslationAuth {
  loginTitle: string;
  loginDesc: string;
  registerTitle: string;
  registerDesc: string;
  fullName: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  password: string;
  confirmPassword: string;
  qrCode: string;
  qrInstructions: string[];
  qrClickToScan: string;
  refreshQR: string;
  connecting: string;
  waitScanning: string;
  connectedSuccess: string;
  redirecting: string;
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMin: string;
  passwordMismatch: string;
  whyCreate: string;
  benefits: AuthBenefit[];
}

interface TranslationCVAnalysis {
  badge: string;
  title: string;
  description: string;
  dragHere: string;
  orClick: string;
  selectFile: string;
  supportedFormats: string;
  atsCompatibility: string;
  detailedAnalysis: string;
  detailedFeedback: string;
  aiRecommendations: string;
  fileSelected: string;
  validFormat: string;
  pdfDocxCompat: string;
  aiReady: string;
  autoEvaluation: string;
  readyForAnalysis: string;
  analyzeNow: string;
  selectAnother: string;
  analysisDesc: string;
}

interface TranslationFab {
  newCV: string;
  analyzeCV: string;
}

export interface Translations {
  common: TranslationCommon;
  footer: TranslationFooter;
  onboarding: TranslationOnboarding;
  builder: TranslationBuilder;
  landing: TranslationLanding;
  templates: TranslationTemplates;
  myCVs: TranslationMyCVs;
  auth: TranslationAuth;
  cvAnalysis: TranslationCVAnalysis;
  fab: TranslationFab;
}

export const translations: Record<Language, Translations> = {
  pt: {
    // Common
    common: {
      appName: 'MeuCV',
      login: 'Entrar',
      register: 'Registar',
      templates: 'Modelos',
      myCVs: 'Meus CVs',
      analyzeCV: 'Analisar CV',
      newCV: 'Novo CV',
      save: 'Guardar',
      exportPDF: 'Exportar PDF',
      back: 'Voltar',
      next: 'Próximo',
      skip: 'Pular',
      start: 'Começar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      duplicate: 'Duplicar',
      search: 'Pesquisar',
      close: 'Fechar',
      loading: 'A carregar...',
      prices: 'Preços',
      createCV: 'Criar CV',
      improveWithAI: 'Melhorar com IA',
      home: 'Início',
      analyze: 'Analisar',
      account: 'Conta',
      draft: 'Rascunho',
    },

    // Footer
    footer: {
      terms: 'Termos de Uso',
      privacy: 'Política de Privacidade',
      designBy: 'Design by Marino Ricardo',
    },

    // Onboarding
    onboarding: {
      step: 'Passo',
      of: 'de',
      steps: [
        {
          title: 'Bem-vindo ao MeuCV! 👋',
          description: 'Crie currículos profissionais em minutos. Vamos mostrar-te como funciona.',
        },
        {
          title: 'Escolha um Modelo',
          description: 'Temos templates modernos e profissionais para diferentes áreas.',
        },
        {
          title: 'Editor Intuitivo',
          description: 'Preencha seus dados com ajuda de IA e veja o resultado em tempo real.',
        },
        {
          title: 'Exporte em PDF',
          description: 'Baixe seu currículo pronto para enviar às empresas.',
        },
      ],
    },

    // Builder
    builder: {
      keepFilling: 'Continue preenchendo para ter um CV completo',
      cvSaved: 'Currículo guardado com sucesso!',
      exportSoon: 'Funcionalidade de exportação PDF em breve!',
      autoSaving: 'A guardar...',
      saved: 'Guardado',
      savedAt: 'Guardado às',
      progress: 'Progresso do CV',
      progressMessages: {
        low: 'Comece adicionando seus dados pessoais',
        medium: 'Bom progresso! Continue preenchendo',
        high: 'Quase lá! Revise os detalhes',
        complete: 'CV completo! Pronto para exportar',
      },
    },

    // Landing
    landing: {
      heroTag: 'Agora com Inteligência Artificial',
      heroTitle: 'O Currículo Perfeito',
      heroTitleHighlight: 'Começa Aqui',
      heroDescription: 'Crie currículos profissionais em minutos. Analise com IA e destaque-se nas candidaturas com templates modernos.',
      ctaCreate: 'Criar Currículo Grátis',
      ctaAnalyze: 'Analisar Meu CV',
      noCreditCard: 'Sem cartão de crédito',
      freeToStart: '100% gratuito para começar',
      readyInMinutes: 'Pronto em minutos',
      cvsCreated: 'Currículos Criados',
      successRate: 'Taxa de Sucesso',
      avgRating: 'Avaliação Média',
      editorPreview: 'MeuCV Editor',
      personalData: 'Dados Pessoais',
      experience: 'Experiência',
      atsScore: 'Pontuação ATS',
      aiSuggestions: 'Sugestões IA',
      improvements: 'melhorias',
      alreadyHaveCV: 'Já tem um CV? Analise com IA!',
      alreadyHaveCVDesc: 'Carregue o seu currículo atual e receba uma análise completa com pontuação ATS, compatibilidade com sistemas de recrutamento e sugestões de melhoria.',
      analyzeFree: 'Analisar Meu CV Grátis',
      newBadge: 'Novo',
      howItWorks: 'Como Funciona',
      howItWorksTitle: 'Como criar um currículo profissional em 3 passos',
      howItWorksDesc: 'Crie o currículo perfeito em menos de 10 minutos',
      step1Title: 'Escolha um Modelo',
      step1Desc: 'Selecione entre nossos templates profissionais',
      step2Title: 'Preencha seus Dados',
      step2Desc: 'Adicione suas experiências e competências',
      step3Title: 'Exporte em PDF',
      step3Desc: 'Baixe e envie para as empresas',
      features: 'Funcionalidades',
      featuresTitle: 'Tudo o que Precisa para um Currículo de Sucesso',
      featuresDesc: 'Ferramentas poderosas para criar currículos que impressionam',
      featuresList: [
        { title: 'Rápido e Fácil', description: 'Crie seu currículo profissional em menos de 10 minutos, sem complicações.' },
        { title: 'Análise com IA', description: 'Receba pontuação ATS e sugestões personalizadas para otimizar o seu CV.' },
        { title: 'Exportar PDF', description: 'Baixe seu currículo em PDF de alta qualidade, pronto para enviar.' },
        { title: 'Modelos Profissionais', description: 'Escolha entre vários templates modernos e elegantes.' },
        { title: 'Acesse em Qualquer Lugar', description: 'Continue de onde parou, no computador ou no celular.' },
        { title: 'Seus Dados Seguros', description: 'Suas informações são protegidas e nunca compartilhadas.' },
      ],
      pricingTitle: 'Planos para Todos',
      pricingDesc: 'Comece grátis e faça upgrade quando precisar',
      plans: [
        {
          name: 'Gratuito',
          price: '0',
          period: 'para sempre',
          description: 'Perfeito para começar',
          features: ['Criar 1 currículo', 'Modelos básicos', 'Exportar PDF', 'Análise básica de IA'],
          cta: 'Começar Grátis',
        },
        {
          name: 'Profissional',
          price: '499',
          period: '/mês',
          description: 'Para quem busca emprego ativamente',
          features: ['Currículos ilimitados', 'Todos os modelos premium', 'Exportar PDF ilimitado', 'Análise completa de IA', 'Sugestões personalizadas', 'Remover marca d\'água'],
          cta: 'Começar Agora',
        },
        {
          name: 'Empresarial',
          price: '1.999',
          period: '/mês',
          description: 'Para recrutadores e empresas',
          features: ['Tudo do Profissional', 'Múltiplos utilizadores', 'Painel administrativo', 'API de integração', 'Suporte prioritário', 'Relatórios avançados'],
          cta: 'Falar com Vendas',
        },
      ],
      popular: 'Popular',
      testimonialsTitle: 'O que Dizem Sobre Nós',
      testimonialsLabel: 'Testemunhos',
      testimonialsDesc: 'Milhares de profissionais já transformaram as suas carreiras',
      testimonials: [
        { name: 'Maria Santos', role: 'Designer UX • Maputo', content: 'Consegui meu emprego dos sonhos graças ao currículo que criei aqui. A análise de IA foi fundamental!' },
        { name: 'João Silva', role: 'Desenvolvedor • Beira', content: 'Simples, rápido e profissional. Em 15 minutos tinha um CV perfeito.' },
        { name: 'Ana Oliveira', role: 'Marketing Digital • Nampula', content: 'Os modelos são lindos e a exportação em PDF fica impecável.' },
      ],
      ctaTitle: 'Pronto para Criar seu Currículo?',
      ctaDesc: 'Junte-se a milhares de profissionais que já criaram currículos incríveis com o MeuCV.',
      ctaButton: 'Começar Agora — É Grátis',
    },

    // Templates
    templates: {
      badge: 'Templates Profissionais',
      title: 'Escolha o Seu Modelo',
      description: 'Selecione um dos nossos templates profissionais e comece a criar o seu currículo perfeito. Cada modelo foi cuidadosamente desenvolvido para destacar as suas qualificações.',
      categories: {
        all: 'Todos',
        modern: 'Modernos',
        classic: 'Clássicos',
        minimal: 'Minimalistas',
        creative: 'Criativos',
      },
      useTemplate: 'Usar este Modelo',
      premium: 'Premium',
      templateNames: {
        'modern-1': { name: 'Moderno Profissional', description: 'Design limpo e contemporâneo, ideal para áreas de tecnologia e inovação.' },
        'classic-1': { name: 'Clássico Elegante', description: 'Estilo tradicional e sofisticado, perfeito para áreas corporativas.' },
        'minimal-1': { name: 'Minimalista', description: 'Simplicidade e foco no conteúdo, ideal para qualquer profissão.' },
        'modern-2': { name: 'Tech Pro', description: 'Design arrojado para profissionais de tecnologia e startups.' },
        'creative-1': { name: 'Criativo', description: 'Layout diferenciado para designers e profissionais criativos.' },
        'classic-2': { name: 'Executivo', description: 'Elegância e profissionalismo para cargos de liderança.' },
      },
    },

    // My CVs
    myCVs: {
      title: 'Meus Currículos',
      cvCount: (count: number) => `${count} currículo${count !== 1 ? 's' : ''} guardado${count !== 1 ? 's' : ''}`,
      searchPlaceholder: 'Pesquisar currículos...',
      noResults: 'Nenhum resultado encontrado',
      noCVs: 'Nenhum currículo ainda',
      noCVsDesc: 'Comece criando o seu primeiro currículo profissional.',
      tryOtherSearch: 'Tente pesquisar com outros termos.',
      createFirst: 'Criar Primeiro CV',
      createNew: 'Criar Novo CV',
      chooseTemplate: 'Escolher modelo',
      edited: 'Editado',
    },

    // Auth
    auth: {
      loginTitle: 'Bem-vindo de volta',
      loginDesc: 'Entre para aceder aos seus currículos',
      registerTitle: 'Criar sua conta',
      registerDesc: 'Comece a transformar seu currículo agora',
      fullName: 'Nome completo',
      namePlaceholder: 'O seu nome',
      email: 'Email',
      emailPlaceholder: 'seu@email.com',
      password: 'Palavra-passe',
      confirmPassword: 'Confirmar palavra-passe',
      qrCode: 'QR Code',
      qrInstructions: [
        'Abra o MeuCV no seu telemóvel',
        'Toque em Menu ou Definições e selecione "Dispositivos conectados"',
        'Toque em "Conectar dispositivo"',
        'Aponte o seu telemóvel para este ecrã para ler o código QR',
      ],
      qrClickToScan: 'Clique no código QR para simular digitalização',
      refreshQR: 'Atualizar QR Code',
      connecting: 'A conectar...',
      waitScanning: 'Por favor aguarde enquanto digitalizamos o QR',
      connectedSuccess: 'Conectado com Sucesso!',
      redirecting: 'A redirecionar...',
      nameRequired: 'Nome é obrigatório',
      emailRequired: 'Email é obrigatório',
      emailInvalid: 'Email inválido',
      passwordRequired: 'Palavra-passe é obrigatória',
      passwordMin: 'Mínimo 6 caracteres',
      passwordMismatch: 'As palavras-passe não coincidem',
      whyCreate: 'Porque criar uma conta?',
      benefits: [
        { title: 'Seus CVs na Nuvem', desc: 'Aceda de qualquer dispositivo' },
        { title: 'Análise IA Premium', desc: 'Sugestões avançadas' },
        { title: 'Templates Exclusivos', desc: 'Modelos profissionais' },
        { title: 'Atualizações Gratuitas', desc: 'Novas funcionalidades' },
      ],
    },

    // CV Analysis
    cvAnalysis: {
      badge: 'Análise com Inteligência Artificial',
      title: 'Analise o seu Currículo',
      description: 'Carregue o seu CV e receba feedback detalhado com pontuação ATS, análise de competências e sugestões personalizadas de melhoria.',
      dragHere: 'Arraste o seu CV aqui',
      orClick: 'ou clique para selecionar um ficheiro PDF ou DOCX',
      selectFile: 'Selecionar Ficheiro',
      supportedFormats: 'Formatos suportados: PDF, DOCX (máx. 5MB)',
      atsCompatibility: 'Compatibilidade com sistemas de recrutamento',
      detailedAnalysis: 'Análise Detalhada',
      detailedFeedback: 'Feedback para cada secção do CV',
      aiRecommendations: 'Recomendações personalizadas de melhoria',
      fileSelected: 'Ficheiro Selecionado',
      validFormat: 'Formato Válido',
      pdfDocxCompat: 'PDF ou DOCX compatível',
      aiReady: 'Análise IA Pronta',
      autoEvaluation: 'Avaliação automática incluída',
      readyForAnalysis: 'Pronto para análise',
      analyzeNow: 'Analisar Meu CV Agora',
      selectAnother: 'Selecionar Outro',
      analysisDesc: 'Sua análise incluirá pontuação ATS, compatibilidade com sistemas de recrutamento, palavras-chave detectadas e sugestões personalizadas de melhoria.',
    },

    // FAB
    fab: {
      newCV: 'Novo CV',
      analyzeCV: 'Analisar CV',
    },
  },

  en: {
    common: {
      appName: 'MeuCV',
      login: 'Sign In',
      register: 'Sign Up',
      templates: 'Templates',
      myCVs: 'My CVs',
      analyzeCV: 'Analyze CV',
      newCV: 'New CV',
      save: 'Save',
      exportPDF: 'Export PDF',
      back: 'Back',
      next: 'Next',
      skip: 'Skip',
      start: 'Get Started',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      duplicate: 'Duplicate',
      search: 'Search',
      close: 'Close',
      loading: 'Loading...',
      prices: 'Pricing',
      createCV: 'Create CV',
      improveWithAI: 'Improve with AI',
      home: 'Home',
      analyze: 'Analyze',
      account: 'Account',
      draft: 'Draft',
    },

    footer: {
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      designBy: 'Design by Marino Ricardo',
    },

    onboarding: {
      step: 'Step',
      of: 'of',
      steps: [
        {
          title: 'Welcome to MeuCV! 👋',
          description: 'Create professional resumes in minutes. Let us show you how it works.',
        },
        {
          title: 'Choose a Template',
          description: 'We have modern and professional templates for different fields.',
        },
        {
          title: 'Intuitive Editor',
          description: 'Fill in your details with AI help and see real-time results.',
        },
        {
          title: 'Export as PDF',
          description: 'Download your resume ready to send to employers.',
        },
      ],
    },

    builder: {
      keepFilling: 'Keep filling in to complete your CV',
      cvSaved: 'Resume saved successfully!',
      exportSoon: 'PDF export feature coming soon!',
      autoSaving: 'Saving...',
      saved: 'Saved',
      savedAt: 'Saved at',
      progress: 'CV Progress',
      progressMessages: {
        low: 'Start by adding your personal data',
        medium: 'Good progress! Keep filling in',
        high: 'Almost there! Review the details',
        complete: 'CV complete! Ready to export',
      },
    },

    landing: {
      heroTag: 'Now with Artificial Intelligence',
      heroTitle: 'The Perfect Resume',
      heroTitleHighlight: 'Starts Here',
      heroDescription: 'Create professional resumes in minutes. Analyze with AI and stand out in applications with modern templates.',
      ctaCreate: 'Create Resume for Free',
      ctaAnalyze: 'Analyze My CV',
      noCreditCard: 'No credit card required',
      freeToStart: '100% free to start',
      readyInMinutes: 'Ready in minutes',
      cvsCreated: 'Resumes Created',
      successRate: 'Success Rate',
      avgRating: 'Average Rating',
      editorPreview: 'MeuCV Editor',
      personalData: 'Personal Data',
      experience: 'Experience',
      atsScore: 'ATS Score',
      aiSuggestions: 'AI Suggestions',
      improvements: 'improvements',
      alreadyHaveCV: 'Already have a CV? Analyze with AI!',
      alreadyHaveCVDesc: 'Upload your current resume and receive a complete analysis with ATS score, recruitment system compatibility, and improvement suggestions.',
      analyzeFree: 'Analyze My CV for Free',
      newBadge: 'New',
      howItWorks: 'How It Works',
      howItWorksTitle: 'How to create a professional resume in 3 steps',
      howItWorksDesc: 'Create the perfect resume in less than 10 minutes',
      step1Title: 'Choose a Template',
      step1Desc: 'Select from our professional templates',
      step2Title: 'Fill in Your Details',
      step2Desc: 'Add your experiences and skills',
      step3Title: 'Export as PDF',
      step3Desc: 'Download and send to companies',
      features: 'Features',
      featuresTitle: 'Everything You Need for a Successful Resume',
      featuresDesc: 'Powerful tools to create impressive resumes',
      featuresList: [
        { title: 'Fast and Easy', description: 'Create your professional resume in less than 10 minutes, hassle-free.' },
        { title: 'AI Analysis', description: 'Get ATS scores and personalized suggestions to optimize your CV.' },
        { title: 'Export PDF', description: 'Download your resume in high-quality PDF, ready to send.' },
        { title: 'Professional Templates', description: 'Choose from various modern and elegant templates.' },
        { title: 'Access Anywhere', description: 'Continue where you left off, on computer or mobile.' },
        { title: 'Your Data is Safe', description: 'Your information is protected and never shared.' },
      ],
      pricingTitle: 'Plans for Everyone',
      pricingDesc: 'Start free and upgrade when you need',
      plans: [
        {
          name: 'Free',
          price: '0',
          period: 'forever',
          description: 'Perfect to get started',
          features: ['Create 1 resume', 'Basic templates', 'Export PDF', 'Basic AI analysis'],
          cta: 'Start Free',
        },
        {
          name: 'Professional',
          price: '499',
          period: '/month',
          description: 'For active job seekers',
          features: ['Unlimited resumes', 'All premium templates', 'Unlimited PDF export', 'Full AI analysis', 'Personalized suggestions', 'Remove watermark'],
          cta: 'Get Started',
        },
        {
          name: 'Enterprise',
          price: '1,999',
          period: '/month',
          description: 'For recruiters and companies',
          features: ['Everything in Professional', 'Multiple users', 'Admin dashboard', 'API integration', 'Priority support', 'Advanced reports'],
          cta: 'Contact Sales',
        },
      ],
      popular: 'Popular',
      testimonialsTitle: 'What They Say About Us',
      testimonialsLabel: 'Testimonials',
      testimonialsDesc: 'Thousands of professionals have already transformed their careers',
      testimonials: [
        { name: 'Maria Santos', role: 'UX Designer • Maputo', content: 'I got my dream job thanks to the resume I created here. The AI analysis was fundamental!' },
        { name: 'João Silva', role: 'Developer • Beira', content: 'Simple, fast, and professional. In 15 minutes I had a perfect CV.' },
        { name: 'Ana Oliveira', role: 'Digital Marketing • Nampula', content: 'The templates are beautiful and the PDF export is impeccable.' },
      ],
      ctaTitle: 'Ready to Create Your Resume?',
      ctaDesc: 'Join thousands of professionals who have already created amazing resumes with MeuCV.',
      ctaButton: 'Get Started Now — It\'s Free',
    },

    templates: {
      badge: 'Professional Templates',
      title: 'Choose Your Template',
      description: 'Select one of our professional templates and start creating your perfect resume. Each template was carefully designed to highlight your qualifications.',
      categories: {
        all: 'All',
        modern: 'Modern',
        classic: 'Classic',
        minimal: 'Minimalist',
        creative: 'Creative',
      },
      useTemplate: 'Use this Template',
      premium: 'Premium',
      templateNames: {
        'modern-1': { name: 'Modern Professional', description: 'Clean and contemporary design, ideal for technology and innovation fields.' },
        'classic-1': { name: 'Classic Elegant', description: 'Traditional and sophisticated style, perfect for corporate fields.' },
        'minimal-1': { name: 'Minimalist', description: 'Simplicity and content focus, ideal for any profession.' },
        'modern-2': { name: 'Tech Pro', description: 'Bold design for technology professionals and startups.' },
        'creative-1': { name: 'Creative', description: 'Differentiated layout for designers and creative professionals.' },
        'classic-2': { name: 'Executive', description: 'Elegance and professionalism for leadership positions.' },
      },
    },

    myCVs: {
      title: 'My Resumes',
      cvCount: (count: number) => `${count} resume${count !== 1 ? 's' : ''} saved`,
      searchPlaceholder: 'Search resumes...',
      noResults: 'No results found',
      noCVs: 'No resumes yet',
      noCVsDesc: 'Start by creating your first professional resume.',
      tryOtherSearch: 'Try searching with other terms.',
      createFirst: 'Create First CV',
      createNew: 'Create New CV',
      chooseTemplate: 'Choose template',
      edited: 'Edited',
    },

    auth: {
      loginTitle: 'Welcome back',
      loginDesc: 'Sign in to access your resumes',
      registerTitle: 'Create your account',
      registerDesc: 'Start transforming your resume now',
      fullName: 'Full name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      password: 'Password',
      confirmPassword: 'Confirm password',
      qrCode: 'QR Code',
      qrInstructions: [
        'Open MeuCV on your phone',
        'Tap Menu or Settings and select "Connected devices"',
        'Tap "Connect device"',
        'Point your phone at this screen to scan the QR code',
      ],
      qrClickToScan: 'Click the QR code to simulate scanning',
      refreshQR: 'Refresh QR Code',
      connecting: 'Connecting...',
      waitScanning: 'Please wait while we scan the QR',
      connectedSuccess: 'Connected Successfully!',
      redirecting: 'Redirecting...',
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email',
      passwordRequired: 'Password is required',
      passwordMin: 'Minimum 6 characters',
      passwordMismatch: 'Passwords do not match',
      whyCreate: 'Why create an account?',
      benefits: [
        { title: 'Your CVs in the Cloud', desc: 'Access from any device' },
        { title: 'Premium AI Analysis', desc: 'Advanced suggestions' },
        { title: 'Exclusive Templates', desc: 'Professional templates' },
        { title: 'Free Updates', desc: 'New features' },
      ],
    },

    cvAnalysis: {
      badge: 'Analysis with Artificial Intelligence',
      title: 'Analyze Your Resume',
      description: 'Upload your CV and receive detailed feedback with ATS score, skills analysis, and personalized improvement suggestions.',
      dragHere: 'Drag your CV here',
      orClick: 'or click to select a PDF or DOCX file',
      selectFile: 'Select File',
      supportedFormats: 'Supported formats: PDF, DOCX (max. 5MB)',
      atsCompatibility: 'ATS system compatibility',
      detailedAnalysis: 'Detailed Analysis',
      detailedFeedback: 'Feedback for each CV section',
      aiRecommendations: 'Personalized improvement recommendations',
      fileSelected: 'File Selected',
      validFormat: 'Valid Format',
      pdfDocxCompat: 'PDF or DOCX compatible',
      aiReady: 'AI Analysis Ready',
      autoEvaluation: 'Automatic evaluation included',
      readyForAnalysis: 'Ready for analysis',
      analyzeNow: 'Analyze My CV Now',
      selectAnother: 'Select Another',
      analysisDesc: 'Your analysis will include ATS score, recruitment system compatibility, detected keywords, and personalized improvement suggestions.',
    },

    fab: {
      newCV: 'New CV',
      analyzeCV: 'Analyze CV',
    },
  },
};
