import React, { useState } from 'react';
import { X, Send, Paperclip, CheckCircle2, Clock, Phone, Video, UserCheck, Shield } from 'lucide-react';
import { DEFAULT_ADVISOR } from '../data/mockData';
import { ChatMessage } from '../types';

interface AdvisorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAppointment: () => void;
}

export const AdvisorChatModal: React.FC<AdvisorChatModalProps> = ({
  isOpen,
  onClose,
  onOpenAppointment
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'advisor',
      text: 'Bonjour Mariama ! Je suis Awa Ndiaye, votre conseillère dédiée Elikia à Dakar. J’ai vérifié ce matin l’état d’avancement de l’audit notarié pour l’appartement de Mermoz. Tout est conforme au niveau du titre foncier.',
      timestamp: 'Hier à 14:30',
      attachments: ['Rapport_Audit_Technique_Structure.pdf']
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Excellente nouvelle Awa ! Avez-vous également pu contacter l’APIX pour la création de la SAS ?',
      timestamp: 'Hier à 16:15'
    },
    {
      id: 'm3',
      sender: 'advisor',
      text: 'Oui tout à fait. Le dossier est en cours de traitement au Greffe du Tribunal de Commerce. Nous recevrons le RCCM et le NINEA d’ici mardi prochain.',
      timestamp: 'Aujourd’hui à 09:40'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: 'À l’instant'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate quick intelligent advisor response
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'advisor',
        text: 'Bien reçu ! Je m’en occupe immédiatement sur le terrain à Dakar et je vous fais un retour détaillé avec photos/documents.',
        timestamp: 'À l’instant'
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="advisor-chat-modal-container" 
        className="bg-white rounded-2xl max-w-xl w-full h-[600px] shadow-2xl border border-stone-200/90 flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 text-[#1A1A1A]"
      >
        {/* Top Header */}
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={DEFAULT_ADVISOR.avatar} 
                alt={DEFAULT_ADVISOR.name} 
                className="w-11 h-11 rounded-full object-cover border border-emerald-400" 
              />
              <span className="w-3 h-3 bg-emerald-500 border-2 border-stone-900 rounded-full absolute bottom-0 right-0"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-editorial font-bold text-sm text-stone-100">{DEFAULT_ADVISOR.name}</span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-800">
                  Conseillère Elikia
                </span>
              </div>
              <p className="text-xs text-stone-400 font-sans">En ligne à Dakar • Réponse en &lt; 15 min</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { onClose(); onOpenAppointment(); }}
              className="px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-emerald-400 transition text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Planifier un appel"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Appel</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-emerald-50/80 border-b border-emerald-100 px-4 py-2 flex items-center justify-between text-xs text-emerald-900 font-sans">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#059669]" />
            <span>Messagerie cryptée & sécurisée Elikia</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-800 font-medium">Mandat certifié</span>
        </div>

        {/* Message Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF9F5]/70 font-sans">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[82%] rounded-2xl p-3.5 text-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#059669] text-white rounded-br-xs shadow-2xs'
                    : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs shadow-2xs'
                }`}
              >
                <p className="leading-relaxed text-xs sm:text-sm">{msg.text}</p>
                
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-600 bg-stone-50 p-2 rounded-lg font-mono">
                    <Paperclip className="w-3.5 h-3.5 text-[#059669]" />
                    <span className="font-semibold truncate">{msg.attachments[0]}</span>
                  </div>
                )}

                <div className={`text-[10px] font-mono mt-1 flex items-center gap-1 ${
                  msg.sender === 'user' ? 'text-emerald-100 justify-end' : 'text-stone-400 justify-start'
                }`}>
                  <Clock className="w-2.5 h-2.5" />
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 font-sans">
          <button
            type="button"
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition cursor-pointer"
            title="Joindre un document"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Écrivez à votre conseillère Elikia..."
            className="flex-1 py-2.5 px-4 bg-[#FAF9F5] border border-stone-200 focus:border-[#059669] focus:bg-white rounded-full text-xs sm:text-sm focus:outline-none text-stone-900"
          />

          <button
            type="submit"
            className="p-2.5 bg-[#059669] hover:bg-[#047857] text-white rounded-full shadow-xs transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
