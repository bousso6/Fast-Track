import React, { useState } from 'react';
import { 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  FileCode2, 
  Users2, 
  Landmark, 
  ShieldCheck, 
  PhoneCall, 
  BarChart3, 
  Layers, 
  Coins
} from 'lucide-react';
import { PageRoute } from '../types';

interface EntreprendrePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
}

export const EntreprendrePage: React.FC<EntreprendrePageProps> = ({
  onNavigate,
  onOpenAppointment
}) => {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    { num: 1, title: 'Idée', desc: 'Analyse d’opportunité, adéquation marché sénégalais & proposition de valeur.' },
    { num: 2, title: 'Validation', desc: 'Étude terrain, modèle économique, business plan et conformité sectorielle.' },
    { num: 3, title: 'Création', desc: 'Rédaction statuts SAS/SARL, dépôt capital, immatriculation APIX, RCCM & NINEA.' },
    { num: 4, title: 'Lancement', desc: 'Domiciliation, ouverture bancaire pro, premier recrutement et identité de marque.' },
    { num: 5, title: 'Structuration', desc: 'Mise en place comptabilité SYSCOHADA, fiscalité, contrats de travail et RH.' },
    { num: 6, title: 'Croissance', desc: 'Partenariats stratégiques B2B, levée de fonds et expansion sous-régionale UEMOA.' }
  ];

  const services = [
    { title: 'Création juridique express (SAS / SARL)', desc: 'Obtention RCCM, NINEA et compte bloqué en 7 à 10 jours ouvrés sans déplacement obligatoire.' },
    { title: 'Domiciliation commerciale à Dakar', desc: 'Adresse prestigieuse aux Almadies ou Plateau avec gestion de courrier et salles de réunion.' },
    { title: 'Comptabilité & Déclarations fiscales', desc: 'Tenue de livres conforme OHADA/SYSCOHADA, déclarations mensuelles IPRES, CSS, TVA et bilan annuel.' },
    { title: 'Recrutement & Gestion de la paie', desc: 'Chasse de profils locaux qualifiés, contrats de travail sénégalais et fiches de paie.' },
    { title: 'Étude de marché & Business Plan', desc: 'Chiffrage réaliste des coûts d\'exploitation locaux et plan de trésorerie sur 3 ans.' },
    { title: 'Pilotage & Représentation opérationnelle', desc: 'Votre équipe Elikia assiste à vos réunions locales clés, signe vos démarches par procuration légale.' }
  ];

  return (
    <div className="py-10 bg-[#FDFCFB] min-h-screen text-[#1A1A1A]">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-stone-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Rocket className="w-3.5 h-3.5" />
              <span>Pôle Entrepreneuriat & Structuration</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold tracking-tight text-white leading-tight">
              Entreprendre au Sénégal <span className="italic font-normal text-emerald-300">sans partir de zéro.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
              De l’idée à la création effective, puis au pilotage opérationnel de votre entreprise à Dakar. Elikia vous apporte la structure, le réseau et les formalités clés en main.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('demarrer')}
                className="px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition cursor-pointer"
              >
                <span>Présenter mon projet</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white font-medium text-sm sm:text-base border border-stone-700 flex items-center gap-2 transition cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Échanger avec un conseiller</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 6-step Journey */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Feuille de route
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-stone-900 mt-3">
              Le parcours d’un projet réussi avec Elikia
            </h2>
          </div>

          {/* 6 Step Interactive Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {steps.map((st) => (
              <button
                key={st.num}
                onClick={() => setActiveStep(st.num)}
                className={`p-4 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  activeStep === st.num
                    ? 'border-emerald-600 bg-emerald-50/70 text-stone-900 font-bold'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                  activeStep === st.num ? 'bg-[#059669] text-white' : 'bg-stone-100 text-stone-700'
                }`}>
                  0{st.num}
                </span>
                <span className="text-xs font-serif-editorial font-bold">{st.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="bg-[#F8F7F4] border border-stone-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#059669] text-white flex items-center justify-center shrink-0 font-serif-editorial font-bold text-lg">
              0{activeStep}
            </div>
            <div>
              <h3 className="text-base font-serif-editorial font-bold text-stone-900 mb-1">
                Étape {activeStep} : {steps[activeStep - 1].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                {steps[activeStep - 1].desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Prestations dédiées
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-stone-900 mt-3">
            Nos solutions d’accompagnement entrepreneurial
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-sans">
            Un package complet pour lancer et sécuriser votre société sans stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-600/40 transition-all flex flex-col justify-between">
              <div>
                <h3 className="font-serif-editorial font-bold text-stone-900 text-base mb-2">{svc.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">{svc.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-xs text-emerald-800 font-semibold gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Prise en charge Elikia</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

