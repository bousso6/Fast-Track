import React from 'react';
import { 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Award, 
  Building, 
  FileCheck, 
  PhoneCall, 
  Compass
} from 'lucide-react';
import { PageRoute } from '../types';

interface EmploiPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
}

export const EmploiPage: React.FC<EmploiPageProps> = ({ onNavigate, onOpenAppointment }) => {
  const sectors = [
    { name: 'Banque & Fintechs', growth: '+18% / an', demand: 'Forte demande profils internationaux' },
    { name: 'Énergie, Gaz & Mines', growth: '+25% / an', demand: 'Cadres techniques & chefs de projets' },
    { name: 'Télécoms & Numérique', growth: '+20% / an', demand: 'Architectes cloud, data & cybersécurité' },
    { name: 'Agro-industrie & BTP', growth: '+15% / an', demand: 'Directeurs d\'usine & ingénieurs travaux' },
    { name: 'Santé & Pharmaceutique', growth: '+12% / an', demand: 'Management hospitalier & réglementation' },
    { name: 'Conseil & Audit financier', growth: '+14% / an', demand: 'Seniors managers & auditeurs certifiés' }
  ];

  const steps = [
    {
      title: 'Audit de profil & CV Diaspora',
      desc: 'Adaptation de vos compétences internationales aux standards des multinationales et grands groupes au Sénégal.'
    },
    {
      title: 'Benchmarking Salarial & Packages',
      desc: 'Analyse transparente des grilles salariales nettes à Dakar, avantages en nature (véhicule, logement, scolarité, mutuelle).'
    },
    {
      title: 'Mise en relation directe avec les recruteurs',
      desc: 'Présentation de votre candidature auprès de nos cabinets de chasse partenaires et DRH de grands groupes.'
    },
    {
      title: 'Négociation & Contrat de travail local/expat',
      desc: 'Sécurisation de la convention de travail (CDI sénégalais ou détachement) et clauses fiscales avantageuses.'
    }
  ];

  return (
    <div className="py-10 bg-[#FDFCFB] min-h-screen text-[#1A1A1A]">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-stone-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Pôle Carrière & Talents Diaspora</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold tracking-tight text-white leading-tight">
              Valorisez votre profil international <span className="italic font-normal text-emerald-300">au Sénégal.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
              Comprenez les dynamiques du marché de l’emploi sénégalais, accédez aux opportunités confidentielles et négociez un package à la hauteur de votre expertise.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('demarrer')}
                className="px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition cursor-pointer"
              >
                <span>Explorer les opportunités</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white font-medium text-sm sm:text-base border border-stone-700 flex items-center gap-2 transition cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Entretien d’orientation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sectors in Senegal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Marché de l'emploi
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-stone-900 mt-3">
            Secteurs qui recrutent des profils de la diaspora
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-sans">
            Des besoins accrus en encadrement intermédiaire, expertise technique et direction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sec, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-600/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-serif-editorial font-bold text-stone-900 text-base">{sec.name}</h3>
                  <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {sec.growth}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">{sec.demand}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm">
          <h2 className="text-2xl font-serif-editorial font-bold text-stone-900 mb-8 text-center">
            Notre méthodologie d’insertion professionnelle
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {steps.map((st, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 font-serif-editorial font-bold flex items-center justify-center shrink-0 text-sm">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-base font-serif-editorial font-bold text-stone-900 mb-1">{st.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <button
              onClick={() => onNavigate('demarrer')}
              className="px-7 py-3 bg-stone-900 hover:bg-[#059669] text-white text-xs font-semibold rounded-full shadow-xs transition cursor-pointer"
            >
              Déposer mon profil en toute confidentialité
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

