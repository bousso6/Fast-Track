import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  FileText,
  Download,
  MessageSquare,
  PhoneCall,
  Plus,
  ShieldCheck,
  Check,
  ChevronRight,
  Loader2,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';
import { PageRoute } from '../types';
import type { AuthUser } from '../lib/authApi';
import { fetchDashboard } from '../lib/dashboardApi';
import type { Advisor, DashboardProject, ProjectRequest } from '../lib/dashboardApi';

interface DashboardPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAdvisorChat: () => void;
  onOpenAppointment: () => void;
  user: AuthUser | null;
}

// Parité fixe FCFA (XOF) / euro
const XOF_PER_EUR = 655.957;

const formatCFA = (val: number) =>
  new Intl.NumberFormat('fr-FR').format(Math.round(val)) + ' FCFA';

const formatEUR = (valCfa: number) =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(
    Math.round(valCfa / XOF_PER_EUR / 100) * 100
  ) + ' €';

const formatPercent = (part: number, total: number) =>
  total > 0 ? ((part / total) * 100).toFixed(1).replace('.', ',') : '0';

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onOpenAdvisorChat,
  onOpenAppointment,
  user
}) => {
  const displayName = user
    ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Mon espace'
    : 'Mon espace';
  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || 'E'
    : 'E';
  const roleLabel =
    user?.role === 'admin'
      ? 'Administrateur'
      : user?.role === 'advisor'
        ? 'Conseiller'
        : user?.role === 'finance'
          ? 'Finance'
          : 'Espace Client';

  // Données chargées depuis l'API
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [advisor, setAdvisor] = useState<Advisor | null>(null);
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  // UI
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'documents' | 'timeline'>('overview');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    fetchDashboard(controller.signal)
      .then((data) => {
        setProjects(data.projects ?? []);
        setAdvisor(data.advisor);
        setRequests(data.requests ?? []);
        setStatus('ready');
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') return;
        setErrorMessage(err.message || 'Une erreur est survenue.');
        setStatus('error');
      });

    return () => controller.abort();
  }, [reloadKey, user?.email]);

  const selectedProject: DashboardProject | undefined =
    projects.find((p) => p.id === selectedProjectId) ?? projects[0];

  // Totaux calculés à partir des projets
  const budgetStats = useMemo(() => {
    const total = projects.reduce((sum, p) => sum + (p.budget?.total ?? 0), 0);
    const engaged = projects.reduce((sum, p) => sum + (p.budget?.engaged ?? 0), 0);
    const available = projects.reduce((sum, p) => sum + (p.budget?.available ?? 0), 0);
    return { total, engaged, available };
  }, [projects]);

  const handleSimulateDownload = (docName: string) => {
    // TODO : remplacer par le vrai téléchargement (URL signée renvoyée par l'API)
    setDownloadSuccessToast(docName);
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  const greetingBar = (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center text-xl font-serif-editorial font-bold shadow-xs">
            {initials}
          </div>
          <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute -top-1 -right-1" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
              Bonjour, {displayName} 👋
            </h1>
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {roleLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5 font-sans">
            {user?.email ? `${user.email} · ` : ''}Voici l’avancement de vos projets et actifs au Sénégal en temps réel.
          </p>
        </div>
      </div>

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
          <span>{advisor ? `Contacter ${advisor.name}` : 'Contacter un conseiller'}</span>
        </button>
      </div>
    </div>
  );

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

        {greetingBar}

        {/* Demandes en cours (diagnostic envoyé, pas encore converti en projet) */}
        {status === 'ready' && requests.length > 0 && (
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif-editorial font-bold text-stone-900">Mes demandes en cours</h2>
              <span className="text-xs font-mono text-stone-500">
                {requests.length} demande{requests.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs space-y-2 font-sans"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                      {request.category}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {request.status}
                    </span>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-stone-900 text-base">{request.title}</h3>
                  {request.location && <p className="text-xs text-stone-500">{request.location}</p>}
                  {request.message && <p className="text-xs text-stone-600 leading-relaxed">{request.message}</p>}
                  <p className="text-[11px] font-mono text-stone-400">Envoyée le {request.createdAt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chargement */}
        {status === 'loading' && (
          <div className="bg-white rounded-2xl p-10 border border-stone-200/90 shadow-sm flex items-center justify-center gap-3 text-sm text-stone-600 font-sans">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            <span>Chargement de vos projets…</span>
          </div>
        )}

        {/* Erreur */}
        {status === 'error' && (
          <div className="bg-white rounded-2xl p-10 border border-red-200 shadow-sm flex flex-col items-center text-center gap-3 font-sans">
            <AlertTriangle className="w-7 h-7 text-red-500" />
            <p className="text-sm text-stone-700">{errorMessage}</p>
            <button
              onClick={() => setReloadKey((k) => k + 1)}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full font-semibold text-xs transition cursor-pointer"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Aucun projet */}
        {status === 'ready' && projects.length === 0 && requests.length === 0 && (
          <div className="bg-white rounded-2xl p-10 border border-stone-200/90 shadow-sm flex flex-col items-center text-center gap-3 font-sans">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-serif-editorial font-bold text-stone-900">
              Vous n’avez pas encore de projet
            </h2>
            <p className="text-sm text-stone-600 max-w-md">
              Démarrez un diagnostic gratuit : votre conseiller Elikia analysera vos besoins et vous remettra un plan d’action.
            </p>
            <button
              onClick={() => onNavigate('demarrer')}
              className="mt-1 px-6 py-3 bg-[#059669] hover:bg-[#047857] text-white rounded-full font-semibold text-sm shadow-xs flex items-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Démarrer mon projet</span>
            </button>
          </div>
        )}

        {/* Contenu */}
        {status === 'ready' && selectedProject && (
          <>
            {/* 3 cartes budget (calculées) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500">Budget total alloué</span>
                <div className="text-2xl font-serif-editorial font-bold text-stone-900 mt-2">
                  {formatCFA(budgetStats.total)}
                </div>
                <div className="text-xs text-stone-500 mt-1 flex items-center gap-1 font-sans">
                  <span>≈ {formatEUR(budgetStats.total)}</span>
                  <span className="text-stone-300">•</span>
                  <span>{projects.length} projet{projects.length > 1 ? 's' : ''} actif{projects.length > 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-600">Montant engagé</span>
                <div className="text-2xl font-serif-editorial font-bold text-amber-900 mt-2">
                  {formatCFA(budgetStats.engaged)}
                </div>
                <div className="text-xs text-amber-800 mt-1 flex items-center gap-1 font-sans">
                  <span>{formatPercent(budgetStats.engaged, budgetStats.total)} % du budget</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-800">Budget restant</span>
                <div className="text-2xl font-serif-editorial font-bold text-[#059669] mt-2">
                  {formatCFA(budgetStats.available)}
                </div>
                <div className="text-xs text-emerald-800 mt-1 flex items-center gap-1 font-sans">
                  <span>{formatPercent(budgetStats.available, budgetStats.total)} % disponible</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

              {/* Colonne gauche */}
              <div className="lg:col-span-8 space-y-6">

                {/* Cartes projets */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-serif-editorial font-bold text-stone-900">Mes projets en cours</h2>
                    <span className="text-xs font-mono text-stone-500">
                      {projects.length} projet{projects.length > 1 ? 's' : ''} suivi{projects.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.map((project) => {
                      const isSelected = project.id === selectedProject.id;
                      const isAdvanced = project.progress >= 60;

                      return (
                        <div
                          key={project.id}
                          onClick={() => setSelectedProjectId(project.id)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-white border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                              : 'bg-white/80 border-stone-200/90 hover:bg-white shadow-2xs'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-mono font-semibold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                                {project.category ?? 'Projet'}
                              </span>
                              <span
                                className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                                  isAdvanced
                                    ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                                    : 'text-amber-800 bg-amber-50 border-amber-200'
                                }`}
                              >
                                {project.progress} %
                              </span>
                            </div>

                            <h3 className="font-serif-editorial font-bold text-stone-900 text-base">
                              {project.title}
                            </h3>
                            <p className="text-xs text-stone-500 mt-0.5 font-sans">{project.location}</p>

                            <div className="mt-3">
                              <div className="flex justify-between text-[11px] text-stone-500 mb-1 font-sans">
                                <span>Statut :</span>
                                <span className="font-medium text-stone-800">{project.status}</span>
                              </div>
                              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${isAdvanced ? 'bg-[#059669]' : 'bg-amber-600'}`}
                                  style={{ width: `${Math.min(100, Math.max(0, project.progress))}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-600 flex items-center justify-between font-sans">
                            <span className="truncate pr-2">Prochaine étape : {project.nextStep}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Détails du projet sélectionné */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">

                  <div className="flex items-center space-x-2 border-b border-stone-200 pb-3 overflow-x-auto">
                    {([
                      ['overview', 'Vue d’ensemble'],
                      ['timeline', 'Timeline d’exécution'],
                      ['documents', `Documents vérifiés (${selectedProject.documents?.length ?? 0})`],
                      ['budget', 'Budget et dépenses']
                    ] as const).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                          activeTab === key
                            ? 'bg-stone-900 text-white'
                            : 'text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Vue d'ensemble */}
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
                          <div className="text-lg font-serif-editorial font-bold text-[#059669] mt-1">
                            {selectedProject.documents?.length ?? 0} pièces
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
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

                      {(selectedProject.timeline?.length ?? 0) === 0 ? (
                        <p className="text-xs text-stone-500 font-sans">Aucun jalon n’a encore été défini pour ce projet.</p>
                      ) : (
                        <div className="relative pl-6 space-y-6 border-l-2 border-stone-200 ml-2 font-sans">
                          {selectedProject.timeline.map((step, idx) => (
                            <div key={idx} className="relative">
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
                      )}
                    </div>
                  )}

                  {/* Documents */}
                  {activeTab === 'documents' && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div>
                        <h3 className="text-xl font-serif-editorial font-bold text-stone-900">
                          Coffre-fort Documents & Actes
                        </h3>
                        <p className="text-xs text-stone-600 font-sans">
                          Documents légaux, promesses, factures et rapports d’inspection certifiés.
                        </p>
                      </div>

                      {(selectedProject.documents?.length ?? 0) === 0 ? (
                        <p className="text-xs text-stone-500 font-sans">Aucun document n’a encore été ajouté à ce projet.</p>
                      ) : (
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

                              <button
                                onClick={() => handleSimulateDownload(doc.name)}
                                className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition cursor-pointer"
                                title="Télécharger"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Budget */}
                  {activeTab === 'budget' && (
                    <div className="space-y-4 animate-in fade-in duration-150">
                      <div>
                        <h3 className="text-xl font-serif-editorial font-bold text-stone-900">
                          Suivi Financier du Projet
                        </h3>
                        <p className="text-xs text-stone-600 font-sans">
                          Suivi des dépenses documentées et des justificatifs associés. Elikia ne conserve pas les fonds des clients.
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

              {/* Colonne droite */}
              <div className="lg:col-span-4 space-y-6">

                {/* Conseiller */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                      Votre conseiller dédié
                    </span>
                    {advisor?.office && (
                      <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {advisor.office}
                      </span>
                    )}
                  </div>

                  {advisor ? (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {advisor.avatar ? (
                            <img
                              src={advisor.avatar}
                              alt={advisor.name}
                              className="w-16 h-16 rounded-xl object-cover border border-stone-200"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-stone-900 text-emerald-300 flex items-center justify-center text-lg font-serif-editorial font-bold border border-stone-200">
                              {advisor.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                            </div>
                          )}
                          <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0" />
                        </div>
                        <div>
                          <h3 className="font-serif-editorial font-bold text-stone-900 text-base">{advisor.name}</h3>
                          <p className="text-xs text-stone-500 font-sans">{advisor.title}</p>
                        </div>
                      </div>

                      {advisor.specialties?.length > 0 && (
                        <div className="space-y-1.5 text-xs text-stone-600 bg-[#FAF9F5] p-3.5 rounded-xl border border-stone-200 font-sans">
                          <div className="font-serif-editorial font-bold text-stone-900">Spécialités :</div>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {advisor.specialties.map((sp, i) => (
                              <span key={i} className="bg-white text-stone-700 text-[10px] font-mono px-2 py-0.5 rounded border border-stone-200">
                                {sp}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-stone-600 font-sans bg-[#FAF9F5] p-3.5 rounded-xl border border-stone-200">
                      Un conseiller Elikia va vous être attribué prochainement. Vous pouvez déjà nous écrire ou planifier un appel.
                    </p>
                  )}

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

                {/* Jalons du projet sélectionné */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-stone-500">
                      Jalons du projet
                    </h3>
                    <span className="text-[10px] text-emerald-800 font-mono font-semibold bg-emerald-50 px-2 py-0.5 rounded truncate max-w-[50%]">
                      {selectedProject.title}
                    </span>
                  </div>

                  {(selectedProject.timeline?.length ?? 0) === 0 ? (
                    <p className="text-xs text-stone-500 font-sans">Aucun jalon défini.</p>
                  ) : (
                    <div className="space-y-2.5 text-xs font-sans">
                      {selectedProject.timeline.map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-1 border-b border-stone-100 last:border-0">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                              item.completed
                                ? 'bg-[#059669] text-white'
                                : item.current
                                  ? 'bg-amber-500 text-white animate-pulse'
                                  : 'bg-stone-200 text-stone-500'
                            }`}>
                              {item.completed ? '✓' : i + 1}
                            </div>
                            <span className={item.completed ? 'font-medium text-stone-900' : 'text-stone-500'}>
                              {item.step}
                            </span>
                          </div>
                          <span className="text-[10px] text-stone-400 font-mono">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};