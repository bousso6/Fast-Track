import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('mariama.diop@example.com');
  const [password, setPassword] = useState('••••••••••');
  const [fullName, setFullName] = useState('Mariama Diop');
  const [country, setCountry] = useState('France');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
    onClose();
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="auth-modal-container" 
        className="bg-[#FDFCFB] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200/90 relative animate-in fade-in zoom-in-95 duration-200 text-[#1A1A1A]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand top */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center text-white font-serif-editorial font-bold text-2xl tracking-tight shadow-xs mx-auto mb-3">
            <span className="text-[#059669]">E</span>
          </div>
          <h3 className="text-2xl font-serif-editorial font-bold text-stone-900">
            {isRegister ? 'Créer mon espace Elikia' : 'Espace Client Sécurisé'}
          </h3>
          <p className="text-xs text-stone-500 font-sans mt-1">
            {isRegister 
              ? 'Suivez vos projets, documents et dépenses au Sénégal' 
              : 'Accédez au suivi de vos projets, documents et conseiller'}
          </p>
        </div>

        {/* Demo Fast Track Button */}
        <div className="mb-5 bg-[#FAF9F5] border border-stone-200 rounded-xl p-3.5 flex items-center justify-between font-sans">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#059669] shrink-0" />
            <div className="text-left">
              <div className="text-xs font-semibold text-stone-900">Accès Démo Immédiat</div>
              <div className="text-[11px] text-stone-500">Tester en tant que Mariama Diop (Paris)</div>
            </div>
          </div>
          <button
            type="button"
            id="demo-login-fast-btn"
            onClick={handleQuickDemoLogin}
            className="px-3 py-1.5 bg-[#059669] hover:bg-[#047857] text-white rounded-full text-xs font-semibold transition cursor-pointer"
          >
            Se connecter
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 font-sans">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Nom et Prénom</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Pays de résidence actuel</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Adresse Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-stone-700">Mot de passe</label>
              {!isRegister && (
                <span className="text-[11px] text-[#059669] hover:underline cursor-pointer">
                  Mot de passe oublié ?
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-[#059669]"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-full text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>{isRegister ? 'Créer mon compte' : 'Accéder à mon espace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Toggle Register / Login */}
        <div className="mt-5 pt-4 border-t border-stone-200 text-center text-xs text-stone-600 font-sans">
          {isRegister ? (
            <span>
              Vous avez déjà un compte ?{' '}
              <button 
                type="button" 
                onClick={() => setIsRegister(false)}
                className="font-semibold text-[#059669] hover:underline cursor-pointer"
              >
                Se connecter
              </button>
            </span>
          ) : (
            <span>
              Nouveau sur Elikia Diaspora ?{' '}
              <button 
                type="button" 
                onClick={() => setIsRegister(true)}
                className="font-semibold text-[#059669] hover:underline cursor-pointer"
              >
                Créer un compte
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
