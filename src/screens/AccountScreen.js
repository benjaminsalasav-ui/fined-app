import React, { useContext, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Share, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

export default function AccountScreen({ navigation }) {
  const { user, profile, signOut, deleteAccount, getAccountData } = useContext(AuthContext);
  const { userStats } = useContext(AppContext);
  const [busy, setBusy] = useState(false);

  // Derecho de acceso / portabilidad: arma un JSON con todo lo que guardamos.
  const handleExport = async () => {
    setBusy(true);
    const account = await getAccountData();
    setBusy(false);
    const payload = {
      exportado: new Date().toISOString(),
      cuenta: account || { email: user?.email, nombre: user?.name },
      progreso: {
        nivel: profile?.level,
        lecciones_completadas: userStats.lessonsCompleted,
        quizzes_completados: userStats.quizzesCompleted,
        quizzes_perfectos: userStats.perfectQuizzes,
        modulos_completados: userStats.modulesCompleted,
        simulaciones: userStats.simulationsCompleted,
        puntos: userStats.points,
        logros: userStats.achievementsUnlocked,
      },
    };
    try {
      await Share.share({
        title: 'Mis datos en FinEd',
        message: JSON.stringify(payload, null, 2),
      });
    } catch (e) {
      Alert.alert('No se pudo exportar', 'Inténtalo de nuevo.');
    }
  };

  // Derecho de supresión: elimina cuenta y datos.
  const handleDelete = () => {
    Alert.alert(
      'Eliminar mi cuenta',
      'Esto borrará tu cuenta y todos tus datos de forma permanente. Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            setBusy(true);
            const res = await deleteAccount();
            setBusy(false);
            if (res?.error) Alert.alert('No se pudo eliminar', res.error);
            // Si tiene éxito, la sesión se cierra y la app vuelve al login automáticamente.
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#1a237e', '#283593']} style={styles.header}>
        <Text style={styles.avatar}>{(user?.name || '?').charAt(0).toUpperCase()}</Text>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {profile?.level ? <Text style={styles.levelBadge}>Nivel: {profile.level}</Text> : null}
      </LinearGradient>

      <View style={styles.content}>
        {busy && <ActivityIndicator color="#1a237e" style={{ marginBottom: 16 }} />}

        <Text style={styles.section}>Tus datos</Text>
        <TouchableOpacity style={styles.row} onPress={handleExport} disabled={busy}>
          <Text style={styles.rowIcon}>📤</Text>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Exportar mis datos</Text>
            <Text style={styles.rowSub}>Descarga una copia de tu cuenta y progreso</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Text style={styles.section}>Legal</Text>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Privacy')}>
          <Text style={styles.rowIcon}>🔒</Text>
          <View style={styles.rowText}><Text style={styles.rowTitle}>Política de Privacidad</Text></View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Terms')}>
          <Text style={styles.rowIcon}>📄</Text>
          <View style={styles.rowText}><Text style={styles.rowTitle}>Términos y Condiciones</Text></View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Text style={styles.section}>Cuenta</Text>
        <TouchableOpacity style={styles.row} onPress={signOut} disabled={busy}>
          <Text style={styles.rowIcon}>🚪</Text>
          <View style={styles.rowText}><Text style={styles.rowTitle}>Cerrar sesión</Text></View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.dangerRow]} onPress={handleDelete} disabled={busy}>
          <Text style={styles.rowIcon}>🗑️</Text>
          <View style={styles.rowText}>
            <Text style={[styles.rowTitle, { color: '#C62828' }]}>Eliminar mi cuenta</Text>
            <Text style={styles.rowSub}>Borra tu cuenta y todos tus datos</Text>
          </View>
          <Text style={[styles.arrow, { color: '#C62828' }]}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { paddingTop: 60, paddingBottom: 30, alignItems: 'center' },
  avatar: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: '#FFD54F',
    color: '#1a237e', fontSize: 32, fontWeight: 'bold', textAlign: 'center',
    lineHeight: 72, overflow: 'hidden', marginBottom: 12,
  },
  name: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  email: { color: '#B3C5FF', fontSize: 14, marginTop: 2 },
  levelBadge: {
    color: '#1a237e', backgroundColor: '#FFD54F', fontSize: 12, fontWeight: 'bold',
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, overflow: 'hidden', marginTop: 12,
  },
  content: { padding: 20 },
  section: { fontSize: 13, fontWeight: 'bold', color: '#9E9E9E', marginTop: 18, marginBottom: 8, textTransform: 'uppercase' },
  row: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center',
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3,
  },
  dangerRow: { borderWidth: 1, borderColor: '#FFCDD2' },
  rowIcon: { fontSize: 22, marginRight: 14 },
  rowText: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: '600', color: '#212121' },
  rowSub: { fontSize: 12, color: '#9E9E9E', marginTop: 2 },
  arrow: { fontSize: 22, color: '#BDBDBD' },
});
