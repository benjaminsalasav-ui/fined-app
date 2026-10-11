export const ACHIEVEMENTS = [
  // Primeros pasos
  {
    id: 'first_lesson',
    title: 'Primer Paso',
    description: 'Completa tu primera lección',
    icon: '🌱',
    condition: (stats) => stats.lessonsCompleted >= 1,
    points: 10,
  },
  {
    id: 'first_quiz',
    title: 'Cerebro Financiero',
    description: 'Completa tu primer quiz',
    icon: '🧠',
    condition: (stats) => stats.quizzesCompleted >= 1,
    points: 15,
  },
  // Módulos
  {
    id: 'module_ahorro',
    title: 'Ahorrador',
    description: 'Completa el módulo de Ahorro',
    icon: '🏦',
    condition: (stats) => stats.modulesCompleted.includes(1),
    points: 50,
  },
  {
    id: 'module_presupuesto',
    title: 'Planificador',
    description: 'Completa el módulo de Presupuesto',
    icon: '📊',
    condition: (stats) => stats.modulesCompleted.includes(2),
    points: 50,
  },
  {
    id: 'module_inversion',
    title: 'Inversor',
    description: 'Completa el módulo de Inversión',
    icon: '📈',
    condition: (stats) => stats.modulesCompleted.includes(3),
    points: 50,
  },
  {
    id: 'module_deudas',
    title: 'Libre de Deudas',
    description: 'Completa el módulo de Deudas',
    icon: '💳',
    condition: (stats) => stats.modulesCompleted.includes(4),
    points: 50,
  },
  // Quizzes
  {
    id: 'quiz_perfect',
    title: 'Perfección',
    description: 'Obtén 100% en un quiz',
    icon: '⭐',
    condition: (stats) => stats.perfectQuizzes >= 1,
    points: 25,
  },
  {
    id: 'quiz_5',
    title: 'Estudiante Aplicado',
    description: 'Completa 5 quizzes',
    icon: '📝',
    condition: (stats) => stats.quizzesCompleted >= 5,
    points: 30,
  },
  // Constancia
  {
    id: 'lessons_5',
    title: 'En Racha',
    description: 'Completa 5 lecciones',
    icon: '🔥',
    condition: (stats) => stats.lessonsCompleted >= 5,
    points: 30,
  },
  {
    id: 'all_modules',
    title: 'Experto Financiero',
    description: 'Completa todos los módulos',
    icon: '🏆',
    condition: (stats) => stats.modulesCompleted.length >= 8,
    points: 200,
  },
  // Módulos nuevos
  {
    id: 'module_emergencia',
    title: 'Preparado',
    description: 'Completa el módulo de Fondo de Emergencia',
    icon: '🛟',
    condition: (stats) => stats.modulesCompleted.includes(5),
    points: 50,
  },
  {
    id: 'module_seguridad',
    title: 'A Prueba de Estafas',
    description: 'Completa el módulo de Estafas y Seguridad',
    icon: '🛡️',
    condition: (stats) => stats.modulesCompleted.includes(6),
    points: 50,
  },
  {
    id: 'module_prevision',
    title: 'Visión de Futuro',
    description: 'Completa el módulo de AFP y Previsión',
    icon: '👵',
    condition: (stats) => stats.modulesCompleted.includes(7),
    points: 50,
  },
  {
    id: 'module_impuestos',
    title: 'Al Día con el SII',
    description: 'Completa el módulo de Impuestos y SII',
    icon: '🧾',
    condition: (stats) => stats.modulesCompleted.includes(8),
    points: 50,
  },
  // Simulador
  {
    id: 'simulator_1',
    title: 'Tomador de Decisiones',
    description: 'Completa 1 simulación financiera',
    icon: '🎮',
    condition: (stats) => stats.simulationsCompleted >= 1,
    points: 20,
  },
  {
    id: 'simulator_3',
    title: 'Estratega Financiero',
    description: 'Completa 3 simulaciones financieras',
    icon: '🎯',
    condition: (stats) => stats.simulationsCompleted >= 3,
    points: 40,
  },
];

export const checkNewAchievements = (stats, unlockedIds) => {
  return ACHIEVEMENTS.filter(
    a => !unlockedIds.includes(a.id) && a.condition(stats)
  );
};
