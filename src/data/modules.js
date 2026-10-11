export const MODULES = [
  {
    id: 1,
    title: 'Ahorro Inteligente',
    icon: '🏦',
    color: '#4CAF50',
    colorDark: '#388E3C',
    description: 'Aprende a ahorrar de forma efectiva desde hoy',
    lessons: [
      {
        id: 101,
        title: '¿Por qué ahorrar?',
        content: `El ahorro es la base de la libertad financiera. Cuando ahorras, estás construyendo un colchón de seguridad que te protege ante imprevistos y te permite alcanzar tus metas.\n\n💡 Dato clave: Expertos recomiendan ahorrar al menos el 20% de tus ingresos mensuales.\n\n¿Sabías que guardar incluso $5.000 al mes durante 12 meses te da $60.000 de respaldo?`,
        tip: 'Regla del 50/30/20: 50% necesidades, 30% gustos, 20% ahorro.',
      },
      {
        id: 102,
        title: 'Cómo abrir una cuenta de ahorro',
        content: `En Chile existen múltiples opciones para comenzar a ahorrar formalmente:\n\n🏛️ Bancos tradicionales: BancoEstado, Santander, BCI, Falabella, etc.\n📱 Cuentas digitales: Mercado Pago, MACH, Tenpo, Fintual.\n\nPasos para abrir una cuenta:\n1. Elige un banco o fintech\n2. Prepara tu cédula de identidad\n3. Regístrate en línea o presencialmente\n4. Deposita un monto inicial (puede ser $0)\n5. ¡Listo! Empieza a ahorrar`,
        tip: 'BancoEstado tiene Cuenta RUT gratuita disponible para todos los chilenos desde los 18 años.',
      },
      {
        id: 103,
        title: 'Estrategias de ahorro',
        content: `Existen varias estrategias probadas para ahorrar más:\n\n💰 Método del sobre: Divide tu dinero en sobres por categoría (arriendo, comida, transporte, ahorro).\n\n🎯 Ahorro automático: Programa una transferencia automática al inicio del mes antes de gastar.\n\n📊 Reto 52 semanas: La semana 1 ahorra $1.000, la semana 2 ahorra $2.000... al final del año tendrás $1.378.000.\n\n🚫 Evita las trampas: Compras impulsivas, suscripciones olvidadas, comida fuera de casa en exceso.`,
        tip: 'Automatiza tu ahorro: cuando ahorras primero y gastas lo que sobra, siempre alcanza.',
      },
    ],
    quiz: [101, 102, 103],
  },
  {
    id: 2,
    title: 'Presupuesto Personal',
    icon: '📊',
    color: '#2196F3',
    colorDark: '#1565C0',
    description: 'Controla tus finanzas con un presupuesto real',
    lessons: [
      {
        id: 201,
        title: '¿Qué es un presupuesto?',
        content: `Un presupuesto es un plan que te dice a dónde irá tu dinero ANTES de gastarlo.\n\n📌 Sin presupuesto: gastas y luego te preguntas a dónde fue el dinero.\n📌 Con presupuesto: sabes exactamente cuánto puedes gastar en cada cosa.\n\nNo es una restricción — es una herramienta de libertad. Te permite gastar en lo que realmente importa sin culpa.`,
        tip: 'Un presupuesto bien hecho te permite darte gustos sin preocuparte.',
      },
      {
        id: 202,
        title: 'Crear tu primer presupuesto',
        content: `Paso a paso para hacer tu presupuesto mensual:\n\n1️⃣ Anota tus INGRESOS: beca, trabajo, mesada, etc.\n2️⃣ Lista tus GASTOS FIJOS: arriendo, locomoción, internet.\n3️⃣ Estima tus GASTOS VARIABLES: comida, entretención, ropa.\n4️⃣ Calcula tu BALANCE: ingresos - gastos = ¿sobra o falta?\n5️⃣ Ajusta: reduce gastos variables hasta que sobre dinero.\n\nHerramientas útiles:\n📱 Google Sheets (gratis)\n📱 App "Fintual"\n📱 App "Spendee"\n📱 Simplemente papel y lápiz`,
        tip: 'Revisa tu presupuesto cada semana los primeros 3 meses hasta que se vuelva hábito.',
      },
      {
        id: 203,
        title: 'Gastos hormiga y cómo eliminarlos',
        content: `Los gastos hormiga son pequeños gastos diarios que parecen insignificantes pero sumados destruyen tu presupuesto.\n\n🐜 Ejemplos comunes:\n- Café diario: $1.500 × 22 días = $33.000/mes\n- Agua en botellas: $1.000 × 30 = $30.000/mes\n- Snacks: $2.000 × 20 = $40.000/mes\n- Suscripciones olvidadas: Netflix, Spotify, apps\n\n✅ Solución:\n1. Registra TODOS tus gastos por 1 semana\n2. Identifica los gastos hormiga\n3. Decide cuáles eliminar o reducir\n4. Ese dinero va directo al ahorro`,
        tip: 'Llevar tu propia agua y preparar tu propio café puede ahorrarte más de $60.000 al mes.',
      },
    ],
    quiz: [201, 202, 203],
  },
  {
    id: 3,
    title: 'Inversión Básica',
    icon: '📈',
    color: '#9C27B0',
    colorDark: '#6A1B9A',
    description: 'Haz crecer tu dinero con inversiones seguras',
    lessons: [
      {
        id: 301,
        title: '¿Qué es invertir?',
        content: `Invertir es poner tu dinero a trabajar para generar más dinero. A diferencia del ahorro (que preserva tu dinero), la inversión lo hace crecer.\n\n📊 Comparación real:\n- $100.000 en cuenta corriente en 10 años = $100.000 (pierde valor por inflación)\n- $100.000 en un fondo de inversión al 6% anual en 10 años ≈ $179.000\n\n🔑 Conceptos clave:\n• Rentabilidad: ganancia que genera tu inversión\n• Riesgo: posibilidad de perder parte del dinero\n• Liquidez: qué tan rápido puedes retirar tu dinero`,
        tip: 'A mayor rentabilidad esperada, mayor es el riesgo. No existen inversiones con alta rentabilidad y cero riesgo.',
      },
      {
        id: 302,
        title: 'Opciones para universitarios',
        content: `Inversiones aptas para estudiantes con poco capital:\n\n🟢 BAJO RIESGO (para empezar):\n• APV (Ahorro Previsional Voluntario): beneficio tributario\n• Fondo Mutuo conservador: desde $1.000\n• Fintual "Gomez Normal": rentabilidad ~5-7% anual\n\n🟡 RIESGO MEDIO:\n• Fondo Mutuo balanceado\n• ETFs (fondos cotizados en bolsa)\n• Fintual "Risky Norris"\n\n🔴 RIESGO ALTO (solo cuando tengas conocimiento):\n• Acciones individuales\n• Criptomonedas (Bitcoin, Ethereum)\n• Forex`,
        tip: 'Empieza con $5.000-$10.000 en Fintual para aprender sin arriesgar mucho. Puedes retirar cuando quieras.',
      },
      {
        id: 303,
        title: 'Interés compuesto: la magia del tiempo',
        content: `El interés compuesto es cuando ganas intereses sobre tus intereses. Einstein lo llamó "la octava maravilla del mundo".\n\n📈 Ejemplo real:\nInviertes $50.000/mes desde los 22 años al 7% anual:\n- A los 30 años: $5.800.000\n- A los 40 años: $26.000.000\n- A los 60 años: $260.000.000 🤯\n\nSi empiezas a los 32 años con lo mismo:\n- A los 60 años: solo $65.000.000\n\n⏰ La clave es EMPEZAR TEMPRANO. Cada año que esperas, pierdes décadas de crecimiento.`,
        tip: 'El mejor momento para invertir fue hace 10 años. El segundo mejor momento es HOY.',
      },
    ],
    quiz: [301, 302, 303],
  },
  {
    id: 4,
    title: 'Deudas y Créditos',
    icon: '💳',
    color: '#F44336',
    colorDark: '#C62828',
    description: 'Entiende las deudas y manéjalas sin miedo',
    lessons: [
      {
        id: 401,
        title: 'Buenas y malas deudas',
        content: `No todas las deudas son iguales. Saber distinguirlas es fundamental:\n\n✅ DEUDAS BUENAS (te hacen crecer):\n• Crédito universitario: inviertes en tu futuro\n• Crédito hipotecario: compras un activo\n• Crédito para negocio: genera más ingresos\n\n❌ DEUDAS MALAS (te hacen perder):\n• Tarjeta de crédito rotativa: 30-60% de interés anual\n• Crédito de consumo para viajes/ropa\n• Avance en efectivo con tarjeta\n• Compras en cuotas de artículos que se deprecian`,
        tip: 'Si algo que compras a crédito no genera ingresos ni aumenta de valor, es probablemente una mala deuda.',
      },
      {
        id: 402,
        title: 'Historial crediticio: qué es y cómo cuidarlo',
        content: `Tu historial crediticio es tu "hoja de vida financiera". Las entidades lo revisan antes de prestarte dinero.\n\n📋 ¿Qué lo afecta?\n• DICOM: registro de deudas impagas en Chile\n• Pagos atrasados o no pagados\n• Uso excesivo de crédito disponible\n\n✅ Cómo construir buen historial:\n1. Paga SIEMPRE a tiempo (aunque sea el mínimo)\n2. No uses más del 30% de tu límite de crédito\n3. No abras muchas cuentas al mismo tiempo\n4. Mantén cuentas antiguas activas\n\n🚨 Un mal historial puede impedirte sacar crédito, arrendar departamento o incluso conseguir trabajo.`,
        tip: 'Revisa tu historial gratis en www.boletincomercial.cl o con Equifax Chile.',
      },
      {
        id: 403,
        title: 'Cómo salir de una deuda',
        content: `Si ya tienes deudas, existen estrategias para eliminarlas:\n\n⚡ Método Avalancha (matemáticamente óptimo):\nPaga primero la deuda con mayor tasa de interés, mientras pagas el mínimo de las demás.\n\n🔥 Método Bola de Nieve (psicológicamente efectivo):\nPaga primero la deuda más pequeña para ganar motivación, luego la siguiente.\n\n🔄 Refinanciamiento:\nConsolidar varias deudas en una sola con menor tasa.\n\n⚠️ Señales de alerta:\n• Pagas deudas con otras deudas\n• No sabes cuánto debes en total\n• Gastas más del 30% de ingresos en cuotas`,
        tip: 'Llama a tu banco y pide una reprogramación de deuda. Muchas veces aceptan si eres honesto sobre tu situación.',
      },
    ],
    quiz: [401, 402, 403],
  },
  {
    id: 5,
    title: 'Fondo de Emergencia',
    icon: '🛟',
    color: '#00897B',
    colorDark: '#00695C',
    description: 'Crea tu colchón de seguridad ante imprevistos',
    lessons: [
      {
        id: 501,
        title: '¿Qué es un fondo de emergencia?',
        content: `Un fondo de emergencia es dinero guardado SOLO para imprevistos: una enfermedad, perder tu trabajo, una reparación urgente o cualquier gasto inesperado.\n\n🎯 ¿Para qué sirve?\n• Evita que tengas que endeudarte cuando pasa algo\n• Te da tranquilidad y control\n• Es tu primera red de protección financiera\n\n⚠️ NO es para vacaciones, ropa ni regalos. Es exclusivamente para emergencias reales.`,
        tip: 'Antes de invertir, prioriza armar tu fondo de emergencia. Es la base de toda salud financiera.',
      },
      {
        id: 502,
        title: '¿Cuánto debo juntar?',
        content: `La recomendación general es tener entre 3 y 6 meses de tus gastos esenciales.\n\n🧮 Ejemplo:\nSi tus gastos mensuales (arriendo, comida, transporte, cuentas) son $300.000:\n• Meta mínima: $900.000 (3 meses)\n• Meta ideal: $1.800.000 (6 meses)\n\n📌 Si recién empiezas, una primera meta realista es $250.000–$500.000. Lo importante es comenzar, no la cantidad.\n\n👤 Si tu ingreso es inestable (independiente, freelance), apunta a 6 meses o más.`,
        tip: 'Empieza con una meta pequeña que puedas lograr en 1–2 meses. El hábito importa más que el monto.',
      },
      {
        id: 503,
        title: 'Dónde guardarlo y cómo construirlo',
        content: `Tu fondo de emergencia debe estar SEGURO y DISPONIBLE rápido (líquido), pero separado de tu cuenta del día a día.\n\n✅ Buenos lugares:\n• Cuenta de ahorro separada\n• Depósito a plazo renovable\n• Fondo mutuo conservador (bajo riesgo)\n\n❌ Malos lugares:\n• En efectivo en casa (riesgo e inflación)\n• En inversiones de riesgo (acciones, cripto): pueden bajar justo cuando lo necesitas\n\n🔨 Cómo construirlo:\n1. Define tu meta\n2. Automatiza un aporte mensual fijo\n3. No lo toques salvo emergencia real\n4. Si lo usas, repónlo cuanto antes`,
        tip: 'Ábrete una cuenta aparte solo para el fondo. Si no lo ves, no lo gastas.',
      },
    ],
    quiz: [501, 502, 503],
  },
  {
    id: 6,
    title: 'Estafas y Seguridad',
    icon: '🛡️',
    color: '#D32F2F',
    colorDark: '#B71C1C',
    description: 'Protege tu dinero y tus datos de los fraudes',
    lessons: [
      {
        id: 601,
        title: 'Phishing y fraudes digitales',
        content: `El phishing es cuando alguien se hace pasar por tu banco, una empresa o el Estado para robarte claves o datos.\n\n🎣 Señales de alerta:\n• Mensajes "urgentes" que te apuran a actuar\n• Links raros o acortados\n• Te piden tu clave, código o datos de tarjeta\n• Errores de ortografía o remitentes extraños\n\n🛑 Reglas de oro:\n1. Tu banco NUNCA te pide la clave por correo, SMS o WhatsApp\n2. No hagas clic en links de mensajes no solicitados\n3. Entra siempre escribiendo tú la dirección o desde la app oficial\n4. Nunca compartas códigos de verificación (SMS)`,
        tip: 'Si dudas, cuelga y llama tú al número oficial que aparece en el reverso de tu tarjeta.',
      },
      {
        id: 602,
        title: 'Estafas piramidales y "inversiones milagro"',
        content: `Si una "inversión" promete ganancias altas, rápidas y "sin riesgo", es casi seguro una estafa.\n\n🚩 Esquemas Ponzi / piramidales:\n• Pagan a los primeros con el dinero de los nuevos\n• Te presionan a "invitar amigos" para ganar\n• No hay un negocio real detrás\n\n💸 Otras trampas comunes:\n• "Duplica tu dinero en una semana"\n• Cripto o trading con "rentabilidad garantizada"\n• Influencers que cobran por señales secretas\n\n✅ Antes de invertir, verifica que la empresa esté registrada en la CMF (Comisión para el Mercado Financiero) en Chile.`,
        tip: 'Rentabilidad alta + cero riesgo + urgencia = estafa. No existe el dinero fácil garantizado.',
      },
      {
        id: 603,
        title: 'Hábitos de seguridad financiera',
        content: `Pequeños hábitos que protegen tu dinero todos los días:\n\n🔐 Claves:\n• Usa claves distintas para el banco y otras apps\n• Activa la verificación en dos pasos\n• No guardes tu clave en notas del teléfono\n\n📱 Dispositivos:\n• Bloquea tu celular con PIN o huella\n• No uses WiFi público para entrar al banco\n• Mantén apps y sistema actualizados\n\n💳 Tarjetas:\n• Revisa tus movimientos seguido\n• Activa notificaciones de cada compra\n• Si pierdes la tarjeta, bloquéala de inmediato desde la app\n\n🆘 Si te estafaron: bloquea tus tarjetas, cambia claves, y haz la denuncia en tu banco y en la PDI.`,
        tip: 'Activa las notificaciones de compra: te enteras al instante si alguien usa tu tarjeta.',
      },
    ],
    quiz: [601, 602, 603],
  },
  {
    id: 7,
    title: 'AFP y Previsión',
    icon: '👵',
    color: '#5E35B1',
    colorDark: '#4527A0',
    description: 'Entiende tu jubilación y empieza a cuidarla hoy',
    lessons: [
      {
        id: 701,
        title: '¿Cómo funciona la AFP en Chile?',
        content: `En Chile, mientras trabajas con contrato, un 10% de tu sueldo se descuenta y va a tu cuenta individual en una AFP (Administradora de Fondos de Pensiones).\n\n🏦 Conceptos clave:\n• Es TU dinero, en una cuenta a tu nombre\n• La AFP lo invierte para que crezca con el tiempo\n• Cobra una comisión por administrarlo\n• Cuando te jubilas, financia tu pensión\n\n📊 Mientras más temprano y constante cotices, mayor será tu pensión, gracias al interés compuesto a lo largo de décadas.`,
        tip: 'Revisa tu cartola en la web de tu AFP: cuánto tienes acumulado y cuánto te cobran de comisión.',
      },
      {
        id: 702,
        title: 'Multifondos: del A al E',
        content: `Tu dinero en la AFP se invierte en uno de 5 multifondos, según cuánto riesgo asumen:\n\n🔴 Fondo A: más riesgo, más acciones. Mayor crecimiento posible, más variable.\n🟠 Fondo B: riesgoso.\n🟡 Fondo C: intermedio.\n🟢 Fondo D: conservador.\n🔵 Fondo E: el más seguro, casi sin acciones. Crece poco pero es estable.\n\n⏳ Regla general:\n• Si te faltan muchos años para jubilar (eres joven): puedes asumir más riesgo (A o B) porque hay tiempo para recuperarse.\n• Si estás cerca de jubilar: conviene moverse a fondos más seguros (D o E).\n\nNo decidir también es una decisión: te asignan un fondo por defecto según tu edad.`,
        tip: 'Siendo joven, mantener tu dinero en el fondo E "por seguridad" puede costarte mucho crecimiento a largo plazo.',
      },
      {
        id: 703,
        title: 'APV: ahorro extra con beneficios',
        content: `El APV (Ahorro Previsional Voluntario) es dinero EXTRA que aportas, además del 10% obligatorio, para mejorar tu futura pensión.\n\n💡 ¿Por qué hacerlo?\n• Beneficios tributarios: pagas menos impuestos hoy\n• Crece con el tiempo gracias al interés compuesto\n• Puedes aportar desde montos bajos\n\n🏛️ Dos regímenes:\n• Régimen A: el Estado te da una bonificación (15% de lo que ahorres, con tope)\n• Régimen B: rebaja la base de tu impuesto a la renta\n\n📌 Lo puedes contratar en AFP, bancos o aseguradoras. Ideal si ya tienes tu fondo de emergencia armado.`,
        tip: 'Si recién empiezas a trabajar, un APV pequeño y automático hoy vale más que uno grande en 20 años más.',
      },
    ],
    quiz: [701, 702, 703],
  },
  {
    id: 8,
    title: 'Impuestos y SII',
    icon: '🧾',
    color: '#F9A825',
    colorDark: '#F57F17',
    description: 'Lo básico de impuestos para no llevarte sorpresas',
    lessons: [
      {
        id: 801,
        title: 'Impuestos básicos en Chile',
        content: `Los impuestos financian servicios públicos (salud, educación, calles). Los más comunes que te afectan:\n\n🛒 IVA (19%): incluido en casi todo lo que compras. Ya viene en el precio.\n\n💼 Impuesto a la Renta: se aplica sobre lo que ganas trabajando o invirtiendo. Es progresivo: quien gana más, paga un porcentaje mayor. Muchos sueldos bajos quedan exentos.\n\n🏠 Contribuciones: las pagan los dueños de propiedades de cierto valor.\n\n🏛️ El SII (Servicio de Impuestos Internos) es el organismo que administra y fiscaliza los impuestos en Chile.`,
        tip: 'El IVA ya está incluido en el precio de la tienda: ese 19% lo pagas en casi cada compra sin darte cuenta.',
      },
      {
        id: 802,
        title: 'Boletas, honorarios y retención',
        content: `Si trabajas de forma independiente (freelance, servicios), emites BOLETAS DE HONORARIOS a través del sitio del SII.\n\n📄 Cómo funciona:\n• Por cada boleta se retiene un porcentaje (la "retención") como adelanto de impuestos\n• Esa retención ha ido subiendo año a año (ronda el 14–15%)\n• En la Operación Renta se ajusta: te devuelven o te cobran según corresponda\n\n💡 Consejo clave:\nGuarda mensualmente una parte de cada boleta (10–15%) en una cuenta aparte. Así, si en abril te toca pagar, no te agarra desprevenido.`,
        tip: 'Aparta un % de cada boleta de honorarios apenas te pagan. Tu "yo" de abril te lo agradecerá.',
      },
      {
        id: 803,
        title: 'Operación Renta: declarar en abril',
        content: `Cada abril, en Chile se hace la Operación Renta: declaras ante el SII lo que ganaste el año anterior.\n\n📅 ¿Qué pasa?\n• El SII ya tiene mucha información y te muestra una propuesta\n• Si te retuvieron de más durante el año → te DEVUELVEN dinero 💰\n• Si faltó → te toca PAGAR la diferencia\n\n✅ Para que te devuelvan más (o pagues menos):\n• Un APV puede rebajar tu impuesto\n• Créditos hipotecarios y otros gastos pueden ayudar\n\n👶 Si eres trabajador dependiente con sueldo bajo, normalmente no tienes que hacer nada o incluso recibes devolución. Aun así, revisa tu propuesta en el sitio del SII.`,
        tip: 'Aunque ganes poco, revisa tu propuesta del SII en abril: a veces hay devoluciones esperando por ti.',
      },
    ],
    quiz: [801, 802, 803],
  },
];

export const getModuleById = (id) => MODULES.find(m => m.id === id);
export const getLessonById = (moduleId, lessonId) => {
  const mod = getModuleById(moduleId);
  return mod?.lessons.find(l => l.id === lessonId);
};
