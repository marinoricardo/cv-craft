export interface PersonalData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface ProfessionalProfile {
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Language {
  id: string;
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'fluent' | 'native';
}

export interface CVSettings {
  template: 'modern' | 'classic' | 'minimal';
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
}

export interface CVData {
  personalData: PersonalData;
  professionalProfile: ProfessionalProfile;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  settings: CVSettings;
}

export const defaultCVData: CVData = {
  personalData: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  professionalProfile: {
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  settings: {
    template: 'modern',
    accentColor: '#544A9F',
    fontSize: 'medium',
  },
};
