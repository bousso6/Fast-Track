import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  Eye, 
  Users, 
  MapPin, 
  Star, 
  FileText, 
  TrendingUp, 
  Building2, 
  Award, 
  Sparkles, 
  HelpCircle,
  Calendar,
  Lock,
  ChevronRight,
  Plane,
  Briefcase,
  Rocket,
  Home,
  Car
} from 'lucide-react';
import { PageRoute, ServiceType } from '../types';
import { SERVICE_OPTIONS, OFFERS, TESTIMONIALS, PARTNER_CATEGORIES, DEFAULT_ADVISOR } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
  onOpenQuote: (offerId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAppointment,
  onOpenQuote
}) => {
  return (
    <div id="homepage-container" className="flex flex-col min-h-screen bg-[#FDFCFB] text-[#1A1A1A]">
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="relative overflow-hidden bg-[#111827] text-white pt-14 pb-20 lg:pt-24 lg:pb-28 border-b border-stone-800">
        {/* Editorial subtle pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Tag Indicator */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-stone-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-400 backdrop-blur-md">
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase">
                  <span>DIASPORA</span>
                  <span className="text-stone-500">⇄</span>
                  <span>SÉNÉGAL</span>
                  <span className="text-stone-500">⇄</span>
                  <span className="text-amber-400">ELIKIA</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-editorial font-bold tracking-tight text-white leading-[1.12]">
                Votre équipe de confiance <span className="italic font-normal text-emerald-300">au Sénégal.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl font-sans">
                Vous souhaitez revenir, entreprendre, investir ou acquérir un bien au Sénégal ? <strong className="text-white font-semibold">Elikia coordonne votre projet sur place</strong>, de la réflexion stratégique à l’exécution concrète.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  id="hero-cta-start"
                  onClick={() => onNavigate('demarrer')}
                  className="px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm sm:text-base shadow-xl shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group cursor-pointer active:scale-98"
                >
                  <span>Démarrer mon projet</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-cta-advisor"
                  onClick={onOpenAppointment}
                  className="px-6 py-3.5 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-medium text-sm sm:text-base transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Parler à un conseiller</span>
                </button>
              </div>

              {/* Sub-CTA Trust Promise */}
              <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-stone-400">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Un interlocuteur unique
                </span>
                <span className="text-stone-700">•</span>
                <span className="flex items-center gap-1.5 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Des partenaires vérifiés
                </span>
                <span className="text-stone-700">•</span>
                <span className="flex items-center gap-1.5 text-stone-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Un suivi transparent
                </span>
              </div>
            </div>

            {/* Right Card / Interactive Preview Mockup */}
            <div className="lg:col-span-5">
              <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-md relative">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-serif-editorial font-bold text-sm">
                      ED
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Espace Démo Diaspora</span>
                        <span className="text-[9px] uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Dakar Direct</span>
                      </div>
                      <div className="text-[11px] text-stone-400">Client : Mariama Diop (Paris ⇄ Dakar)</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('dashboard')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    Voir l'espace <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Live project sample widget 1 */}
                <div className="space-y-3">
                  <div className="bg-[#111827] rounded-2xl p-4 border border-stone-800">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-stone-200">Achat appartement — Mermoz Dakar</span>
                      <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/40">
                        65 %
                      </span>
                    </div>
                    <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-2">
                      <div className="bg-emerald-500 h-full w-[65%] rounded-full" />
                    </div>
                    <p className="text-[11px] text-stone-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      Prochaine étape : Validation du rapport notaire TF 4892
                    </p>
                  </div>

                  {/* Live project sample widget 2 */}
                  <div className="bg-[#111827] rounded-2xl p-4 border border-stone-800">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-stone-200">Création SAS AgriTech — Sénégal</span>
                      <span className="text-[11px] font-mono font-semibold text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800/40">
                        40 %
                      </span>
                    </div>
                    <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mb-2">
                      <div className="bg-amber-500 h-full w-[40%] rounded-full" />
                    </div>
                    <p className="text-[11px] text-stone-400 flex items-center gap-1.5">
                      <Building2 className="w-3 h-3 text-emerald-400" />
                      Dossier en traitement Greffe / APIX
                    </p>
                  </div>

                  {/* Advisor quick card */}
                  <div className="bg-gradient-to-r from-emerald-950/40 to-stone-900 rounded-2xl p-3.5 border border-emerald-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={DEFAULT_ADVISOR.avatar} 
                        alt="Advisor" 
                        className="w-10 h-10 rounded-full object-cover border border-emerald-400" 
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{DEFAULT_ADVISOR.name}</div>
                        <div className="text-[10px] text-emerald-300">Votre interlocutrice dédiée à Dakar</div>
                      </div>
                    </div>
                    <button 
                      onClick={onOpenAppointment}
                      className="px-3.5 py-1.5 bg-[#059669] hover:bg-[#047857] text-white rounded-full text-xs font-semibold transition cursor-pointer"
                    >
                      Échanger
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECTION « QUEL EST VOTRE PROJET ? » (6 Cartes) */}
      <section id="services-grid-section" className="py-16 lg:py-24 bg-[#F7F6F3] border-b border-[#E7E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-full">
              Catalogue d’accompagnement
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold text-stone-900 mt-4">
              Quel est votre projet <span className="italic font-normal text-emerald-800">au Sénégal ?</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3 font-sans">
              Que vous prépariez votre retour ou pilotiez des investissements depuis l’étranger, Elikia coordonne chaque étape sur le terrain.
            </p>
          </div>

          {/* 6 Grandes cartes interactives */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_OPTIONS.map((svc) => {
              const Icon = svc.icon === 'Plane' ? Plane
                : svc.icon === 'Briefcase' ? Briefcase
                : svc.icon === 'Rocket' ? Rocket
                : svc.icon === 'Home' ? Home
                : svc.icon === 'Car' ? Car
                : TrendingUp;

              return (
                <div
                  key={svc.id}
                  id={`service-card-${svc.id}`}
                  className="bg-white rounded-2xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-lg hover:border-emerald-600/50 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Icon & Subtitle Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-colors duration-200 border border-stone-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
                        {svc.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-serif-editorial font-bold text-stone-900 mb-2 group-hover:text-emerald-800 transition-colors">
                      {svc.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">
                      {svc.description}
                    </p>

                    {/* Highlights bullet list */}
                    <ul className="space-y-1.5 text-xs text-stone-600 mb-6">
                      {svc.highlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    id={`service-cta-${svc.id}`}
                    onClick={() => onNavigate(svc.route)}
                    className="w-full py-2.5 px-4 rounded-full bg-stone-900 group-hover:bg-[#059669] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer shadow-xs"
                  >
                    <span>{svc.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. SECTION « COMMENT ÇA MARCHE ? » (5 Étapes) */}
      <section id="how-it-works-section" className="py-16 lg:py-24 bg-[#FDFCFB] border-b border-[#E7E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Méthodologie & Rigueur
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold text-stone-900 mt-4">
              Une méthode claire en <span className="italic font-normal text-emerald-800">5 étapes</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3 font-sans">
              Un processus transparent et documenté pour faire passer votre projet de l'intention à la concrétisation sur le terrain.
            </p>
          </div>

          {/* 5 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                num: '01',
                title: 'Parlez-nous de votre projet',
                desc: 'Remplissez un diagnostic rapide en ligne pour nous partager vos objectifs, localisation et budget estimatif.'
              },
              {
                num: '02',
                title: 'Échangez avec votre conseiller',
                desc: 'Votre conseiller Elikia analyse vos besoins, affine votre budget et valide la faisabilité opérationnelle.'
              },
              {
                num: '03',
                title: 'Recevez votre plan d’action',
                desc: 'Nous vous remettons le calendrier prévisionnel, la liste des partenaires vérifiés et le budget détaillé.'
              },
              {
                num: '04',
                title: 'Coordination sur le terrain',
                desc: 'Notre équipe à Dakar pilote les démarches administratives, notaires, banques et visites physiques.'
              },
              {
                num: '05',
                title: 'Suivi transparent en continu',
                desc: 'Accédez à vos documents officiels, factures certifiées et jalons validés depuis votre espace en ligne.'
              }
            ].map((step) => (
              <div 
                key={step.num}
                className="bg-white rounded-2xl p-6 border border-stone-200/80 flex flex-col justify-between hover:border-emerald-600/40 hover:shadow-sm transition-all duration-150 relative shadow-2xs"
              >
                <div>
                  <div className="text-2xl font-serif-editorial font-bold text-emerald-800 mb-3">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 mb-2 leading-snug font-serif-editorial">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              id="how-it-works-start-diagnostic"
              onClick={() => onNavigate('demarrer')}
              className="px-8 py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-semibold rounded-full text-sm sm:text-base shadow-md shadow-emerald-900/10 inline-flex items-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Commencer mon diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. SECTION CONFIANCE (4 Piliers) */}
      <section id="trust-section" className="py-16 lg:py-24 bg-[#111827] text-white relative overflow-hidden border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-700/50">
              Le défi de la distance
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold text-white mt-4 leading-tight">
              Faire un projet à 5 000 km <span className="italic font-normal text-emerald-300">ne doit pas être un acte de foi.</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-300 mt-4 leading-relaxed font-sans">
              Le principal défi de nombreux membres de la diaspora n’est pas de trouver une idée. Le véritable défi est de savoir <strong className="text-white">à qui faire confiance</strong> pour auditer, coordonner et suivre les dépenses avec une rigueur absolue.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-stone-900/80 rounded-2xl p-6 border border-stone-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-serif-editorial">Partenaires vérifiés</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Nous sélectionnons et auditons rigoureusement les professionnels assermentés (notaires, experts, banquiers) avec lesquels nous travaillons.
              </p>
            </div>

            <div className="bg-stone-900/80 rounded-2xl p-6 border border-stone-800">
              <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 flex items-center justify-center mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-serif-editorial">Transparence totale</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Vous suivez chaque étape, les coûts réels, les factures certifiées et les actes légaux depuis votre espace client.
              </p>
            </div>

            <div className="bg-stone-900/80 rounded-2xl p-6 border border-stone-800">
              <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-serif-editorial">Interlocuteur unique</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Fini de relancer vous-même 10 intermédiaires différents. Votre conseiller dédié Elikia centralise toute l'exécution.
              </p>
            </div>

            <div className="bg-stone-900/80 rounded-2xl p-6 border border-stone-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-serif-editorial">Ancrage local</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Une équipe opérationnelle présente physiquement à Dakar, Thiès et Diamniadio pour inspecter et contrôler.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SECTION « NOS OFFRES » (3 Offres) */}
      <section id="pricing-offers-section" className="py-16 lg:py-24 bg-[#F7F6F3] border-b border-[#E7E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-full">
              Formules sur-mesure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold text-stone-900 mt-4">
              Des formules adaptées à votre <span className="italic font-normal text-emerald-800">niveau d'ambition</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3 font-sans">
              De l’audit ponctuel au mandat complet de Family Office opérationnel au Sénégal.
            </p>
          </div>

          {/* 3 Offer Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {OFFERS.map((offer) => (
              <div
                key={offer.id}
                id={`offer-card-${offer.id}`}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  offer.popular
                    ? 'bg-white border-2 border-emerald-600 shadow-xl lg:-translate-y-2'
                    : 'bg-white border border-stone-200/90 shadow-2xs hover:shadow-md'
                }`}
              >
                {offer.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#059669] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-1 rounded-full shadow-md">
                    {offer.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-serif-editorial font-bold text-stone-900">{offer.name}</h3>
                    {!offer.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                        {offer.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-500 mb-4 min-h-[32px]">
                    {offer.tagline}
                  </p>

                  <div className="border-y border-stone-100 py-4 mb-6">
                    <div className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
                      {offer.price}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5 font-sans">
                      {offer.priceDetail}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-xs font-bold text-stone-800 uppercase tracking-wider font-sans">Ce qui est inclus :</div>
                    {offer.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-stone-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  id={`offer-cta-${offer.id}`}
                  onClick={() => onOpenQuote(offer.id)}
                  className={`w-full py-3 px-4 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition duration-150 cursor-pointer ${
                    offer.popular
                      ? 'bg-[#059669] hover:bg-[#047857] text-white shadow-md'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  <span>{offer.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TÉMOIGNAGES CLIENTS DIASPORA */}
      <section id="testimonials-section" className="py-16 lg:py-24 bg-[#FDFCFB] border-b border-[#E7E5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Retours d’expérience
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold text-stone-900 mt-4">
              Ils ont concrétisé leur projet <span className="italic font-normal text-emerald-800">avec Elikia</span>
            </h2>
            <p className="text-xs text-stone-500 mt-2 font-serif-editorial italic">
              *Témoignages recueillis auprès de nos clients et membres de la diaspora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id}
                className="bg-white rounded-2xl p-7 border border-stone-200/90 flex flex-col justify-between relative shadow-2xs"
              >
                <div>
                  <div className="flex items-center space-x-1 text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif-editorial italic mb-6">
                    « {t.quote} »
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                  <img 
                    src={t.avatar} 
                    alt={t.author} 
                    className="w-10 h-10 rounded-full object-cover border border-stone-200" 
                  />
                  <div>
                    <div className="text-sm font-bold text-stone-900">{t.author}</div>
                    <div className="text-xs text-stone-500">{t.location}</div>
                    <div className="text-[11px] font-medium text-emerald-800 mt-0.5">{t.project}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. SECTION PARTENAIRES RÉSEAU */}
      <section id="partners-preview-section" className="py-16 bg-[#111827] text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 font-mono">
                Écosystème institutionnel & technique
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-white mt-2">
                Un réseau d'experts certifiés pour sécuriser chaque projet.
              </h2>
            </div>
            <button
              onClick={() => onNavigate('partenaires')}
              className="mt-4 md:mt-0 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Découvrir l'ensemble du réseau</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              { title: 'Notaires & Avocats', desc: '14 offices agréés' },
              { title: 'Banques & Assurances', desc: '9 institutions' },
              { title: 'Promoteurs & Agences', desc: '22 partenaires' },
              { title: 'Architectes & BTP', desc: '18 bureaux d\'études' },
              { title: 'Transit & Véhicules', desc: '11 spécialistes' },
              { title: 'Cabinets RH & Écoles', desc: '16 structures' }
            ].map((p, idx) => (
              <div key={idx} className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 text-center">
                <div className="text-xs font-bold text-white mb-1 font-serif-editorial">{p.title}</div>
                <div className="text-[11px] text-emerald-400 font-mono">{p.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. SECTION FINALE CTA */}
      <section id="final-cta-section" className="py-16 lg:py-24 bg-gradient-to-br from-emerald-950 via-stone-900 to-[#111827] text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-xs text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Votre premier pas vers le Sénégal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold tracking-tight text-white">
            Vous avez un projet au Sénégal ? <span className="italic font-normal text-emerald-300">Parlons-en.</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Partagez-nous votre situation. Nous vous aiderons à identifier les prochaines étapes concrètes, sécurisées et chiffrées.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="final-cta-start-btn"
              onClick={() => onNavigate('demarrer')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-stone-900 hover:bg-stone-100 font-bold text-sm sm:text-base shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Démarrer mon projet</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="final-cta-appointment-btn"
              onClick={onOpenAppointment}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-white font-semibold text-sm sm:text-base transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>

          <p className="text-xs text-stone-400 pt-2 font-mono">
            🔒 Diagnostic initial confidentiel & sans engagement.
          </p>

        </div>
      </section>

    </div>
  );
};

