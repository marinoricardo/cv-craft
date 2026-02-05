import { motion } from 'framer-motion';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';

const Terms = () => {
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
              Termos de Uso
            </h1>
            <p className="text-muted-foreground mb-8">
              Última atualização: {new Date().toLocaleDateString('pt-PT')}
            </p>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  1. Aceitação dos Termos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ao aceder e utilizar o MeuCV, você concorda em cumprir estes Termos de Uso. 
                  Se não concordar com qualquer parte destes termos, não deverá utilizar o nosso serviço.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  2. Descrição do Serviço
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  O MeuCV é uma plataforma de criação de currículos profissionais que oferece 
                  templates, análise com inteligência artificial e exportação em PDF. O serviço 
                  está disponível em versões gratuita e premium.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  3. Conta de Utilizador
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para utilizar certas funcionalidades, poderá ser necessário criar uma conta. 
                  Você é responsável por manter a confidencialidade das suas credenciais e por 
                  todas as atividades realizadas na sua conta.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  4. Propriedade Intelectual
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Todo o conteúdo, design e funcionalidades do MeuCV são propriedade exclusiva 
                  da empresa. Os currículos criados pelos utilizadores permanecem propriedade 
                  dos mesmos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  5. Uso Aceitável
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Você concorda em não utilizar o serviço para fins ilegais, não tentar aceder 
                  a áreas restritas do sistema, e não interferir com o funcionamento normal da 
                  plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  6. Pagamentos e Subscrições
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Os planos premium são cobrados conforme indicado no momento da subscrição. 
                  Pode cancelar a qualquer momento, mantendo acesso até ao fim do período pago.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  7. Limitação de Responsabilidade
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  O MeuCV é fornecido "como está". Não garantimos resultados específicos de 
                  emprego. A análise de IA é uma ferramenta de apoio e não substitui a revisão 
                  humana profissional.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  8. Contacto
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para questões sobre estes termos, contacte-nos através do email: 
                  suporte@meucv.co.mz
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

export default Terms;
