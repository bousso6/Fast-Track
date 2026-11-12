import React from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertOctagon, 
  PieChart, 
  Building2, 
  Sprout, 
  Briefcase, 
  Layers, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';
import { PageRoute } from '../types';

interface InvestirPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
}

export const InvestirPage: React.FC<InvestirPageProps> = ({
  onNavigate,
  onOpenAppointment
}) => {
  const assetClasses = [
    { title: 'Agrobusiness & Transformation', icon: Sprout, returnEst: '12% - 18%', desc: 'Cultures irriguées (vallée du fleuve, Niayes), aviculture moderne, unités de conditionnement et export mangues/fruits.' },
    { title: 'Immobilier Locatif & Rendement', icon: Building2, returnEst: '8% - 13%', desc: 'Appartements meublés courte durée (Almadies, Plateau) et résidences de standing à forte demande locative expat/diaspora.' },
    { title: 'PME & Startups en Croissance', icon: TrendingUp, returnEst: '15% - 25%', desc: 'Prise de participation minoritaire ou co-investissement dans des entreprises rentables validées par nos comités.' },
    { title: 'Actifs Productifs & Logistique', icon: Briefcase, returnEst: '10% - 16%', desc: 'Flottes de véhicules de transport, engins BTP en location ou entrepôts de stockage frigorifique.' }
  ];

  const processFlow = [
    { name: 'Analyse', desc: 'Sélection rigoureuse des projets et audit financier préliminaire.' },
    { name: 'Due Diligence', desc: 'Vérification sur site, conformité juridique, santé financière et antécédents.' },
    { name: 'Structuration', desc: 'Pacte d’actionnaires sécurisé, clauses de gouvernance et garanties réelles.' },
    { name: 'Investissement', desc: 'Déblocage des fonds sous séquestre au fur et à mesure des jalons opérationnels.' },
    { name: 'Reporting', desc: 'Tableaux de bord trimestriels, indicateurs de rentabilité et audits comptables.' },
    { name: 'Suivi Terrain', desc: 'Visites de contrôle inopinées par nos coordinateurs basés à Dakar.' }
  ];

  return (
    <div className="py-10 bg-[#FDFCFB] min-h-screen text-[#1A1A1A]">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-stone-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Pôle Investissement & Gestion d’Actifs</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold tracking-tight text-white leading-tight">
              Investissez au Sénégal avec une <span className="italic font-normal text-emerald-300">visibilité totale sur vos projets.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
              PME, agrobusiness, immobilier ou actifs productifs : bénéficiez d'une due diligence indépendante et d’un suivi continu pour préserver et faire croître votre capital.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('demarrer')}
                className="px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition cursor-pointer"
              >
                <span>Parler de mon projet d'investissement</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white font-medium text-sm sm:text-base border border-stone-700 flex items-center gap-2 transition cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Rendez-vous investisseur</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Regulatory Disclaimer Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-stone-900 border border-stone-800 text-stone-300 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
          <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h4 className="font-serif-editorial font-bold text-white">Avertissement réglementaire & Déontologie</h4>
            <p className="text-stone-300 leading-relaxed font-sans">
              Les opportunités présentées ne constituent pas automatiquement des recommandations financières ou des sollicitations d'épargne publique. Tout investissement en entreprise ou en actif réel comporte des risques de perte en capital. Elikia intervient en tant que tiers de coordination, d'audit technique et de gouvernance opérationnelle sur place.
            </p>
          </div>
        </div>
      </div>

      {/* Asset Classes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Opportunités suivies
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-stone-900 mt-3">
            Classes d’actifs & Véhicules d'investissement
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-sans">
            Des dossiers audités rigoureusement avant présentation pour un investissement éclairé.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {assetClasses.map((ac, idx) => {
            const Icon = ac.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-600/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center border border-stone-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Rendement : {ac.returnEst}
                    </span>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-stone-900 text-base mb-2">{ac.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{ac.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6 Step Investment Flow */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm">
          <h2 className="text-2xl font-serif-editorial font-bold text-stone-900 mb-8 text-center">
            Notre cycle de sécurisation des investissements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {processFlow.map((pf, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#F8F7F4] border border-stone-200/80">
                <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  Étape 0{idx + 1}
                </div>
                <div className="font-serif-editorial font-bold text-stone-900 text-base mb-1">{pf.name}</div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">{pf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

