import React, { useState, useContext } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { DIAGNOSTIC_QUESTIONS, classifyLevel } from '../data/diagnostic';

export default function OnboardingQuizScreen() {
  const { user, completeOnboarding } = useContext(AuthContext);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = DIAGNOSTIC_QUESTIONS;
  const q = questions[current];
  const result = finished ? classifyLevel(score) : null;

  const choose = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === q.correct;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 550);
  };

  // --- Pantalla de bienvenida ---
  if (!started) {
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#1a237e', '#283593']} style={styles.introHeader}>
          <Text style={styles.introEmoji}>🧭</Text>
          <Text style={styles.introTitle}>¡Hola, {user?.name}!</Text>
          <Text style={styles.introSub}>Antes de empezar, conozcamos cuánto sabes</Text>
        </LinearGradient>
        <View style={styles.introBody}>
          <Text style={styles.introText}>
            Te haremos {questions.length} preguntas rápidas sobre finanzas. No te
            preocupes si no sabes todas: el objetivo es conocer tu punto de partida y
            recomendarte por dónde empezar.
          </Text>
          <View style={styles.bullet}><Text style={styles.bulletText}>⏱️  Toma menos de 2 minutos</Text></View>
          <View style={styles.bullet}><Text style={styles.bulletText}>🎯  Sin reprobar: solo medimos tu nivel</Text></View>
          <View style={styles.bullet}><Text style={styles.bulletText}>🔓  Todos los módulos quedan disponibles</Text></View>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStarted(true)}>
            <Text style={styles.primaryBtnText}>Comenzar diagnóstico</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // --- Pantalla de resultado ---
  if (finished && result) {
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <LinearGradient colors={[result.color, '#283593']} style={styles.introHeader}>
          <Text style={styles.introEmoji}>{result.emoji}</Text>
          <Text style={styles.introTitle}>Tu nivel: {result.level}</Text>
          <Text style={styles.introSub}>{score} de {questions.length} respuestas correctas</Text>
        </LinearGradient>
        <View style={styles.introBody}>
          <View style={[styles.resultCard, { borderLeftColor: result.color }]}>
            <Text style={styles.resultMsg}>{result.message}</Text>
          </View>
          <Text style={styles.recoLabel}>Te recomendamos empezar por:</Text>
          <View style={[styles.recoCard, { backgroundColor: result.color }]}>
            <Text style={styles.recoText}>📚  {result.recommendedLabel}</Text>
          </View>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => completeOnboarding({ level: result.level, diagnosticScore: score })}
          >
            <Text style={styles.primaryBtnText}>Ir a la app</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // --- Pantalla de pregunta ---
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a237e', '#283593']} style={styles.qHeader}>
        <Text style={styles.qCounter}>Pregunta {current + 1} de {questions.length}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((current) / questions.length) * 100}%` }]} />
        </View>
        <Text style={styles.qTopic}>{q.topic}</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.qBody}>
        <Text style={styles.qText}>{q.question}</Text>
        {q.options.map((opt, idx) => {
          let bg = '#fff', border = '#E0E0E0', txt = '#212121';
          if (selected !== null) {
            if (idx === q.correct) { bg = '#E8F5E9'; border = '#4CAF50'; txt = '#2E7D32'; }
            else if (idx === selected) { bg = '#FFEBEE'; border = '#EF5350'; txt = '#C62828'; }
          }
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.option, { backgroundColor: bg, borderColor: border }]}
              onPress={() => choose(idx)}
              activeOpacity={0.85}
            >
              <Text style={[styles.optionText, { color: txt }]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scroll: { flexGrow: 1, backgroundColor: '#f5f5f5' },
  introHeader: { paddingTop: 80, paddingBottom: 40, alignItems: 'center',
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  introEmoji: { fontSize: 56 },
  introTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 8 },
  introSub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4, textAlign: 'center', paddingHorizontal: 24 },
  introBody: { padding: 24 },
  introText: { fontSize: 15, lineHeight: 24, color: '#424242', marginBottom: 18 },
  bullet: { paddingVertical: 6 },
  bulletText: { fontSize: 15, color: '#424242' },
  primaryBtn: { backgroundColor: '#1a237e', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 28 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  qHeader: { paddingTop: 60, paddingBottom: 20, paddingHorizontal: 24 },
  qCounter: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginBottom: 10 },
  progressBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 8, backgroundColor: '#fff', borderRadius: 4 },
  qTopic: { color: '#fff', fontWeight: 'bold', fontSize: 15, marginTop: 14 },
  qBody: { padding: 24 },
  qText: { fontSize: 19, fontWeight: '600', color: '#212121', marginBottom: 22, lineHeight: 27 },
  option: { borderRadius: 12, padding: 16, borderWidth: 2, marginBottom: 12 },
  optionText: { fontSize: 15, fontWeight: '500' },
  resultCard: { backgroundColor: '#fff', borderRadius: 12, padding: 18, borderLeftWidth: 4, marginBottom: 24 },
  resultMsg: { fontSize: 15, lineHeight: 24, color: '#424242' },
  recoLabel: { fontSize: 14, fontWeight: '600', color: '#616161', marginBottom: 10 },
  recoCard: { borderRadius: 12, padding: 18, alignItems: 'center' },
  recoText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
