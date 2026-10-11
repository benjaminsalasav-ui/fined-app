export const QUIZ_QUESTIONS = {
  // MÓDULO 1: Ahorro
  101: [
    {
      question: '¿Cuánto recomienda el método 50/30/20 destinar al ahorro?',
      options: ['10%', '20%', '30%', '50%'],
      correct: 1,
      explanation: 'El método 50/30/20 sugiere ahorrar el 20% de tus ingresos, gastar el 50% en necesidades y el 30% en gustos.',
    },
    {
      question: '¿Cuál es la principal ventaja de ahorrar formalmente en un banco?',
      options: ['Ganar puntos', 'Seguridad y posibles intereses', 'Descuentos en compras', 'Tarjeta de crédito gratis'],
      correct: 1,
      explanation: 'Un banco te ofrece seguridad (tu dinero está protegido) y en algunos productos recibes intereses.',
    },
  ],
  102: [
    {
      question: '¿Qué documento necesitas para abrir una cuenta bancaria en Chile?',
      options: ['Pasaporte', 'Cédula de identidad', 'Licencia de conducir', 'Certificado de alumno regular'],
      correct: 1,
      explanation: 'La cédula de identidad chilena es el documento básico requerido para abrir la mayoría de las cuentas bancarias.',
    },
    {
      question: '¿Cuál es la cuenta bancaria gratuita disponible para todos los chilenos?',
      options: ['Cuenta Corriente Santander', 'Cuenta RUT BancoEstado', 'Cuenta Digital BCI', 'Cuenta MACH'],
      correct: 1,
      explanation: 'La Cuenta RUT de BancoEstado es gratuita y está disponible para todos los chilenos con RUT válido, sin necesidad de ingresos mínimos.',
    },
  ],
  103: [
    {
      question: '¿Cuánto dinero acumulas en el reto 52 semanas al finalizar el año?',
      options: ['$520.000', '$1.000.000', '$1.378.000', '$2.000.000'],
      correct: 2,
      explanation: 'En el reto 52 semanas, ahorras $1.000 la semana 1, $2.000 la semana 2, etc. Al sumar 1+2+3...+52 semanas en miles, da $1.378.000.',
    },
    {
      question: '¿Cuál es la estrategia que consiste en separar el dinero en categorías físicas?',
      options: ['Ahorro automático', 'Método del sobre', 'Reto 52 semanas', 'Regla del 50/30/20'],
      correct: 1,
      explanation: 'El método del sobre consiste en dividir tu dinero en efectivo en sobres etiquetados por categoría de gasto.',
    },
  ],
  // MÓDULO 2: Presupuesto
  201: [
    {
      question: '¿Cuál es la principal diferencia entre presupuesto y control de gastos?',
      options: [
        'Son lo mismo',
        'El presupuesto planifica ANTES de gastar; el control registra DESPUÉS',
        'El presupuesto solo aplica a empresas',
        'El control de gastos es más efectivo',
      ],
      correct: 1,
      explanation: 'El presupuesto es un plan previo que decide a dónde irá tu dinero, mientras que el control de gastos solo registra lo que ya gastaste.',
    },
    {
      question: '¿Por qué es importante hacer un presupuesto?',
      options: [
        'Para no gastar en nada',
        'Porque lo exige el banco',
        'Para saber cuánto puedes gastar en cada cosa y no quedarte sin dinero',
        'Solo es útil si ganas mucho dinero',
      ],
      correct: 2,
      explanation: 'Un presupuesto te da control y claridad sobre tus finanzas, permitiéndote gastar conscientemente en lo que más valoras.',
    },
  ],
  202: [
    {
      question: '¿Cuál es el primer paso para crear un presupuesto personal?',
      options: ['Listar gastos variables', 'Anotar tus ingresos', 'Calcular el balance', 'Reducir gastos'],
      correct: 1,
      explanation: 'Siempre debes empezar por saber cuánto dinero tienes disponible (ingresos) antes de planificar en qué lo gastas.',
    },
    {
      question: '¿Cuál de estas NO es una herramienta para hacer presupuesto?',
      options: ['Google Sheets', 'App Spendee', 'Papel y lápiz', 'TikTok'],
      correct: 3,
      explanation: 'TikTok es una red social de entretenimiento, no una herramienta de presupuesto personal.',
    },
  ],
  203: [
    {
      question: '¿Cuánto puedes gastar en café diario en un mes si lo compras todos los días hábiles a $1.500?',
      options: ['$15.000', '$25.000', '$33.000', '$45.000'],
      correct: 2,
      explanation: '$1.500 × 22 días hábiles = $33.000 al mes. Preparar tu propio café puede ahorrarte esa cantidad.',
    },
    {
      question: '¿Qué son los "gastos hormiga"?',
      options: [
        'Gastos en alimentos para mascotas',
        'Pequeños gastos diarios que sumados son significativos',
        'Deudas en cuotas pequeñas',
        'Compras en supermercado',
      ],
      correct: 1,
      explanation: 'Los gastos hormiga son pequeños desembolsos cotidianos que individualmente parecen insignificantes, pero al sumarlos en el mes representan una cantidad importante.',
    },
  ],
  // MÓDULO 3: Inversión
  301: [
    {
      question: '¿Cuál es la principal diferencia entre ahorrar e invertir?',
      options: [
        'No hay diferencia',
        'Ahorrar genera más dinero',
        'Invertir hace crecer el dinero; ahorrar solo lo preserva',
        'Solo los ricos pueden invertir',
      ],
      correct: 2,
      explanation: 'Ahorrar protege tu dinero de gastos, pero la inflación lo reduce en valor. Invertir busca hacer crecer el dinero por encima de la inflación.',
    },
    {
      question: '¿Qué relación existe entre rentabilidad y riesgo?',
      options: [
        'A mayor rentabilidad, menor riesgo',
        'No existe relación entre ambos',
        'A mayor rentabilidad esperada, mayor es el riesgo',
        'El riesgo no importa en inversiones',
      ],
      correct: 2,
      explanation: 'En finanzas, siempre existe una relación directa: si algo promete alta rentabilidad sin riesgo, probablemente sea una estafa.',
    },
  ],
  302: [
    {
      question: '¿Cuál de estas inversiones tiene el menor riesgo para un principiante?',
      options: ['Criptomonedas', 'Acciones individuales', 'Fondo Mutuo conservador', 'Forex'],
      correct: 2,
      explanation: 'Los fondos mutuos conservadores invierten en instrumentos de bajo riesgo como depósitos a plazo y bonos del gobierno, ideales para comenzar.',
    },
    {
      question: '¿Desde cuánto puedes invertir en un Fondo Mutuo en Chile?',
      options: ['$100.000', '$50.000', '$1.000', '$500.000'],
      correct: 2,
      explanation: 'Plataformas como Fintual permiten invertir desde $1.000, haciendo la inversión accesible para cualquier estudiante.',
    },
  ],
  303: [
    {
      question: '¿Qué es el interés compuesto?',
      options: [
        'Interés que se cobra en deudas',
        'Ganar intereses sobre tus intereses acumulados',
        'Un tipo de cuenta bancaria',
        'El interés promedio del mercado',
      ],
      correct: 1,
      explanation: 'El interés compuesto significa que los intereses que ganas se suman al capital y generan más intereses, creando un efecto de crecimiento exponencial.',
    },
    {
      question: '¿Por qué es importante empezar a invertir joven?',
      options: [
        'Porque los jóvenes pagan menos impuestos',
        'Porque el interés compuesto necesita tiempo para crecer',
        'Porque los mercados son más estables cuando eres joven',
        'No importa la edad para invertir',
      ],
      correct: 1,
      explanation: 'El interés compuesto funciona mejor con tiempo. Empezar a los 22 vs. los 32 puede significar tener 4 veces más dinero al jubilarte.',
    },
  ],
  // MÓDULO 4: Deudas
  401: [
    {
      question: '¿Cuál de estas es un ejemplo de "deuda buena"?',
      options: [
        'Tarjeta de crédito para vacaciones',
        'Crédito de consumo para ropa',
        'Crédito universitario',
        'Avance en efectivo',
      ],
      correct: 2,
      explanation: 'El crédito universitario invierte en tu capacidad de generar ingresos futuros, por eso es considerado una deuda buena.',
    },
    {
      question: '¿Cuál es la tasa de interés anual aproximada de una tarjeta de crédito rotativa en Chile?',
      options: ['5-10%', '15-20%', '30-60%', '1-3%'],
      correct: 2,
      explanation: 'Las tarjetas de crédito en modalidad rotativa (solo pago mínimo) pueden cobrar entre 30% y 60% anual, una de las tasas más altas del mercado.',
    },
  ],
  402: [
    {
      question: '¿Qué es DICOM en Chile?',
      options: [
        'Un banco digital',
        'Un registro de deudas impagas que afecta el historial crediticio',
        'Una app de finanzas personales',
        'Un beneficio tributario',
      ],
      correct: 1,
      explanation: 'DICOM (ahora Equifax) es el principal registro de morosidad en Chile. Estar en DICOM dificulta obtener créditos y puede afectar arrendamientos y trabajo.',
    },
    {
      question: '¿Qué porcentaje máximo de tu límite de crédito deberías usar para mantener buen historial?',
      options: ['10%', '30%', '60%', '100%'],
      correct: 1,
      explanation: 'Usar menos del 30% de tu límite de crédito disponible es una señal de buena gestión financiera para las instituciones crediticias.',
    },
  ],
  403: [
    {
      question: '¿Cuál método de pago de deudas es matemáticamente más eficiente?',
      options: [
        'Método Bola de Nieve',
        'Método Avalancha',
        'Pagar todas en igual proporción',
        'Solo pagar el mínimo',
      ],
      correct: 1,
      explanation: 'El Método Avalancha (pagar primero la deuda de mayor interés) minimiza el total de intereses pagados, aunque psicológicamente puede ser más difícil.',
    },
    {
      question: '¿Cuál es una señal de alerta de sobreendeudamiento?',
      options: [
        'Tener una tarjeta de crédito',
        'Pagar deudas con otras deudas',
        'Tener un crédito universitario',
        'Usar la tarjeta para el supermercado',
      ],
      correct: 1,
      explanation: 'Pagar deudas con otras deudas (como sacar un avance para pagar la tarjeta) es una espiral peligrosa que indica sobreendeudamiento.',
    },
  ],
  // MÓDULO 5: Fondo de Emergencia
  501: [
    {
      question: '¿Para qué sirve un fondo de emergencia?',
      options: [
        'Para pagar las vacaciones de fin de año',
        'Para cubrir imprevistos sin tener que endeudarte',
        'Para invertir en acciones de riesgo',
        'Para comprar ropa nueva cada mes',
      ],
      correct: 1,
      explanation: 'El fondo de emergencia es dinero reservado exclusivamente para imprevistos (salud, perder el trabajo, reparaciones), evitando que te endeudes cuando ocurren.',
    },
    {
      question: '¿Cuál NO es un uso válido del fondo de emergencia?',
      options: [
        'Una urgencia médica',
        'Quedarte sin trabajo',
        'Una oferta de zapatillas en liquidación',
        'Reparar el refrigerador que se echó a perder',
      ],
      correct: 2,
      explanation: 'El fondo es solo para emergencias reales e inesperadas. Una oferta no es una emergencia.',
    },
  ],
  502: [
    {
      question: '¿Cuántos meses de gastos se recomienda tener en el fondo de emergencia?',
      options: ['Medio mes', '1 semana', '3 a 6 meses', '10 años'],
      correct: 2,
      explanation: 'La recomendación general es acumular entre 3 y 6 meses de tus gastos esenciales.',
    },
    {
      question: 'Si tus gastos esenciales son $300.000 al mes, ¿cuál sería una meta ideal de 6 meses?',
      options: ['$300.000', '$900.000', '$1.800.000', '$3.600.000'],
      correct: 2,
      explanation: '$300.000 × 6 meses = $1.800.000. Para una persona con ingresos inestables, 6 meses es lo recomendable.',
    },
  ],
  503: [
    {
      question: '¿Dónde es mejor mantener tu fondo de emergencia?',
      options: [
        'En acciones y criptomonedas',
        'En efectivo bajo el colchón',
        'En una cuenta de ahorro o fondo conservador, separado y disponible',
        'Prestado a un amigo',
      ],
      correct: 2,
      explanation: 'Debe estar seguro y líquido (disponible rápido), pero separado de tu cuenta diaria. Las inversiones de riesgo pueden bajar justo cuando lo necesitas.',
    },
    {
      question: '¿Cuál es una buena forma de construir tu fondo?',
      options: [
        'Esperar a que sobre dinero a fin de mes',
        'Automatizar un aporte mensual fijo apenas recibes ingresos',
        'Usar la tarjeta de crédito',
        'Pedir un préstamo para juntarlo de una vez',
      ],
      correct: 1,
      explanation: 'Automatizar un aporte fijo al inicio del mes (pagarte a ti primero) es la forma más efectiva de construir el hábito.',
    },
  ],
  // MÓDULO 6: Estafas y Seguridad
  601: [
    {
      question: 'Recibes un SMS de tu "banco" con un link urgente para "validar tu clave". ¿Qué haces?',
      options: [
        'Hago clic e ingreso mi clave rápido',
        'No hago clic; entro a la app oficial o llamo al banco yo mismo',
        'Respondo el SMS con mis datos',
        'Reenvío el mensaje a mis contactos',
      ],
      correct: 1,
      explanation: 'Es phishing. Tu banco nunca pide claves por SMS. Nunca hagas clic en esos links; verifica siempre por canales oficiales.',
    },
    {
      question: '¿Cuál de estas afirmaciones es VERDADERA?',
      options: [
        'El banco a veces pide tu clave por correo',
        'Es seguro compartir el código de verificación que llega por SMS',
        'Tu banco NUNCA te pide la clave por correo, SMS o WhatsApp',
        'Los links acortados siempre son seguros',
      ],
      correct: 2,
      explanation: 'Ninguna institución seria te pedirá tu clave o código por mensaje. Esa es la regla de oro contra el phishing.',
    },
  ],
  602: [
    {
      question: 'Una "inversión" promete duplicar tu dinero en una semana sin riesgo y te pide invitar amigos. ¿Qué es?',
      options: [
        'Una gran oportunidad',
        'Un fondo mutuo conservador',
        'Una estafa piramidal / Ponzi',
        'Un depósito a plazo',
      ],
      correct: 2,
      explanation: 'Alta rentabilidad + sin riesgo + presión por reclutar gente son señales clásicas de un esquema piramidal.',
    },
    {
      question: 'En Chile, ¿cómo verificas si una empresa puede ofrecer inversiones legalmente?',
      options: [
        'Preguntando en redes sociales',
        'Revisando que esté registrada en la CMF',
        'Confiando en los testimonios de influencers',
        'Si tiene muchos seguidores en Instagram',
      ],
      correct: 1,
      explanation: 'La CMF (Comisión para el Mercado Financiero) regula y registra a las entidades autorizadas. Siempre verifica ahí antes de invertir.',
    },
  ],
  603: [
    {
      question: '¿Cuál es un buen hábito de seguridad financiera?',
      options: [
        'Usar la misma clave para todo',
        'Activar la verificación en dos pasos y notificaciones de compra',
        'Entrar al banco desde WiFi público',
        'Guardar la clave en una nota del teléfono',
      ],
      correct: 1,
      explanation: 'La verificación en dos pasos y las notificaciones de cada compra te avisan al instante de actividad sospechosa.',
    },
    {
      question: 'Si crees que fuiste víctima de una estafa, ¿qué deberías hacer primero?',
      options: [
        'Esperar a ver si se soluciona solo',
        'Bloquear tus tarjetas, cambiar claves y denunciar al banco y la PDI',
        'Compartirlo en redes y nada más',
        'Sacar un crédito para reponer el dinero',
      ],
      correct: 1,
      explanation: 'Actuar rápido limita el daño: bloquea tus medios de pago, cambia tus claves y haz la denuncia formal.',
    },
  ],
  // MÓDULO 7: AFP y Previsión
  701: [
    {
      question: 'En Chile, ¿qué porcentaje de tu sueldo se destina obligatoriamente a tu AFP?',
      options: ['2%', '10%', '19%', '50%'],
      correct: 1,
      explanation: 'Un 10% de tu remuneración imponible se descuenta y va a tu cuenta individual en la AFP para tu futura pensión.',
    },
    {
      question: 'El dinero que tienes en la AFP es...',
      options: [
        'Del Estado',
        'Del banco',
        'Tuyo, en una cuenta individual a tu nombre',
        'De la AFP',
      ],
      correct: 2,
      explanation: 'Es tu dinero, en una cuenta individual a tu nombre. La AFP solo lo administra e invierte a cambio de una comisión.',
    },
  ],
  702: [
    {
      question: 'Entre los multifondos, ¿cuál es el MÁS conservador (menor riesgo)?',
      options: ['Fondo A', 'Fondo C', 'Fondo E', 'Fondo B'],
      correct: 2,
      explanation: 'El Fondo E es el más seguro (casi sin acciones): crece poco pero es muy estable. El Fondo A es el de mayor riesgo.',
    },
    {
      question: 'Eres joven y te faltan 35 años para jubilar. ¿Qué suele recomendarse?',
      options: [
        'Estar en el fondo más conservador (E) por seguridad',
        'Poder asumir más riesgo (A o B), porque hay tiempo para recuperarse',
        'Retirar todo el dinero ahora',
        'Da igual, no afecta tu pensión',
      ],
      correct: 1,
      explanation: 'Con muchos años por delante, asumir más riesgo puede generar mayor crecimiento, ya que hay tiempo para recuperarse de las bajas.',
    },
  ],
  703: [
    {
      question: '¿Qué es el APV?',
      options: [
        'Un impuesto a la pensión',
        'Ahorro Previsional Voluntario: aporte extra con beneficios tributarios',
        'Un tipo de crédito de consumo',
        'Una comisión de la AFP',
      ],
      correct: 1,
      explanation: 'El APV es ahorro voluntario adicional al 10% obligatorio, que mejora tu pensión y ofrece beneficios tributarios.',
    },
    {
      question: '¿Cuál es una ventaja principal del APV?',
      options: [
        'Te permite no pagar nunca impuestos',
        'Beneficios tributarios y crecimiento por interés compuesto',
        'Garantiza duplicar tu dinero en un año',
        'Reemplaza tu fondo de emergencia',
      ],
      correct: 1,
      explanation: 'El APV ofrece beneficios tributarios hoy y crece con el tiempo. Es ideal una vez que ya tienes tu fondo de emergencia armado.',
    },
  ],
  // MÓDULO 8: Impuestos y SII
  801: [
    {
      question: '¿Qué porcentaje de IVA se aplica en Chile a la mayoría de las compras?',
      options: ['5%', '10%', '19%', '30%'],
      correct: 2,
      explanation: 'El IVA en Chile es de 19% y normalmente ya viene incluido en el precio que ves en la tienda.',
    },
    {
      question: '¿Qué organismo administra y fiscaliza los impuestos en Chile?',
      options: ['La AFP', 'El SII (Servicio de Impuestos Internos)', 'La CMF', 'El Banco Central'],
      correct: 1,
      explanation: 'El SII (Servicio de Impuestos Internos) es el encargado de administrar y fiscalizar los impuestos en Chile.',
    },
  ],
  802: [
    {
      question: 'Si trabajas como independiente y emites boletas de honorarios, ¿qué es la "retención"?',
      options: [
        'Una multa por no declarar',
        'Un porcentaje que se descuenta como adelanto de impuestos',
        'Una comisión del banco',
        'Un bono que te entrega el Estado',
      ],
      correct: 1,
      explanation: 'Por cada boleta se retiene un porcentaje (ronda el 14–15%) como adelanto de impuestos, que luego se ajusta en la Operación Renta.',
    },
    {
      question: '¿Qué consejo es clave si emites boletas de honorarios?',
      options: [
        'Gastar todo el monto de inmediato',
        'Apartar un 10–15% de cada boleta en una cuenta separada',
        'No declarar para ahorrar tiempo',
        'Pedir un crédito en abril',
      ],
      correct: 1,
      explanation: 'Apartar una parte de cada boleta evita sorpresas si en la Operación Renta te toca pagar la diferencia.',
    },
  ],
  803: [
    {
      question: '¿Cuándo se realiza la Operación Renta en Chile?',
      options: ['Cada enero', 'Cada abril', 'Cada septiembre', 'Solo una vez en la vida'],
      correct: 1,
      explanation: 'La Operación Renta se realiza cada abril: declaras ante el SII lo que ganaste el año anterior.',
    },
    {
      question: 'Si durante el año te retuvieron más impuestos de los que correspondía, en la Operación Renta...',
      options: [
        'Tienes que pagar una multa',
        'Pierdes ese dinero',
        'El SII te devuelve la diferencia',
        'No pasa nada',
      ],
      correct: 2,
      explanation: 'Si te retuvieron de más, el SII te devuelve dinero. Por eso conviene revisar siempre tu propuesta en abril.',
    },
  ],
};
