import React, { useState, useContext } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';

const SCENARIOS = [
  {
    id: 1,
    title: 'Primer sueldo',
    emoji: '💼',
    description: 'Acabas de recibir tu primer sueldo como practicante: $350.000. ¿Qué haces con él?',
    options: [
      {
        text: 'Gastar todo celebrando con amigos y ropa nueva 🥂',
        result: 'bad',
        feedback: 'Celebrar está bien, pero gastarlo todo no te deja nada para emergencias ni ahorro. Sin respaldo financiero, cualquier imprevisto te endeuda.',
        impact: { dinero: -350000, deuda: 0, ahorro: 0 },
      },
      {
        text: 'Ahorrar el 20%, pagar gastos fijos y algo para gustos 💰',
        result: 'good',
        feedback: '¡Perfecto! Siguiendo la regla 50/30/20, guardas $70.000 de ahorro, cubres necesidades y te permites algo de disfrute. Hábito financiero sólido.',
        impact: { dinero: 0, deuda: 0, ahorro: 70000 },
      },
      {
        text: 'Guardar todo el sueldo en efectivo bajo el colchón 🛏️',
        result: 'neutral',
        feedback: 'Ahorrar es genial, pero guardar en efectivo pierde valor por la inflación (~5% anual en Chile). Mejor abrirte una cuenta de ahorro o fondo mutuo.',
        impact: { dinero: 0, deuda: 0, ahorro: 350000 },
      },
      {
        text: 'Invertir todo en criptomonedas 📉',
        result: 'bad',
        feedback: 'Invertir está bien, pero poner TODO en cripto siendo principiante es muy arriesgado. Las criptos pueden bajar 50% en días. Empieza con montos pequeños.',
        impact: { dinero: -175000, deuda: 0, ahorro: 175000 },
      },
    ],
  },
  {
    id: 2,
    title: 'Oferta irresistible',
    emoji: '🛒',
    description: 'Ves una TV de 65" en 36 cuotas de $25.000 (total $900.000 en vez de $700.000). No la necesitas pero te llama la atención.',
    options: [
      {
        text: 'La compro, son solo $25.000 al mes 💳',
        result: 'bad',
        feedback: 'Las "cuotas pequeñas" son engañosas. Pagarás $900.000 por algo que vale $700.000: $200.000 en intereses por 3 años. Además, compromete tu flujo mensual.',
        impact: { dinero: 200000, deuda: 900000, ahorro: 0 },
      },
      {
        text: 'La compro solo si tengo el dinero ahorrado 🏦',
        result: 'good',
        feedback: 'Comprar con dinero propio cuando ya lo tienes disponible y es algo que querías es perfectamente válido. Pagas $700.000 y evitas intereses.',
        impact: { dinero: -700000, deuda: 0, ahorro: 0 },
      },
      {
        text: 'No la compro porque no la necesito 🙅',
        result: 'good',
        feedback: '¡Excelente autocontrol! Evitar compras impulsivas es una de las mejores habilidades financieras. Ese dinero puede ir a ahorro o inversión.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
      {
        text: 'La compro con avance de tarjeta de crédito 😬',
        result: 'bad',
        feedback: 'El avance en efectivo es lo más caro que existe: cobran comisión + tasa de interés altísima (hasta 70% anual). Nunca uses avances para compras no urgentes.',
        impact: { dinero: 0, deuda: 1200000, ahorro: 0 },
      },
    ],
  },
  {
    id: 3,
    title: 'Emergencia médica',
    emoji: '🏥',
    description: 'Tu mascota necesita una operación urgente de $200.000 y no tienes ese dinero disponible ahora mismo.',
    options: [
      {
        text: 'Pedir prestado a familiares y pagar en cuotas 👨‍👩‍👧',
        result: 'good',
        feedback: 'Pedir prestado a alguien de confianza sin intereses es la opción más inteligente ante emergencias. Establece un plan de pago claro para mantener la relación.',
        impact: { dinero: 0, deuda: 200000, ahorro: 0 },
      },
      {
        text: 'Usar el fondo de emergencia que tenía guardado 🏦',
        result: 'good',
        feedback: '¡Para eso existe el fondo de emergencia! Este es exactamente el tipo de situación que justifica usarlo. Después reconstitúyelo poco a poco.',
        impact: { dinero: -200000, deuda: 0, ahorro: -200000 },
      },
      {
        text: 'Sacar un crédito de consumo rápido 💸',
        result: 'neutral',
        feedback: 'Un crédito de consumo puede ser válido en emergencias reales, pero fíjate bien en la tasa. Compara antes de aceptar. Lo ideal es tener fondo de emergencia para esto.',
        impact: { dinero: 0, deuda: 280000, ahorro: 0 },
      },
      {
        text: 'No hacer nada porque no tengo el dinero 😔',
        result: 'bad',
        feedback: 'En situaciones de emergencia siempre hay opciones: familiares, empleador, ONG, clínicas con convenio. No actuar puede generar problemas mayores.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
    ],
  },
  {
    id: 4,
    title: 'Inversión tentadora',
    emoji: '💎',
    description: 'Un amigo te ofrece invertir en un "negocio" que promete doblar tu dinero en 30 días. Te pide $100.000.',
    options: [
      {
        text: 'Invierto todo, ¡suena increíble! 🚀',
        result: 'bad',
        feedback: 'CUIDADO: "Doblar en 30 días" es una señal clásica de estafa o esquema Ponzi. Ninguna inversión legítima garantiza esas rentabilidades. Esto se llama "timo" o "fraude piramidal".',
        impact: { dinero: -100000, deuda: 0, ahorro: -100000 },
      },
      {
        text: 'Investigo el negocio antes de invertir cualquier peso 🔍',
        result: 'good',
        feedback: '¡Perfecto! Siempre investiga: ¿tiene RUT de empresa? ¿está inscrito en la CMF? ¿hay contratos? Una inversión seria puede esperar que hagas tu debida diligencia.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
      {
        text: 'Le digo que no, promesas así no existen 🙅',
        result: 'good',
        feedback: 'Excelente criterio. La regla de oro: si suena demasiado bueno para ser verdad, probablemente no lo es. Las inversiones reales ofrecen 4-10% anual, no 100% mensual.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
      {
        text: 'Pruebo con $10.000 para ver si funciona 🎲',
        result: 'neutral',
        feedback: 'Si de verdad quisieras probar, hacerlo con poco es menos arriesgado. Pero estas esquemas suelen funcionar al inicio para atraer más dinero. Lo más probable es que pierdas igual.',
        impact: { dinero: -10000, deuda: 0, ahorro: -10000 },
      },
    ],
  },
  {
    id: 5,
    title: 'Mensaje del "banco"',
    emoji: '📲',
    description: 'Te llega un SMS: "BancoXX: detectamos un cargo sospechoso. Valida tu identidad aquí: bcox-seguro.cl/login". ¿Qué haces?',
    options: [
      {
        text: 'Hago clic e ingreso mi RUT y clave para "validar" 🔓',
        result: 'bad',
        feedback: 'Es phishing. Tu banco NUNCA pide tu clave por un link de SMS. Acabas de entregar tus datos a un estafador. Nunca ingreses claves desde links de mensajes.',
        impact: { dinero: -300000, deuda: 0, ahorro: -300000 },
      },
      {
        text: 'No toco el link; entro a la app oficial del banco a revisar 🛡️',
        result: 'good',
        feedback: '¡Perfecto! Siempre verifica por canales oficiales: la app o el sitio que escribes tú. Si hay un cargo real, lo verás ahí. Nunca por un link no solicitado.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
      {
        text: 'Llamo al número oficial del reverso de mi tarjeta 📞',
        result: 'good',
        feedback: 'Excelente. Ante la duda, cuelga y llama tú al número oficial. Así confirmas si el mensaje es real sin exponer tus datos.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
      {
        text: 'Respondo el SMS pidiendo más información 💬',
        result: 'neutral',
        feedback: 'No entregaste datos, pero responder confirma al estafador que tu número está activo y te marcará como objetivo. Lo mejor es ignorar y bloquear.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
    ],
  },
  {
    id: 6,
    title: 'Eliges tu multifondo',
    emoji: '👵',
    description: 'Tienes 24 años y empiezas tu primer trabajo con contrato. La AFP te pregunta en qué fondo quieres tu 10%. ¿Qué eliges?',
    options: [
      {
        text: 'Fondo E (el más seguro), para no perder nada 🔵',
        result: 'neutral',
        feedback: 'Es seguro, pero con 40 años por delante, el fondo más conservador crece muy poco. A tu edad, perderte décadas de crecimiento puede costarte mucho a la jubilación.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
      {
        text: 'Un fondo de más riesgo (A o B), porque me faltan décadas ⏳',
        result: 'good',
        feedback: '¡Bien pensado! Con muchos años por delante puedes asumir más riesgo: hay tiempo de sobra para recuperarse de las bajas y aprovechar el mayor crecimiento.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
      {
        text: 'No elijo nada, que decidan ellos 🤷',
        result: 'neutral',
        feedback: 'Te asignarán un fondo por defecto según tu edad. No es lo peor, pero decidir de forma informada casi siempre te conviene más. Revisa tu cartola.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
      {
        text: 'Empiezo además un APV pequeño y automático 🚀',
        result: 'good',
        feedback: '¡Excelente! Un APV pequeño hoy, sumado al interés compuesto y los beneficios tributarios, hace una diferencia enorme en 40 años. Estás pensando a futuro.',
        impact: { dinero: -15000, deuda: 0, ahorro: 15000 },
      },
    ],
  },
  {
    id: 7,
    title: 'Tu primera boleta de honorarios',
    emoji: '🧾',
    description: 'Empiezas a trabajar como freelance y emites tu primera boleta de honorarios por $500.000. ¿Qué haces con ese dinero?',
    options: [
      {
        text: 'Lo gasto completo, ¡me lo gané! 🎉',
        result: 'bad',
        feedback: 'Cuidado: por las boletas de honorarios se ajustan impuestos en la Operación Renta de abril. Si gastaste todo, podrías no tener para pagar lo que te corresponda.',
        impact: { dinero: -500000, deuda: 0, ahorro: 0 },
      },
      {
        text: 'Aparto ~15% en una cuenta separada para impuestos 🏦',
        result: 'good',
        feedback: '¡Perfecto! Apartar una parte de cada boleta evita sorpresas en abril. Si al final te devuelven, ese dinero queda como ahorro extra.',
        impact: { dinero: 0, deuda: 0, ahorro: 75000 },
      },
      {
        text: 'No emito boleta para "ahorrarme" el impuesto 🙈',
        result: 'bad',
        feedback: 'No emitir boletas es evasión y el SII lo fiscaliza. Te arriesgas a multas y a no poder acreditar ingresos (clave para créditos o arriendos). No vale la pena.',
        impact: { dinero: 0, deuda: 0, ahorro: 0 },
      },
      {
        text: 'Aparto para impuestos y abro un APV con parte del resto 📈',
        result: 'good',
        feedback: '¡Gran jugada! Cubres tus impuestos y además el APV puede rebajar tu impuesto a la renta. Estás usando las reglas a tu favor.',
        impact: { dinero: 0, deuda: 0, ahorro: 100000 },
      },
    ],
  },
];

const RESULT_COLORS = { good: '#4CAF50', neutral: '#FF9800', bad: '#F44336' };
const RESULT_LABELS = { good: '¡Buena decisión!', neutral: 'Decisión aceptable', bad: 'Decisión riesgosa' };

export default function SimulatorScreen({ navigation }) {
  const { completeSimulation } = useContext(AppContext);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);
  const [finished, setFinished] = useState(false);
  const [goodCount, setGoodCount] = useState(0);

  const scenario = SCENARIOS[current];
  const isLast = current === SCENARIOS.length - 1;

  const handleOption = (opt) => {
    setResult(opt);
    if (opt.result === 'good') setGoodCount(g => g + 1);
  };

  const handleNext = () => {
    if (isLast) {
      completeSimulation();
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setResult(null);
    }
  };

  if (finished) {
    const score = Math.round((goodCount / SCENARIOS.length) * 100);
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient colors={['#1a237e', '#283593']} style={styles.finHeader}>
          <Text style={styles.finEmoji}>{score >= 75 ? '🌟' : score >= 50 ? '📈' : '📚'}</Text>
          <Text style={styles.finTitle}>Simulación Completa</Text>
          <Text style={styles.finScore}>{goodCount}/{SCENARIOS.length} buenas decisiones</Text>
        </LinearGradient>
        <View style={{ padding: 20 }}>
          <Text style={styles.finMsg}>
            {score >= 75
              ? '¡Excelente juicio financiero! Tus decisiones muestran madurez económica.'
              : score >= 50
              ? 'Buen comienzo. Sigue estudiando para mejorar tus decisiones financieras.'
              : 'Hay áreas a mejorar. Te recomendamos repasar los módulos de ahorro y deudas.'}
          </Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => { setCurrent(0); setResult(null); setFinished(false); setGoodCount(0); }}
          >
            <Text style={styles.retryBtnText}>🔄 Intentar de nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.homeBtnText}>Ir al inicio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#1a237e', '#283593']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Inicio</Text>
        </TouchableOpacity>
        <Text style={styles.headerSub}>Simulador · Escenario {current + 1}/{SCENARIOS.length}</Text>
        <View style={styles.simBar}>
          <View style={[styles.simBarFill, { width: `${((current + 1) / SCENARIOS.length) * 100}%` }]} />
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <Text style={styles.scenarioEmoji}>{scenario.emoji}</Text>
        <Text style={styles.scenarioTitle}>{scenario.title}</Text>
        <Text style={styles.scenarioDesc}>{scenario.description}</Text>

        <Text style={styles.chooseLabel}>¿Qué harías?</Text>

        {scenario.options.map((opt, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.optCard,
              result === opt && { borderColor: RESULT_COLORS[opt.result], borderWidth: 2, backgroundColor: '#F5F5F5' },
            ]}
            onPress={() => !result && handleOption(opt)}
            activeOpacity={result ? 1 : 0.8}
          >
            <Text style={styles.optText}>{opt.text}</Text>
          </TouchableOpacity>
        ))}

        {result && (
          <View style={[styles.feedbackBox, { borderLeftColor: RESULT_COLORS[result.result] }]}>
            <Text style={[styles.feedbackTitle, { color: RESULT_COLORS[result.result] }]}>
              {RESULT_LABELS[result.result]}
            </Text>
            <Text style={styles.feedbackText}>{result.feedback}</Text>
            <TouchableOpacity
              style={[styles.nextBtn, { backgroundColor: RESULT_COLORS[result.result] }]}
              onPress={handleNext}
            >
              <Text style={styles.nextBtnText}>{isLast ? 'Ver resultados' : 'Siguiente escenario →'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, paddingTop: 50 },
  backBtn: { marginBottom: 10 },
  backText: { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  headerSub: { color: '#B3C5FF', fontSize: 13, marginBottom: 10 },
  simBar: { height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3 },
  simBarFill: { height: 6, backgroundColor: '#FFD54F', borderRadius: 3 },
  body: { padding: 20 },
  scenarioEmoji: { fontSize: 52, textAlign: 'center', marginTop: 8 },
  scenarioTitle: { fontSize: 22, fontWeight: 'bold', color: '#1a237e', textAlign: 'center', marginTop: 8, marginBottom: 6 },
  scenarioDesc: { fontSize: 15, color: '#424242', lineHeight: 24, textAlign: 'center', marginBottom: 20 },
  chooseLabel: { fontSize: 14, fontWeight: '600', color: '#757575', marginBottom: 12 },
  optCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 12, borderWidth: 1.5, borderColor: 'transparent',
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3,
  },
  optText: { fontSize: 14, color: '#424242', lineHeight: 22 },
  feedbackBox: {
    backgroundColor: '#fff', borderRadius: 12, padding: 18,
    borderLeftWidth: 4, marginTop: 8, marginBottom: 30,
  },
  feedbackTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  feedbackText: { fontSize: 14, color: '#616161', lineHeight: 22, marginBottom: 16 },
  nextBtn: { borderRadius: 12, padding: 14, alignItems: 'center' },
  nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  // Fin
  finHeader: { padding: 40, alignItems: 'center', paddingTop: 60 },
  finEmoji: { fontSize: 60, marginBottom: 10 },
  finTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  finScore: { color: '#FFD54F', fontSize: 20, fontWeight: 'bold' },
  finMsg: { fontSize: 15, color: '#424242', lineHeight: 24, textAlign: 'center', marginBottom: 24 },
  retryBtn: {
    borderWidth: 2, borderColor: '#1a237e', borderRadius: 12,
    padding: 14, alignItems: 'center', marginBottom: 12,
  },
  retryBtnText: { color: '#1a237e', fontWeight: 'bold' },
  homeBtn: { backgroundColor: '#1a237e', borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 40 },
  homeBtnText: { color: '#fff', fontWeight: 'bold' },
});
