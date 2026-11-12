import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Plane, 
  Briefcase, 
  Rocket, 
  Home, 
  Car, 
  TrendingUp, 
  HelpCircle, 
  Sparkles, 
  MapPin, 
  Calendar, 
  DollarSign, 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Clock, 
  LayoutDashboard
} from 'lucide-react';
import { ServiceType, PageRoute } from '../types';
import { COUNTRIES_OF_RESIDENCE, SENEGAL_LOCATIONS } from '../data/mockData';

interface ProjectWizardProps {
  onComplete: (projectData: any) => void;
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
}

export const ProjectWizard: React.FC<ProjectWizardProps> = ({
  onComplete,
  onNavigate,
  onOpenAppointment
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: 'immobilier' as ServiceType,
    country: 'France',
    targetCity: 'Dakar — Almadies / Ngor / Virage',
    budget: '50M - 100M FCFA (75k€ - 150k€)',
    timeline: 'Moins de 3 mois',
    firstName: 'Mariama',
    lastName: 'Diop',
    email: 'mariama.diop@example.com',
    phone: '+33 6 12 34 56 78',
    details: 'Je souhaite faire l’acquisition d’un appartement ou d’un terrain sécurisé avec vérification du titre foncier par notaire.'
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const projectTypes = [
    { id: 'retour' as ServiceType, title: 'Retour / Installation', desc: 'Logement, écoles, démarches & installation', icon: Plane, color: 'emerald' },
    { id: 'emploi' as ServiceType, title: 'Emploi & Carrière', desc: 'Recrutement & valorisation profil diaspora', icon: Briefcase, color: 'blue' },
    { id: 'entreprendre' as ServiceType, title: 'Entrepreneuriat', desc: 'Création de société (SAS/SARL), APIX & pilotage', icon: Rocket, color: 'amber' },
    { id: 'immobilier' as ServiceType, title: 'Immobilier & Terrain', desc: 'Recherche, vérification notaire & suivi chantier', icon: Home, color: 'indigo' },
    { id: 'vehicules' as ServiceType, title: 'Véhicule & Mobilité', desc: 'Inspection 200 points, achat & douanes', icon: Car, color: 'teal' },
    { id: 'investir' as ServiceType, title: 'Investissement', desc: 'PME, agrobusiness & opportunités rentables', icon: TrendingUp, color: 'purple' },
    { id: 'autre' as ServiceType, title: 'Autre projet / Multi-projets', desc: 'Accompagnement personnalisé et conciergerie', icon: HelpCircle, color: 'slate' }
  ];

  const getBudgetOptions = (type: ServiceType) => {
    switch (type) {
      case 'immobilier':
        return [
          'Moins de 25M FCFA (< 38 000 €)',
          '25M à 50M FCFA (38 000 € - 76 000 €)',
          '50M à 100M FCFA (76 000 € - 152 000 €)',
          '100M à 250M FCFA (152 000 € - 380 000 €)',
          'Plus de 250M FCFA (> 380 000 €)',
          'Budget à définir avec un conseiller'
        ];
      case 'entreprendre':
      case 'investir':
        return [
          'Moins de 5M FCFA (< 7 600 €)',
          '5M à 20M FCFA (7 600 € - 30 000 €)',
          '20M à 50M FCFA (30 000 € - 76 000 €)',
          '50M à 150M FCFA (76 000 € - 230 000 €)',
          'Plus de 150M FCFA (> 230 000 €)',
          'En cours de structuration de business plan'
        ];
      case 'vehicules':
        return [
          'Moins de 8M FCFA (< 12 000 €)',
          '8M à 15M FCFA (12 000 € - 23 000 €)',
          '15M à 30M FCFA (23 000 € - 45 000 €)',
          'Plus de 30M FCFA (> 45 000 €)',
          'Importation de mon propre véhicule'
        ];
      default:
        return [
          'Moins de 10M FCFA (< 15 000 €)',
          '10M à 30M FCFA (15 000 € - 45 000 €)',
          '30M à 60M FCFA (45 000 € - 90 000 €)',
          'Plus de 60M FCFA (> 90 000 €)',
          'Budget global en cours de cadrage'
        ];
    }
  };

  const timelineOptions = [
    { id: 'Immédiatement', label: 'Immédiatement', sub: 'Urgent / Projet prêt à démarrer' },
    { id: 'Dans moins de 3 mois', label: 'Dans moins de 3 mois', sub: 'Projet à court terme' },
    { id: 'Dans 3 à 6 mois', label: 'Dans 3 à 6 mois', sub: 'Phase de préparation active' },
    { id: 'Dans 6 à 12 mois', label: 'Dans 6 à 12 mois', sub: 'Planification stratégique' },
    { id: 'Je réfléchis encore', label: 'Je réfléchis encore', sub: 'Étude exploratoire de faisabilité' }
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      setIsSuccess(true);
      onComplete(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = Math.round((currentStep / 6) * 100);

  return (
    <div id="project-wizard-section" className="max-w-3xl mx-auto py-8 sm:py-12 px-4 text-[#1A1A1A]">
      {/* Container Box */}
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200/90 overflow-hidden">
        
        {!isSuccess ? (
          <div>
            {/* Header / Progress bar */}
            <div className="bg-stone-900 text-white p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono font-semibold mb-2">
                <span className="uppercase tracking-wider">Diagnostic Gratuit Elikia Diaspora</span>
                <span>Étape {currentStep} sur 6</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold">
                Parlez-nous de votre projet
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 font-sans">
                Un cadrage précis en 2 minutes pour recevoir une feuille de route adaptée et des estimations réalistes au Sénégal.
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-stone-800 h-1.5 rounded-full mt-5 overflow-hidden">
                <div 
                  className="bg-[#059669] h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Form Step Body */}
            <div className="p-6 sm:p-8 font-sans">
              {/* Question 1: Type de projet */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-stone-100 pb-3">
                    <h3 className="text-lg font-serif-editorial font-bold text-stone-900">
                      1. Quel est votre projet principal au Sénégal ?
                    </h3>
                    <p className="text-xs text-stone-500">
                      Choisissez la catégorie principale (vous pourrez ajouter des projets secondaires ensuite).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {projectTypes.map((item) => {
                      const Icon = item.icon;
                      const isSelected = formData.projectType === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: item.id })}
                          className={`p-4 rounded-xl border text-left transition duration-150 flex items-start gap-3.5 cursor-pointer ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-xs'
                              : 'border-stone-200 hover:border-stone-300 hover:bg-[#FAF9F5]'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#059669] text-white' : 'bg-stone-100 text-stone-700'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-serif-editorial font-bold text-stone-900">{item.title}</div>
                            <div className="text-xs text-stone-500 mt-0.5">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Question 2: Pays de résidence */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-stone-100 pb-3">
                    <h3 className="text-lg font-serif-editorial font-bold text-stone-900">
                      2. Dans quel pays vivez-vous actuellement ?
                    </h3>
                    <p className="text-xs text-stone-500">
                      Cela nous permet d’adapter les horaires de contact, les démarches douanières et fiscales.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                    {COUNTRIES_OF_RESIDENCE.map((country) => {
                      const isSelected = formData.country === country;
                      return (
                        <button
                          key={country}
                          type="button"
                          onClick={() => setFormData({ ...formData, country })}
                          className={`p-3 rounded-xl border text-center text-xs font-semibold transition cursor-pointer ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                              : 'border-stone-200 hover:bg-[#FAF9F5] text-stone-700'
                          }`}
                        >
                          {country}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Question 3: Ville cible au Sénégal */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-stone-100 pb-3">
                    <h3 className="text-lg font-serif-editorial font-bold text-stone-900">
                      3. Dans quelle ville ou zone souhaitez-vous réaliser votre projet ?
                    </h3>
                    <p className="text-xs text-stone-500">
                      Notre équipe intervient sur l'ensemble de la région dakaroise et les grands pôles régionaux.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    {SENEGAL_LOCATIONS.map((loc) => {
                      const isSelected = formData.targetCity === loc;
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setFormData({ ...formData, targetCity: loc })}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                              : 'border-stone-200 hover:bg-[#FAF9F5] text-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#059669]' : 'text-stone-400'}`} />
                            <span>{loc}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#059669]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Question 4: Budget estimatif */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-stone-100 pb-3">
                    <h3 className="text-lg font-serif-editorial font-bold text-stone-900">
                      4. Quel est votre budget estimatif pour ce projet ?
                    </h3>
                    <p className="text-xs text-stone-500">
                      Ce montant est indicatif et permet de vous orienter vers les offres et partenaires adaptés.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {getBudgetOptions(formData.projectType).map((bud) => {
                      const isSelected = formData.budget === bud;
                      return (
                        <button
                          key={bud}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: bud })}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                              : 'border-stone-200 hover:bg-[#FAF9F5] text-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <DollarSign className={`w-4 h-4 ${isSelected ? 'text-[#059669]' : 'text-stone-400'}`} />
                            <span>{bud}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#059669]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Question 5: Échéance */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-stone-100 pb-3">
                    <h3 className="text-lg font-serif-editorial font-bold text-stone-900">
                      5. Quand souhaitez-vous démarrer ?
                    </h3>
                    <p className="text-xs text-stone-500">
                      Nous adaptons le rythme de coordination et la priorisation de vos démarches.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {timelineOptions.map((t) => {
                      const isSelected = formData.timeline === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: t.id })}
                          className={`w-full p-4 rounded-xl border text-left transition cursor-pointer ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20'
                              : 'border-stone-200 hover:bg-[#FAF9F5]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-serif-editorial font-bold text-stone-900">{t.label}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#059669]" />}
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">{t.sub}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Question 6: Coordonnées & Précisions */}
              {currentStep === 6 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-stone-100 pb-3">
                    <h3 className="text-lg font-serif-editorial font-bold text-stone-900">
                      6. Vos coordonnées de contact
                    </h3>
                    <p className="text-xs text-stone-500">
                      Un conseiller Elikia préparera votre synthèse personnalisée et prendra contact avec vous.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Prénom</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Téléphone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Détails ou questions spécifiques (facultatif)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Précisez votre recherche (surface souhaitée, secteur d’activité de l’entreprise, etc.)..."
                      className="w-full px-3.5 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-[#059669]"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Vos données restent strictement confidentielles et ne sont jamais partagées à des tiers sans accord.</span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-8 border-t border-stone-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-2.5 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  id={currentStep === 6 ? 'wizard-submit-btn' : 'wizard-next-btn'}
                  onClick={handleNext}
                  className="px-6 py-3 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition cursor-pointer"
                >
                  <span>{currentStep === 6 ? 'Recevoir mon diagnostic' : 'Continuer'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* Step Success / Thank You */
          <div className="p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-200 font-sans">
            <div className="w-16 h-16 bg-emerald-50 text-[#059669] rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-serif-editorial font-bold text-stone-900">
                Merci, {formData.firstName} !
              </h3>
              <p className="text-base font-medium text-emerald-800">
                Votre demande a bien été reçue. Un conseiller Elikia reviendra vers vous pour analyser votre projet.
              </p>
            </div>

            {/* Diagnostic Recap Box */}
            <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-5 text-left max-w-lg mx-auto space-y-2.5 text-xs text-stone-700">
              <div className="font-serif-editorial font-bold text-sm text-stone-900 border-b border-stone-200 pb-2 flex items-center justify-between">
                <span>Synthèse de votre diagnostic préliminaire</span>
                <span className="text-emerald-800 font-mono text-xs">Référence : #ELK-2026-981</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-1">
                <div>
                  <span className="text-stone-500">Projet :</span>
                  <div className="font-semibold text-stone-800 capitalize">{formData.projectType}</div>
                </div>
                <div>
                  <span className="text-stone-500">Localisation :</span>
                  <div className="font-semibold text-stone-800">{formData.targetCity}</div>
                </div>
                <div>
                  <span className="text-stone-500">Budget indicatif :</span>
                  <div className="font-semibold text-stone-800">{formData.budget}</div>
                </div>
                <div>
                  <span className="text-stone-500">Démarrage :</span>
                  <div className="font-semibold text-stone-800">{formData.timeline}</div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="wizard-access-space-btn"
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-full text-xs shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>Accéder à mon espace Elikia</span>
              </button>

              <button
                onClick={onOpenAppointment}
                className="w-full sm:w-auto px-6 py-3 bg-[#059669] hover:bg-[#047857] text-white font-semibold rounded-full text-xs shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Planifier un appel immédiat</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
