import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from 'lucide-react';
import { PageRoute } from '../types';
import { getApiErrorMessage, resetPassword } from '../lib/authApi';

interface ResetPasswordPageProps {
  onNavigate: (page: PageRoute) => void;
}

type Status = 'form' | 'loading' | 'success' | 'invalid';

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const token = new URLSearchParams(window.location.search).get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>(token ? 'form' : 'invalid');
  const [message, setMessage] = useState(
    token ? '' : 'Lien de réinitialisation incomplet ou invalide.'
  );

  const isLoading = status === 'loading';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) {
      setStatus('invalid');
      setMessage('Lien de réinitialisation incomplet ou invalide.');
      return;
    }

    if (password.length < 8) {
      setMessage('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    if (password.length > 72) {
      setMessage('Le mot de passe ne peut pas dépasser 72 caractères.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await resetPassword(token, password);
      setStatus('success');
      setMessage(response.message ?? 'Mot de passe réinitialisé avec succès.');
    } catch (error) {
      setStatus('form');
      setMessage(getApiErrorMessage(error));
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FDFCFB] min-h-screen flex items-center justify-center px-4 text-[#1A1A1A]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200/90 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-white font-serif-editorial font-bold text-2xl tracking-tight shadow-md mx-auto mb-3">
            <span className="text-emerald-400">E</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            Nouveau mot de passe
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">
            Choisissez un nouveau mot de passe pour sécuriser votre espace Elikia.
          </p>
        </div>

        {status === 'success' && (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm text-stone-600 font-sans mb-6">{message}</p>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="w-full py-3.5 bg-stone-900 hover:bg-[#059669] text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
            >
              <span>Se connecter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {status === 'invalid' && (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <p className="text-sm text-stone-600 font-sans mb-6">{message}</p>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="w-full py-3.5 bg-stone-900 hover:bg-[#059669] text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
            >
              <span>Aller à la connexion</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-4 text-xs text-stone-500 font-sans">
              Utilisez « Mot de passe oublié ? » sur la page de connexion pour demander un nouveau lien.
            </p>
          </div>
        )}

        {(status === 'form' || status === 'loading') && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-xs font-sans">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setMessage('');
                  }}
                  className="w-full pl-10 pr-11 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                  placeholder="8 caractères minimum"
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setMessage('');
                  }}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                  placeholder="Retapez votre mot de passe"
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-stone-900 hover:bg-[#059669] disabled:opacity-60 text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                <span>{isLoading ? 'Réinitialisation...' : 'Réinitialiser mon mot de passe'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="w-full text-center text-xs text-emerald-800 hover:underline font-sans cursor-pointer"
            >
              Retour à la connexion
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
