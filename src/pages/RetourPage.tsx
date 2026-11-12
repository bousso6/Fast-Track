import React, { useState } from 'react';
import { 
  Plane, 
  CheckCircle2, 
  ArrowRight, 
  Home, 
  GraduationCap, 
  Shield, 
  Building2, 
  FileText, 
  Briefcase, 
  Rocket, 
  MapPin, 
  PhoneCall, 
  Calculator,
  Compass,
  Check
} from 'lucide-react';
import { PageRoute } from '../types';

interface RetourPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
}

export const RetourPage: React.FC<RetourPageProps> = ({ onNavigate, onOpenAppointment }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([
    'audit_budget',
    'choix_quartier'
  ]);

  const categories = [
    {
      title: '1. Cadrage & Budget',
      icon: Calculator,
      desc: 'Étude de faisabilité, estimation du coût de la vie à Dakar, budget de déménagement et transition financière.'
    },
    {
      title: '2. Recherche de Logement & Quartiers',
      icon: Home,
      desc: 'Almadies, Mermoz, Ouakam, Diamniadio ou Saly : sélection de biens locatifs ou d\'achats sécurisés avec visites vidéo 360°.'
    },
    {
      title: '3. Scolarité & Écoles',
      icon: GraduationCap,
      desc: 'Sélection des meilleurs établissements (système français homologué AEFE, bilingue ou international) et coordination des inscriptions.'
    },
    {
      title: '4. Banque & Rapatriement de Fonds',
      icon: Building2,
      desc: 'Ouverture de comptes résidents/non-résidents, change sans frais cachés et transfert sécurisé d’avoirs.'
    },
    {
      title: '5. Assurances & Santé',
      icon: Shield,
      desc: 'Assurance santé internationale, couverture rapatriement, mutuelle locale et raccordement aux cliniques de référence.'
    },
    {
      title: '6. Douanes & Déménagement',
      icon: Plane,
      desc: 'Gestion du container maritime au Port de Dakar, franchise douanière pour déménagement de retour et dédouanement véhicule.'
    },
    {
      title: '7. Administratif & Résidence',
      icon: FileText,
      desc: 'Certificat de changement de résidence, carte nationale d’identité, passeport, permis de conduire sénégalais.'
    },
    {
      title: '8. Emploi ou Entreprise',
      icon: Rocket,
      desc: 'Accompagnement à l’insertion professionnelle ou création de votre filiale locale avec nos pôles spécialisés.'
    }
  ];

  const checklist = [
    { id: 'audit_budget', label: 'Définition du budget prévisionnel d’installation (6 à 12 mois de réserve)' },
    { id: 'choix_quartier', label: 'Sélection de la zone de vie (proximité écoles, travail, accès autoroute)' },
    { id: 'inscriptions_scolaires', label: 'Pré-inscriptions scolaires pour la rentrée (mars-mai)' },
    { id: 'resiliation_etranger', label: 'Planification des démarches de résiliation dans le pays de résidence' },
    { id: 'douanes_container', label: 'Inventaire valorisé pour franchise déménagement au Port de Dakar' },
    { id: 'compte_bancaire', label: 'Ouverture anticipée du compte bancaire au Sénégal' }
  ];

  const toggleChecklist = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(i => i !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  return (
    <div className="py-10 bg-[#FDFCFB] min-h-screen text-[#1A1A1A]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-stone-800">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Plane className="w-3.5 h-3.5" />
              <span>Pôle Relocation & Installation</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold tracking-tight text-white leading-tight">
              Préparez votre retour au Sénégal <span className="italic font-normal text-emerald-300">en toute sérénité.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
              De votre première réflexion à votre emménagement, Elikia coordonne chaque étape pratique de votre retour. Un seul interlocuteur pour vous libérer du stress de la distance.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate('demarrer')}
                className="px-7 py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition cursor-pointer"
              >
                <span>Construire mon plan de retour</span>
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

      {/* Grid of Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Périmètre d'action
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-stone-900 mt-3">
            Les 8 volets clés de votre installation
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-sans">
            Notre équipe à Dakar prend en charge chaque volet pratique pour vous et votre famille.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-600/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4 border border-stone-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-serif-editorial font-bold text-stone-900 mb-2">{cat.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">{cat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Checklist Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.2em]">Outil Interactif</span>
              <h3 className="text-xl font-serif-editorial font-bold text-stone-900 mt-0.5">Checklist de préparation au retour</h3>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 font-mono">
              {checkedItems.length} / {checklist.length} validés
            </span>
          </div>

          <div className="space-y-3 mb-6">
            {checklist.map((item) => {
              const isDone = checkedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                    isDone ? 'bg-emerald-50/70 border-emerald-300 text-stone-900' : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                    isDone ? 'bg-[#059669] border-[#059669] text-white' : 'border-stone-300 bg-white'
                  }`}>
                    {isDone && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-[#F8F7F4] rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-stone-600 text-center sm:text-left font-sans">
              Besoin d'un accompagnement personnalisé pour exécuter cette checklist ?
            </span>
            <button
              onClick={() => onNavigate('demarrer')}
              className="px-5 py-2 bg-[#059669] hover:bg-[#047857] text-white rounded-full text-xs font-semibold transition shrink-0 cursor-pointer"
            >
              Générer mon plan d’action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

