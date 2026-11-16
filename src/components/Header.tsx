import React, { useState } from 'react';
import { 
  Globe, 
  Menu, 
  X, 
  User, 
  ArrowRight, 
  ChevronDown, 
  ShieldCheck, 
  PhoneCall, 
  Home, 
  Briefcase, 
  Rocket, 
  Car, 
  TrendingUp, 
  Plane,
  LayoutDashboard,
  LogOut,
  ClipboardList,
  FileCheck2,
  FileText,
  Wallet,
  Users,
} from 'lucide-react';
import { PageRoute } from '../types';
import type { AuthUser } from '../lib/authApi';
import { getDashboardRoute } from '../lib/dashboardRouting';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  isLoggedIn: boolean;
  user: AuthUser | null;
  onOpenAppointment: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  isLoggedIn,
  user,
  onOpenAppointment,
  onOpenAuth,
  onLogout
}) => {
  const userInitials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || 'E'
    : 'E';
  const userFirstName = user?.firstName || 'Mon compte';
  const userFullName = user
    ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Mon compte'
    : 'Mon compte';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeStaffSection, setActiveStaffSection] = useState('staff-section-overview');

  const navItems = [
    { label: 'Accueil', route: 'home' as PageRoute },
    { 
      label: 'Nos Services', 
      isDropdown: true,
      children: [
        { label: 'Retour au Sénégal', route: 'retour' as PageRoute, icon: Plane, desc: 'Logement, écoles & démarches' },
        { label: 'Emploi & Carrière', route: 'emploi' as PageRoute, icon: Briefcase, desc: 'Recrutement & opportunités' },
        { label: 'Entreprendre', route: 'entreprendre' as PageRoute, icon: Rocket, desc: 'Création, statuts & structuration' },
        { label: 'Immobilier & Foncier', route: 'immobilier' as PageRoute, icon: Home, desc: 'Achat, audit notaire & chantier' },
        { label: 'Véhicules', route: 'vehicules' as PageRoute, icon: Car, desc: 'Inspection, achat & douanes' },
        { label: 'Investir', route: 'investir' as PageRoute, icon: TrendingUp, desc: 'PME, agrobusiness & rentabilité' },
      ]
    },
    { label: 'Comment ça marche ?', route: 'comment-ca-marche' as PageRoute },
    { label: 'Partenaires', route: 'partenaires' as PageRoute },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const isServiceActive = ['retour', 'emploi', 'entreprendre', 'immobilier', 'vehicules', 'investir'].includes(currentPage);
  const staffRoute = user ? getDashboardRoute(user.role) : null;
  const staffNavItems =
    staffRoute === 'advisor-dashboard'
      ? [
          { label: 'Vue d’ensemble', icon: LayoutDashboard },
          { label: 'Mes clients', icon: Users, section: 'staff-section-clients' },
          { label: 'Mes projets', icon: Briefcase, section: 'staff-section-projects' },
          { label: 'Tâches et jalons', icon: ClipboardList, section: 'staff-section-tasks' },
          { label: 'Documents', icon: FileText, section: 'staff-section-documents' },
          { label: 'Budgets', icon: Wallet, section: 'staff-section-budgets' },
          { label: 'Partenaires', icon: Users, section: 'staff-section-partners' },
        ]
      : staffRoute === 'finance-dashboard'
        ? [
            { label: 'Vue d’ensemble', icon: LayoutDashboard },
            { label: 'Projets', icon: Briefcase, section: 'staff-section-projects' },
            { label: 'Budgets', icon: Wallet, section: 'staff-section-budgets' },
            { label: 'Dépenses', icon: FileCheck2, section: 'staff-section-expenses' },
            { label: 'Reporting', icon: ArrowRight, section: 'staff-section-reports' },
          ]
        : staffRoute === 'admin-dashboard'
          ? [
              { label: 'Vue d’ensemble', icon: LayoutDashboard },
              { label: 'Demandes', icon: ClipboardList, section: 'staff-section-leads' },
              { label: 'Projets', icon: Briefcase, section: 'staff-section-projects' },
              { label: 'Projets bloqués', icon: ShieldCheck, section: 'staff-section-blocked' },
            ]
          : null;

  if (isLoggedIn && staffNavItems && staffRoute) {
    const handleStaffNav = (section?: string) => {
      setActiveStaffSection(section ?? 'staff-section-overview');
      if (currentPage !== staffRoute) {
        onNavigate(staffRoute);
      }
      setMobileMenuOpen(false);

      const scrollToSection = () => {
        if (section) {
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };

      if (currentPage !== staffRoute) {
        window.setTimeout(scrollToSection, 100);
      } else {
        scrollToSection();
      }
    };

    return (
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => handleStaffNav()}
            className="flex shrink-0 items-center gap-3 text-left"
            aria-label="Retour au tableau de bord"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] font-serif-editorial text-xl font-bold text-emerald-400">
              E
            </span>
            <span>
              <span className="block font-serif-editorial text-lg font-bold text-stone-900">
                ELIKIA<span className="text-emerald-600">.</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                {staffRoute === 'advisor-dashboard'
                  ? 'Espace conseiller'
                  : staffRoute === 'finance-dashboard'
                    ? 'Espace finance'
                    : 'Administration'}
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation du personnel">
            {staffNavItems.map(({ label, icon: NavIcon, section }) => (
              <button
                type="button"
                key={label}
                onClick={() => handleStaffNav(section)}
                aria-current={
                  activeStaffSection === (section ?? 'staff-section-overview')
                    ? 'location'
                    : undefined
                }
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
                  activeStaffSection === (section ?? 'staff-section-overview')
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-stone-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <NavIcon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <span className="max-w-32 truncate text-sm font-medium text-stone-700">{userFirstName}</span>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-3 py-2 text-sm text-stone-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              aria-label="Se déconnecter"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-stone-700 hover:bg-stone-100 lg:hidden"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="border-t border-stone-100 px-4 py-3 lg:hidden" aria-label="Navigation du personnel">
            <div className="mx-auto max-w-7xl space-y-1">
              {staffNavItems.map(({ label, icon: NavIcon, section }) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => handleStaffNav(section)}
                  aria-current={
                    activeStaffSection === (section ?? 'staff-section-overview')
                      ? 'location'
                      : undefined
                  }
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                    activeStaffSection === section
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-stone-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <NavIcon className="h-4 w-4" />
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Se déconnecter
              </button>
            </div>
          </nav>
        )}
      </header>
    );
  }

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-[#E7E5E0] transition-all duration-200">
      {/* Top Banner: Trust bar */}
      <div className="bg-[#111827] text-stone-300 text-xs py-2 px-4 hidden md:block border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-emerald-400 font-medium tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              Guichet unique & Tiers de confiance au Sénégal
            </span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-400 font-sans">Dakar • Thiès • Saly • Diaspora Monde</span>
          </div>
          <div className="flex items-center space-x-6 text-stone-300">
            <button 
              id="top-advisor-call-btn"
              onClick={onOpenAppointment} 
              className="hover:text-emerald-300 transition-colors flex items-center cursor-pointer text-xs font-medium"
            >
              <PhoneCall className="w-3 h-3 mr-1.5 text-emerald-400" />
              Parler à un conseiller Elikia
            </button>
            <span className="text-stone-700">|</span>
            <div className="flex items-center space-x-2 font-medium tracking-wide text-xs text-stone-300">
              <span title="Diaspora">DIASPORA</span>
              <span className="text-emerald-400">⇄</span>
              <span title="Sénégal">SÉNÉGAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#111827] border border-stone-700/60 flex items-center justify-center text-white font-serif-editorial text-xl font-bold shadow-xs group-hover:border-emerald-600 transition-colors">
              <span className="text-emerald-400">E</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-serif-editorial font-bold tracking-tight text-stone-900">
                  ELIKIA<span className="text-emerald-600">.</span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase bg-stone-100 text-stone-800 px-1.5 py-0.5 rounded border border-stone-200">
                  DIASPORA
                </span>
              </div>
              <span className="text-[11px] font-medium text-stone-500 tracking-tight">Votre équipe de confiance au Sénégal</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              id="nav-home-btn"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                currentPage === 'home' 
                  ? 'text-emerald-800 bg-emerald-50/80 font-semibold border border-emerald-200/60' 
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/70'
              }`}
            >
              Accueil
            </button>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                id="nav-services-dropdown-btn"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
                  isServiceActive
                    ? 'text-emerald-800 bg-emerald-50/80 font-semibold border border-emerald-200/60'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/70'
                }`}
              >
                <span>Nos Projets & Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown Menu */}
              {servicesDropdownOpen && (
                <div 
                  id="services-dropdown-menu"
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute top-full left-0 w-[540px] bg-[#FDFCFB] rounded-2xl shadow-xl border border-stone-200/90 p-4 grid grid-cols-2 gap-2.5 mt-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div 
                    id="dropdown-item-retour"
                    onClick={() => handleNavClick('retour')}
                    className="p-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-emerald-500/40 transition-all cursor-pointer flex gap-3 items-start group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">Retour au Sénégal</div>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">Logement, écoles & démarches</p>
                    </div>
                  </div>

                  <div 
                    id="dropdown-item-emploi"
                    onClick={() => handleNavClick('emploi')}
                    className="p-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-emerald-500/40 transition-all cursor-pointer flex gap-3 items-start group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">Emploi & Carrière</div>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">Recrutement & opportunités cadres</p>
                    </div>
                  </div>

                  <div 
                    id="dropdown-item-entreprendre"
                    onClick={() => handleNavClick('entreprendre')}
                    className="p-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-emerald-500/40 transition-all cursor-pointer flex gap-3 items-start group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">Entrepreneuriat</div>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">Création SAS/SARL & structuration</p>
                    </div>
                  </div>

                  <div 
                    id="dropdown-item-immobilier"
                    onClick={() => handleNavClick('immobilier')}
                    className="p-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-emerald-500/40 transition-all cursor-pointer flex gap-3 items-start group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">Immobilier & Foncier</div>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">Audit notarié & suivi chantier</p>
                    </div>
                  </div>

                  <div 
                    id="dropdown-item-vehicules"
                    onClick={() => handleNavClick('vehicules')}
                    className="p-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-emerald-500/40 transition-all cursor-pointer flex gap-3 items-start group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">Véhicules & Mobilité</div>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">Inspection 200 pts & dédouanement</p>
                    </div>
                  </div>

                  <div 
                    id="dropdown-item-investir"
                    onClick={() => handleNavClick('investir')}
                    className="p-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-emerald-500/40 transition-all cursor-pointer flex gap-3 items-start group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">Investissement</div>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">PME, agrobusiness & rentabilité</p>
                    </div>
                  </div>

                  <div className="col-span-2 pt-2.5 mt-1 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                    <span className="text-emerald-800 font-medium">✨ Tous vos projets coordonnés sous un guichet unique</span>
                    <button 
                      onClick={() => handleNavClick('demarrer')}
                      className="font-semibold text-stone-900 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                    >
                      Diagnostic en ligne <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-how-it-works-btn"
              onClick={() => handleNavClick('comment-ca-marche')}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                currentPage === 'comment-ca-marche'
                  ? 'text-emerald-800 bg-emerald-50/80 font-semibold border border-emerald-200/60'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/70'
              }`}
            >
              Comment ça marche ?
            </button>

            <button
              id="nav-partners-btn"
              onClick={() => handleNavClick('partenaires')}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                currentPage === 'partenaires'
                  ? 'text-emerald-800 bg-emerald-50/80 font-semibold border border-emerald-200/60'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/70'
              }`}
            >
              Partenaires
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center space-x-3">
            {isLoggedIn && (
              <>
                <button
                  id="header-dashboard-btn"
                  onClick={() => handleNavClick('dashboard')}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 border transition-all ${
                    currentPage === 'dashboard'
                      ? 'bg-[#111827] text-white border-stone-900 shadow-xs'
                      : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  <span>Mon Espace Elikia</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </button>

                <div className="flex items-center gap-1.5 pl-2 border-l border-stone-200">
                  <span className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] font-bold">
                    {userInitials}
                  </span>
                  <span className="text-xs font-semibold text-stone-700 max-w-[110px] truncate">
                    {userFirstName}
                  </span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="p-1.5 rounded-full text-stone-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                    title="Se déconnecter"
                    aria-label="Se déconnecter"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {!isLoggedIn && (
              <button
                id="header-login-btn"
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-full text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 transition flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-stone-500" />
                <span>Se connecter</span>
              </button>
            )}

            <button
              id="header-cta-start-project"
              onClick={() => handleNavClick('demarrer')}
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[#059669] hover:bg-[#047857] text-white shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all duration-200 flex items-center gap-2 group cursor-pointer active:scale-98"
            >
              <span>Démarrer mon projet</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="header-cta-mobile-start"
              onClick={() => handleNavClick('demarrer')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#059669] text-white"
            >
              Démarrer
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Accueil</span>
            </button>

            <div className="py-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Nos Projets & Services</div>
              <div className="grid grid-cols-1 gap-1 pl-2">
                <button onClick={() => handleNavClick('retour')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800">
                  <Plane className="w-4 h-4 text-emerald-600" />
                  <span>Retour au Sénégal</span>
                </button>
                <button onClick={() => handleNavClick('emploi')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Emploi & Carrière</span>
                </button>
                <button onClick={() => handleNavClick('entreprendre')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800">
                  <Rocket className="w-4 h-4 text-amber-600" />
                  <span>Entrepreneuriat</span>
                </button>
                <button onClick={() => handleNavClick('immobilier')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800">
                  <Home className="w-4 h-4 text-indigo-600" />
                  <span>Immobilier & Foncier</span>
                </button>
                <button onClick={() => handleNavClick('vehicules')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800">
                  <Car className="w-4 h-4 text-teal-600" />
                  <span>Véhicules & Mobilité</span>
                </button>
                <button onClick={() => handleNavClick('investir')} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span>Investissement</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('comment-ca-marche')}
              className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
            >
              Comment ça marche ?
            </button>

            <button
              onClick={() => handleNavClick('partenaires')}
              className="w-full text-left px-3 py-2.5 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
            >
              Partenaires
            </button>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              {isLoggedIn && (
                <>
                  <div className="flex items-center gap-2.5 px-2 py-2">
                    <span className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center text-xs font-bold">
                      {userInitials}
                    </span>
                    <div className="text-left min-w-0">
                      <div className="text-sm font-semibold text-stone-900 truncate">{userFullName}</div>
                      <div className="text-[11px] text-stone-500 truncate">{user?.email}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-center flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                    <span>Accéder à Mon Espace Elikia</span>
                  </button>

                  <button
                    onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                    className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-red-600 font-semibold text-center hover:bg-red-50 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Se déconnecter</span>
                  </button>
                </>
              )}

              {!isLoggedIn && (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-slate-800 font-semibold text-center hover:bg-slate-50"
                >
                  Se connecter
                </button>
              )}

              <button
                onClick={() => handleNavClick('demarrer')}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-center shadow-md flex items-center justify-center gap-2"
              >
                <span>Démarrer mon projet</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAppointment(); }}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-600 hover:text-slate-900 text-center flex items-center justify-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                <span>Prendre rendez-vous avec un conseiller</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
