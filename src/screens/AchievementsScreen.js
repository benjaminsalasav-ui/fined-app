import React, { useContext } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../context/AppContext';
import { ACHIEVEMENTS } from '../data/achievements';

export default function AchievementsScreen() {
  const { userStats } = useContext(AppContext);
  const unlocked = userStats.achievementsUnlocked || [];
  const totalPoints = ACHIEVEMENTS
    .filter(a => unlocked.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#FF6F00', '#E65100']} style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Logros</Text>
        <Text style={styles.headerSub}>{unlocked.length}/{ACHIEVEMENTS.length} desbloqueados</Text>
        <View style={styles.pointsBox}>
          <Text style={styles.pointsNum}>{totalPoints}</Text>
          <Text style={styles.pointsLabel}>puntos acumulados</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Progreso */}
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>Progreso total</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.round((unlocked.length / ACHIEVEMENTS.length) * 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.progressPct}>
            {Math.round((unlocked.length / ACHIEVEMENTS.length) * 100)}%
          </Text>
        </View>

        {/* Desbloqueados */}
        {unlocked.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>✅ Desbloqueados</Text>
            {ACHIEVEMENTS.filter(a => unlocked.includes(a.id)).map(a => (
              <View key={a.id} style={[styles.achCard, styles.achUnlocked]}>
                <Text style={styles.achIcon}>{a.icon}</Text>
                <View style={styles.achInfo}>
                  <Text style={styles.achTitle}>{a.title}</Text>
                  <Text style={styles.achDesc}>{a.description}</Text>
                </View>
                <View style={styles.achPoints}>
                  <Text style={styles.achPointsNum}>+{a.points}</Text>
                  <Text style={styles.achPointsLabel}>pts</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Bloqueados */}
        <Text style={styles.sectionTitle}>🔒 Por desbloquear</Text>
        {ACHIEVEMENTS.filter(a => !unlocked.includes(a.id)).map(a => (
          <View key={a.id} style={[styles.achCard, styles.achLocked]}>
            <Text style={[styles.achIcon, { opacity: 0.3 }]}>{a.icon}</Text>
            <View style={styles.achInfo}>
              <Text style={[styles.achTitle, { color: '#BDBDBD' }]}>{a.title}</Text>
              <Text style={[styles.achDesc, { color: '#E0E0E0' }]}>{a.description}</Text>
            </View>
            <View style={styles.achPoints}>
              <Text style={[styles.achPointsNum, { color: '#BDBDBD' }]}>+{a.points}</Text>
              <Text style={[styles.achPointsLabel, { color: '#BDBDBD' }]}>pts</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 24, paddingTop: 50, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  pointsBox: { marginTop: 16, alignItems: 'center' },
  pointsNum: { fontSize: 48, fontWeight: 'bold', color: '#FFD54F' },
  pointsLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  content: { padding: 20 },
  progressCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    marginBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 12,
    elevation: 2,
  },
  progressLabel: { fontSize: 13, color: '#757575', width: 80 },
  progressBar: { flex: 1, height: 8, backgroundColor: '#EEE', borderRadius: 4 },
  progressFill: { height: 8, backgroundColor: '#FF6F00', borderRadius: 4 },
  progressPct: { fontSize: 13, fontWeight: 'bold', color: '#FF6F00', width: 36, textAlign: 'right' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#424242', marginBottom: 12, marginTop: 4 },
  achCard: {
    borderRadius: 12, padding: 16, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center',
  },
  achUnlocked: {
    backgroundColor: '#fff', elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 3,
  },
  achLocked: { backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#EEEEEE' },
  achIcon: { fontSize: 32, marginRight: 14 },
  achInfo: { flex: 1 },
  achTitle: { fontSize: 15, fontWeight: '600', color: '#212121' },
  achDesc: { fontSize: 12, color: '#757575', marginTop: 2 },
  achPoints: { alignItems: 'center' },
  achPointsNum: { fontSize: 18, fontWeight: 'bold', color: '#FF6F00' },
  achPointsLabel: { fontSize: 10, color: '#FF8F00' },
});
