import React, { useState } from 'react';
import { Lock, Mail, User, ShieldCheck, ArrowRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { PageRoute } from '../types';
import { CURRENT_USER } from '../data/mockData';

interface LoginPageProps {
  onNavigate: (page: PageRoute) => void;
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigate,
  onLoginSuccess
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('mariama.diop@example.com');
  const [password, setPassword] = useState('••••••••••');
  const [fullName, setFullName] = useState('Mariama Diop');
  const [country, setCountry] = useState('France');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
    onNavigate('dashboard');
  };

  const handleDemoClick = () => {
    onLoginSuccess();
    onNavigate('dashboard');
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FDFCFB] min-h-screen flex items-center justify-center px-4 text-[#1A1A1A]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200/90 shadow-xl">
        
        {/* Top Emblem */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-white font-serif-editorial font-bold text-2xl tracking-tight shadow-md mx-auto mb-3">
            <span className="text-emerald-400">E</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            {isRegister ? 'Créer mon espace Elikia' : 'Mon Espace Elikia'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">
            {isRegister 
              ? 'Créez votre compte pour suivre vos projets et démarches au Sénégal.'
              : 'Accédez au suivi en direct de vos projets, documents et votre conseiller.'}
          </p>
        </div>

        {/* Demo Fast Track Switcher */}
        <div className="mb-6 bg-[#FAF9F5] border border-stone-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
            </div>
            <div className="text-left">
              <div className="text-xs font-serif-editorial font-bold text-stone-900">Accès Démo Immédiat</div>
              <div className="text-[11px] font-mono text-stone-500">Mariama Diop (Paris ⇄ Dakar)</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDemoClick}
            className="px-4 py-1.5 bg-[#059669] hover:bg-[#047857] text-white rounded-full text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            Tester
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">Nom et Prénom</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">Pays de résidence actuel</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">Adresse Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-serif-editorial font-bold text-stone-900">Mot de passe</label>
              {!isRegister && (
                <span className="text-[11px] text-emerald-800 hover:underline cursor-pointer font-sans">
                  Mot de passe oublié ?
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 hover:bg-[#059669] text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
            >
              <span>{isRegister ? 'Créer mon espace' : 'Se connecter'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-stone-100 text-center text-xs text-stone-600 font-sans">
          {isRegister ? (
            <span>
              Vous possédez déjà un compte ?{' '}
              <button 
                type="button" 
                onClick={() => setIsRegister(false)}
                className="font-semibold text-emerald-800 hover:underline cursor-pointer"
              >
                Se connecter
              </button>
            </span>
          ) : (
            <span>
              Nouveau membre de la diaspora ?{' '}
              <button 
                type="button" 
                onClick={() => setIsRegister(true)}
                className="font-semibold text-emerald-800 hover:underline cursor-pointer"
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

