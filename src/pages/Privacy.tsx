import { motion } from 'framer-motion';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showBackButton backTo="/" showAuth={false} />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground mb-8">
              Última atualização: {new Date().toLocaleDateString('pt-PT')}
            </p>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  1. Recolha de Dados
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Recolhemos apenas as informações necessárias para fornecer o serviço: 
                  nome, email, e os dados que insere nos seus currículos. Não partilhamos 
                  estas informações com terceiros sem o seu consentimento.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  2. Utilização dos Dados
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Os seus dados são utilizados exclusivamente para:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Criar e armazenar os seus currículos</li>
                  <li>Fornecer análises e sugestões de IA</li>
                  <li>Melhorar a qualidade do serviço</li>
                  <li>Comunicar actualizações importantes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  3. Armazenamento e Segurança
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Os seus dados são armazenados em servidores seguros com encriptação. 
                  Implementamos medidas de segurança técnicas e organizacionais para 
                  proteger as suas informações contra acesso não autorizado.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  4. Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos cookies essenciais para o funcionamento do site e cookies 
                  analíticos para melhorar a experiência. Pode gerir as suas preferências 
                  de cookies nas definições do navegador.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  5. Os Seus Direitos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tem o direito de:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Aceder aos seus dados pessoais</li>
                  <li>Corrigir informações incorrectas</li>
                  <li>Eliminar a sua conta e dados</li>
                  <li>Exportar os seus currículos</li>
                  <li>Retirar o consentimento a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  6. Retenção de Dados
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Mantemos os seus dados enquanto a sua conta estiver activa. Após 
                  eliminar a conta, os dados são removidos no prazo de 30 dias, excepto 
                  quando obrigados por lei a mantê-los.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  7. Alterações à Política
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Podemos actualizar esta política periodicamente. Notificaremos sobre 
                  alterações significativas através do email ou de um aviso no site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  8. Contacto
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para questões sobre privacidade, contacte o nosso responsável pela 
                  protecção de dados: privacidade@meucv.co.mz
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <AppFooter showLinks={false} />
    </div>
  );
};

export default Privacy;
