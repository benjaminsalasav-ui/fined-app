// Cliente de Supabase para React Native / Expo.
// Usa AsyncStorage para persistir la sesión de forma segura entre aperturas.
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

// Si faltan las variables de entorno, se usa un valor de relleno para que la app
// cargue igual y muestre el aviso de configuración en vez de quedar en blanco.
export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-anon-key',
  {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // no aplica en apps móviles
  },
  }
);
