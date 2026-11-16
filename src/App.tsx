import React, { useEffect, useState } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RetourPage } from './pages/RetourPage';
import { EmploiPage } from './pages/EmploiPage';
import { EntreprendrePage } from './pages/EntreprendrePage';
import { ImmobilierPage } from './pages/ImmobilierPage';
import { VehiculesPage } from './pages/VehiculesPage';
import { InvestirPage } from './pages/InvestirPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PartnersPage } from './pages/PartnersPage';
import { DashboardPage } from './pages/DashboardPage';
import { StaffDashboardPage } from './pages/StaffDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ProjectWizard } from './components/ProjectWizard';
import { AppointmentModal } from './components/AppointmentModal';
import { QuoteModal } from './components/QuoteModal';
import { AdvisorChatModal } from './components/AdvisorChatModal';
import {
  AUTH_SESSION_EXPIRED_EVENT,
  clearAuthSession,
  getAuthSession,
  getStoredUser,
  logout as logoutRequest,
} from './lib/authApi';
import { getDashboardRoute } from './lib/dashboardRouting';
import type { AuthUser } from './lib/authApi';
import { MessageSquare } from 'lucide-react';

const PAGE_PATHS: Partial<Record<PageRoute, string>> = {
  login: '/login',
  'verify-email': '/verify-email',
  'reset-password': '/reset-password',
  dashboard: '/dashboard',
  'admin-dashboard': '/admin/dashboard',
  'advisor-dashboard': '/advisor/dashboard',
  'finance-dashboard': '/finance/dashboard',
};

const pageFromPath = (role?: string | null): PageRoute => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/dashboard') return getDashboardRoute(role);

  const route = Object.entries(PAGE_PATHS).find(([, pathname]) => pathname === path);
  if (route) return route[0] as PageRoute;

  if (path === '/verify-email') return 'verify-email';
  if (path === '/reset-password') return 'reset-password';
  if (path === '/login') return 'login';

  return 'accueil';
};

export function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => getStoredUser());
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    pageFromPath(currentUser?.role)
  );
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAdvisorChatOpen, setIsAdvisorChatOpen] = useState(false);
  const [quoteOfferId, setQuoteOfferId] = useState<string | undefined>(undefined);
  const isLoggedIn = Boolean(currentUser);
  const isStaffArea = [
    'admin-dashboard',
    'advisor-dashboard',
    'finance-dashboard',
  ].includes(currentPage);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(pageFromPath(currentUser?.role));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentUser?.role]);

  useEffect(() => {
    const handleSessionExpired = () => {
      setCurrentUser(null);
      setCurrentPage('login');
      window.history.replaceState({}, '', '/login');
    };

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () =>
      window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, []);

  // Navigation + scroll to top
  // Header et Footer utilisent 'home' : on le redirige vers 'accueil'
  const handleNavigate = (page: PageRoute) => {
    let target: PageRoute = (page as string) === 'home' ? 'accueil' : page;

    if (target === 'dashboard' && currentUser?.role) {
      target = getDashboardRoute(currentUser.role);
    }

    setCurrentPage(target);

    const path = PAGE_PATHS[target] ?? '/';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    const session = getAuthSession();

    clearAuthSession();
    setCurrentUser(null);
    handleNavigate('login');

    if (session?.tokens.accessToken) {
      void logoutRequest(session.tokens.accessToken).catch(() => undefined);
    }
  };

  const handleOpenQuote = (offerId?: string) => {
    setQuoteOfferId(offerId);
    setIsQuoteOpen(true);
  };

  const openAppointment = () => setIsAppointmentOpen(true);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">

      {/* Global Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        user={currentUser}
        onOpenAppointment={openAppointment}
        onOpenAuth={() => handleNavigate('login')}
        onLogout={handleLogout}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'accueil' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAppointment={openAppointment}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentPage === 'retour' && (
          <RetourPage
            onNavigate={handleNavigate}
            onOpenAppointment={openAppointment}
          />
        )}

        {currentPage === 'emploi' && (
          <EmploiPage
            onNavigate={handleNavigate}
            onOpenAppointment={openAppointment}
          />
        )}

        {currentPage === 'entreprendre' && (
          <EntreprendrePage
            onNavigate={handleNavigate}
            onOpenAppointment={openAppointment}
          />
        )}

        {currentPage === 'immobilier' && (
          <ImmobilierPage
            onNavigate={handleNavigate}
            onOpenAppointment={openAppointment}
          />
        )}

        {currentPage === 'vehicules' && (
          <VehiculesPage
            onNavigate={handleNavigate}
            onOpenAppointment={openAppointment}
          />
        )}

        {currentPage === 'investir' && (
          <InvestirPage
            onNavigate={handleNavigate}
            onOpenAppointment={openAppointment}
          />
        )}

        {currentPage === 'comment-ca-marche' && (
          <HowItWorksPage
            onNavigate={handleNavigate}
            onOpenAppointment={openAppointment}
          />
        )}

        {currentPage === 'partenaires' && (
          <PartnersPage
            onNavigate={handleNavigate}
            onOpenAppointment={openAppointment}
          />
        )}

        {/* Dashboard client */}
        {currentPage === 'dashboard' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onOpenAdvisorChat={() => setIsAdvisorChatOpen(true)}
            onOpenAppointment={openAppointment}
            user={currentUser}
          />
        )}

        {/* Dashboards équipe : admin, conseiller, finance */}
        {currentPage === 'admin-dashboard' && (
          <StaffDashboardPage
            variant="admin"
            user={currentUser}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'advisor-dashboard' && (
          <StaffDashboardPage
            variant="advisor"
            user={currentUser}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'finance-dashboard' && (
          <StaffDashboardPage
            variant="finance"
            user={currentUser}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'demarrer' && (
          <div className="py-12 bg-slate-50 min-h-screen">
            <ProjectWizard
              onComplete={() => {
                // Le wizard affiche lui-même sa page de succès,
                // avec un bouton vers le dashboard : on ne redirige pas ici.
              }}
              onNavigate={handleNavigate}
              onOpenAppointment={openAppointment}
              user={currentUser}
            />
          </div>
        )}

        {currentPage === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
            onLoginSuccess={(user) => setCurrentUser(user)}
          />
        )}

        {currentPage === 'verify-email' && (
          <VerifyEmailPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'reset-password' && (
          <ResetPasswordPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Floating Action Button (Chat with Advisor) */}
      {!isStaffArea && <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => setIsAdvisorChatOpen(true)}
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 border-2 border-white ring-4 ring-emerald-500/20 group relative cursor-pointer"
          title="Discuter avec un conseiller à Dakar"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Conseiller en ligne à Dakar
          </span>
          <span className="w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full absolute top-0 right-0 animate-pulse" />
        </button>
      </div>}

      {/* Global Modals */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        user={currentUser}
      />

      <QuoteModal
        key={quoteOfferId ?? 'default'}
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultOfferId={quoteOfferId}
        user={currentUser}
      />

      <AdvisorChatModal
        isOpen={isAdvisorChatOpen}
        onClose={() => setIsAdvisorChatOpen(false)}
        onOpenAppointment={() => {
          setIsAdvisorChatOpen(false);
          setIsAppointmentOpen(true);
        }}
      />

      {/* Global Footer */}
      {!isStaffArea && (
        <Footer
          onNavigate={handleNavigate}
          onOpenAppointment={openAppointment}
        />
      )}
    </div>
  );
}

export default App;