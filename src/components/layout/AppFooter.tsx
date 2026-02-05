import { Link } from 'react-router-dom';

interface AppFooterProps {
  showLinks?: boolean;
}

export const AppFooter = ({ showLinks = true }: AppFooterProps) => {
  return (
    <footer className="border-t border-border py-8 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MeuCV. Design by Marino Ricardo
          </p>
          {showLinks && (
            <nav className="flex items-center gap-6 text-sm">
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de Privacidade
              </Link>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
};
