import React, { useState, useContext } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';
import { QUIZ_QUESTIONS } from '../data/quiz';
import { getModuleById } from '../data/modules';

export default function QuizScreen({ route, navigation }) {
  const { moduleId, lessonId } = route.params;
  const module = getModuleById(moduleId);
  const { completeQuiz } = useContext(AppContext);

  const questions = QUIZ_QUESTIONS[lessonId] || [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noQuiz}>No hay preguntas para esta lección aún.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const percent = Math.round((score / questions.length) * 100);

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) {
      setScore(s => s + 1);
    } else {
      setWrongCount(c => c + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      const perfect = wrongCount === 0;
      const newAchievements = completeQuiz(moduleId, lessonId, perfect);
      if (newAchievements && newAchievements.length > 0) {
        Alert.alert(
          '🏆 ¡Nuevo Logro!',
          newAchievements.map(a => `${a.icon} ${a.title}`).join('\n'),
          [{ text: '¡Genial!' }]
        );
      }
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  if (finished) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.resultContainer}>
        <LinearGradient
          colors={percent >= 60 ? ['#388E3C', '#1B5E20'] : ['#C62828', '#B71C1C']}
          style={styles.resultHeader}
        >
          <Text style={styles.resultEmoji}>{percent >= 80 ? '🌟' : percent >= 60 ? '👍' : '📚'}</Text>
          <Text style={styles.resultTitle}>{percent >= 60 ? '¡Bien hecho!' : 'Sigue practicando'}</Text>
          <Text style={styles.resultScore}>{score}/{questions.length}</Text>
          <Text style={styles.resultPercent}>{percent}% correcto</Text>
        </LinearGradient>

        <View style={styles.resultBody}>
          {questions.map((q2, idx) => (
            <View key={idx} style={styles.reviewCard}>
              <Text style={styles.reviewQ}>{q2.question}</Text>
              <Text style={styles.reviewCorrect}>✅ {q2.options[q2.correct]}</Text>
              <Text style={styles.reviewExpl}>{q2.explanation}</Text>
            </View>
          ))}

          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => {
              setCurrent(0); setSelected(null); setAnswered(false);
              setScore(0); setFinished(false); setWrongCount(0);
            }}
          >
            <Text style={styles.retryBtnText}>🔄 Intentar de nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.homeBtnText}>Ir al inicio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={[module.color, module.colorDark]} style={styles.quizHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Salir</Text>
        </TouchableOpacity>
        <Text style={styles.quizProgress}>{current + 1} / {questions.length}</Text>
        <View style={styles.quizBar}>
          <View style={[styles.quizBarFill, { width: `${((current + 1) / questions.length) * 100}%` }]} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.quizBody} contentContainerStyle={styles.quizContent}>
        <Text style={styles.questionText}>{q.question}</Text>

        {q.options.map((opt, idx) => {
          let cardStyle = styles.optionCard;
          let textStyle = styles.optionText;
          if (answered) {
            if (idx === q.correct) {
              cardStyle = [styles.optionCard, styles.optionCorrect];
              textStyle = [styles.optionText, { color: '#fff' }];
            } else if (idx === selected && idx !== q.correct) {
              cardStyle = [styles.optionCard, styles.optionWrong];
              textStyle = [styles.optionText, { color: '#fff' }];
            }
          } else if (selected === idx) {
            cardStyle = [styles.optionCard, styles.optionSelected];
          }

          return (
            <TouchableOpacity
              key={idx}
              style={cardStyle}
              onPress={() => handleSelect(idx)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionLetter}>
                {['A', 'B', 'C', 'D'][idx]}
              </Text>
              <Text style={textStyle}>{opt}</Text>
            </TouchableOpacity>
          );
        })}

        {answered && (
          <View style={[styles.explanationBox, { borderLeftColor: module.color }]}>
            <Text style={styles.explanationTitle}>
              {selected === q.correct ? '✅ ¡Correcto!' : '❌ Incorrecto'}
            </Text>
            <Text style={styles.explanationText}>{q.explanation}</Text>
          </View>
        )}
      </ScrollView>

      {answered && (
        <TouchableOpacity
          style={[styles.nextBtn, { backgroundColor: module.color }]}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>{isLast ? 'Ver resultados' : 'Siguiente →'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  noQuiz: { fontSize: 16, color: '#757575', textAlign: 'center' },
  backButton: { marginTop: 20, padding: 12 },
  backButtonText: { color: '#1a237e', fontSize: 15 },
  quizHeader: { padding: 20, paddingTop: 50 },
  backBtn: { marginBottom: 12 },
  backText: { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  quizProgress: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  quizBar: { height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3 },
  quizBarFill: { height: 6, backgroundColor: '#FFD54F', borderRadius: 3 },
  quizBody: { flex: 1 },
  quizContent: { padding: 20, paddingBottom: 100 },
  questionText: { fontSize: 18, fontWeight: '600', color: '#212121', lineHeight: 28, marginBottom: 20 },
  optionCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 12, flexDirection: 'row', alignItems: 'center',
    borderWidth: 2, borderColor: 'transparent',
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3,
  },
  optionSelected: { borderColor: '#1a237e' },
  optionCorrect: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  optionWrong: { backgroundColor: '#F44336', borderColor: '#F44336' },
  optionLetter: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#EDE7F6', textAlign: 'center', lineHeight: 28,
    fontWeight: 'bold', fontSize: 13, marginRight: 12, overflow: 'hidden',
  },
  optionText: { fontSize: 14, color: '#424242', flex: 1 },
  explanationBox: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    borderLeftWidth: 4, marginTop: 8,
  },
  explanationTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  explanationText: { fontSize: 13, color: '#616161', lineHeight: 22 },
  nextBtn: { margin: 16, borderRadius: 14, padding: 16, alignItems: 'center' },
  nextBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  // Results
  resultContainer: { flexGrow: 1 },
  resultHeader: { padding: 40, alignItems: 'center', paddingTop: 60 },
  resultEmoji: { fontSize: 60, marginBottom: 10 },
  resultTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  resultScore: { color: '#FFD54F', fontSize: 48, fontWeight: 'bold' },
  resultPercent: { color: 'rgba(255,255,255,0.85)', fontSize: 16, marginTop: 4 },
  resultBody: { padding: 20 },
  reviewCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 12, elevation: 1,
  },
  reviewQ: { fontSize: 14, fontWeight: '600', color: '#424242', marginBottom: 8 },
  reviewCorrect: { fontSize: 13, color: '#388E3C', marginBottom: 6 },
  reviewExpl: { fontSize: 12, color: '#757575', lineHeight: 20 },
  retryBtn: {
    borderWidth: 2, borderColor: '#1a237e', borderRadius: 12,
    padding: 14, alignItems: 'center', marginTop: 8, marginBottom: 12,
  },
  retryBtnText: { color: '#1a237e', fontWeight: 'bold', fontSize: 14 },
  homeBtn: {
    backgroundColor: '#1a237e', borderRadius: 12,
    padding: 14, alignItems: 'center', marginBottom: 40,
  },
  homeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
