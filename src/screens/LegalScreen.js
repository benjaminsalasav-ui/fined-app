import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PRIVACY_POLICY, TERMS } from '../data/legal';

// Pantalla reutilizable para mostrar textos legales (Términos o Privacidad).
export default function LegalScreen({ route, navigation }) {
  const type = route?.params?.type === 'terms' ? 'terms' : 'privacy';
  const title = type === 'terms' ? 'Términos y Condiciones' : 'Política de Privacidad';
  const content = type === 'terms' ? TERMS : PRIVACY_POLICY;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a237e', '#283593']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={true}>
        <Text style={styles.text}>{content}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 },
  backBtn: { marginBottom: 10 },
  backText: { color: 'rgba(255,255,255,0.85)', fontSize: 15 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  body: { padding: 20, paddingBottom: 50 },
  text: { fontSize: 14, color: '#424242', lineHeight: 22 },
});
