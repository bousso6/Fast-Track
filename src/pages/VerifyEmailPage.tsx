import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { PageRoute } from '../types';
import { getApiErrorMessage, resendVerification, verifyEmail } from '../lib/authApi';

interface VerifyEmailPageProps {
  onNavigate: (page: PageRoute) => void;
}

type Status = 'loading' | 'success' | 'error';
type ResendStatus = 'idle' | 'loading' | 'success' | 'error';

export const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ onNavigate }) => {
  const token = new URLSearchParams(window.location.search).get('token') ?? '';
  const [status, setStatus] = useState<Status>(token ? 'loading' : 'error');
  const [message, setMessage] = useState(
    token ? 'Vérification en cours...' : 'Lien de vérification incomplet.'
  );
  const [resendEmail, setResendEmail] = useState('');
  const [resendStatus, setResendStatus] = useState<ResendStatus>('idle');
  const [resendMessage, setResendMessage] = useState('');
  const didRequest = useRef(false);

  useEffect(() => {
    if (!token || didRequest.current) return;
    didRequest.current = true;

    verifyEmail(token)
      .then((response) => {
        setStatus('success');
        setMessage(response.message ?? 'Adresse email vérifiée avec succès.');
      })
      .catch((error) => {
        setStatus('error');
        setMessage(getApiErrorMessage(error));
      });
  }, [token]);

  const handleResend = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!resendEmail.trim()) return;

    setResendStatus('loading');
    setResendMessage('');

    try {
      const response = await resendVerification(resendEmail.trim());
      setResendStatus('success');
      setResendMessage(
        response.message ??
          "Si un compte non vérifié existe pour cet email, un nouvel email d'activation a été envoyé."
      );
    } catch (error) {
      setResendStatus('error');
      setResendMessage(getApiErrorMessage(error));
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
            Vérification de votre email
          </h1>
        </div>

        {status === 'loading' && (
          <div className="text-center py-6">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-4" />
            <p className="text-sm text-stone-600 font-sans">{message}</p>
          </div>
        )}

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

        {status === 'error' && (
          <div>
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <p className="text-sm text-stone-600 font-sans text-center mb-5">{message}</p>

            <div className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-4 mb-5">
              <div className="flex items-start gap-2.5 mb-3">
                <Mail className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                <p className="text-xs text-stone-600 font-sans">
                  Vous pouvez demander un nouveau lien de vérification.
                </p>
              </div>

              <form onSubmit={handleResend} className="space-y-2.5">
                <input
                  type="email"
                  value={resendEmail}
                  onChange={(event) => setResendEmail(event.target.value)}
                  placeholder="Votre adresse email"
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-sans focus:outline-emerald-600"
                  required
                />
                <button
                  type="submit"
                  disabled={resendStatus === 'loading'}
                  className="w-full py-2.5 bg-white hover:bg-stone-50 disabled:opacity-60 text-stone-900 border border-stone-300 font-semibold rounded-full text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  {resendStatus === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  )}
                  <span>Renvoyer l'email de vérification</span>
                </button>
              </form>

              {resendMessage && (
                <p
                  className={`mt-2.5 text-xs font-sans ${
                    resendStatus === 'success' ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {resendMessage}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="w-full py-3.5 bg-stone-900 hover:bg-[#059669] text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
            >
              <span>Aller à la connexion</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
