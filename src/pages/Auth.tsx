import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import {
  FileText,
  Smartphone,
  RefreshCw,
  CheckCircle2,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
} from 'lucide-react';

type AuthMode = 'qr' | 'login' | 'register';

const qrSteps = [
  'Abra o MeuCV no seu telemóvel',
  'Toque em Menu ou Definições e selecione "Dispositivos conectados"',
  'Toque em "Conectar dispositivo"',
  'Aponte o seu telemóvel para este ecrã para ler o código QR',
];

export const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [isScanning, setIsScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [qrKey, setQrKey] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const refreshQR = () => {
    setQrKey((prev) => prev + 1);
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsConnected(true);
      setTimeout(() => {
        localStorage.setItem(
          'meucv_auth',
          JSON.stringify({
            isAuthenticated: true,
            user: { name: 'Utilizador', email: 'utilizador@email.com' },
            loginTime: new Date().toISOString(),
          })
        );
        navigate('/my-cvs');
      }, 1500);
    }, 2000);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'register' && !formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Palavra-passe é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As palavras-passe não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        'meucv_auth',
        JSON.stringify({
          isAuthenticated: true,
          user: { name: formData.name || 'Utilizador', email: formData.email },
          loginTime: new Date().toISOString(),
        })
      );
      navigate('/my-cvs');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20 -z-20" />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-20" />
      <div className="fixed -bottom-32 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl -z-20" />
      <div className="fixed top-1/3 left-1/3 w-80 h-80 bg-primary/8 rounded-full blur-3xl -z-20" />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg shadow-primary/25"
            >
              <FileText className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">MeuCV</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-2xl shadow-primary/10 overflow-hidden bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm">
              <div className="grid md:grid-cols-2">
                {/* Left - Forms */}
                <div className="p-8 md:p-10">
                  {/* Mode Tabs */}
                  <div className="flex gap-2 p-1 bg-muted/50 rounded-lg mb-8 backdrop-blur-sm border border-primary/10">
                    {[
                      { id: 'login', label: 'Entrar' },
                      { id: 'register', label: 'Registar' },
                      { id: 'qr', label: 'QR Code' },
                    ].map((tab) => (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode(tab.id as AuthMode)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                          mode === tab.id
                            ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tab.label}
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {mode === 'qr' && (
                      <motion.div
                        key="qr"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="text-center"
                      >
                        {isConnected ? (
                          <div className="py-12">
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 100 }}
                              className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                            >
                              <CheckCircle2 className="w-12 h-12 text-white" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">
                              Conectado com Sucesso!
                            </h3>
                            <p className="text-muted-foreground">A redirecionar...</p>
                          </div>
                        ) : isScanning ? (
                          <div className="py-12">
                            <LoadingSpinner size="lg" className="mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-foreground mb-2">
                              A conectar...
                            </h3>
                            <p className="text-muted-foreground text-sm">Por favor aguarde enquanto digitalizamos o QR</p>
                          </div>
                        ) : (
                          <>
                            <motion.div
                              key={qrKey}
                              onClick={simulateScan}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-56 h-56 bg-gradient-to-br from-card to-muted border-2 border-primary/30 hover:border-primary/60 rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all mx-auto mb-6"
                            >
                              <div className="w-full h-full bg-foreground/90 rounded-lg relative overflow-hidden shadow-inner">
                                <div className="absolute inset-2 grid grid-cols-8 gap-0.5">
                                  {Array.from({ length: 64 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`${
                                        Math.random() > 0.5 ? 'bg-background' : 'bg-transparent'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <div className="absolute top-2 left-2 w-6 h-6 border-4 border-background rounded" />
                                <div className="absolute top-2 right-2 w-6 h-6 border-4 border-background rounded" />
                                <div className="absolute bottom-2 left-2 w-6 h-6 border-4 border-background rounded" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg"
                                  >
                                    <FileText className="w-6 h-6 text-primary-foreground" />
                                  </motion.div>
                                </div>
                              </div>
                            </motion.div>
                            <p className="text-sm text-muted-foreground mb-3 font-medium">
                              Clique no código QR para simular digitalização
                            </p>
                            <Button variant="ghost" size="sm" onClick={refreshQR} className="text-primary hover:text-primary hover:bg-primary/10">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Atualizar QR Code
                            </Button>
                          </>
                        )}
                      </motion.div>
                    )}

                    {(mode === 'login' || mode === 'register') && (
                      <motion.form
                        key={mode}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-foreground">
                            {mode === 'login' ? 'Bem-vindo de volta' : 'Criar sua conta'}
                          </h2>
                          <p className="text-muted-foreground text-sm">
                            {mode === 'login'
                              ? 'Entre para aceder aos seus currículos'
                              : 'Comece a transformar seu currículo agora'}
                          </p>
                        </div>

                        {mode === 'register' && (
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold">Nome completo</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="name"
                                type="text"
                                placeholder="O seu nome"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({ ...formData, name: e.target.value })
                                }
                                className="pl-10 h-11 border-primary/20 focus:border-primary focus:ring-primary/20 bg-muted/50"
                              />
                            </div>
                            {errors.name && (
                              <p className="text-sm text-destructive font-medium">{errors.name}</p>
                            )}
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="seu@email.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              className="pl-10 h-11 border-primary/20 focus:border-primary focus:ring-primary/20 bg-muted/50"
                            />
                          </div>
                          {errors.email && (
                            <p className="text-sm text-destructive font-medium">{errors.email}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-sm font-semibold">Palavra-passe</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                              }
                              className="pl-10 pr-10 h-11 border-primary/20 focus:border-primary focus:ring-primary/20 bg-muted/50"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="text-sm text-destructive font-medium">{errors.password}</p>
                          )}
                        </div>

                        {mode === 'register' && (
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirmar palavra-passe</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                              <Input
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                  setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                                className="pl-10 h-11 border-primary/20 focus:border-primary focus:ring-primary/20 bg-muted/50"
                              />
                            </div>
                            {errors.confirmPassword && (
                              <p className="text-sm text-destructive font-medium">{errors.confirmPassword}</p>
                            )}
                          </div>
                        )}

                        {mode === 'login' && (
                          <div className="flex justify-end">
                            <button type="button" className="text-sm text-primary hover:underline">
                              Esqueceu a palavra-passe?
                            </button>
                          </div>
                        )}

                        <Button type="submit" className="w-full h-11 text-base shadow-lg shadow-primary/25 bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl hover:shadow-primary/40" size="lg" disabled={isLoading}>
                          {isLoading ? (
                            <LoadingSpinner size="sm" className="mr-2" />
                          ) : null}
                          {mode === 'login' ? 'Entrar' : 'Criar conta'}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        {/* Social Login - Google */}
                        {(mode === 'login' || mode === 'register') && (
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-11 flex items-center justify-center gap-3 border border-border bg-card hover:bg-muted/50 rounded-lg transition-all font-medium text-sm shadow-sm hover:shadow-md"
                          >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continuar com Google
                          </motion.button>
                        )}
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-primary/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">ou continue sem conta</span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" asChild className="w-full h-11 border-primary/30 hover:border-primary/60 hover:bg-primary/5">
                      <Link to="/templates">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Explorar Modelos
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Right - Info Panel */}
                <div className="hidden md:flex flex-col justify-between p-8 md:p-10 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
                  {/* Background effects */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                        <FileText className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">
                        {mode === 'qr' ? 'Conecte via Telemóvel' : 'Transforme seu Currículo'}
                      </h3>
                      <p className="text-white/70 text-lg font-light">
                        {mode === 'qr' ? 'Sincronize com seu dispositivo' : 'Em minutos, não em horas'}
                      </p>
                    </motion.div>

                    {mode === 'qr' ? (
                      <motion.ol
                        className="space-y-4 mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {qrSteps.map((step, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-start gap-4"
                          >
                            <span className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold backdrop-blur-sm border border-white/20">
                              {index + 1}
                            </span>
                            <span className="text-white/90 leading-relaxed pt-1">{step}</span>
                          </motion.li>
                        ))}
                      </motion.ol>
                    ) : (
                      <motion.ul
                        className="space-y-4 mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {[
                          { icon: Award, text: 'Modelos aprovados por RH' },
                          { icon: Zap, text: 'Análise inteligente com IA' },
                          { icon: TrendingUp, text: 'Otimizado para ATS' },
                          { icon: FileText, text: 'Exportação em múltiplos formatos' },
                        ].map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-center gap-4"
                          >
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white/90 font-medium">{item.text}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 mt-4"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-300">★</span>
                        ))}
                      </div>
                      <p className="text-white font-semibold text-sm">4.9 de 5</p>
                    </div>
                    <p className="text-white/80 text-xs leading-relaxed">
                      "Plataforma excelente para criar currículos profissionais. Muito intuitiva e eficaz." — Maria S.
                    </p>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-gradient-to-r from-background via-background to-muted/30 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground/60 mt-2">© 2024 CV Craft. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
