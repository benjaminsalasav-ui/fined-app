// ============================================================================
// SERVICIO DE AUTENTICACIÓN (Supabase)
// ----------------------------------------------------------------------------
// Login real con verificación por correo, recuperación de contraseña,
// reglas de contraseña y eliminación de cuenta (derecho de supresión).
// ============================================================================
import { supabase } from './supabase';
import { CONSENT_VERSION, IS_SUPABASE_CONFIGURED } from '../config';

const normalizeEmail = (email) => (email || '').trim().toLowerCase();

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || '').trim());
}

// Política de contraseñas: mínimo 8, con mayúscula, minúscula y número.
export function validatePassword(password) {
  const errors = [];
  if (!password || password.length < 8) errors.push('Al menos 8 caracteres');
  if (!/[A-Z]/.test(password)) errors.push('Una letra mayúscula');
  if (!/[a-z]/.test(password)) errors.push('Una letra minúscula');
  if (!/[0-9]/.test(password)) errors.push('Un número');
  return { valid: errors.length === 0, errors };
}

// Traduce los errores de Supabase a mensajes claros en español.
function translateError(message = '') {
  const m = message.toLowerCase();
  if (m.includes('not configured') || m.includes('supabase url')) return 'La app aún no está conectada al servidor. Configura Supabase en el archivo .env.';
  if (m.includes('invalid login credentials')) return 'Email o contraseña incorrectos.';
  if (m.includes('email not confirmed')) return 'Debes confirmar tu correo antes de entrar. Revisa tu bandeja de entrada.';
  if (m.includes('user already registered') || m.includes('already been registered')) return 'Ya existe una cuenta con ese email.';
  if (m.includes('password should be at least')) return 'La contraseña es demasiado corta.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.';
  if (m.includes('network') || m.includes('fetch')) return 'Sin conexión. Revisa tu internet e inténtalo otra vez.';
  return message || 'Ocurrió un error. Inténtalo de nuevo.';
}

function guardConfigured() {
  if (!IS_SUPABASE_CONFIGURED) {
    return { error: 'La app aún no está conectada al servidor. Configura Supabase en el archivo .env (ver GUIA_LANZAMIENTO.md).' };
  }
  return null;
}

// Registro. Envía correo de verificación automáticamente (según config del proyecto).
export async function signUp({ name, email, password, consent }) {
  const notReady = guardConfigured();
  if (notReady) return notReady;

  const e = normalizeEmail(email);
  if (!name || !name.trim()) return { error: 'Ingresa tu nombre.' };
  if (!validateEmail(e)) return { error: 'Ingresa un email válido.' };
  const pw = validatePassword(password);
  if (!pw.valid) return { error: 'La contraseña debe tener: ' + pw.errors.join(', ').toLowerCase() + '.' };
  if (!consent) return { error: 'Debes aceptar los Términos y la Política de Privacidad.' };

  const { data, error } = await supabase.auth.signUp({
    email: e,
    password,
    options: {
      data: {
        full_name: name.trim(),
        consent_version: CONSENT_VERSION,
        consent_accepted_at: new Date().toISOString(),
      },
    },
  });
  if (error) return { error: translateError(error.message) };

  // Si el proyecto exige confirmación de correo, no hay sesión todavía.
  const needsConfirmation = !data.session;
  return { needsConfirmation, user: data.user };
}

export async function signIn({ email, password }) {
  const notReady = guardConfigured();
  if (notReady) return notReady;

  const e = normalizeEmail(email);
  if (!validateEmail(e)) return { error: 'Ingresa un email válido.' };

  const { data, error } = await supabase.auth.signInWithPassword({ email: e, password });
  if (error) return { error: translateError(error.message) };
  return { user: data.user };
}

export async function signOut() {
  await supabase.auth.signOut();
}

// Recuperación de contraseña: envía un correo con enlace para restablecerla.
export async function resetPassword(email) {
  const notReady = guardConfigured();
  if (notReady) return notReady;
  const e = normalizeEmail(email);
  if (!validateEmail(e)) return { error: 'Ingresa un email válido.' };
  const { error } = await supabase.auth.resetPasswordForEmail(e);
  if (error) return { error: translateError(error.message) };
  return { ok: true };
}

// Reenvía el correo de verificación.
export async function resendConfirmation(email) {
  const e = normalizeEmail(email);
  const { error } = await supabase.auth.resend({ type: 'signup', email: e });
  if (error) return { error: translateError(error.message) };
  return { ok: true };
}

// Guarda datos de perfil en los metadatos del usuario (nombre, nivel, onboarding).
export async function updateProfile(data) {
  const { error } = await supabase.auth.updateUser({ data });
  if (error) return { error: translateError(error.message) };
  return { ok: true };
}

export async function getSession() {
  if (!IS_SUPABASE_CONFIGURED) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// Suscripción a cambios de sesión (login, logout, refresco de token).
export function onAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return data.subscription;
}

// Elimina la cuenta y todos los datos del usuario (derecho de supresión).
// Requiere la función SQL "delete_user" creada en Supabase (ver supabase_setup.sql).
export async function deleteAccount() {
  const { error } = await supabase.rpc('delete_user');
  if (error) return { error: translateError(error.message) };
  await supabase.auth.signOut();
  return { ok: true };
}

// Devuelve los datos de la cuenta para exportarlos (derecho de acceso/portabilidad).
export async function getAccountData() {
  const { data } = await supabase.auth.getUser();
  const u = data?.user;
  if (!u) return null;
  return {
    id: u.id,
    email: u.email,
    nombre: u.user_metadata?.full_name || null,
    email_confirmado: Boolean(u.email_confirmed_at),
    nivel: u.user_metadata?.level || null,
    consentimiento_version: u.user_metadata?.consent_version || null,
    consentimiento_fecha: u.user_metadata?.consent_accepted_at || null,
    cuenta_creada: u.created_at,
  };
}
