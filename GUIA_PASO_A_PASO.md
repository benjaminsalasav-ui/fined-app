# 📱 FinEdApp — Guía paso a paso en Visual Studio Code

## ¿Qué es esta app?

**FinEdApp** es una aplicación móvil de educación financiera para universitarios chilenos. Incluye:
- 4 módulos con lecciones: Ahorro, Presupuesto, Inversión, Deudas
- Quizzes interactivos por lección
- Simulador de decisiones financieras reales
- Sistema de logros y puntos

---

## PASO 1 — Instalar las herramientas necesarias

### 1.1 Node.js
1. Ve a https://nodejs.org
2. Descarga la versión **LTS** (la verde)
3. Instálala con todas las opciones por defecto
4. Verifica: abre una terminal y escribe `node -v` → debe mostrar algo como `v20.x.x`

### 1.2 Expo CLI
En la terminal, escribe:
```
npm install -g expo-cli
```

### 1.3 Visual Studio Code
1. Ve a https://code.visualstudio.com
2. Descarga e instala
3. Extensión recomendada: busca **"React Native Tools"** en el marketplace de VS Code e instálala

### 1.4 Expo Go (en tu smartphone)
- **iPhone**: App Store → busca "Expo Go"
- **Android**: Play Store → busca "Expo Go"

---

## PASO 2 — Abrir el proyecto en VS Code

1. Abre **Visual Studio Code**
2. Ve a **Archivo → Abrir Carpeta**
3. Navega hasta la carpeta `FinEdApp` dentro de tu proyecto
4. Selecciónala y haz clic en **Abrir**

Verás esta estructura de archivos en el panel izquierdo:
```
FinEdApp/
├── App.js                  ← Punto de entrada de la app
├── app.json                ← Configuración de la app
├── package.json            ← Dependencias
├── babel.config.js
└── src/
    ├── context/
    │   └── AppContext.js   ← Estado global (progreso, puntos)
    ├── data/
    │   ├── modules.js      ← Contenido de los 4 módulos
    │   ├── quiz.js         ← Preguntas de los quizzes
    │   └── achievements.js ← Sistema de logros
    └── screens/
        ├── HomeScreen.js       ← Pantalla principal
        ├── ModuleDetailScreen.js ← Lecciones
        ├── QuizScreen.js       ← Quizzes
        ├── SimulatorScreen.js  ← Simulador
        └── AchievementsScreen.js ← Logros
```

---

## PASO 3 — Instalar dependencias

1. En VS Code, abre la **Terminal integrada**: `Ver → Terminal` (o `Ctrl + ñ`)
2. Verifica que estés dentro de la carpeta `FinEdApp` (deberías ver algo como `...FinEdApp>`)
3. Escribe y ejecuta:

```bash
npm install
```

Espera a que termine (puede tardar 1-3 minutos). Al final verás algo como `added 1200 packages`.

---

## PASO 4 — Ejecutar la app

En la terminal, escribe:

```bash
npx expo 
```

Verás un **código QR** en la terminal.

---

## PASO 5 — Ver la app en tu smartphone

### Opción A: Escanear el QR (más fácil)
1. Abre la app **Expo Go** en tu teléfono
2. Toca **"Scan QR code"**
3. Apunta la cámara al código QR de la terminal
4. ¡La app se abrirá en tu teléfono! 🎉

### Opción B: Emulador (requiere Android Studio o Xcode)
- Presiona `a` en la terminal para Android
- Presiona `i` en la terminal para iOS (solo Mac)

---

## PASO 6 — Modificar el contenido

### Cambiar el nombre de usuario por defecto
Abre `src/context/AppContext.js`, línea 9:
```javascript
const [userName, setUserName] = useState('Estudiante'); // ← Cambia aquí
```

### Agregar nuevas lecciones
Abre `src/data/modules.js` y dentro de cualquier módulo agrega:
```javascript
{
  id: 104,                // Número único
  title: 'Título de la lección',
  content: `Tu contenido aquí...`,
  tip: 'Consejo clave aquí',
}
```

### Agregar preguntas de quiz
Abre `src/data/quiz.js` y dentro del ID de la lección agrega:
```javascript
{
  question: '¿Tu pregunta?',
  options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
  correct: 1,        // Índice de la respuesta correcta (0=A, 1=B, 2=C, 3=D)
  explanation: 'Por qué esta es la respuesta correcta',
}
```

### Cambiar colores de módulos
Abre `src/data/modules.js` y modifica `color` y `colorDark` de cada módulo con cualquier código hex de color.

---

## PASO 7 — Publicar la app (opcional)

### Para compartir con otros sin App Store/Play Store:
```bash
npx expo publish
```
Esto genera un link que cualquiera puede abrir en Expo startGo.

### Para generar APK (Android):
```bash
npx eas build -p android --profile preview
```
Necesitas cuenta gratuita en https://expo.dev

---

## Solución de problemas comunes

| Problema | Solución |
|---|---|
| `npm install` da error | Asegúrate de tener Node.js instalado. Intenta con `npm install --legacy-peer-deps` |
| No aparece el QR | Escribe `npx expo start --tunnel` en vez de `npx expo start` |
| La app no carga en el teléfono | Tu computador y teléfono deben estar en la misma red WiFi |
| Error "module not found" | Ejecuta `npm install` de nuevo |

---

## Estructura de pantallas de la app

```
📱 App
├── 🏠 Inicio
│   ├── Progreso general
│   ├── 4 módulos educativos
│   └── Accesos rápidos
├── 📚 Módulo (al tocar uno)
│   ├── Lista de lecciones
│   ├── Lección con contenido
│   └── Quiz de la lección
├── 🎮 Simulador
│   └── 4 escenarios de decisiones
└── 🏆 Logros
    └── 10 logros desbloqueables
```

---

*Desarrollado con React Native + Expo. Basado en el concepto de educación financiera para universitarios chilenos.*
