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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">MeuCV</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left - Forms */}
                <div className="p-8 md:p-10">
                  {/* Mode Tabs */}
                  <div className="flex gap-2 p-1 bg-muted rounded-lg mb-8">
                    {[
                      { id: 'login', label: 'Entrar' },
                      { id: 'register', label: 'Registar' },
                      { id: 'qr', label: 'QR Code' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setMode(tab.id as AuthMode)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                          mode === tab.id
                            ? 'bg-card text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tab.label}
                      </button>
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
                          <div className="py-8">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              Conectado com Sucesso!
                            </h3>
                            <p className="text-muted-foreground">A redirecionar...</p>
                          </div>
                        ) : isScanning ? (
                          <div className="py-8">
                            <LoadingSpinner size="lg" className="mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              A conectar...
                            </h3>
                            <p className="text-muted-foreground">Por favor aguarde</p>
                          </div>
                        ) : (
                          <>
                            <div
                              key={qrKey}
                              onClick={simulateScan}
                              className="w-48 h-48 bg-card border-2 border-border rounded-xl p-3 cursor-pointer hover:border-primary transition-colors mx-auto"
                            >
                              <div className="w-full h-full bg-foreground rounded-lg relative overflow-hidden">
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
                                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-primary-foreground" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                              Clique para simular scan
                            </p>
                            <Button variant="ghost" size="sm" onClick={refreshQR} className="mt-2">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Atualizar QR
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
                            {mode === 'login' ? 'Bem-vindo de volta' : 'Criar conta'}
                          </h2>
                          <p className="text-muted-foreground">
                            {mode === 'login'
                              ? 'Entre para aceder aos seus currículos'
                              : 'Preencha os dados para criar a sua conta'}
                          </p>
                        </div>

                        {mode === 'register' && (
                          <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
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
                                className="pl-10"
                              />
                            </div>
                            {errors.name && (
                              <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
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
                              className="pl-10"
                            />
                          </div>
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">Palavra-passe</Label>
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
                              className="pl-10 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="text-sm text-destructive">{errors.password}</p>
                          )}
                        </div>

                        {mode === 'register' && (
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar palavra-passe</Label>
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
                                className="pl-10"
                              />
                            </div>
                            {errors.confirmPassword && (
                              <p className="text-sm text-destructive">{errors.confirmPassword}</p>
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

                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                          {isLoading ? (
                            <LoadingSpinner size="sm" className="mr-2" />
                          ) : null}
                          {mode === 'login' ? 'Entrar' : 'Criar conta'}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">ou continue sem conta</span>
                    </div>
                  </div>

                  <Button variant="outline" asChild className="w-full">
                    <Link to="/templates">
                      Explorar Modelos
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                {/* Right - Info Panel */}
                <div className="bg-primary p-8 md:p-10 text-primary-foreground hidden md:flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mb-6">
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {mode === 'qr' ? 'Conecte via Telemóvel' : 'Bem-vindo ao MeuCV'}
                    </h3>

                    {mode === 'qr' ? (
                      <ol className="space-y-4">
                        {qrSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <span className="text-primary-foreground/90">{step}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="space-y-4">
                        {[
                          'Crie currículos profissionais em minutos',
                          'Escolha entre modelos modernos',
                          'Exporte em PDF de alta qualidade',
                          'Sincronize entre dispositivos',
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            <span className="text-primary-foreground/90">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            🔒 Os seus dados pessoais são encriptados de ponta a ponta
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">Design by Marino Ricardo</p>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
