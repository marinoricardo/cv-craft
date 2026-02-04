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
    <div className="bg-muted/50 rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Pré-visualização</h3>
        <span className="text-xs text-muted-foreground bg-background px-3 py-1.5 rounded-full border border-border">
          A4 • PDF
        </span>
      </div>

      <div 
        className="bg-white dark:bg-card rounded-xl shadow-xl border border-border overflow-hidden" 
        style={{ aspectRatio: '210/297' }}
      >
        <div className="h-full overflow-auto p-6 md:p-8">
          {!hasContent ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <p className="text-base font-medium">O seu CV aparecerá aqui</p>
                <p className="text-sm text-muted-foreground/70">Comece preenchendo os campos à esquerda</p>
              </div>
            </div>
          ) : (
            <div className="space-y-5 text-sm">
              {/* Header */}
              {(personalData.fullName || personalData.email) && (
                <div className="pb-4 border-b-2 border-primary/20">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 tracking-tight">
                    {personalData.fullName || 'O seu nome'}
                  </h1>
                  {professionalProfile.summary && (
                    <p className="text-primary font-medium text-sm mb-3">
                      {professionalProfile.summary.split('.')[0]}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    {personalData.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-primary/70" />
                        {personalData.email}
                      </span>
                    )}
                    {personalData.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-primary/70" />
                        {personalData.phone}
                      </span>
                    )}
                    {personalData.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary/70" />
                        {personalData.location}
                      </span>
                    )}
                    {personalData.linkedin && (
                      <span className="flex items-center gap-1.5">
                        <Linkedin className="w-3.5 h-3.5 text-primary/70" />
                        {personalData.linkedin}
                      </span>
                    )}
                    {personalData.website && (
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-primary/70" />
                        {personalData.website}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Professional Profile */}
              {professionalProfile.summary && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-primary rounded"></span>
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
                  <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-primary rounded"></span>
                    Experiência Profissional
                  </h2>
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="relative pl-4 border-l-2 border-muted">
                        <div className="absolute left-0 top-0.5 w-2 h-2 bg-primary rounded-full -translate-x-[5px]" />
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                          <div>
                            <h3 className="font-bold text-foreground text-sm">{exp.position}</h3>
                            <p className="text-muted-foreground text-xs font-medium">{exp.company}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted px-2 py-0.5 rounded">
                            {formatDate(exp.startDate)} — {exp.current ? 'Presente' : formatDate(exp.endDate)}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-xs text-foreground/80 mt-2 leading-relaxed">
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
                  <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-primary rounded"></span>
                    Educação
                  </h2>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="relative pl-4 border-l-2 border-muted">
                        <div className="absolute left-0 top-0.5 w-2 h-2 bg-primary rounded-full -translate-x-[5px]" />
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                          <div>
                            <h3 className="font-bold text-foreground text-sm">
                              {edu.degree} {edu.field && `em ${edu.field}`}
                            </h3>
                            <p className="text-muted-foreground text-xs font-medium">{edu.institution}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted px-2 py-0.5 rounded">
                            {formatDate(edu.startDate)} — {edu.current ? 'Presente' : formatDate(edu.endDate)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Two column layout for Skills and Languages */}
              {(skills.length > 0 || languages.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Skills */}
                  {skills.length > 0 && (
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                        <span className="w-6 h-0.5 bg-primary rounded"></span>
                        Competências
                      </h2>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-medium"
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
                      <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                        <span className="w-6 h-0.5 bg-primary rounded"></span>
                        Idiomas
                      </h2>
                      <div className="space-y-1">
                        {languages.map((lang) => (
                          <div key={lang.id} className="flex items-center justify-between text-xs">
                            <span className="font-medium text-foreground">{lang.name}</span>
                            <span className="text-muted-foreground bg-muted px-2 py-0.5 rounded">
                              {levelLabels[lang.level]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preview Actions */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Página 1 de 1</span>
        <span>Última atualização: agora</span>
      </div>
    </div>
  );
};
