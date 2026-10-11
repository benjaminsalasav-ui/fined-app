import React, { useContext } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import { MODULES } from '../data/modules';

// Módulo recomendado según el nivel obtenido en el quiz de diagnóstico.
const RECOMMENDED_BY_LEVEL = { Principiante: 1, Intermedio: 3, Avanzado: 7 };

export default function HomeScreen({ navigation }) {
  const { userStats, userName, userLevel } = useContext(AppContext);
  const { signOut } = useContext(AuthContext);

  const recommendedModuleId = RECOMMENDED_BY_LEVEL[userLevel] || null;

  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
  const progressPercent = Math.round((userStats.lessonsCompleted / totalLessons) * 100);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días';
    if (h < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient colors={['#1a237e', '#283593']} style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.greeting}>{greeting()}, {userName} 👋</Text>
          <TouchableOpacity onPress={signOut} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.logout}>Salir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subRow}>
          <Text style={styles.subtitle}>Continúa aprendiendo sobre finanzas</Text>
          {userLevel ? <Text style={styles.levelBadge}>Nivel: {userLevel}</Text> : null}
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Tu progreso</Text>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{userStats.lessonsCompleted}</Text>
              <Text style={styles.statLabel}>Lecciones</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{userStats.quizzesCompleted}</Text>
              <Text style={styles.statLabel}>Quizzes</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{userStats.points}</Text>
              <Text style={styles.statLabel}>Puntos</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{userStats.achievementsUnlocked.length}</Text>
              <Text style={styles.statLabel}>Logros</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Módulos */}
        <Text style={styles.sectionTitle}>Módulos de aprendizaje</Text>
        {MODULES.map(mod => {
          const isCompleted = userStats.modulesCompleted.includes(mod.id);
          return (
            <TouchableOpacity
              key={mod.id}
              style={[styles.moduleCard, { borderLeftColor: mod.color, borderLeftWidth: 5 }]}
              onPress={() => navigation.navigate('ModuleDetail', { moduleId: mod.id })}
              activeOpacity={0.8}
            >
              <View style={styles.moduleLeft}>
                <Text style={styles.moduleIcon}>{mod.icon}</Text>
                <View>
                  <Text style={styles.moduleTitle}>{mod.title}</Text>
                  <Text style={styles.moduleDesc}>{mod.description}</Text>
                  <Text style={styles.moduleInfo}>{mod.lessons.length} lecciones</Text>
                  {recommendedModuleId === mod.id && !isCompleted && (
                    <Text style={styles.recoTag}>⭐ Recomendado para ti</Text>
                  )}
                </View>
              </View>
              {isCompleted && <Text style={styles.completedBadge}>✓</Text>}
            </TouchableOpacity>
          );
        })}

        {/* Accesos rápidos */}
        <Text style={styles.sectionTitle}>Acciones rápidas</Text>
        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: '#E8F5E9' }]}
            onPress={() => navigation.navigate('Simulator')}
          >
            <Text style={styles.quickIcon}>🎮</Text>
            <Text style={styles.quickTitle}>Simulador</Text>
            <Text style={styles.quickSub}>Toma decisiones</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: '#FFF3E0' }]}
            onPress={() => navigation.navigate('Logros')}
          >
            <Text style={styles.quickIcon}>🏆</Text>
            <Text style={styles.quickTitle}>Logros</Text>
            <Text style={styles.quickSub}>{userStats.achievementsUnlocked.length} desbloqueados</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 24, paddingTop: 50, paddingBottom: 30 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#fff', flex: 1 },
  logout: { color: '#B3C5FF', fontSize: 14, fontWeight: '600' },
  subRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 20 },
  subtitle: { fontSize: 14, color: '#B3C5FF', flex: 1 },
  levelBadge: {
    color: '#1a237e', backgroundColor: '#FFD54F', fontSize: 12, fontWeight: 'bold',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, overflow: 'hidden',
  },
  recoTag: { fontSize: 11, color: '#F57F17', fontWeight: 'bold', marginTop: 4 },
  progressCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressTitle: { color: '#fff', fontSize: 14, fontWeight: '600' },
  progressPercent: { color: '#FFD54F', fontSize: 16, fontWeight: 'bold' },
  progressBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, marginBottom: 14 },
  progressFill: { height: 8, backgroundColor: '#FFD54F', borderRadius: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statNum: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#B3C5FF', fontSize: 11 },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a237e', marginBottom: 14, marginTop: 8 },
  moduleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  moduleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  moduleIcon: { fontSize: 32 },
  moduleTitle: { fontSize: 16, fontWeight: 'bold', color: '#212121' },
  moduleDesc: { fontSize: 12, color: '#757575', marginTop: 2, flexWrap: 'wrap', maxWidth: 220 },
  moduleInfo: { fontSize: 11, color: '#9E9E9E', marginTop: 4 },
  completedBadge: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    width: 28, height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 14,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  quickGrid: { flexDirection: 'row', gap: 12, marginBottom: 30 },
  quickCard: {
    flex: 1, borderRadius: 14, padding: 18,
    alignItems: 'center', elevation: 1,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3,
  },
  quickIcon: { fontSize: 36, marginBottom: 6 },
  quickTitle: { fontSize: 14, fontWeight: 'bold', color: '#212121' },
  quickSub: { fontSize: 11, color: '#757575', marginTop: 2 },
});
