import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as auth from '../services/auth';

export const AuthContext = createContext({});

// Construye el objeto de usuario y perfil a partir de la sesión de Supabase.
function deriveUser(session) {
  const u = session?.user;
  if (!u) return { user: null, profile: { onboardingDone: false, level: null } };
  const meta = u.user_metadata || {};
  return {
    user: { id: u.id, email: u.email, name: meta.full_name || 'Estudiante' },
    profile: {
      onboardingDone: Boolean(meta.onboarding_done),
      level: meta.level || null,
      diagnosticScore: meta.diagnostic_score ?? null,
    },
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ onboardingDone: false, level: null });
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Sesión inicial al abrir la app.
    auth.getSession().then((session) => {
      const { user, profile } = deriveUser(session);
      setUser(user);
      setProfile(profile);
      setLoading(false);
    });

    // Escucha cambios de sesión (login, logout, verificación, update de perfil).
    const subscription = auth.onAuthChange((session) => {
      const { user, profile } = deriveUser(session);
      setUser(user);
      setProfile(profile);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = useCallback((data) => auth.signUp(data), []);
  const signIn = useCallback((data) => auth.signIn(data), []);
  // Modo invitado: permite probar la app sin crear cuenta (el progreso no se guarda en el servidor).
  const signInAsGuest = useCallback(() => {
    setIsGuest(true);
    setUser({ id: 'guest', email: '', name: 'Invitado', guest: true });
    setProfile({ onboardingDone: false, level: null });
  }, []);

  const signOut = useCallback(() => {
    if (isGuest) {
      setIsGuest(false);
      setUser(null);
      setProfile({ onboardingDone: false, level: null });
      return Promise.resolve();
    }
    return auth.signOut();
  }, [isGuest]);
  const resetPassword = useCallback((email) => auth.resetPassword(email), []);
  const resendConfirmation = useCallback((email) => auth.resendConfirmation(email), []);

  // Guarda el resultado del quiz de diagnóstico en el perfil (metadatos).
  const completeOnboarding = useCallback(async ({ level, diagnosticScore }) => {
    setProfile((p) => ({ ...p, onboardingDone: true, level, diagnosticScore }));
    if (isGuest) return;
    await auth.updateProfile({
      onboarding_done: true,
      level,
      diagnostic_score: diagnosticScore,
    });
  }, [isGuest]);

  const deleteAccount = useCallback(() => (
    isGuest
      ? Promise.resolve({ error: 'Estás en modo invitado: no hay una cuenta que eliminar.' })
      : auth.deleteAccount()
  ), [isGuest]);
  const getAccountData = useCallback(() => (isGuest ? Promise.resolve(null) : auth.getAccountData()), [isGuest]);

  return (
    <AuthContext.Provider value={{
      user, profile, loading, isGuest,
      signUp, signIn, signInAsGuest, signOut, resetPassword, resendConfirmation,
      completeOnboarding, deleteAccount, getAccountData,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
