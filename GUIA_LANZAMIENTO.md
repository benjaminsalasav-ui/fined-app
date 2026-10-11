# 🚀 Guía de lanzamiento — FinEdApp

Esta guía te lleva desde "probar la app en tu celular hoy" hasta "publicarla en las tiendas". La app está hecha con **Expo (React Native)**, así que el camino es bastante directo.

---

## 1. Requisitos previos (una sola vez)

En tu computador necesitas:

- **Node.js** (versión 18 o superior) → https://nodejs.org
- La carpeta del proyecto (`FinEdApp`)
- En tu celular: instalar la app **Expo Go**
  - Android: Play Store → "Expo Go"
  - iPhone: App Store → "Expo Go"

Luego, dentro de la carpeta `FinEdApp`, abre una terminal y ejecuta una sola vez:

```bash
npm install
```

---

## 2. Probar la app en tu celular (lo más rápido) ✅

Esta es la forma de tenerla funcionando en tu teléfono en minutos, sin publicar nada.

1. En la terminal, dentro de `FinEdApp`, ejecuta:

   ```bash
   npx expo start
   ```

2. Aparecerá un **código QR** en la terminal.
3. Escanéalo:
   - **Android**: ábrelo desde la app Expo Go.
   - **iPhone**: escanéalo con la cámara y toca la notificación.
4. La app se abrirá en tu celular. Cada vez que guardes un cambio en el código, se recarga sola.

> 📶 Tu celular y tu computador deben estar en la **misma red WiFi**. Si no conecta, ejecuta `npx expo start --tunnel`.

---

## 3. Crear un instalable (APK / iOS) con EAS Build 📦

Cuando quieras un archivo instalable de verdad (sin necesidad de Expo Go), se usa **EAS Build**, el servicio de compilación en la nube de Expo. Compila por ti, no necesitas Android Studio ni Xcode.

1. Crea una cuenta gratuita en https://expo.dev
2. Instala la herramienta e inicia sesión:

   ```bash
   npm install -g eas-cli
   eas login
   ```

3. Dentro de `FinEdApp`, configura el proyecto (una sola vez):

   ```bash
   eas build:configure
   ```

4. **Para un APK de Android** que puedas instalar y compartir directo:

   ```bash
   eas build -p android --profile preview
   ```

   Al terminar, Expo te da un **link de descarga del APK**. Lo instalas en cualquier Android (debes permitir "instalar apps de orígenes desconocidos").

5. **Para iPhone**: compilar para iOS requiere una cuenta de **Apple Developer** (US$99/año). Con eso:

   ```bash
   eas build -p ios --profile preview
   ```

---

## 4. Publicar en las tiendas 🏪

### Google Play (Android)
1. Cuenta de **Google Play Console**: pago único de US$25 → https://play.google.com/console
2. Genera la versión de producción (formato `.aab`):

   ```bash
   eas build -p android --profile production
   ```

3. Sube el archivo a Play Console, completa ficha (nombre, ícono, capturas, descripción, política de privacidad) y envía a revisión.
4. Opcional: `eas submit -p android` sube el build automáticamente.

### App Store (iPhone)
1. Cuenta **Apple Developer** (US$99/año) → https://developer.apple.com
2. Genera el build de producción:

   ```bash
   eas build -p ios --profile production
   ```

3. Súbelo con `eas submit -p ios` y completa la ficha en **App Store Connect**.

> 📝 Antes de publicar, conviene subir la `version` en `app.json` y agregar un **ícono** y **splash screen** propios (hoy usa los de Expo por defecto).

---

## 5. Antes de publicar — checklist recomendado

- [ ] Ícono y pantalla de inicio propios (carpeta `assets/`, referenciados en `app.json`).
- [ ] Revisar textos legales: una **política de privacidad** es obligatoria en ambas tiendas (más aún porque hay registro de usuarios).
- [ ] Subir `version` y `versionCode`/`buildNumber` en `app.json` en cada nueva entrega.
- [ ] Probar bien el flujo completo: registro → quiz inicial → módulos → cerrar y reabrir (el progreso debe mantenerse).

---

## 6. ⚙️ Configurar el login real con Supabase (PASO OBLIGATORIO)

El login real (correo de verificación, recuperación de contraseña, eliminar/exportar datos) ya está **programado en la app**. Solo falta conectar tu propio proyecto de Supabase. Es gratis para empezar.

### 6.1 Crear el proyecto
1. Entra a https://supabase.com y crea una cuenta (puedes usar tu correo o GitHub).
2. Botón **"New project"**.
3. Ponle un nombre (ej. `fined`), crea una **contraseña de base de datos** (guárdala) y elige la región más cercana (ej. South America / São Paulo).
4. Espera 1–2 minutos a que se cree.

### 6.2 Copiar las credenciales a la app
1. En tu proyecto, ve a **Project Settings → API**.
2. Copia dos valores:
   - **Project URL**
   - **anon public** key (la clave pública; es seguro tenerla en la app).
3. En la carpeta `FinEdApp`, crea un archivo llamado `.env` (puedes copiar `.env.example`) con:

   ```
   EXPO_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-public-key
   ```

4. Reinicia el servidor para que tome las variables:

   ```bash
   npx expo start -c
   ```

### 6.3 Activar la verificación por correo
1. En Supabase ve a **Authentication → Providers → Email** y asegúrate de que esté **habilitado**.
2. En **Authentication → Sign In / Providers**, deja activada la opción **"Confirm email"** (así el usuario debe confirmar su correo antes de entrar).
3. Opcional pero recomendado: en **Authentication → Emails** personaliza los correos de confirmación y de recuperación con tu marca (FinEd).

> 📧 En el plan gratuito, Supabase envía los correos por ti (con un límite por hora). Para producción con volumen, conviene configurar tu propio proveedor SMTP en **Authentication → Emails → SMTP Settings**.

### 6.4 Habilitar "Eliminar mi cuenta"
1. En Supabase ve a **SQL Editor → New query**.
2. Abre el archivo `supabase_setup.sql` (incluido en el proyecto), pega todo su contenido y presiona **Run**.
3. Listo: esto crea la función segura que permite a cada usuario borrar su propia cuenta desde la app.

### 6.5 Reglas de contraseña
La app ya exige mínimo 8 caracteres con mayúscula, minúscula y número. Para reforzarlo del lado del servidor, en **Authentication → Policies / Password** puedes subir la longitud mínima y exigir caracteres. (Opcional.)

---

## 7. 📜 Documentos legales (obligatorio para publicar)

La app ya muestra la **Política de Privacidad** y los **Términos** dentro de ella, y pide **consentimiento** al registrarse. Además:

1. Edita `POLITICA_DE_PRIVACIDAD.md` y `TERMINOS_Y_CONDICIONES.md`: reemplaza los campos **[ENTRE CORCHETES]** con el nombre de tu empresa/responsable y un correo de contacto. (Estos mismos textos están en `src/data/legal.js` para mostrarlos dentro de la app — actualiza ahí también `LEGAL_META`.)
2. Publica la Política de Privacidad en una **URL pública** (las tiendas la exigen). Opciones gratis: GitHub Pages, Notion, Google Sites, o un archivo en tu web.
3. Pega esa URL en la ficha de Google Play y App Store.

> ⚠️ Estos documentos son una **plantilla**. Antes de publicar, conviene que un abogado los revise para tu caso concreto.

---

## Resumen rápido

| Quiero... | Comando |
|---|---|
| Probarla en mi celular ya | `npx expo start` + Expo Go |
| Un APK para instalar/compartir | `eas build -p android --profile preview` |
| Publicar en Google Play | `eas build -p android --profile production` |
| Publicar en App Store | `eas build -p ios --profile production` (requiere Apple Developer) |
