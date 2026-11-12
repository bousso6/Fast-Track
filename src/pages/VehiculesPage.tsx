import React from 'react';
import { 
  Car, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Wrench, 
  FileCheck2, 
  Truck, 
  Gauge, 
  PhoneCall 
} from 'lucide-react';
import { PageRoute } from '../types';

interface VehiculesPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
}

export const VehiculesPage: React.FC<VehiculesPageProps> = ({
  onNavigate,
  onOpenAppointment
}) => {
  const steps = [
    { title: '1. Définition du besoin & Sourcing', desc: 'Véhicule neuf chez concessionnaire officiel ou occasion récente importée (Europe, Amérique du Nord, Émirats).' },
    { title: '2. Inspection mécanique 200 points', desc: 'Contrôle moteur, boîte, châssis, électronique, climatisation tropicalisée et historique kilométrique certifié.' },
    { title: '3. Transit & Dédouanement Port de Dakar', desc: 'Gestion complète du transitaire, règlement des droits de douane et taxes douanières sans mauvaise surprise.' },
    { title: '4. Immatriculation & Clés en main', desc: 'Passage aux Mines, obtention de la carte grise sénégalaise définitive, pose des plaques et assurance.' }
  ];

  return (
    <div className="py-10 bg-[#FDFCFB] min-h-screen text-[#1A1A1A]">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-stone-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Car className="w-3.5 h-3.5" />
              <span>Pôle Véhicules & Mobilité</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold tracking-tight text-white leading-tight">
              Achetez ou importez votre véhicule au Sénégal <span className="italic font-normal text-emerald-300">en toute sérénité.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
              Inspection technique rigoureuse, formalités de dédouanement au Port de Dakar et immatriculation complète. Un véhicule certifié prêt à rouler dès votre arrivée.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('demarrer')}
                className="px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition cursor-pointer"
              >
                <span>Trouver un véhicule</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white font-medium text-sm sm:text-base border border-stone-700 flex items-center gap-2 transition cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Demander une estimation douane</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Process Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Expertise Automobile
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-stone-900 mt-3">
            Notre protocole d’acquisition automobile
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-sans">
            Zéro compteur trafiqué, zéro surprise à la douane portuaire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((st, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-600/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 flex items-center justify-center font-serif-editorial font-bold text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-serif-editorial font-bold text-stone-900 text-base mb-2">{st.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

