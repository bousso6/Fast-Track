import React from 'react';
import { 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  FileCheck, 
  Eye, 
  Camera, 
  PhoneCall, 
  AlertTriangle,
  Building,
  Key
} from 'lucide-react';
import { PageRoute } from '../types';

interface ImmobilierPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
}

export const ImmobilierPage: React.FC<ImmobilierPageProps> = ({
  onNavigate,
  onOpenAppointment
}) => {
  const tenSteps = [
    { num: 1, title: 'Définir le besoin', desc: 'Type de bien (villa, appartement, terrain nu), budget global, quartier cible et objectif (résidence ou locatif).' },
    { num: 2, title: 'Rechercher & Sourcer', desc: 'Recherche indépendante multi-agences et promoteurs vérifiés hors marché informel.' },
    { num: 3, title: 'Présélectionner', desc: 'Filtrage rigoureux selon la conformité du dossier juridique préliminaire.' },
    { num: 4, title: 'Visiter & Inspecter', desc: 'Visite physique de l’équipe Elikia avec vidéo immersive 360°, inspection technique et photos de l’environnement immédiat.' },
    { num: 5, title: 'Vérifier la constructibilité', desc: 'Vérification géomètre, certificat d’urbanisme, accès eau/électricité/voirie et servitudes.' },
    { num: 6, title: 'Réaliser la Due Diligence foncière', desc: 'Audit approfondi de l’état des droits réels à la Conservation Foncière (vérification Titre Foncier, hypothèque, litige).' },
    { num: 7, title: 'Négocier au juste prix', desc: 'Négociation basée sur le prix réel du m² dans le quartier pour éviter la surtarification diaspora.' },
    { num: 8, title: 'Contractualiser & Promesse', desc: 'Rédaction et encadrement de la promesse synallagmatique de vente devant notaire.' },
    { num: 9, title: 'Finaliser l’achat', desc: 'Paiement sous séquestre notarial, signature de l’acte authentique et transfert du titre de propriété.' },
    { num: 10, title: 'Gérer le bien & Travaux', desc: 'Suivi de chantier par drone, ameublement, mise en location ou remise des clés sécurisée.' }
  ];

  return (
    <div className="py-10 bg-[#FDFCFB] min-h-screen text-[#1A1A1A]">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-stone-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Home className="w-3.5 h-3.5" />
              <span>Pôle Foncier & Immobilier Sécurisé</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold tracking-tight text-white leading-tight">
              Achetez au Sénégal avec plus de visibilité et <span className="italic font-normal text-emerald-300">moins d’incertitude.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
              Ne confiez plus vos économies à l’aveugle. Elikia effectue les visites physiques, audite les titres fonciers et coordonne l'ensemble avec les offices notariaux.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('demarrer')}
                className="px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition cursor-pointer"
              >
                <span>Démarrer une recherche immobilière</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white font-medium text-sm sm:text-base border border-stone-700 flex items-center gap-2 transition cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Consulter un expert foncier</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Regulatory Disclaimer Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-5 flex items-start gap-4 text-stone-800">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-serif-editorial font-bold text-sm text-stone-900">Engagement déontologique et juridique Elikia</h4>
            <p className="text-xs sm:text-sm leading-relaxed text-stone-600 font-sans">
              <strong className="text-stone-900 font-medium">Elikia ne remplace ni le notaire, ni l’avocat, ni les professionnels réglementés.</strong> Nous coordonnons votre projet avec les professionnels compétents et assermentés pour vous apporter une transparence absolue et un suivi rigoureux sur le terrain.
            </p>
          </div>
        </div>
      </div>

      {/* 10-Step Timeline */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Processus Maîtrisé
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-stone-900 mt-3">
              Les 10 étapes d’une acquisition sécurisée
            </h2>
          </div>

          <div className="space-y-3.5">
            {tenSteps.map((st) => (
              <div 
                key={st.num}
                className="p-4 rounded-xl border border-stone-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 font-serif-editorial font-bold text-sm flex items-center justify-center shrink-0">
                  {st.num < 10 ? `0${st.num}` : st.num}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-serif-editorial font-bold text-stone-900">{st.title}</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed font-sans">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-600 font-sans">
              Vous avez déjà un bien ou un terrain en vue ? Nous pouvons réaliser un audit indépendant.
            </div>
            <button
              onClick={() => onNavigate('demarrer')}
              className="px-6 py-2.5 bg-stone-900 hover:bg-[#059669] text-white text-xs font-semibold rounded-full transition cursor-pointer"
            >
              Demander un audit foncier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

