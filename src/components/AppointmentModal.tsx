import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Phone, Building2, CheckCircle2, User, Mail, MessageSquare } from 'lucide-react';
import { DEFAULT_ADVISOR } from '../data/mockData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [channel, setChannel] = useState<'visio' | 'whatsapp' | 'bureau'>('visio');
  const [date, setDate] = useState('2026-03-02');
  const [time, setTime] = useState('14:30');
  const [timeZone, setTimeZone] = useState('Europe/Paris (UTC+1)');
  const [formData, setFormData] = useState({
    name: 'Mariama Diop',
    email: 'mariama.diop@example.com',
    phone: '+33 6 12 34 56 78',
    projectType: 'Immobilier & Entrepreneuriat',
    notes: 'Je souhaite discuter de l’acquisition d’un appartement à Dakar et de la création de ma société.'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="appointment-modal-container" 
        className="bg-[#FDFCFB] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200/90 relative animate-in fade-in zoom-in-95 duration-200 text-[#1A1A1A]"
      >
        <button
          id="close-appointment-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            {/* Header with Advisor info */}
            <div className="flex items-center gap-4 pb-5 border-b border-stone-200 mb-6">
              <img 
                src={DEFAULT_ADVISOR.avatar} 
                alt={DEFAULT_ADVISOR.name} 
                className="w-14 h-14 rounded-xl object-cover border border-stone-200 shadow-xs" 
              />
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Rendez-vous Conseil Gratuit
                </span>
                <h3 className="text-xl font-serif-editorial font-bold text-stone-900 mt-1">
                  Échanger avec un conseiller Elikia
                </h3>
                <p className="text-xs text-stone-500 font-sans">
                  {DEFAULT_ADVISOR.name} • Coordination & Projets Diaspora
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              {/* Channel Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                  1. Format du rendez-vous
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setChannel('visio')}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold flex flex-col items-center justify-center text-center gap-1.5 transition cursor-pointer ${
                      channel === 'visio' 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20' 
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <Video className="w-5 h-5 text-[#059669]" />
                    <span>Visio Google Meet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChannel('whatsapp')}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold flex flex-col items-center justify-center text-center gap-1.5 transition cursor-pointer ${
                      channel === 'whatsapp' 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20' 
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <Phone className="w-5 h-5 text-[#059669]" />
                    <span>Appel WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChannel('bureau')}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold flex flex-col items-center justify-center text-center gap-1.5 transition cursor-pointer ${
                      channel === 'bureau' 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20' 
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#059669]" />
                    <span>Bureaux Dakar</span>
                  </button>
                </div>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">
                    2. Date souhaitée
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:bg-white focus:outline-[#059669]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">
                    Créneau horaire
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium text-stone-800 focus:bg-white focus:outline-[#059669]"
                    >
                      <option value="10:00">10:00 - 10:45</option>
                      <option value="11:30">11:30 - 12:15</option>
                      <option value="14:30">14:30 - 15:15</option>
                      <option value="16:00">16:00 - 16:45</option>
                      <option value="18:00">18:00 - 18:45 (Horaires décalés)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-xs text-stone-500 mb-1">
                  Fuseau horaire de référence
                </label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-lg text-xs font-medium text-stone-700"
                >
                  <option value="Europe/Paris (UTC+1)">Europe/Paris (UTC+1) — France / Belgique</option>
                  <option value="Africa/Dakar (UTC+0)">Africa/Dakar (UTC+0) — Sénégal / UK</option>
                  <option value="America/Montreal (UTC-5)">America/Montreal (UTC-5) — Canada / US Est</option>
                  <option value="America/New_York (UTC-5)">America/New_York (UTC-5)</option>
                  <option value="Asia/Dubai (UTC+4)">Asia/Dubai (UTC+4) — UAE</option>
                </select>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Votre Nom & Prénom</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Téléphone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">En quelques mots, quel est votre sujet ?</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-[#059669]"
                  placeholder="Ex : Je prépare mon retour dans 6 mois et je souhaite acheter un terrain à Diamniadio..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="confirm-appointment-btn"
                  className="w-full py-3.5 px-4 bg-[#059669] hover:bg-[#047857] text-white font-semibold rounded-full text-xs shadow-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirmer mon créneau d'échange</span>
                </button>
                <p className="text-[11px] text-center text-stone-400 mt-2 font-mono">
                  🔒 Sans engagement. Invitation d'agenda & lien envoyés par email.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 font-sans">
            <div className="w-16 h-16 bg-emerald-50 text-[#059669] rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-serif-editorial font-bold text-stone-900">
              Rendez-vous confirmé !
            </h3>
            
            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Merci <strong>{formData.name}</strong>. Votre échange avec <strong>{DEFAULT_ADVISOR.name}</strong> est fixé le <strong>{date} à {time} ({timeZone})</strong> via <strong>{channel === 'visio' ? 'Google Meet' : channel === 'whatsapp' ? 'WhatsApp' : 'Bureaux Dakar'}</strong>.
            </p>

            <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 text-left text-xs text-stone-700 space-y-1.5 max-w-md mx-auto">
              <div className="font-serif-editorial font-bold text-stone-900">Ce que nous préparerons pour votre rendez-vous :</div>
              <ul className="list-disc pl-4 space-y-1 text-stone-600">
                <li>Étude préliminaire des démarches requises au Sénégal</li>
                <li>Estimation budgétaire et délais indicatifs</li>
                <li>Présentation des partenaires vérifiés Elikia pertinents</li>
              </ul>
            </div>

            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-stone-900 text-white font-semibold rounded-full text-xs hover:bg-stone-800 transition cursor-pointer"
              >
                Parfait, fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
