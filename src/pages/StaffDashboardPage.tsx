import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownToLine,
  BriefcaseBusiness,
  ClipboardList,
  FileCheck2,
  FileText,
  Lock,
  Loader2,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
  Users,
  Wallet,
} from 'lucide-react';
import { PageRoute } from '../types';
import type { AuthUser } from '../lib/authApi';
import { getDashboardRoute } from '../lib/dashboardRouting';
import {
  downloadStaffBudgetReport,
  fetchStaffExpenses,
  fetchStaffDashboard,
  fetchStaffPartners,
} from '../lib/dashboardApi';
import type {
  StaffDashboardData,
  StaffExpense,
  StaffPartner,
  StaffProject,
} from '../lib/dashboardApi';
import type { ProjectRequest } from '../lib/dashboardApi';

export type StaffVariant = 'admin' | 'advisor' | 'finance';

interface StaffDashboardPageProps {
  variant: StaffVariant;
  user: AuthUser | null;
  onNavigate: (page: PageRoute) => void;
}

const CONFIG = {
  admin: {
    title: 'Dashboard Administrateur',
    subtitle: 'Gestion des utilisateurs, des projets et de la plateforme.',
    icon: ShieldCheck,
    metrics: [
      { label: 'Utilisateurs', icon: Users },
      { label: 'Projets actifs', icon: BriefcaseBusiness },
      { label: 'Demandes à traiter', icon: ClipboardList },
    ],
    sections: [
      { title: 'Utilisateurs', description: 'Comptes et accès de la plateforme.', icon: Users },
      { title: 'Projets', description: 'Vue globale des projets accompagnés.', icon: BriefcaseBusiness },
      { title: 'Demandes récentes', description: 'Nouvelles demandes à orienter.', icon: ClipboardList },
    ],
  },
  advisor: {
    title: 'Dashboard Conseiller',
    subtitle: 'Clients et projets affectés, tâches, documents, partenaires et budgets.',
    icon: Users,
    metrics: [
      { label: 'Mes clients', icon: Users },
      { label: 'Projets suivis', icon: BriefcaseBusiness },
      { label: 'Jalons à venir', icon: ClipboardList },
    ],
    sections: [
      { title: 'Mes clients', description: 'Les clients qui vous sont attribués.', icon: Users },
      { title: 'Projets suivis', description: 'L’avancement de vos dossiers.', icon: BriefcaseBusiness },
      { title: 'Tâches et jalons', description: 'Les prochaines actions à effectuer.', icon: ClipboardList },
    ],
  },
  finance: {
    title: 'Dashboard Finance',
    subtitle: 'Lecture des projets et suivi des budgets et dépenses documentés.',
    icon: Wallet,
    metrics: [
      { label: 'Projets suivis', icon: BriefcaseBusiness },
      { label: 'Budgets renseignés', icon: Wallet },
      { label: 'Montants payés', icon: FileCheck2 },
    ],
    sections: [
      { title: 'Projets', description: 'Projets actifs, en pause ou bloqués.', icon: BriefcaseBusiness },
      { title: 'Budgets', description: 'Montants prévus, engagés, payés et soldes documentés.', icon: Wallet },
      { title: 'Reporting financier', description: 'Export du suivi budgétaire des projets.', icon: ArrowDownToLine },
    ],
  },
} as const;

interface DashboardListItem {
  id: string;
  title: string;
  detail?: string;
  status?: string;
  progress?: number;
}

export const StaffDashboardPage: React.FC<StaffDashboardPageProps> = ({
  variant,
  user,
  onNavigate,
}) => {
  const { title, subtitle, icon: Icon } = CONFIG[variant];
  const displayName = user
    ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Mon espace'
    : 'Mon espace';
  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || 'E'
    : 'E';

  const dashboardForVariant: Record<StaffVariant, PageRoute> = {
    admin: 'admin-dashboard',
    advisor: 'advisor-dashboard',
    finance: 'finance-dashboard',
  };
  const hasAccess =
    Boolean(user) && getDashboardRoute(user?.role) === dashboardForVariant[variant];

  const [data, setData] = useState<StaffDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [partners, setPartners] = useState<StaffPartner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(false);
  const [partnersError, setPartnersError] = useState('');
  const [expenses, setExpenses] = useState<StaffExpense[]>([]);
  const [expensesLoading, setExpensesLoading] = useState(false);
  const [expensesError, setExpensesError] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState('');

  useEffect(() => {
    if (!hasAccess) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError('');

    fetchStaffDashboard(variant, controller.signal)
      .then(setData)
      .catch((loadError: Error) => {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Impossible de charger les données.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [hasAccess, variant, reloadKey]);

  useEffect(() => {
    if (variant !== 'advisor' || !hasAccess || !data) return;

    const controller = new AbortController();
    setPartnersLoading(true);
    setPartnersError('');
    fetchStaffPartners(data.projects ?? [], controller.signal)
      .then(setPartners)
      .catch((loadError: Error) => {
        if (loadError.name !== 'AbortError') {
          setPartnersError(loadError.message || 'Impossible de charger les partenaires.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setPartnersLoading(false);
      });

    return () => controller.abort();
  }, [data, hasAccess, reloadKey, variant]);

  useEffect(() => {
    if (variant !== 'finance' || !hasAccess || !data) return;

    const controller = new AbortController();
    setExpensesLoading(true);
    setExpensesError('');
    fetchStaffExpenses(data.projects ?? [], controller.signal)
      .then(setExpenses)
      .catch((loadError: Error) => {
        if (loadError.name !== 'AbortError') {
          setExpensesError(loadError.message || 'Impossible de charger les dépenses.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setExpensesLoading(false);
      });

    return () => controller.abort();
  }, [data, hasAccess, reloadKey, variant]);

  const handleBudgetReport = async () => {
    setReportLoading(true);
    setReportError('');
    try {
      await downloadStaffBudgetReport();
    } catch (downloadError) {
      setReportError(
        downloadError instanceof Error
          ? downloadError.message
          : 'Impossible de télécharger le rapport.'
      );
    } finally {
      setReportLoading(false);
    }
  };

  const metrics = useMemo(() => {
    const summary = data?.summary;
    if (variant === 'admin') {
      return [
        { label: 'Projets actifs', value: summary?.activeProjects ?? 0, icon: BriefcaseBusiness },
        { label: 'Nouvelles demandes', value: summary?.newLeads ?? 0, icon: ClipboardList },
        { label: 'Tâches en retard', value: summary?.overdueTasks ?? 0, icon: TriangleAlert },
      ];
    }

    if (variant === 'advisor') {
      const clients = new Set(
        (data?.projects ?? [])
          .map(
            (project) =>
              project.client?.id ?? project.client?._id ?? project.client?.email
          )
          .filter((clientId): clientId is string => Boolean(clientId))
      );
      const upcomingMilestones = (data?.projects ?? []).reduce(
        (total, project) =>
          total + (project.timeline ?? []).filter((item) => !item.completed).length,
        0
      );
      return [
        { label: 'Clients suivis', value: clients.size, icon: Users },
        { label: 'Projets suivis', value: data?.projects?.length ?? 0, icon: BriefcaseBusiness },
        { label: 'Jalons à venir', value: upcomingMilestones, icon: ClipboardList },
      ];
    }

    const totals = summary?.totalsByCurrency ?? [];
    return [
      { label: 'Projets suivis', value: summary?.activeProjects ?? 0, icon: BriefcaseBusiness },
      {
        label: 'Budgets renseignés',
        value: summary?.projectsWithBudget ?? 0,
        icon: Wallet,
      },
      {
        label: 'Montants payés',
        value: totals.map((item) => formatMoney(item.paidAmount, item.currency)).join(' · ') || '0 FCFA',
        icon: FileCheck2,
      },
    ];
  }, [data, variant]);

  const sections = useMemo(() => {
    if (!data) return [];
    if (variant === 'admin') {
      return [
        {
          id: 'staff-section-leads',
          title: 'Nouvelles demandes',
          description: 'Demandes reçues récemment.',
          icon: ClipboardList,
          entries: data.newLeads ?? [],
        },
        {
          id: 'staff-section-projects',
          title: 'Projets actifs',
          description: 'Projets actuellement accompagnés.',
          icon: BriefcaseBusiness,
          entries: data.activeProjects ?? [],
        },
        {
          id: 'staff-section-blocked',
          title: 'Projets bloqués',
          description: 'Projets nécessitant une attention particulière.',
          icon: TriangleAlert,
          entries: data.blockedProjects ?? [],
        },
      ];
    }
    if (variant === 'advisor') {
      const projects = data.projects ?? [];
      return [
        {
          id: 'staff-section-clients',
          title: 'Mes clients',
          description: 'Clients rattachés à vos projets affectés.',
          icon: Users,
          entries: Array.from(
            projects.reduce((clients, project) => {
              const client = project.client;
              const key = client?.id ?? client?._id ?? client?.email;
              if (!key || !client) return clients;

              const existing = clients.get(key);
              if (existing) {
                existing.projectCount += 1;
              } else {
                clients.set(key, {
                  id: key,
                  title: `${client.firstName ?? ''} ${client.lastName ?? ''}`.trim() || 'Client',
                  detail: client.email,
                  projectCount: 1,
                });
              }
              return clients;
            }, new Map<string, DashboardListItem & { projectCount: number }>())
              .values()
          ).map((client) => ({
            ...client,
            detail: `${client.detail ?? ''}${client.detail ? ' · ' : ''}${client.projectCount} projet(s)`,
          })),
        },
        {
          id: 'staff-section-projects',
          title: 'Mes projets',
          description: 'Projets affectés à votre portefeuille.',
          icon: BriefcaseBusiness,
          entries: projects.map((project) => ({
            id: project.id ?? project._id ?? project.title ?? 'project',
            title: project.title ?? project.projectTitle ?? 'Projet sans titre',
            detail: `${project.client?.firstName ?? ''} ${project.client?.lastName ?? ''}${project.status ? ` · ${project.status}` : ''}`.trim(),
            status: project.status,
            progress:
              typeof project.progress === 'number'
                ? project.progress
                : project.progress?.value,
          })),
        },
        {
          id: 'staff-section-tasks',
          title: 'Tâches et jalons',
          description: 'Prochaines étapes de vos projets.',
          icon: ClipboardList,
          entries: projects.flatMap((project) =>
            (project.timeline ?? []).map((task, index) => ({
              id: `${project.id ?? project._id ?? 'project'}-task-${index}`,
              title: task.step,
              detail: `${project.title ?? project.projectTitle ?? 'Projet'}${task.date ? ` · ${task.date}` : ''}`,
              status: task.completed ? 'Terminé' : task.current ? 'En cours' : 'À venir',
            }))
          ),
        },
        {
          id: 'staff-section-documents',
          title: 'Documents validés',
          description: 'Pièces et livrables validés des projets affectés.',
          icon: FileText,
          entries: projects.flatMap((project) =>
            (project.documents ?? []).map((document) => ({
              id: document.id,
              title: document.name,
              detail: `${project.title ?? project.projectTitle ?? 'Projet'} · ${document.category} · ${document.date}`,
            }))
          ),
        },
        {
          id: 'staff-section-budgets',
          title: 'Budgets des projets',
          description: 'Budget, montant engagé et solde disponible.',
          icon: Wallet,
          entries: projects.map((project) => ({
            id: project.id ?? project._id ?? project.title ?? 'project-budget',
            title: project.title ?? project.projectTitle ?? 'Projet sans titre',
            detail: `Budget : ${formatMoney(project.budget?.total ?? 0)} · Engagé : ${formatMoney(project.budget?.engaged ?? 0)} · Disponible : ${formatMoney(project.budget?.available ?? 0)}`,
          })),
        },
        {
          id: 'staff-section-partners',
          title: 'Partenaires des projets',
          description: 'Intervenants affectés aux projets de votre portefeuille.',
          icon: Users,
          entries: partners.map((partner) => ({
            id: partner.id ?? `${partner.projectTitle}-${partner.role}`,
            title: partner.partner.name ?? partner.partner.category ?? 'Partenaire',
            detail: `${partner.projectTitle} · ${partner.role} · ${partner.status}`,
          })),
        },
      ];
    }
    const projects = data.projects ?? [];
    return [
      {
        id: 'staff-section-projects',
        title: 'Projets',
        description: 'Vue des projets actifs, en pause ou bloqués.',
        icon: BriefcaseBusiness,
        entries: projects.map((project) => ({
          id: project.id ?? project._id ?? project.title ?? 'project',
          title: project.title ?? 'Projet sans titre',
          detail: project.status,
          status: project.status,
        })),
      },
      {
        id: 'staff-section-budgets',
        title: 'Suivi budgétaire des projets',
        description: 'Budgets, dépenses engagées et soldes.',
        icon: Wallet,
        entries: projects.map((project) => ({
          id: project.id ?? project._id ?? project.title ?? 'project-budget',
          title: project.title ?? 'Projet sans titre',
          detail: `Référence : ${formatMoney(project.budget?.referenceAmount ?? 0, project.budget?.currency)} · Prévu : ${formatMoney(project.budget?.plannedAmount ?? 0, project.budget?.currency)} · Engagé : ${formatMoney(project.budget?.committedAmount ?? 0, project.budget?.currency)} · Payé : ${formatMoney(project.budget?.paidAmount ?? 0, project.budget?.currency)} · Solde : ${formatMoney(project.budget?.balance ?? 0, project.budget?.currency)}`,
          status: project.budget?.hasBudget ? 'Budget défini' : 'Budget à définir',
        })),
      },
      {
        id: 'staff-section-reports',
        title: 'Reporting financier',
        description: 'Exporter le suivi des budgets pour les projets actifs.',
        icon: ArrowDownToLine,
        entries: [],
      },
      {
        id: 'staff-section-expenses',
        title: 'Dépenses documentées',
        description: 'Postes, fournisseurs, montants et statuts enregistrés.',
        icon: FileCheck2,
        entries: expenses.map((expense) => ({
          id: expense.id ?? expense._id ?? `${expense.projectTitle}-${expense.item}`,
          title: expense.item,
          detail: `${expense.projectTitle}${expense.supplier ? ` · ${expense.supplier}` : ''} · ${formatMoney(expense.amount)}${expense.date ? ` · ${new Date(expense.date).toLocaleDateString('fr-FR')}` : ''}`,
          status: expense.status,
        })),
      },
    ];
  }, [data, expenses, partners, variant]);

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 border border-stone-200/90 shadow-sm text-center max-w-md font-sans">
          <Lock className="w-8 h-8 text-stone-400 mx-auto mb-3" />
          <h1 className="text-xl font-serif-editorial font-bold text-stone-900">
            Accès non autorisé
          </h1>
          <p className="text-sm text-stone-600 mt-2">
            Vous n'avez pas les droits pour consulter cette page.
          </p>
          <button
            onClick={() => onNavigate(user ? 'dashboard' : 'login')}
            className="mt-5 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-semibold cursor-pointer"
          >
            {user ? 'Retour à mon espace' : 'Se connecter'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-[#FDFCFB] min-h-screen text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm mb-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center">
            <Icon className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5 font-sans">
              Bonjour {displayName}. {subtitle}
            </p>
          </div>
          <div className="hidden sm:flex w-12 h-12 rounded-xl bg-stone-900 text-emerald-300 items-center justify-center text-base font-serif-editorial font-bold">
            {initials}
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 font-sans flex items-center justify-between gap-4">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              className="inline-flex items-center gap-2 font-semibold hover:underline"
            >
              <RefreshCw className="w-4 h-4" />
              Réessayer
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {metrics.map(({ label, value, icon: MetricIcon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs flex items-start gap-4"
            >
              <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <MetricIcon className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                  {label}
                </span>
                <div className="text-2xl font-serif-editorial font-bold text-stone-900 mt-1">
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
                  ) : (
                    value
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {variant === 'finance' && (
          <p className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs leading-relaxed text-blue-900">
            Ce tableau suit les dépenses documentées. Elikia ne conserve ni ne manipule les fonds des clients.
          </p>
        )}

        <div className={`grid grid-cols-1 ${sections.length > 1 ? 'lg:grid-cols-2' : ''} gap-5`}>
          {sections.map(({ id, title: sectionTitle, description, icon: SectionIcon, entries }) => (
            <section
              key={id ?? sectionTitle}
              id={id}
              className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm min-h-52"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center">
                  <SectionIcon className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-stone-900">{sectionTitle}</h2>
                  <p className="text-xs text-stone-500 mt-0.5">{description}</p>
                </div>
              </div>
              <div className="mt-5 border-t border-stone-100 pt-3 space-y-3">
                {loading ? (
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Chargement…
                  </div>
                ) : entries.length ? (
                  entries.slice(0, 6).map((entry, index) => (
                    <DashboardEntry
                      key={
                        ('id' in entry ? entry.id : undefined) ??
                        ('_id' in entry ? entry._id : undefined) ??
                        `${sectionTitle}-${index}`
                      }
                      entry={entry}
                      variant={variant}
                    />
                  ))
                ) : sectionTitle === 'Partenaires des projets' && partnersLoading ? (
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Chargement des affectations…
                  </div>
                ) : sectionTitle === 'Partenaires des projets' && partnersError ? (
                  <div className="flex items-center justify-between gap-3 text-xs text-red-700">
                    <span>{partnersError}</span>
                    <button
                      type="button"
                      onClick={() => setReloadKey((key) => key + 1)}
                      className="shrink-0 font-semibold hover:underline"
                    >
                      Réessayer
                    </button>
                  </div>
                ) : sectionTitle === 'Dépenses documentées' && expensesLoading ? (
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Chargement des dépenses…
                  </div>
                ) : sectionTitle === 'Dépenses documentées' && expensesError ? (
                  <div className="flex items-center justify-between gap-3 text-xs text-red-700">
                    <span>{expensesError}</span>
                    <button
                      type="button"
                      onClick={() => setReloadKey((key) => key + 1)}
                      className="shrink-0 font-semibold hover:underline"
                    >
                      Réessayer
                    </button>
                  </div>
                ) : sectionTitle === 'Reporting financier' ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => void handleBudgetReport()}
                      disabled={reportLoading}
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
                    >
                      {reportLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowDownToLine className="h-4 w-4" />
                      )}
                      Télécharger le rapport CSV
                    </button>
                    {reportError && (
                      <p role="alert" className="mt-2 text-xs text-red-700">
                        {reportError}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-stone-500">Aucune donnée pour le moment.</p>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

const formatMoney = (amount: number, currency = 'XOF') =>
  `${new Intl.NumberFormat('fr-FR').format(amount)} ${currency === 'XOF' ? 'FCFA' : currency}`;

const DashboardEntry: React.FC<{
  entry: StaffProject | ProjectRequest | DashboardListItem;
  variant: StaffVariant;
}> = ({ entry, variant }) => {
  const title =
    ('title' in entry ? entry.title : undefined) ??
    ('projectTitle' in entry ? entry.projectTitle : undefined) ??
    ('project' in entry && typeof entry.project === 'object'
      ? entry.project?.title
      : undefined) ??
    'Élément sans titre';
  const client = 'client' in entry ? entry.client : undefined;
  const clientName = client
    ? `${client.firstName ?? ''} ${client.lastName ?? ''}`.trim()
    : '';
  const progressValue = 'progress' in entry ? entry.progress : undefined;
  const progress =
    typeof progressValue === 'number' ? progressValue : progressValue?.value;
  const budget = 'budget' in entry ? entry.budget : undefined;
  const detail =
    ('detail' in entry ? entry.detail : undefined) ??
    (budget
    ? `Engagé : ${formatMoney(budget.committedAmount ?? 0, budget.currency)} · Solde : ${formatMoney(budget.balance ?? 0, budget.currency)}`
    : clientName ||
      ('status' in entry ? entry.status : undefined) ||
      ('nextStep' in entry ? entry.nextStep : undefined));
  const status = 'status' in entry ? entry.status : undefined;

  return (
    <div className="flex items-start justify-between gap-3 text-xs">
      <div className="min-w-0">
        <p className="font-semibold text-stone-800 truncate">{title}</p>
        {detail && <p className="mt-0.5 break-words leading-5 text-stone-500">{detail}</p>}
      </div>
      {typeof progress === 'number' && (
        <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-emerald-800">
          {progress} %
        </span>
      )}
      {!progress && status && variant === 'finance' && (
        <span className="shrink-0 text-stone-500">{status}</span>
      )}
    </div>
  );
};