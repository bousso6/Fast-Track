🇸🇳 ELIKIA DIASPORA — Votre Équipe de Confiance au Sénégal
Le guichet unique pour vivre, travailler, entreprendre et investir au Sénégal en toute sérénité.
Un interlocuteur unique à Dakar, un réseau de partenaires certifiés (notaires, avocats, banques, transitaires) et un suivi transparent en temps réel pour la diaspora.
📋 Table des Matières
Présentation du Projet
Fonctionnalités Clés
Technique d'empilement
Arborescence du Projet
Installation & Démarrage
Variables d'Environnement
Scripts Disponibles
Modèle de Données & Types
Architecture des Composants & Pages
Export & Déploiement
🌟 Présentation du Projet
ÉLIKIA DIASPORA répond aux problématiques majeures rencontrées par la diaspora sénégalaise et africaine lors de leurs projets de retour ou d'investissement au pays :
Manque de tiers de confiance sur place à Dakar
Difficultés de vérification des titres fonciers et risques d'escroquerie
Complexité administrative (création d'entreprise, dédouanement portuaire, fiscalité)
Absence de suivi rigoureux des chantiers ou des démarches
Grâce à la plateforme ÉLIKIA DIASPORA, chaque membre de la diaspora bénéficie d'un Bureau privé : un conseiller attitré basé à Dakar (bureaux aux Almadies), un coffre-fort documentaire certifié, une gestion de budget transparent en FCFA et un suivi d'étapes jalonné avec photos/vidéos et rapports notariés.
🚀 Fonctionnalités Clés
1. Pôles de Services Spécialisés
🏡 Immobilier & Foncier : Sourcing de biens (villas, appartements neufs, terrains), audits notariés des Titres Fonciers (TF), inspection technique indépendante, visites vidéo 360°, suivi de chantier.
💼 Entreprendre au Sénégal : Création d'entreprise (SAS, SARL, SUARL), guichet unique APIX, domiciliation, business plan adapté au marché local, recrutement.
🎯 Emploi & Carrières : Accompagnement cadres et profils internationaux, négociation salariale locale, mise en relation directe avec les recruteurs et multinationales au Sénégal.
✈️ Retour & Installation (Relocation) : Inscription scolaire des enfants, recherche de logement temporaire ou définitif, assistance douanière pour le container de déménagement.
🚗 Véhicules & Logistique : Dédouanement au Port Autonome de Dakar (PAD), immatriculation, carte grise, acheminement et inspection mécanique.
📈 Investir au Pays : Projets agro-business (Niayes, Vallée du Fleuve), prise de participation dans des PME locales, obligations d'État et Diaspora Bonds.
2. Espace Client Sécurisé (Dashboard)
Suivi d'avancement interactif : Barres de progression en temps réel, jalons validés et étapes en cours.
Gestion budgétaire transparente : Suivi des montants totaux, engagés et disponibles en Francs CFA (XOF).
Coffre-fort documentaire : Contrats notariés, états des droits réels, devis, quittances d'acompte sous séquestre vérifiés et téléchargeables.
Messagerie directe & contact conseiller : Coordonnées complètes du conseiller dédié (téléphone, WhatsApp direct, bureau physique aux Almadies).
3. Outils & Simulateurs Interactifs
Simulateur de projet pas-à-pas (Assistant de projet) : Cadrage du besoin, sélection du pays de résidence, budget estimatif et calendrier cible.
Demande de devis instantanée (CitationModulaire) : Formulaire personnalisé par pôle de service.
Prise de rendez-vous en ligne (Modal de rendez-vous) : Réservation de créneaux en visio (Google Meet / Zoom / WhatsApp) ou en présentiel à Dakar.
Chat interactif avec conseiller (Modal de discussion avec les conseillers) : Échanges immédiats avec réponse contextualisée sur les démarches au Sénégal.
Espace Authentification (AuthModal,Page de connexion) : Gestion de session utilisateur fluide.
🛠 Technique d'empilement
L'extrémité avant:
Réaction 19 — Composants fonctionnels et hooks modernes
TypeScript 5.8 — Typage statique strict et robuste
Vite 6 — Build tool ultra-rapide et serveur de développement
Tailwind CSS v4 — Framework utilitaire moderne avec @import "tailwindcss"
Mouvement (Mouvement du cadre) — Animations fluides et transitions d'interface
Réaction Lucide — Iconographie vectorielle cohérente et légère
Typographie & Design:
Police de corps : Plus Jakarta Sans
Police éditoriale & titres : présentateur de nouvelles&Affichage Playfair
Palette : Vert Émeraude Sénégal (#047857), Terracotta / Terre de Sienne, Blanc Cassé éditorial (#FDFCFB), Ardoise foncé (#1A1A1A)
Outils & Qualité:
Compilateur ESLint et TypeScript (tsc --noEmit)
Compatibilité Node.js 18+, Bun, et navigateurs modernes
📂 Arborescence du Projet
Texte
├── index.html                   # Point d'entrée HTML (métadonnées, polices Google Fonts, OpenGraph)
├── package.json                 # Dépendances, scripts de build et de développement
├── tsconfig.json                # Configuration du compilateur TypeScript
├── vite.config.ts               # Configuration Vite (plugins React, Tailwind, alias @/)
├── metadata.json                # Métadonnées applicatives
├── .env.example                 # Modèle des variables d'environnement
├── .gitignore                   # Fichiers et dossiers exclus de Git
│
├── assets/                      # Ressources statiques
│   └── images/                  # Dossier pour les images, photos et logos
│       └── .gitkeep
│
└── src/
    ├── main.tsx                 # Point d'entrée React (mount ReactDOM)
    ├── App.tsx                  # Composant racine, routeur d'état, modales globales
    ├── index.css                # Styles globaux Tailwind CSS v4 et classes éditoriales
    ├── types.ts                 # Définitions TypeScript (projets, conseillers, services, messages)
    │
    ├── components/              # Composants réutilisables et interactifs
    │   ├── Header.tsx           # En-tête de navigation, menu responsive, CTA d'action
    │   ├── Footer.tsx           # Pied de page complet, liens utiles, mentions légales
    │   ├── ProjectWizard.tsx    # Questionnaire interactif pour démarrer un projet
    │   ├── AppointmentModal.tsx # Prise de rendez-vous (visio ou bureaux Dakar)
    │   ├── QuoteModal.tsx       # Modale de demande de devis personnalisé
    │   ├── AdvisorChatModal.tsx # Chat interactif avec le conseiller à Dakar
    │   └── AuthModal.tsx        # Modale de connexion / inscription rapide
    │
    ├── data/
    │   └── mockData.ts          # Données de démonstration réalistes (projets Dakar, profils, partenaires)
    │
    └── pages/                   # Vues principales de l'application
        ├── HomePage.tsx         # Page d'accueil (Hero, piliers de services, réassurance, témoignages)
        ├── ImmobilierPage.tsx   # Hub Immobilier & Foncier (titres fonciers, audit notarial)
        ├── EntreprendrePage.tsx # Hub Création d'entreprise (APIX, statuts, domiciliation)
        ├── EmploiPage.tsx       # Hub Recrutement & Carrières à Dakar
        ├── RetourPage.tsx       # Hub Relocation, retour au pays & écoles
        ├── VehiculesPage.tsx    # Hub Dédouanement de véhicules & conteneurs
        ├── InvestirPage.tsx     # Hub Opportunités d'investissement & agro-business
        ├── HowItWorksPage.tsx   # Explication de la méthode Elikia et engagements
        ├── PartnersPage.tsx     # Réseau de partenaires certifiés au Sénégal
        ├── DashboardPage.tsx    # Espace client (timeline, budget, documents vérifiés)
        └── LoginPage.tsx        # Page de connexion dédiée
💻 Installation & Démarrage
Prérequis
Node.js version 18.0.0 ou supérieure (recommandé : Node 20 LTS)
npm (inclus avec Node) ou bien
1. Cloner le projet ou extraire l'archive
Frapper
git clone <url-du-depot>
cd <nom-du-dossier>
2. Installer les dépendances
Frapper
npm install
3. Configurer l'environnement
Copiez le fichier .env.exempledans.env:
Frapper
cp .env.example .env
4. Lancer le serveur de développement
Frapper
npm run dev
L'application est accessible sur http://localhost:3000.
⚙️ Variables d'Environnement
Le fichier .env supporte les clés suivantes :
Variable	Description
Clé API GEMINI	(Optionnel) Clé d'API Google Gemini si activation de l'intelligence artificielle côté serveur
URL de l'application	URL de base de l'application déployée
📜 Scripts Disponibles
Dans le répertoire du projet, vous pouvez exécuter :
npm run dev : Démarre le serveur de développement local sur le port 3000 avec rechargement à chaud.
npm run build : Compile et optimise l'application pour la production dans le dossier dist/.
npm run aperçu : Lance un serveur local pour prévisualiser le build de production.
npm run lint : Exécute le contrôle strict du typage TypeScript (tsc --noEmit).
npm run clean : Supprime les artefacts de build précédents (dist/).
📊 Modèle de Données & Types (src/types.ts)
PageRoute
Identifie la page courante affichée dans l'application SPA :
'accueil' | 'retour' | 'emploi' | 'entreprendre' | 'immobilier' | 'vehicules' | 'investir' | 'comment-ca-marche' | 'partenaires' | 'dashboard' | 'demarrer' | 'login'
Projet utilisateur
Représente un projet actif dans le Dashboard client :
Manuscrit
interface UserProject {
  id: string;
  title: string;
  category: ServiceType;
  location: string;
  status: string;
  progress: number; // Pourcentage (0-100)
  nextStep: string;
  estimatedCompletion: string;
  budget: {
    total: number;     // En FCFA
    engaged: number;   // Déjà engagé
    available: number; // Restant disponible
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
  }[];
  lastUpdate: string;
}
Conseiller
Informations sur le conseiller attitré au Sénégal :
Manuscrit
interface Advisor {
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
🎨 Architecture des Composants & Pages
App.tsx:
Gère le routage par état (page actuelle), le défilement fluide et l'état des modales globales.
Intègre le bouton flottant d'accès rapide au conseiller à Dakar en bas à droite.
ProjectWizard.tsx:
Assistant en 3 étapes : Type de projet ➔ Détails & Budget ➔ Coordonnées & Synthèse.
DashboardPage.tsx:
Affiche les projets du client, la ventilation budgétaire avec barre de ratio, les jalons chronologiques et les documents authentifiés.
Header.tsx&Pied de page.tsx:
Menu responsive adapté mobile / tablette / desktop avec drapeaux Sénégal et boutons d'action rapide.
Pages Pôles Métiers:
Chacune offre une grille de solutions claires, les démarches requises, les délais moyens et les garanties Elikia.
🚢 Export & Déploiement
Déploiement Statique (Vite Build)
L'application est une Single Page Application (SPA). Pour la déployer sur un hébergeur statique (Vercel, Netlify, GitHub Pages, Firebase Hosting, Cloudflare Pages) :
Frapper
npm run build
Le dossier généré dist/ contient tous les fichiers HTML, CSS, JS et assets optimisés prêts pour la production.
Règles de routage SPA
Si vous déployez sur un serveur web (Nginx, Apache ou hébergement cloud), assurez-vous de rediriger toutes les requêtes vers index.html:
Nginx:try_files $uri $uri/ /index.html;
Vercel : Inclus automatiquement ou via vercel.json("réécritures" : [{ "source" : "/(.*)", "destination" : "/" }])
Netlify : Fichier _redirections contenant /> /index.html 200
🛡️ Engagements de Confiance & Déontologie
Séquestre Notarié : Tous les paiements d'acomptes immobiliers ou de parts de sociétés transitent par des comptes sous séquestre d'offices notariaux inscrits à l'Ordre des Notaires du Sénégal.
Transparence Tarifaire : Devis détaillés préalables, aucun frais caché, rapports d'inspection contradictoires avec photos géolocalisées.
Présence Physique : Équipe permanente aux Almadies, Dakar, disponible pour visites physiques, réceptions de chantiers et démarches administratives.
© ELIKIA DIASPORA — Tous droits réservés.
Dakar, République du Sénégal & International.