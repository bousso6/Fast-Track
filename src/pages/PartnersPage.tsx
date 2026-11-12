import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  Home, 
  Car, 
  GraduationCap, 
  Hammer, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Handshake, 
  Send 
} from 'lucide-react';
import { PageRoute } from '../types';
import { PARTNER_CATEGORIES } from '../data/mockData';

interface PartnersPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({
  onNavigate,
  onOpenAppointment
}) => {
  const [partnerForm, setPartnerForm] = useState({
    companyName: '',
    category: 'notaires',
    contactPerson: '',
    email: '',
    phone: '',
    city: 'Dakar',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 bg-[#FDFCFB] min-h-screen text-[#1A1A1A]">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-[#111827] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-stone-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
              <Handshake className="w-3.5 h-3.5" />
              <span>Réseau Professionnel Qualifié</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold tracking-tight text-white leading-tight">
              Un réseau de partenaires d'excellence pour <span className="italic font-normal text-emerald-300">exécuter chaque projet.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
              Nous sélectionnons les professionnels les plus rigoureux du Sénégal. Notaires, avocats, banques, promoteurs, concessionnaires et experts BTP audités selon notre charte d'excellence.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-stone-300">
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Audit déontologique préalable</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Contrats de service formalisés</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Transparence tarifaire</span>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNER_CATEGORIES.map((cat) => {
            const Icon = cat.iconName === 'Scale' ? Scale
              : cat.iconName === 'Building2' ? Building2
              : cat.iconName === 'Home' ? Home
              : cat.iconName === 'Hammer' ? Hammer
              : cat.iconName === 'Car' ? Car
              : GraduationCap;

            return (
              <div 
                key={cat.id} 
                className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-600/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 text-stone-900 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {cat.count} partenaires agréés
                    </span>
                  </div>

                  <h3 className="font-serif-editorial font-bold text-stone-900 text-base mb-2">{cat.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4 font-sans">{cat.description}</p>

                  <div className="space-y-1.5 text-xs text-stone-600 font-sans border-t border-stone-100 pt-3">
                    <div className="font-medium text-stone-900 font-serif-editorial">Missions coordonnées :</div>
                    {cat.examples.map((ex, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Become a partner form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Rejoindre l'écosystème
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900 mt-3">
              Vous êtes un professionnel au Sénégal ?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">
              Devenez partenaire certifié Elikia et accompagnez les projets structurants de la diaspora.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">Nom de votre cabinet / entreprise</label>
                  <input
                    type="text"
                    value={partnerForm.companyName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                    placeholder="Ex: Étude Notariale Me..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">Catégorie d'activité</label>
                  <select
                    value={partnerForm.category}
                    onChange={(e) => setPartnerForm({ ...partnerForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                  >
                    <option value="notaires">Notaire / Avocat</option>
                    <option value="banques">Banque / Assurance</option>
                    <option value="promoteurs">Promoteur / Agence Immobilière</option>
                    <option value="technique">Architecte / Bureau d'études / BTP</option>
                    <option value="concessionnaires">Concessionnaire / Logistique Portuaire</option>
                    <option value="rh-ecoles">Cabinet RH / Établissement Scolaire</option>
                    <option value="autre">Autre profession réglementée</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">Interlocuteur</label>
                  <input
                    type="text"
                    value={partnerForm.contactPerson}
                    onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">Email professionnel</label>
                  <input
                    type="email"
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">Téléphone au Sénégal</label>
                  <input
                    type="tel"
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                    placeholder="+221 ..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">Présentation de vos références et agréments</label>
                <textarea
                  rows={2}
                  value={partnerForm.message}
                  onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-xs font-sans focus:bg-white focus:outline-emerald-600"
                  placeholder="Année d'expérience, agrément ministériel ou ordre professionnel..."
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="px-7 py-3 bg-stone-900 hover:bg-[#059669] text-white font-semibold text-xs rounded-full shadow-xs transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Soumettre ma candidature de partenariat</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#059669] mx-auto" />
              <h3 className="font-serif-editorial font-bold text-stone-900 text-base">Candidature enregistrée</h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto font-sans">
                Merci. Notre direction des partenariats examinera vos accréditations et vous contactera sous 48h.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

