# FinEd · Educación financiera para jóvenes

App móvil que enseña finanzas personales a jóvenes chilenos de 18 a 26 años. Proyecto del **Taller de Innovación III** (UNAB, prof. Ignacio Gajardo).

**Equipo:** Benjamín Salas · Bastián Arriagada · Israel Arriagada

## Funcionalidades
- **Diagnóstico inicial:** quiz de onboarding que mide el nivel financiero del usuario.
- **8 módulos de aprendizaje** con lecciones cortas: Ahorro Inteligente, Presupuesto Personal, Inversión Básica, Deudas y Créditos, Fondo de Emergencia, Estafas y Seguridad, AFP y Previsión, Impuestos y SII.
- **Quizzes** por módulo para reforzar lo aprendido.
- **Simulador de decisiones:** escenarios reales (primer sueldo, deudas, ahorro) con impacto en dinero, deuda y ahorro.
- **Logros** y progreso para mantener la motivación.
- **Cuentas de usuario** con registro, inicio de sesión y recuperación de contraseña (Supabase Auth).
- **Privacidad:** consentimiento legal, términos, política de privacidad y opción de eliminar la cuenta.

## Tecnologías
React Native · Expo SDK 54 · React Navigation · Supabase · AsyncStorage · react-native-web

## Estructura
```
App.js                 navegación principal
src/screens/           pantallas (Home, Módulos, Quiz, Simulador, Logros, Cuenta, Auth)
src/data/              contenido: módulos, quizzes, logros, diagnóstico
src/context/           estado global (Auth, App)
src/services/          Supabase, autenticación y almacenamiento local
supabase_setup.sql     función SQL para eliminar cuenta
```

## Ejecutar en local
```bash
npm install
cp .env.example .env      # agrega tus credenciales de Supabase
npx expo start            # escanea el QR con Expo Go
npx expo start --web      # versión web
```

## Publicar la versión web en Vercel
El proyecto incluye `vercel.json` (build: `npx expo export --platform web`, salida: `dist`).
En Vercel → Settings → Environment Variables agrega `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_ANON_KEY`, y luego:
```bash
npx vercel --prod
```

## Documentos
- [Guía de lanzamiento](GUIA_LANZAMIENTO.md)
- [Términos y condiciones](TERMINOS_Y_CONDICIONES.md)
- [Política de privacidad](POLITICA_DE_PRIVACIDAD.md)
