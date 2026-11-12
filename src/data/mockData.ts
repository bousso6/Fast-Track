import { UserProject, Advisor, Testimonial, PartnerCategory, ServiceType } from '../types';

export const CURRENT_USER = {
  name: 'Mariama Diop',
  email: 'mariama.diop@example.com',
  residence: 'Paris, France',
  origin: 'Dakar / Saint-Louis',
  phone: '+33 6 12 34 56 78',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  memberSince: 'Octobre 2025',
  plan: 'Elikia Assist & Private Desk',
};

export const DEFAULT_ADVISOR: Advisor = {
  id: 'adv-1',
  name: 'Awa Ndiaye',
  title: 'Conseillère Principale Elikia & Responsable Coordination Diaspora',
  avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=150&auto=format&fit=crop&q=80',
  email: 'a.ndiaye@elikia-diaspora.sn',
  phone: '+221 33 820 40 50',
  whatsapp: '+221 77 654 32 10',
  office: 'Immeuble Elikia, Route des Almadies, Dakar, Sénégal',
  specialties: ['Immobilier & Foncier', 'Création d\'entreprise', 'Relocation & Écoles', 'Due Diligence'],
};

export const INITIAL_USER_PROJECTS: UserProject[] = [
  {
    id: 'proj-immo-01',
    title: 'Achat appartement F4 — Mermoz / Dakar',
    category: 'immobilier',
    location: 'Mermoz Pyrotechnie, Dakar',
    status: 'Due diligence & Vérification Notaire en cours',
    progress: 65,
    nextStep: 'Validation du rapport de conformité du notaire et titre foncier (TF 4892/DG)',
    estimatedCompletion: '15 Avril 2026',
    lastUpdate: 'Hier à 14:30 par Awa Ndiaye',
    budget: {
      total: 65000000,
      engaged: 22500000,
      available: 42500000,
    },
    timeline: [
      { step: 'Cadrage du projet & Budget', completed: true, date: '10 Nov 2025', description: 'Définition des critères (3 chambres, parking, ascenseur)' },
      { step: 'Sourcing & Visite vidéo 360°', completed: true, date: '28 Nov 2025', description: 'Visite physique par l’équipe Elikia avec rapport d’inspection' },
      { step: 'Négociation & Offre validée', completed: true, date: '15 Déc 2025', description: 'Accord trouvé avec le promoteur à 65M FCFA au lieu de 70M' },
      { step: 'Audit juridique & Notaire', completed: false, current: true, date: 'En cours', description: 'Vérification de l’état des droits réels à la conservation foncière' },
      { step: 'Signature promesse & Acompte sécurisé', completed: false, date: 'Prévu fin mars', description: 'Dépôt sous séquestre chez Maître Sow' },
      { step: 'Remise des clés & Ameublement', completed: false, date: 'Prévu mi-avril', description: 'État des lieux contradictoire et remise des clés' }
    ],
    documents: [
      { id: 'doc-1', name: 'Promesse_Vente_Mermoz_Signee.pdf', category: 'Contrat', size: '2.4 MB', date: '18 Déc 2025', verified: true },
      { id: 'doc-2', name: 'Rapport_Audit_Technique_Structure.pdf', category: 'Inspection', size: '4.8 MB', date: '02 Jan 2026', verified: true },
      { id: 'doc-3', name: 'Etat_Droits_Reels_TF_4892.pdf', category: 'Notaire', size: '1.1 MB', date: '12 Jan 2026', verified: true },
      { id: 'doc-4', name: 'Quittance_Acompte_Sequestre.pdf', category: 'Paiement', size: '840 KB', date: '20 Jan 2026', verified: true }
    ]
  },
  {
    id: 'proj-ent-02',
    title: 'Création société de conseil agri-tech — Sénégal (SAS)',
    category: 'entreprendre',
    location: 'Dakar / Pôle Urbain Diamniadio',
    status: 'Formalités administratives (RCCM & NINEA)',
    progress: 40,
    nextStep: 'Dépôt des statuts au Greffe du Tribunal de Commerce de Dakar',
    estimatedCompletion: '30 Mars 2026',
    lastUpdate: 'Il y a 3 jours',
    budget: {
      total: 8500000,
      engaged: 3200000,
      available: 5300000,
    },
    timeline: [
      { step: 'Validation du business model', completed: true, date: '05 Jan 2026', description: 'Revue réglementaire et fiscalité zone franche' },
      { step: 'Rédaction des statuts SAS', completed: true, date: '22 Jan 2026', description: 'Statuts rédigés par notre avocat partenaire' },
      { step: 'Dépôt capital bloqué & Banque', completed: true, date: '10 Fév 2026', description: 'Compte provisoire ouvert chez BOA Sénégal' },
      { step: 'Enregistrement RCCM & NINEA', completed: false, current: true, date: 'En cours', description: 'Dossier transmis à l’APIX' },
      { step: 'Domiciliation & Signature bail', completed: false, date: 'Prévu mars', description: 'Contrat de domiciliation chez Hub Elikia' },
      { step: 'Recrutement Country Manager', completed: false, date: 'Prévu avril', description: 'Entretiens des 3 candidats présélectionnés' }
    ],
    documents: [
      { id: 'doc-5', name: 'Statuts_Constitutifs_AgriTech_SAS.pdf', category: 'Juridique', size: '3.1 MB', date: '22 Jan 2026', verified: true },
      { id: 'doc-6', name: 'Attestation_Depot_Capital_Banque.pdf', category: 'Financier', size: '1.5 MB', date: '10 Fév 2026', verified: true },
      { id: 'doc-7', name: 'Business_Plan_Senegal_2026.pdf', category: 'Stratégie', size: '5.2 MB', date: '15 Jan 2026', verified: true }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: '« J’avais besoin d’un interlocuteur capable de suivre mon projet immobilier pendant que j’étais encore en poste à Paris. Elikia a vérifié le titre foncier, inspecté le chantier chaque semaine avec des vidéos en direct et négocié les devis. Zéro stress à 5 000 km. »',
    author: 'Babacar N.',
    location: 'Ingénieur financier, Paris (France)',
    project: 'Acquisition villa à Saly & suivi des travaux',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5
  },
  {
    id: 'test-2',
    quote: '« Après 12 ans à Montréal, je préparais mon retour définitif avec ma famille. Elikia a tout coordonné : inscription des enfants dans une excellente école à Dakar, sélection d’une maison en location et formalités douanières pour nos affaires. Une vraie équipe de confiance. »',
    author: 'Aminata & Cheikh S.',
    location: 'Consultante RH & Entrepreneur, Montréal (Canada)',
    project: 'Programme complet Retour & Installation familiale',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5
  },
  {
    id: 'test-3',
    quote: '« Pour créer ma filiale logistique à Dakar sans multiplier les allers-retours coûteux, Elikia a géré l’APIX, la banque, la domiciliation et le premier recrutement. Nous avons gagné 6 mois sur notre calendrier initial. »',
    author: 'Moussa D.',
    location: 'Directeur Opérations, Abidjan / Lyon',
    project: 'Création d’entreprise & structuration juridique',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5
  }
];

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    id: 'notaires',
    title: 'Notaires & Avocats',
    iconName: 'Scale',
    count: 14,
    description: 'Offices notariaux agréés et cabinets d\'avocats d\'affaires spécialisés en droit OHADA et foncier sénégalais.',
    examples: ['Vérification des titres fonciers', 'Rédaction d’actes authentiques', 'Statuts d’entreprises', 'Fiscalité']
  },
  {
    id: 'banques',
    title: 'Banques & Assurances',
    iconName: 'Building2',
    count: 9,
    description: 'Institutions bancaires partenaires offrant des facilités d’ouverture de compte à distance et de crédit diaspora.',
    examples: ['Comptes bancaires non-résidents', 'Crédit immobilier diaspora', 'Assurance rapatriement & santé', 'Garanties']
  },
  {
    id: 'promoteurs',
    title: 'Promoteurs & Agences',
    iconName: 'Home',
    count: 22,
    description: 'Promoteurs certifiés avec programmes livrables audités et agences sélectionnées pour leur rigueur déontologique.',
    examples: ['Programmes neufs sécurisés', 'Lots viabilisés avec Titre Foncier', 'Gestion locative', 'Diagnostics']
  },
  {
    id: 'technique',
    title: 'Architectes & BTP',
    iconName: 'Hammer',
    count: 18,
    description: 'Architectes inscrits à l’Ordre, bureaux d’études et entreprises de construction qualifiées pour le suivi de chantier.',
    examples: ['Plans architecturaux', 'Suivi de chantier par drone', 'Contrôle qualité matériaux', 'Second œuvre']
  },
  {
    id: 'concessionnaires',
    title: 'Véhicules & Logistique',
    iconName: 'Car',
    count: 11,
    description: 'Concessionnaires officiels, transitaires agréés au Port Autonome de Dakar et centres de contrôle technique.',
    examples: ['Importation sécurisée', 'Dédouanement au Port de Dakar', 'Inspection 200 points', 'Immatriculation']
  },
  {
    id: 'rh-ecoles',
    title: 'RH, Écoles & Relocation',
    iconName: 'GraduationCap',
    count: 16,
    description: 'Cabinets de chasse de tête, établissements scolaires d’excellence (système français/international/sénégalais).',
    examples: ['Inscriptions scolaires', 'Recrutement talents locaux', 'Déménagement international', 'Assistance visa']
  }
];

export const SERVICE_OPTIONS = [
  {
    id: 'retour',
    title: 'Retour & Installation',
    subtitle: 'Je prépare mon retour au Sénégal',
    icon: 'Plane',
    color: 'emerald',
    description: 'Logement, démarches, écoles, banque, assurance et installation clé en main.',
    cta: 'Préparer mon retour',
    route: 'retour' as const,
    highlights: ['Bilan projet de vie', 'Sélection écoles d’excellence', 'Recherche logement & quartier', 'Douanes & Déménagement']
  },
  {
    id: 'emploi',
    title: 'Emploi & Carrière',
    subtitle: 'Je cherche un emploi au Sénégal',
    icon: 'Briefcase',
    color: 'blue',
    description: 'Comprendre le marché, valoriser votre profil diaspora et accéder aux meilleures opportunités.',
    cta: 'Explorer les opportunités',
    route: 'emploi' as const,
    highlights: ['Matching avec recruteurs', 'Benchmarking salarial', 'Optimisation CV international', 'Coaching transition']
  },
  {
    id: 'entreprendre',
    title: 'Entrepreneuriat',
    subtitle: 'Je veux créer ou développer une entreprise',
    icon: 'Rocket',
    color: 'amber',
    description: 'Étude du projet, statuts juridiques, recrutement, structuration fiscale et pilotage.',
    cta: 'Lancer mon projet',
    route: 'entreprendre' as const,
    highlights: ['Formalités APIX rapides', 'Comptabilité & Domiciliation', 'Étude de marché locale', 'Recrutement clé']
  },
  {
    id: 'immobilier',
    title: 'Immobilier & Foncier',
    subtitle: 'Je veux acheter une maison ou investir dans l’immobilier',
    icon: 'Home',
    color: 'indigo',
    description: 'Recherche indépendante, vérification des titres, négociation, travaux et gestion locative.',
    cta: 'Trouver un bien',
    route: 'immobilier' as const,
    highlights: ['Audit Titre Foncier certifié', 'Visites vidéo 360° & drone', 'Négociation prix au juste marché', 'Suivi de chantier']
  },
  {
    id: 'vehicules',
    title: 'Véhicules & Mobilité',
    subtitle: 'Je veux acheter ou importer un véhicule',
    icon: 'Car',
    color: 'teal',
    description: 'Recherche, inspection mécanique approfondie, vérification administrative, dédouanement et démarches.',
    cta: 'Trouver un véhicule',
    route: 'vehicules' as const,
    highlights: ['Inspection 200 points', 'Transit & Dédouanement Port Dakar', 'Historique kilométrique certifié', 'Carte grise & W']
  },
  {
    id: 'investir',
    title: 'Investissement & Actifs',
    subtitle: 'Je veux investir au Sénégal',
    icon: 'TrendingUp',
    color: 'purple',
    description: 'Identifier, analyser, structurer et suivre des opportunités d’investissement à fort potentiel.',
    cta: 'Découvrir les opportunités',
    route: 'investir' as const,
    highlights: ['Due diligence financière', 'PME & Startups en croissance', 'Agrobusiness structuré', 'Reporting trimestriel']
  }
];

export const OFFERS = [
  {
    id: 'connect',
    name: 'Elikia Connect',
    tagline: 'Pour être orienté vers les bons interlocuteurs.',
    badge: 'Démarrage rapide',
    price: 'Gratuit / 25 000 FCFA',
    priceDetail: 'selon diagnostic approfondi',
    description: 'Idéal pour cadrer votre projet, valider sa faisabilité et être mis en relation directe avec des prestataires fiables.',
    features: [
      'Diagnostic initial personnalisé de 45 min',
      'Orientation vers nos partenaires certifiés',
      'Accès aux guides pratiques et checklists Elikia',
      'Estimation budgétaire indicative',
      'Mise en relation qualifiée'
    ],
    cta: 'Découvrir Connect',
    popular: false,
    color: 'slate'
  },
  {
    id: 'assist',
    name: 'Elikia Assist',
    tagline: 'Pour faire accompagner et sécuriser un projet précis de bout en bout.',
    badge: 'La plus populaire',
    price: 'À partir de 50 000 FCFA',
    priceDetail: '+ honoraires au succès ou au jalon',
    description: 'Votre conseiller dédié prend en charge la vérification, la coordination terrain et le suivi rigoureux de votre projet.',
    features: [
      'Conseiller dédié basé à Dakar',
      'Plan d’action opérationnel chiffré',
      'Sourcing & négociation des prestataires',
      'Vérifications juridiques et techniques sur le terrain',
      'Coordination et suivi d’exécution quotidien',
      'Reporting hebdomadaire avec photos/vidéos',
      'Accès complet à votre Espace Client & Documents'
    ],
    cta: 'Demander un devis',
    popular: true,
    color: 'emerald'
  },
  {
    id: 'private-desk',
    name: 'Elikia Private Desk',
    tagline: 'Votre family office opérationnel au Sénégal.',
    badge: 'Gestion Privée & Multi-projets',
    price: 'Sur devis',
    priceDetail: 'Abonnement sur-mesure / Mandat de gestion',
    description: 'Pour les membres de la diaspora et investisseurs gérant plusieurs actifs, chantiers ou entreprises au Sénégal.',
    features: [
      'Gestionnaire de patrimoine & Desk dédié',
      'Suivi multi-projets (Immobilier, Entreprises, Véhicules)',
      'Représentation locale et mandat de confiance',
      'Gestion et paiement sécurisé des prestataires',
      'Due diligence avancée et rapports d’audits complets',
      'Comptabilité analytique et suivi des flux financiers',
      'Ligne directe WhatsApp 7j/7 avec votre coordinateur'
    ],
    cta: 'Parler à un conseiller Private Desk',
    popular: false,
    color: 'amber'
  }
];

export const SENEGAL_LOCATIONS = [
  'Dakar — Plateau / Centre des affaires',
  'Dakar — Almadies / Ngor / Virage',
  'Dakar — Mermoz / Sacré-Cœur / Fann',
  'Dakar — Ouakam / Mamelles',
  'Dakar — Yoff / Ouest Foire / Nord Foire',
  'Pôle Urbain de Diamniadio / Lac Rose',
  'Saly Portudal / Somone / Mbour (Petite Côte)',
  'Thiès ville / Pout',
  'Saint-Louis & Vallée du Fleuve',
  'Cap Skirring / Ziguinchor (Casamance)',
  'Autre région du Sénégal'
];

export const COUNTRIES_OF_RESIDENCE = [
  'France',
  'Canada',
  'États-Unis',
  'Royaume-Uni',
  'Belgique',
  'Suisse',
  'Côte d\'Ivoire',
  'Gabon',
  'Émirats Arabes Unis',
  'Maroc',
  'Allemagne',
  'Italie',
  'Espagne',
  'Autre pays'
];
