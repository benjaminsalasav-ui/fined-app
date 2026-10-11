// Configuración de la app.
// Las credenciales de Supabase se leen de variables de entorno EXPO_PUBLIC_*
// (ver archivo .env / .env.example). La "anon key" es pública por diseño:
// la seguridad de los datos se controla con las políticas RLS de Supabase.
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Versión del consentimiento legal aceptado (súbela si cambian los términos).
export const CONSENT_VERSION = '1.0';

// ¿Está configurado el backend? (para mostrar avisos claros si falta)
export const IS_SUPABASE_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
