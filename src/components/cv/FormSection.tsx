import { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FormSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}

export const FormSection = ({
  title,
  icon,
  children,
  defaultOpen = false,
  badge,
}: FormSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="form-section">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="form-section-header w-full"
      >
        <div className="flex items-center gap-3">
          <span className="text-primary">{icon}</span>
          <span className="font-medium text-foreground">{title}</span>
          {badge && (
            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <span className="text-muted-foreground">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="form-section-content animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};
