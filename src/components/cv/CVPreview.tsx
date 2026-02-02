import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CVPreviewProps {
  cvData: CVData;
}

const levelLabels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
  expert: 'Especialista',
  basic: 'Básico',
  fluent: 'Fluente',
  native: 'Nativo',
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${months[parseInt(month) - 1]} ${year}`;
};

export const CVPreview = ({ cvData }: CVPreviewProps) => {
  const { personalData, professionalProfile, experiences, education, skills, languages } = cvData;

  const hasContent = personalData.fullName || personalData.email || professionalProfile.summary || 
    experiences.length > 0 || education.length > 0 || skills.length > 0 || languages.length > 0;

  return (
    <div className="bg-[hsl(var(--cv-preview-bg))] rounded-xl p-6 min-h-[calc(100vh-200px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Pré-visualização</h3>
        <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
          Página 1 de 1
        </span>
      </div>

      <div className="cv-paper flex-1 p-8 overflow-auto" style={{ aspectRatio: '210/297', maxHeight: '800px' }}>
        {!hasContent ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-center">
            <div>
              <p className="text-lg font-medium mb-2">O seu CV aparecerá aqui</p>
              <p className="text-sm">Comece preenchendo os campos à esquerda</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-sm">
            {/* Header */}
            {(personalData.fullName || personalData.email) && (
              <div className="border-b border-border pb-4">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {personalData.fullName || 'O seu nome'}
                </h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground text-xs">
                  {personalData.email && (
                    <span className="flex items-center gap-1">
                      <Mail size={12} />
                      {personalData.email}
                    </span>
                  )}
                  {personalData.phone && (
                    <span className="flex items-center gap-1">
                      <Phone size={12} />
                      {personalData.phone}
                    </span>
                  )}
                  {personalData.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {personalData.location}
                    </span>
                  )}
                  {personalData.linkedin && (
                    <span className="flex items-center gap-1">
                      <Linkedin size={12} />
                      {personalData.linkedin}
                    </span>
                  )}
                  {personalData.website && (
                    <span className="flex items-center gap-1">
                      <Globe size={12} />
                      {personalData.website}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Professional Profile */}
            {professionalProfile.summary && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  Perfil Profissional
                </h2>
                <p className="text-foreground leading-relaxed text-xs">
                  {professionalProfile.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                  Experiência Profissional
                </h2>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-foreground text-xs">{exp.position}</h3>
                          <p className="text-muted-foreground text-xs">{exp.company}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-xs text-foreground mt-1 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                  Educação
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-foreground text-xs">
                            {edu.degree} {edu.field && `em ${edu.field}`}
                          </h3>
                          <p className="text-muted-foreground text-xs">{edu.institution}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(edu.startDate)} - {edu.current ? 'Presente' : formatDate(edu.endDate)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  Competências
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-secondary text-foreground px-2 py-0.5 rounded text-xs"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  Idiomas
                </h2>
                <div className="flex flex-wrap gap-3">
                  {languages.map((lang) => (
                    <span key={lang.id} className="text-xs text-foreground">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-muted-foreground"> - {levelLabels[lang.level]}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
