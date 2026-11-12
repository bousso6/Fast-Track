export type PageRoute = 
  | 'home'
  | 'accueil'
  | 'retour'
  | 'emploi'
  | 'entreprendre'
  | 'immobilier'
  | 'vehicules'
  | 'investir'
  | 'comment-ca-marche'
  | 'partenaires'
  | 'demarrer'
  | 'dashboard'
  | 'login'
  | 'register';

export type ServiceType = 
  | 'retour'
  | 'emploi'
  | 'entreprendre'
  | 'immobilier'
  | 'vehicules'
  | 'investir'
  | 'autre';

export interface ProjectSubmission {
  id: string;
  projectType: ServiceType;
  country: string;
  targetCity: string;
  budget: string;
  timeline: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  details?: string;
  createdAt: string;
  status: 'nouveau' | 'diagnostic' | 'en_cours' | 'valide';
}

export interface UserProject {
  id: string;
  title: string;
  category: ServiceType;
  location: string;
  status: string;
  progress: number;
  nextStep: string;
  estimatedCompletion: string;
  budget: {
    total: number;
    engaged: number;
    available: number;
  };
  timeline: {
    step: string;
    completed: boolean;
    current?: boolean;
    date?: string;
    description?: string;
  }[];
  documents: {
    id: string;
    name: string;
    category: string;
    size: string;
    date: string;
    verified: boolean;
    downloadUrl?: string;
  }[];
  lastUpdate: string;
}

export interface Advisor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  email: string;
  phone: string;
  whatsapp: string;
  office: string;
  specialties: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  project: string;
  avatar: string;
  rating: number;
}

export interface PartnerCategory {
  id: string;
  title: string;
  iconName: string;
  count: number;
  description: string;
  examples: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor' | 'system';
  text: string;
  timestamp: string;
  attachments?: string[];
}
