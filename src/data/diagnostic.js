// Quiz inicial de DIAGNÓSTICO: mide los conocimientos previos del usuario
// para clasificar su nivel y recomendarle por dónde empezar.
// No bloquea contenido: todos los módulos quedan disponibles.

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'd1',
    topic: 'Ahorro',
    question: 'Según la regla 50/30/20, ¿qué porcentaje de tus ingresos deberías ahorrar?',
    options: ['5%', '20%', '40%', '50%'],
    correct: 1,
  },
  {
    id: 'd2',
    topic: 'Presupuesto',
    question: '¿Qué son los "gastos hormiga"?',
    options: [
      'Gastos en comida para mascotas',
      'Pequeños gastos diarios que sumados son significativos',
      'Deudas grandes de largo plazo',
      'Gastos del arriendo',
    ],
    correct: 1,
  },
  {
    id: 'd3',
    topic: 'Inversión',
    question: '¿Qué es el interés compuesto?',
    options: [
      'Un impuesto sobre las inversiones',
      'Ganar intereses sobre tus intereses acumulados',
      'El interés que cobran los bancos por un préstamo',
      'Una comisión fija mensual',
    ],
    correct: 1,
  },
  {
    id: 'd4',
    topic: 'Inversión',
    question: 'En finanzas, ¿qué relación hay entre rentabilidad y riesgo?',
    options: [
      'A mayor rentabilidad esperada, mayor riesgo',
      'A mayor rentabilidad, menor riesgo',
      'No tienen ninguna relación',
      'El riesgo no existe si inviertes a largo plazo',
    ],
    correct: 0,
  },
  {
    id: 'd5',
    topic: 'Deudas',
    question: '¿Cuál de estas se considera una "deuda buena"?',
    options: [
      'Avance en efectivo con tarjeta',
      'Crédito de consumo para vacaciones',
      'Crédito para estudiar una carrera',
      'Comprar ropa en 12 cuotas',
    ],
    correct: 2,
  },
  {
    id: 'd6',
    topic: 'Deudas',
    question: '¿Qué es DICOM en Chile?',
    options: [
      'Un banco digital',
      'Un registro de deudas impagas que afecta tu historial crediticio',
      'Una app de inversiones',
      'Un beneficio del Estado',
    ],
    correct: 1,
  },
  {
    id: 'd7',
    topic: 'Fondo de emergencia',
    question: '¿Cuántos meses de gastos suele recomendarse tener en un fondo de emergencia?',
    options: ['Medio mes', '1 semana', '3 a 6 meses', '5 años'],
    correct: 2,
  },
  {
    id: 'd8',
    topic: 'Previsión',
    question: 'En Chile, ¿qué es el APV?',
    options: [
      'Un tipo de tarjeta de crédito',
      'Ahorro Previsional Voluntario, con beneficios tributarios',
      'Un seguro de salud obligatorio',
      'Un crédito hipotecario estatal',
    ],
    correct: 1,
  },
  {
    id: 'd9',
    topic: 'Seguridad financiera',
    question: 'Recibes un correo de tu "banco" pidiendo tu clave por un link urgente. ¿Qué es?',
    options: [
      'Un trámite normal del banco',
      'Phishing: un intento de estafa para robar tus datos',
      'Una promoción legítima',
      'Una actualización de seguridad',
    ],
    correct: 1,
  },
  {
    id: 'd10',
    topic: 'Impuestos',
    question: 'En Chile, ¿qué es la Operación Renta?',
    options: [
      'El proceso anual de declaración de impuestos a la renta ante el SII',
      'Un préstamo del banco',
      'Una inversión en la bolsa',
      'Un bono del Estado',
    ],
    correct: 0,
  },
];

// Clasifica el nivel según el puntaje (de 10 preguntas).
export function classifyLevel(score) {
  if (score <= 3) {
    return {
      level: 'Principiante',
      emoji: '🌱',
      color: '#4CAF50',
      message: 'Estás empezando tu camino financiero. ¡Perfecto! Te acompañaremos desde lo básico.',
      recommendedModuleId: 1, // Ahorro Inteligente
      recommendedLabel: 'Ahorro Inteligente',
    };
  }
  if (score <= 7) {
    return {
      level: 'Intermedio',
      emoji: '📊',
      color: '#2196F3',
      message: 'Ya manejas conceptos clave. Te recomendamos reforzar presupuesto e inversión.',
      recommendedModuleId: 3, // Inversión Básica
      recommendedLabel: 'Inversión Básica',
    };
  }
  return {
    level: 'Avanzado',
    emoji: '🚀',
    color: '#9C27B0',
    message: '¡Excelente base! Profundiza en temas como previsión, impuestos y deudas.',
    recommendedModuleId: 7, // AFP y Previsión
    recommendedLabel: 'AFP y Previsión',
  };
}
