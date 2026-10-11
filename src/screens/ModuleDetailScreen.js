import React, { useState, useContext } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';
import { getModuleById } from '../data/modules';

export default function ModuleDetailScreen({ route, navigation }) {
  const { moduleId } = route.params;
  const module = getModuleById(moduleId);
  const { userStats, completeLesson } = useContext(AppContext);
  const [selectedLesson, setSelectedLesson] = useState(null);

  if (!module) return null;

  const openLesson = (lesson) => setSelectedLesson(lesson);
  const closeLesson = () => setSelectedLesson(null);

  const handleComplete = () => {
    const newAchievements = completeLesson(module.id, selectedLesson.id);
    if (newAchievements && newAchievements.length > 0) {
      Alert.alert(
        '🏆 ¡Nuevo Logro!',
        newAchievements.map(a => `${a.icon} ${a.title}`).join('\n'),
        [{ text: '¡Genial!', style: 'default' }]
      );
    }
    setSelectedLesson(null);
  };

  // Vista de lección
  if (selectedLesson) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[module.color, module.colorDark]} style={styles.lessonHeader}>
          <TouchableOpacity onPress={closeLesson} style={styles.backBtn}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.lessonTitle}>{selectedLesson.title}</Text>
        </LinearGradient>

        <View style={styles.lessonBody}>
          <Text style={styles.lessonContent}>{selectedLesson.content}</Text>

          {selectedLesson.tip && (
            <View style={styles.tipBox}>
              <Text style={styles.tipLabel}>💡 Consejo clave</Text>
              <Text style={styles.tipText}>{selectedLesson.tip}</Text>
            </View>
          )}

          <View style={styles.lessonActions}>
            {!userStats.lessonsCompleted.includes
              ? null
              : null}
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: module.color }]}
              onPress={handleComplete}
            >
              <Text style={styles.actionBtnText}>✓ Marcar como completada</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.quizBtn]}
              onPress={() => {
                setSelectedLesson(null);
                navigation.navigate('Quiz', { moduleId, lessonId: selectedLesson.id });
              }}
            >
              <Text style={styles.quizBtnText}>📝 Hacer quiz de esta lección</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Vista de lista de lecciones
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[module.color, module.colorDark]} style={styles.moduleHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Inicio</Text>
        </TouchableOpacity>
        <Text style={styles.moduleHeaderIcon}>{module.icon}</Text>
        <Text style={styles.moduleHeaderTitle}>{module.title}</Text>
        <Text style={styles.moduleHeaderDesc}>{module.description}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Lecciones</Text>
        {module.lessons.map((lesson, index) => {
          const isCompleted = userStats.completedLessons?.includes(lesson.id);
          return (
            <TouchableOpacity
              key={lesson.id}
              style={styles.lessonCard}
              onPress={() => openLesson(lesson)}
              activeOpacity={0.8}
            >
              <View style={[styles.lessonNum, { backgroundColor: module.color }]}>
                <Text style={styles.lessonNumText}>{isCompleted ? '✓' : index + 1}</Text>
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonCardTitle}>{lesson.title}</Text>
                <Text style={styles.lessonCardSub}>Toca para leer</Text>
              </View>
              <Text style={styles.lessonArrow}>›</Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.quizAllBtn, { backgroundColor: module.color }]}
          onPress={() => navigation.navigate('Quiz', { moduleId, lessonId: module.lessons[0].id })}
        >
          <Text style={styles.quizAllBtnText}>📝 Quiz del módulo completo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  moduleHeader: { padding: 24, paddingTop: 50, alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', marginBottom: 16 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 15 },
  moduleHeaderIcon: { fontSize: 52, marginBottom: 10 },
  moduleHeaderTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  moduleHeaderDesc: { fontSize: 14, color: 'rgba(255,255,255,0.85)', textAlign: 'center' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#212121', marginBottom: 14 },
  lessonCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 12, flexDirection: 'row', alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
  },
  lessonNum: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  lessonNumText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  lessonInfo: { flex: 1 },
  lessonCardTitle: { fontSize: 15, fontWeight: '600', color: '#212121' },
  lessonCardSub: { fontSize: 12, color: '#9E9E9E', marginTop: 2 },
  lessonArrow: { fontSize: 22, color: '#BDBDBD' },
  quizAllBtn: {
    borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8, marginBottom: 30,
  },
  quizAllBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  // Lesson view
  lessonHeader: { padding: 24, paddingTop: 50 },
  lessonTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 8 },
  lessonBody: { padding: 20 },
  lessonContent: { fontSize: 15, lineHeight: 26, color: '#424242' },
  tipBox: {
    backgroundColor: '#FFF8E1', borderRadius: 12,
    padding: 16, marginTop: 20, borderLeftWidth: 4, borderLeftColor: '#FFC107',
  },
  tipLabel: { fontSize: 13, fontWeight: 'bold', color: '#F57F17', marginBottom: 6 },
  tipText: { fontSize: 14, color: '#5D4037', lineHeight: 22 },
  lessonActions: { marginTop: 24, gap: 12, marginBottom: 40 },
  actionBtn: { borderRadius: 12, padding: 16, alignItems: 'center' },
  actionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  quizBtn: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#1a237e' },
  quizBtnText: { color: '#1a237e', fontWeight: 'bold', fontSize: 15 },
});
