import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

interface AppFooterProps {
  showLinks?: boolean;
}

export const AppFooter = ({ showLinks = true }: AppFooterProps) => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-8 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MeuCV. {t.footer.designBy}
          </p>
          {showLinks && (
            <nav className="flex items-center gap-6 text-sm">
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.footer.terms}
              </Link>
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.footer.privacy}
              </Link>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
};
