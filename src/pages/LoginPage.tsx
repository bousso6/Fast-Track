import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  User,
} from 'lucide-react';
import { PageRoute } from '../types';
import {
  ApiError,
  forgotPassword,
  getApiErrorMessage,
  login,
  register,
  resendVerification,
  saveAuthSession,
} from '../lib/authApi';
import { getDashboardRoute } from '../lib/dashboardRouting';
import type { AuthUser } from '../lib/authApi';

interface LoginPageProps {
  onNavigate: (page: PageRoute) => void;
  onLoginSuccess: (user: AuthUser) => void;
}

type Mode = 'login' | 'register' | 'forgot';

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<Mode>(() =>
    new URLSearchParams(window.location.search).get('mode') === 'forgot'
      ? 'forgot'
      : 'login'
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countryOfResidence, setCountryOfResidence] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setError('');
    setSuccess('');
    setRegisteredEmail('');
    setUnverifiedEmail('');
    setResendMessage('');
    setPassword('');
    setConfirmPassword('');
  };

  const submitLogin = async (loginEmail: string, loginPassword: string) => {
    setLoading(true);
    setError('');
    setUnverifiedEmail('');

    try {
      const response = await login(loginEmail.trim(), loginPassword);
      const session = response.data;

      if (!session) {
        throw new Error('Réponse de connexion invalide.');
      }

      saveAuthSession(session);
      onLoginSuccess(session.user);
      onNavigate(getDashboardRoute(session.user.role));
    } catch (loginError) {
      setError(getApiErrorMessage(loginError));
      if (loginError instanceof ApiError && loginError.status === 403) {
        setUnverifiedEmail(loginEmail.trim());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (emailToResend: string) => {
    setResendLoading(true);
    setResendMessage('');

    try {
      const response = await resendVerification(emailToResend);
      setResendMessage(
        response.message ??
          "Si un compte non vérifié existe pour cet email, un nouvel email d'activation a été envoyé."
      );
    } catch (resendError) {
      setResendMessage(getApiErrorMessage(resendError));
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setResendMessage('');

    if (mode === 'login') {
      await submitLogin(email, password);
      return;
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Les deux mots de passe ne correspondent pas.');
        return;
      }

      setLoading(true);
      try {
        const response = await register({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password,
          countryOfResidence: countryOfResidence.trim() || undefined,
          consent: true,
        });
        setRegisteredEmail(email.trim());
        setSuccess(
          response.message ??
            'Compte créé. Un email de vérification vous a été envoyé avant de pouvoir vous connecter.'
        );
        setPassword('');
        setConfirmPassword('');
      } catch (registerError) {
        setError(getApiErrorMessage(registerError));
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPassword(email.trim());
      setSuccess(
        response.message ??
          'Si un compte existe pour cet email, un lien de réinitialisation a été envoyé.'
      );
    } catch (forgotError) {
      setError(getApiErrorMessage(forgotError));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setMode('login');
    setEmail('demo.elikia@example.com');
    setPassword('Demo12345!');
    void submitLogin('demo.elikia@example.com', 'Demo12345!');
  };

  const title = isRegister
    ? 'Créer mon espace Elikia'
    : isForgot
      ? 'Mot de passe oublié'
      : 'Mon Espace Elikia';

  const subtitle = isRegister
    ? 'Créez votre compte pour suivre vos projets et démarches au Sénégal.'
    : isForgot
      ? 'Indiquez votre email pour recevoir un lien de réinitialisation valable 30 minutes.'
      : 'Accédez au suivi en direct de vos projets, documents et votre conseiller.';

  return (
    <div className="py-12 sm:py-16 bg-[#FDFCFB] min-h-screen flex items-center justify-center px-4 text-[#1A1A1A]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200/90 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-white font-serif-editorial font-bold text-2xl tracking-tight shadow-md mx-auto mb-3">
            <span className="text-emerald-400">E</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-stone-900">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">{subtitle}</p>
        </div>

        {!isRegister && !isForgot && !registeredEmail && (
          <div className="mb-6 bg-[#FAF9F5] border border-stone-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              </div>
              <div className="text-left">
                <div className="text-xs font-serif-editorial font-bold text-stone-900">
                  Accès démo
                </div>
                <div className="text-[11px] font-mono text-stone-500">
                  Compte vérifié · Demo Elikia
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="px-4 py-1.5 bg-[#059669] hover:bg-[#047857] disabled:opacity-60 text-white rounded-full text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              Tester
            </button>
          </div>
        )}

        {registeredEmail && (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-sm text-stone-600 font-sans mb-2">{success}</p>
            <p className="text-xs text-stone-500 font-sans mb-5">
              Email utilisé : <span className="font-semibold text-stone-700">{registeredEmail}</span>
            </p>

            <button
              type="button"
              onClick={() => handleResend(registeredEmail)}
              disabled={resendLoading}
              className="w-full py-2.5 mb-2.5 bg-white hover:bg-stone-50 disabled:opacity-60 text-stone-900 border border-stone-300 font-semibold rounded-full text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {resendLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Mail className="w-4 h-4 text-emerald-700" />
              )}
              <span>Renvoyer l'email de vérification</span>
            </button>

            {resendMessage && (
              <p className="text-xs text-stone-600 font-sans mb-3">{resendMessage}</p>
            )}

            <button
              type="button"
              onClick={() => switchMode('login')}
              className="w-full py-3.5 bg-stone-900 hover:bg-[#059669] text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
            >
              <span>J'ai vérifié mon email, me connecter</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="mt-4 text-[11px] text-stone-500 font-sans">
              Pensez à vérifier vos spams. En développement, le lien est aussi disponible dans les logs du backend.
            </p>
          </div>
        )}

        {isForgot && success && !registeredEmail && (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <p className="text-sm text-stone-600 font-sans mb-6">{success}</p>
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="w-full py-3.5 bg-stone-900 hover:bg-[#059669] text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
            >
              <span>Retour à la connexion</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {!registeredEmail && !(isForgot && success) && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-xs font-sans">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
                {unverifiedEmail && (
                  <button
                    type="button"
                    onClick={() => handleResend(unverifiedEmail)}
                    disabled={resendLoading}
                    className="mt-2.5 w-full py-2 bg-white hover:bg-red-50 disabled:opacity-60 text-red-700 border border-red-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {resendLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Mail className="w-3.5 h-3.5" />
                    )}
                    <span>Renvoyer l'email de vérification</span>
                  </button>
                )}
                {resendMessage && (
                  <p className="mt-2 text-[11px] text-stone-600">{resendMessage}</p>
                )}
              </div>
            )}

            {isRegister && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">
                      Prénom
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                        minLength={2}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">
                      Nom
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                        minLength={2}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">
                    Pays de résidence actuel
                  </label>
                  <input
                    type="text"
                    value={countryOfResidence}
                    onChange={(event) => setCountryOfResidence(event.target.value)}
                    placeholder="France, Belgique, Canada..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                    disabled={loading}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                  autoComplete="email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {!isForgot && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-serif-editorial font-bold text-stone-900">
                    Mot de passe
                  </label>
                  {!isRegister && (
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-[11px] text-emerald-800 hover:underline cursor-pointer font-sans"
                    >
                      Mot de passe oublié ?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full pl-10 pr-11 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    minLength={isRegister ? 8 : undefined}
                    required
                    disabled={loading}
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
            )}

            {isRegister && (
              <div>
                <label className="block text-xs font-serif-editorial font-bold text-stone-900 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F5] border border-stone-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-emerald-600"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-stone-900 hover:bg-[#059669] disabled:opacity-60 text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                <span>
                  {loading
                    ? 'Traitement...'
                    : isRegister
                      ? 'Créer mon espace'
                      : isForgot
                        ? 'Envoyer le lien'
                        : 'Se connecter'}
                </span>
              </button>
            </div>
          </form>
        )}

        {!registeredEmail && !(isForgot && success) && (
          <div className="mt-6 pt-5 border-t border-stone-100 text-center text-xs text-stone-600 font-sans">
            {isRegister ? (
              <span>
                Vous possédez déjà un compte ?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="font-semibold text-emerald-800 hover:underline cursor-pointer"
                >
                  Se connecter
                </button>
              </span>
            ) : isForgot ? (
              <span>
                Vous vous souvenez de votre mot de passe ?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
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
                  onClick={() => switchMode('register')}
                  className="font-semibold text-emerald-800 hover:underline cursor-pointer"
                >
                  Créer un compte
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};