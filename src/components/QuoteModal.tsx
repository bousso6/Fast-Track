import React, { useState } from 'react';
import { X, CheckCircle2, ShieldAlert, Calculator, Sparkles, FileText, Send } from 'lucide-react';
import { OFFERS } from '../data/mockData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultOfferId?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultOfferId = 'assist'
}) => {
  const [selectedOffer, setSelectedOffer] = useState(defaultOfferId);
  const [services, setServices] = useState<string[]>(['immobilier', 'entreprendre']);
  const [timeline, setTimeline] = useState('3-6-mois');
  const [options, setOptions] = useState<string[]>(['audit_juridique', 'drone_video']);
  const [submitted, setSubmitted] = useState(false);
  const [contact, setContact] = useState({
    name: 'Mariama Diop',
    email: 'mariama.diop@example.com',
    phone: '+33 6 12 34 56 78',
    message: 'Je souhaite un accompagnement rigoureux pour vérifier un terrain et constituer ma société à Dakar.'
  });

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    if (services.includes(id)) {
      setServices(services.filter(s => s !== id));
    } else {
      setServices([...services, id]);
    }
  };

  const toggleOption = (id: string) => {
    if (options.includes(id)) {
      setOptions(options.filter(o => o !== id));
    } else {
      setOptions([...options, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const currentOfferObj = OFFERS.find(o => o.id === selectedOffer) || OFFERS[1];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="quote-modal-container" 
        className="bg-[#FDFCFB] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200/90 relative max-h-[92vh] overflow-y-auto text-[#1A1A1A]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center border border-emerald-200">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif-editorial font-bold text-stone-900">
                  Demande de devis & Plan d'accompagnement
                </h3>
                <p className="text-xs text-stone-500 font-sans">
                  Recevez une proposition chiffrée transparente sous 24h ouvrées.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-sans">
              {/* Select Offer Tier */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                  Formule Elikia souhaitée
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {OFFERS.map(offer => (
                    <button
                      key={offer.id}
                      type="button"
                      onClick={() => setSelectedOffer(offer.id)}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                        selectedOffer === offer.id 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20' 
                          : 'border-stone-200 hover:bg-[#FAF9F5]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">{offer.name}</span>
                        {offer.popular && (
                          <span className="text-[9px] font-mono bg-[#059669] text-white font-bold px-1.5 py-0.2 rounded">Populaire</span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono font-semibold text-[#059669] mt-1">{offer.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service tags */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                  Domaines concernés par votre projet
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'retour', label: 'Retour & Installation' },
                    { id: 'emploi', label: 'Emploi & Carrière' },
                    { id: 'entreprendre', label: 'Création d’entreprise' },
                    { id: 'immobilier', label: 'Immobilier & Terrain' },
                    { id: 'vehicules', label: 'Véhicule & Import' },
                    { id: 'investir', label: 'Investissement' },
                  ].map(s => {
                    const isSelected = services.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
                          isSelected 
                            ? 'bg-stone-900 text-white border-stone-900 shadow-2xs' 
                            : 'bg-[#FAF9F5] text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific Options */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                  Modules d’expertise & vérifications sur le terrain
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'audit_juridique', label: 'Due diligence foncière & vérification Notaire' },
                    { id: 'drone_video', label: 'Visite immersive 360° & inspection drone' },
                    { id: 'negociation', label: 'Négociation prix & intermédiation sécurisée' },
                    { id: 'mandat_representation', label: 'Mandat de représentation locale officielle' },
                  ].map(opt => {
                    const checked = options.includes(opt.id);
                    return (
                      <label 
                        key={opt.id} 
                        onClick={() => toggleOption(opt.id)}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition ${
                          checked ? 'bg-emerald-50/70 border-emerald-300 text-stone-900 font-medium' : 'border-stone-200 text-stone-600 hover:bg-[#FAF9F5]'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={checked} 
                          onChange={() => {}}
                          className="rounded text-emerald-600 focus:ring-emerald-500" 
                        />
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* User info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nom & Prénom</label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Téléphone / WhatsApp</label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Précisions supplémentaires sur votre projet</label>
                <textarea
                  rows={2}
                  value={contact.message}
                  onChange={(e) => setContact({ ...contact, message: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-[#059669]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#059669] hover:bg-[#047857] text-white font-semibold rounded-full text-xs shadow-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Générer et envoyer ma demande de devis</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 font-sans">
            <div className="w-16 h-16 bg-emerald-50 text-[#059669] rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-serif-editorial font-bold text-stone-900">
              Demande de devis transmise !
            </h3>

            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Merci <strong>{contact.name}</strong>. Votre dossier pour la formule <strong>{currentOfferObj.name}</strong> a été assigné à l'équipe de coordination Elikia à Dakar.
            </p>

            <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 text-left text-xs text-stone-700 space-y-2 max-w-md mx-auto">
              <div className="font-serif-editorial font-bold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Estimation indicative immédiate :
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Forfait de cadrage & coordination</span>
                <span className="font-mono font-bold text-stone-800">{currentOfferObj.price}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Délai d’étude de faisabilité</span>
                <span className="font-mono font-bold text-stone-800">24 à 48 heures</span>
              </div>
              <p className="text-[11px] text-stone-500 pt-1 font-mono">
                Un conseiller Elikia prendra contact par WhatsApp ou téléphone pour vous présenter le détail des honoraires au jalon.
              </p>
            </div>

            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 bg-stone-900 text-white font-semibold rounded-full text-xs hover:bg-stone-800 transition cursor-pointer"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
