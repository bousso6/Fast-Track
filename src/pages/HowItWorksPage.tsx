import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  Users, 
  MapPin, 
  PhoneCall, 
  FileText, 
  Clock, 
  Building2, 
  Lock,
  Sparkles
} from 'lucide-react';
import { PageRoute } from '../types';

interface HowItWorksPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigate,
  onOpenAppointment
}) => {
  const steps = [
    {
      num: '01',
      title: 'Parlez-nous de votre projet',
      subtitle: 'Questionnaire rapide en ligne (2 minutes)',
      desc: 'Vous nous partagez vos besoins : retour au pays, recherche d’un emploi, création d’entreprise, achat immobilier ou investissement. Vous indiquez votre budget et votre calendrier souhaité.'
    },
    {
      num: '02',
      title: 'Échangez avec un conseiller Elikia',
      subtitle: 'Diagnostic personnalisé de 45 minutes',
      desc: 'Votre conseiller dédié basé à Dakar prend contact avec vous en visio ou par WhatsApp. Nous analysons vos contraintes, répondons à vos premières questions et vérifions la faisabilité concrète.'
    },
    {
      num: '03',
      title: 'Recevez votre plan d’action chiffré',
      subtitle: 'Feuille de route & budget transparent',
      desc: 'Elikia élabore un rétroplanning précis, identifie les partenaires requis (notaires, avocats, banques, entrepreneurs) et fixe les honoraires au forfait ou au jalon sans frais cachés.'
    },
    {
      num: '04',
      title: 'Nous coordonnons l’exécution sur le terrain',
      subtitle: 'Votre équipe opérationnelle à Dakar',
      desc: 'Nous effectuons les déplacements physiques, inspections par drone, formalités administratives et négociations. Nous sommes vos yeux et vos oreilles sur place.'
    },
    {
      num: '05',
      title: 'Suivez votre projet en temps réel',
      subtitle: 'Espace client sécurisé & reporting',
      desc: 'Consultez les photos, vidéos 360°, rapports de conformité, quittances et factures acquittées directement depuis votre espace personnel Elikia.'
    }
  ];

  return (
    <div className="py-10 bg-[#FDFCFB] min-h-screen text-[#1A1A1A]">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center max-w-4xl mx-auto space-y-4 border border-stone-800">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Guichet Unique & Tiers de Confiance</span>
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold tracking-tight text-white leading-tight">
            Comment fonctionne l’accompagnement <span className="italic font-normal text-emerald-300">Elikia ?</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans">
            « Vous décidez. Nous vérifions, coordonnons et suivons pour vous au Sénégal. »
          </p>

          <div className="pt-3 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('demarrer')}
              className="px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition cursor-pointer"
            >
              <span>Commencer mon diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Difference Table: Annuaire vs Elikia */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
          <h2 className="text-2xl font-serif-editorial font-bold text-stone-900 mb-6 text-center">
            Pourquoi Elikia n’est pas un simple annuaire de prestataires
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF9F5] rounded-xl p-5 border border-stone-200">
              <div className="text-sm font-serif-editorial font-bold text-stone-700 mb-3 flex items-center gap-2">
                <span className="text-stone-400">✕</span> Un simple annuaire / marketplace
              </div>
              <ul className="space-y-2 text-xs text-stone-600 font-sans">
                <li>• Vous devez contacter et relancer vous-même 10 prestataires</li>
                <li>• Aucune responsabilité ni garantie sur l'exécution des travaux</li>
                <li>• Risque de surtarification ou de commissions occultes</li>
                <li>• Vous devez vérifier vous-même l'authenticité des titres et documents</li>
              </ul>
            </div>

            <div className="bg-emerald-50/60 rounded-xl p-5 border border-emerald-300">
              <div className="text-sm font-serif-editorial font-bold text-emerald-950 mb-3 flex items-center gap-2">
                <span className="text-emerald-700">✓</span> L’accompagnement Elikia Diaspora
              </div>
              <ul className="space-y-2 text-xs text-emerald-900 font-sans font-medium">
                <li>• Un conseiller unique dédié qui gère et synchronise tout</li>
                <li>• Déplacements et audits physiques contradictoires sur le terrain</li>
                <li>• Tarifs négociés aux prix réels du marché sénégalais</li>
                <li>• Paiements sécurisés sous séquestre au jalon validé</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Steps Detail */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 space-y-4">
        {steps.map((st) => (
          <div 
            key={st.num}
            className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs hover:border-emerald-600/40 transition-all flex items-start gap-5"
          >
            <div className="text-2xl sm:text-3xl font-serif-editorial font-bold text-emerald-800 shrink-0 w-12">
              {st.num}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-base font-serif-editorial font-bold text-stone-900">{st.title}</h3>
                <span className="text-xs font-mono text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                  {st.subtitle}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-1 font-sans">
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Bottom */}
      <div className="max-w-3xl mx-auto px-4 text-center pb-12">
        <button
          onClick={() => onNavigate('demarrer')}
          className="px-8 py-4 bg-stone-900 hover:bg-[#059669] text-white font-semibold rounded-full text-sm shadow-md inline-flex items-center gap-2 transition cursor-pointer"
        >
          <span>Démarrer mon projet maintenant</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

