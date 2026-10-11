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
  const signOut = useCallback(() => auth.signOut(), []);
  const resetPassword = useCallback((email) => auth.resetPassword(email), []);
  const resendConfirmation = useCallback((email) => auth.resendConfirmation(email), []);

  // Guarda el resultado del quiz de diagnóstico en el perfil (metadatos).
  const completeOnboarding = useCallback(async ({ level, diagnosticScore }) => {
    setProfile((p) => ({ ...p, onboardingDone: true, level, diagnosticScore }));
    await auth.updateProfile({
      onboarding_done: true,
      level,
      diagnostic_score: diagnosticScore,
    });
  }, []);

  const deleteAccount = useCallback(() => auth.deleteAccount(), []);
  const getAccountData = useCallback(() => auth.getAccountData(), []);

  return (
    <AuthContext.Provider value={{
      user, profile, loading,
      signUp, signIn, signOut, resetPassword, resendConfirmation,
      completeOnboarding, deleteAccount, getAccountData,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
