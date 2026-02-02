import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Smartphone, 
  RefreshCw,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

const steps = [
  'Abra o MeuCV no seu telemóvel',
  'Toque em Menu ou Definições e selecione "Dispositivos conectados"',
  'Toque em "Conectar dispositivo"',
  'Aponte o seu telemóvel para este ecrã para ler o código QR',
];

export const Auth = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Simulate QR code refresh
  const [qrKey, setQrKey] = useState(0);
  
  const refreshQR = () => {
    setQrKey(prev => prev + 1);
  };

  // Simulate successful scan after clicking the QR
  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsConnected(true);
      setTimeout(() => {
        // Store auth state in localStorage
        localStorage.setItem('meucv_auth', JSON.stringify({ 
          isAuthenticated: true, 
          user: { name: 'Utilizador', email: 'utilizador@email.com' },
          loginTime: new Date().toISOString()
        }));
        navigate('/my-cvs');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--cv-preview-bg))] flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">MeuCV Web</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Left - QR Code */}
                <div className="p-8 md:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border">
                  {isConnected ? (
                    <div className="text-center animate-fade-in">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Conectado com Sucesso!
                      </h3>
                      <p className="text-muted-foreground">
                        A redirecionar...
                      </p>
                    </div>
                  ) : isScanning ? (
                    <div className="text-center animate-fade-in">
                      <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        A conectar...
                      </h3>
                      <p className="text-muted-foreground">
                        Por favor aguarde
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Simulated QR Code */}
                      <div 
                        key={qrKey}
                        onClick={simulateScan}
                        className="w-64 h-64 bg-card border-2 border-border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors group"
                      >
                        <div className="w-full h-full bg-foreground rounded-lg relative overflow-hidden">
                          {/* QR Pattern Simulation */}
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
                          {/* Corner markers */}
                          <div className="absolute top-2 left-2 w-8 h-8 border-4 border-background rounded" />
                          <div className="absolute top-2 right-2 w-8 h-8 border-4 border-background rounded" />
                          <div className="absolute bottom-2 left-2 w-8 h-8 border-4 border-background rounded" />
                          {/* Logo overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                              <FileText className="w-7 h-7 text-primary-foreground" />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                          Clique para simular scan
                        </p>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={refreshQR}
                        className="mt-4 text-muted-foreground"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Atualizar código QR
                      </Button>
                    </>
                  )}
                </div>

                {/* Right - Instructions */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        Usar MeuCV Web
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Continue no navegador
                      </p>
                    </div>
                  </div>

                  <ol className="space-y-4">
                    {steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-foreground pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                      Não tem a aplicação móvel?
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/templates">
                        Continuar sem conta
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            🔒 Os seus dados pessoais são encriptados de ponta a ponta
          </p>
        </div>
      </main>
    </div>
  );
};

export default Auth;
