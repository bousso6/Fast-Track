import React from 'react';
import { Mail, Phone, MapPin, Linkedin, MessageSquare, ShieldCheck, ArrowRight, Globe } from 'lucide-react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAppointment }) => {
  return (
    <footer id="main-footer" className="bg-[#111827] text-stone-300 border-t border-stone-800 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Col 1: Brand & Promise */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5 cursor-pointer select-none" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center text-white font-serif-editorial text-xl font-bold">
                <span className="text-emerald-400">E</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-serif-editorial font-bold tracking-tight text-white">
                    ELIKIA<span className="text-emerald-500">.</span>
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase bg-stone-800 text-stone-200 px-1.5 py-0.5 rounded border border-stone-700">
                    DIASPORA
                  </span>
                </div>
                <span className="text-xs text-stone-400">Votre équipe de confiance au Sénégal</span>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Le guichet unique pour vivre, travailler, entreprendre et investir au Sénégal. Nous vérifions, coordonnons et suivons vos projets sur place avec rigueur et transparence.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                Tiers de confiance certifié
              </span>
              <span className="text-xs text-stone-400 font-medium">DIASPORA ⇄ SÉNÉGAL</span>
            </div>

            <div className="pt-2 flex items-center gap-3 text-stone-400">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button 
                onClick={onOpenAppointment}
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center transition cursor-pointer"
                aria-label="WhatsApp"
                title="Contacter sur WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2: Elikia Diaspora & Approche */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-200 mb-4 font-sans">Elikia Diaspora</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="text-stone-400 hover:text-white transition">
                  À propos d’Elikia
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('comment-ca-marche')} className="text-stone-400 hover:text-white transition">
                  Notre approche & Méthodologie
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('comment-ca-marche')} className="text-stone-400 hover:text-white transition">
                  Comment ça marche ?
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('partenaires')} className="text-stone-400 hover:text-white transition">
                  Réseau de partenaires vérifiés
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="text-stone-400 hover:text-white transition">
                  Mon Espace Client
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Vos Projets */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-200 mb-4 font-sans">Vos Projets</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('retour')} className="text-stone-400 hover:text-white transition">
                  Retour au Sénégal & Famille
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('emploi')} className="text-stone-400 hover:text-white transition">
                  Emploi & Recrutement
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('entreprendre')} className="text-stone-400 hover:text-white transition">
                  Création d'entreprise (SAS/SARL)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('immobilier')} className="text-stone-400 hover:text-white transition">
                  Achat immobilier & Foncier
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vehicules')} className="text-stone-400 hover:text-white transition">
                  Achat & Transit Véhicules
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('investir')} className="text-stone-400 hover:text-white transition">
                  Investissement & PME
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Implantation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-stone-200 mb-4 font-sans">Contact & Bureaux</h4>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-200">Dakar / Thiès</div>
                  <p className="text-xs text-stone-400">Route des Almadies & Pôle Urbain Diamniadio, Sénégal</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:akd@volkeno.sn" className="text-xs hover:text-white transition underline underline-offset-2">
                  akd@volkeno.sn
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-stone-300">+221 33 820 40 50 / WhatsApp</span>
              </div>

              <div className="pt-2">
                <button
                  id="footer-start-diagnostic-btn"
                  onClick={() => onNavigate('demarrer')}
                  className="w-full py-2.5 px-3 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <span>Démarrer mon diagnostic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 text-xs text-stone-400 mb-8 space-y-1.5">
          <p className="font-medium text-stone-300">
            ⚖️ Mention de transparence et déontologie :
          </p>
          <p className="text-stone-400 leading-relaxed">
            ELIKIA DIASPORA agit en tant que tiers de confiance, conseiller et coordinateur opérationnel de projets. Elikia ne se substitue pas aux professions réglementées (notaires, avocats, experts-comptables, géomètres agréés, banques) mais collabore étroitement avec des professionnels dûment assermentés et certifiés au Sénégal. Les opportunités d’investissement présentées nécessitent une analyse individuelle et ne constituent pas un conseil financier personnalisé automatique.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} ELIKIA DIASPORA. Tous droits réservés. Propulsé pour la diaspora sénégalaise et africaine.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-stone-400 cursor-pointer">Mentions légales</span>
            <span className="hover:text-stone-400 cursor-pointer">Confidentialité & Données</span>
            <span className="hover:text-stone-400 cursor-pointer">Conditions Générales d'Accompagnement</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
