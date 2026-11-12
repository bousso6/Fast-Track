import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  MessageSquare, 
  PhoneCall, 
  Plus, 
  ArrowUpRight, 
  Eye, 
  ShieldCheck, 
  DollarSign, 
  Calendar, 
  Building2, 
  Home, 
  Rocket, 
  Check, 
  ExternalLink,
  Lock,
  ChevronRight,
  Sparkles,
  PieChart
} from 'lucide-react';
import { PageRoute, UserProject } from '../types';
import { CURRENT_USER, DEFAULT_ADVISOR, INITIAL_USER_PROJECTS } from '../data/mockData';

interface DashboardPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAdvisorChat: () => void;
  onOpenAppointment: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onOpenAdvisorChat,
  onOpenAppointment
}) => {
  const [projects, setProjects] = useState<UserProject[]>(INITIAL_USER_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'documents' | 'timeline'>('overview');
  const [documentFilter, setDocumentFilter] = useState('all');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Calculated totals from mock specs (18 500 000 FCFA Total, 5 800 000 FCFA Engagé, 12 700 000 FCFA Disponible)
  const budgetStats = {
    total: 18500000,
    engaged: 5800000,
    available: 12700000
  };

  const formatCFA = (val: number) => {
    return new Intl.NumberFormat('fr-FR').format(val) + ' FCFA';
  };

  const handleSimulateDownload = (docName: string) => {
    setDownloadSuccessToast(docName);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3000);
  };

  const standardTimeline = [
    { label: 'Projet créé', completed: true, date: '15 Oct 2025' },
    { label: 'Diagnostic terminé', completed: true, date: '22 Oct 2025' },
    { label: 'Prestataire sélectionné', completed: true, date: '10 Nov 2025' },
    { label: 'Documents reçus', completed: true, date: '02 Déc 2025' },
    { label: 'Vérification & Audit', completed: true, current: true, date: 'En cours' },
    { label: 'Paiement sécurisé', completed: false, date: 'Prévu Mars' },
    { label: 'Exécution terrain', completed: false, date: 'Prévu Avril' },
    { label: 'Projet terminé', completed: false, date: 'Prévu Mai' }
  ];

  return (
    <div id="dashboard-container" className="py-8 bg-[#FDFCFB] min-h-screen text-[#1A1A1A]">
      
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-3 border border-emerald-500/50 animate-in slide-in-from-bottom-5 duration-200 font-sans">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <span className="font-semibold">Téléchargement sécurisé :</span> {downloadSuccessToast}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top User Greeting Bar */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={CURRENT_USER.avatar} 
                alt={CURRENT_USER.name} 
                className="w-16 h-16 rounded-xl object-cover border border-stone-200 shadow-xs" 
              />
              <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute -top-1 -right-1" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
                  Bonjour, {CURRENT_USER.name.split(' ')[0]} 👋
                </h1>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {CURRENT_USER.plan}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5 font-sans">
                Voici l’avancement de vos projets et actifs au Sénégal en temps réel.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('demarrer')}
              className="px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white rounded-full font-semibold text-xs shadow-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau projet</span>
            </button>

            <button
              onClick={onOpenAdvisorChat}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Contacter Awa Ndiaye</span>
            </button>
          </div>
        </div>

        {/* 3 Main Highlights / Top Stats (Mes Dépenses) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {/* Budget Total */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500">Budget total alloué</span>
            <div className="text-2xl font-serif-editorial font-bold text-stone-900 mt-2">
              {formatCFA(budgetStats.total)}
            </div>
            <div className="text-xs text-stone-500 mt-1 flex items-center gap-1 font-sans">
              <span>≈ 28 200 €</span>
              <span className="text-stone-300">•</span>
              <span>2 projets actifs</span>
            </div>
          </div>

          {/* Engagé */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-600">Montant engagé / Séquestre</span>
            <div className="text-2xl font-serif-editorial font-bold text-amber-900 mt-2">
              {formatCFA(budgetStats.engaged)}
            </div>
            <div className="text-xs text-amber-800 mt-1 flex items-center gap-1 font-sans">
              <span>31.3 % du budget</span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-500">Factures & acomptes notaire</span>
            </div>
          </div>

          {/* Disponible */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-800">Trésorerie disponible</span>
            <div className="text-2xl font-serif-editorial font-bold text-[#059669] mt-2">
              {formatCFA(budgetStats.available)}
            </div>
            <div className="text-xs text-emerald-800 mt-1 flex items-center gap-1 font-sans">
              <span>68.7 % disponible</span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-500">Déblocage aux jalons</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Projects & Advisor column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column: Projects & Tabs (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Project Selector Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif-editorial font-bold text-stone-900">Mes projets en cours</h2>
                <span className="text-xs font-mono text-stone-500">{projects.length} projets suivis</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project 1: Achat appartement — Dakar */}
                <div
                  onClick={() => setSelectedProjectId('proj-immo-01')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedProjectId === 'proj-immo-01'
                      ? 'bg-white border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                      : 'bg-white/80 border-stone-200/90 hover:bg-white shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-semibold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                        Immobilier
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        65 %
                      </span>
                    </div>

                    <h3 className="font-serif-editorial font-bold text-stone-900 text-base">
                      Achat appartement — Dakar
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5 font-sans">
                      Mermoz Pyrotechnie • TF 4892/DG
                    </p>

                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] text-stone-500 mb-1 font-sans">
                        <span>Statut :</span>
                        <span className="font-medium text-stone-800">Due diligence en cours</span>
                      </div>
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#059669] h-full w-[65%] rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-600 flex items-center justify-between font-sans">
                    <span className="truncate pr-2">Prochaine étape : Rapport du notaire</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  </div>
                </div>

                {/* Project 2: Création société — Sénégal */}
                <div
                  onClick={() => setSelectedProjectId('proj-ent-02')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedProjectId === 'proj-ent-02'
                      ? 'bg-white border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                      : 'bg-white/80 border-stone-200/90 hover:bg-white shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-semibold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                        Entreprise SAS
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        40 %
                      </span>
                    </div>

                    <h3 className="font-serif-editorial font-bold text-stone-900 text-base">
                      Création société — Sénégal
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5 font-sans">
                      Pôle Urbain Diamniadio & APIX Dakar
                    </p>

                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] text-stone-500 mb-1 font-sans">
                        <span>Statut :</span>
                        <span className="font-medium text-stone-800">Formalités administratives</span>
                      </div>
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-600 h-full w-[40%] rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-600 flex items-center justify-between font-sans">
                    <span className="truncate pr-2">Prochaine étape : RCCM & Greffe</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Project Full Details Area */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
              
              {/* Tab Switcher */}
              <div className="flex items-center space-x-2 border-b border-stone-200 pb-3 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Vue d’ensemble
                </button>

                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'timeline'
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Timeline d’exécution
                </button>

                <button
                  onClick={() => setActiveTab('documents')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'documents'
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Documents vérifiés ({selectedProject.documents.length})
                </button>

                <button
                  onClick={() => setActiveTab('budget')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'budget'
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  Dépenses & Séquestre
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-2xl font-serif-editorial font-bold text-stone-900">
                        {selectedProject.title}
                      </h3>
                      <p className="text-xs text-stone-500 font-sans mt-0.5">
                        {selectedProject.location} • Mis à jour : {selectedProject.lastUpdate}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-mono font-semibold rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {selectedProject.status}
                    </span>
                  </div>

                  {/* Next Step Box */}
                  <div className="bg-[#FAF9F5] border border-stone-200 rounded-xl p-4 flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-stone-500">
                        Action en cours par l'équipe Elikia à Dakar
                      </div>
                      <p className="text-xs sm:text-sm font-serif-editorial font-bold text-stone-900 mt-0.5">
                        {selectedProject.nextStep}
                      </p>
                    </div>
                  </div>

                  {/* 3 mini metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-stone-200 text-xs">
                      <span className="text-stone-500 font-sans">Avancement global</span>
                      <div className="text-lg font-serif-editorial font-bold text-stone-900 mt-1">{selectedProject.progress}%</div>
                    </div>
                    <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-stone-200 text-xs">
                      <span className="text-stone-500 font-sans">Livraison estimée</span>
                      <div className="text-lg font-serif-editorial font-bold text-stone-900 mt-1">{selectedProject.estimatedCompletion}</div>
                    </div>
                    <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-stone-200 text-xs">
                      <span className="text-stone-500 font-sans">Documents audités</span>
                      <div className="text-lg font-serif-editorial font-bold text-[#059669] mt-1">{selectedProject.documents.length} pièces</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Timeline */}
              {activeTab === 'timeline' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-xl font-serif-editorial font-bold text-stone-900 mb-1">
                      Timeline opérationnelle & Jalons
                    </h3>
                    <p className="text-xs text-stone-600 font-sans">
                      Chaque étape est validée sur pièce et sur le terrain avant de passer à la suivante.
                    </p>
                  </div>

                  <div className="relative pl-6 space-y-6 border-l-2 border-stone-200 ml-2 font-sans">
                    {selectedProject.timeline.map((step, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          step.completed
                            ? 'bg-[#059669] text-white ring-4 ring-emerald-100'
                            : step.current
                            ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                            : 'bg-stone-200 text-stone-500'
                        }`}>
                          {step.completed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-serif-editorial font-bold text-stone-900">{step.step}</span>
                            {step.date && (
                              <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                                {step.date}
                              </span>
                            )}
                          </div>
                          {step.description && (
                            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Documents */}
              {activeTab === 'documents' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-serif-editorial font-bold text-stone-900">
                        Coffre-fort Documents & Actes
                      </h3>
                      <p className="text-xs text-stone-600 font-sans">
                        Documents légaux, promesses, factures et rapports d’inspection certifiés.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {selectedProject.documents.map((doc) => (
                      <div 
                        key={doc.id}
                        className="p-3.5 rounded-xl bg-[#FAF9F5] border border-stone-200 hover:border-emerald-600/40 flex items-center justify-between transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0 border border-emerald-200">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-serif-editorial font-bold text-stone-900 truncate max-w-xs sm:max-w-md">
                              {doc.name}
                            </div>
                            <div className="text-[11px] font-mono text-stone-500 flex items-center gap-2 mt-0.5">
                              <span>{doc.category}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>{doc.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSimulateDownload(doc.name)}
                            className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition cursor-pointer"
                            title="Télécharger"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Budget */}
              {activeTab === 'budget' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-xl font-serif-editorial font-bold text-stone-900">
                      Suivi Financier du Projet
                    </h3>
                    <p className="text-xs text-stone-600 font-sans">
                      Séquestre et déblocages progressifs sur factures et justificatifs notariés.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 bg-[#FAF9F5] rounded-xl border border-stone-200">
                      <span className="text-xs font-mono uppercase tracking-wider text-stone-500">Budget total alloué</span>
                      <div className="text-lg font-serif-editorial font-bold text-stone-900 mt-1">
                        {formatCFA(selectedProject.budget.total)}
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200">
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">Montant engagé</span>
                      <div className="text-lg font-serif-editorial font-bold text-amber-900 mt-1">
                        {formatCFA(selectedProject.budget.engaged)}
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">Solde disponible</span>
                      <div className="text-lg font-serif-editorial font-bold text-[#059669] mt-1">
                        {formatCFA(selectedProject.budget.available)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Mon Conseiller & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Mon Conseiller Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                  Votre conseillère dédiée
                </span>
                <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Dakar Almadies
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={DEFAULT_ADVISOR.avatar} 
                    alt={DEFAULT_ADVISOR.name} 
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200" 
                  />
                  <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0" />
                </div>
                <div>
                  <h3 className="font-serif-editorial font-bold text-stone-900 text-base">{DEFAULT_ADVISOR.name}</h3>
                  <p className="text-xs text-stone-500 font-sans">{DEFAULT_ADVISOR.title}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-stone-600 bg-[#FAF9F5] p-3.5 rounded-xl border border-stone-200 font-sans">
                <div className="font-serif-editorial font-bold text-stone-900">Spécialités :</div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {DEFAULT_ADVISOR.specialties.map((sp, i) => (
                    <span key={i} className="bg-white text-stone-700 text-[10px] font-mono px-2 py-0.5 rounded border border-stone-200">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  id="advisor-message-btn"
                  onClick={onOpenAdvisorChat}
                  className="w-full py-3 px-4 bg-[#059669] hover:bg-[#047857] text-white font-semibold rounded-full text-xs flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Envoyer un message</span>
                </button>

                <button
                  id="advisor-appointment-btn"
                  onClick={onOpenAppointment}
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-full text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Planifier un appel</span>
                </button>
              </div>
            </div>

            {/* Global Timeline Preview */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500">
                  Cycle Global Elikia
                </h3>
                <span className="text-[10px] text-emerald-800 font-mono font-semibold bg-emerald-50 px-2 py-0.5 rounded">Standardisé</span>
              </div>

              <div className="space-y-2.5 text-xs font-sans">
                {standardTimeline.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-1 border-b border-stone-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        item.completed ? 'bg-[#059669] text-white' : item.current ? 'bg-amber-500 text-white animate-pulse' : 'bg-stone-200 text-stone-500'
                      }`}>
                        {item.completed ? '✓' : i + 1}
                      </div>
                      <span className={`${item.completed ? 'font-medium text-stone-900' : 'text-stone-500'}`}>
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
