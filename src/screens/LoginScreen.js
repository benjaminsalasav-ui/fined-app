import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    const res = await signIn({ email, password });
    setLoading(false);
    if (res.error) setError(res.error);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={['#1a237e', '#283593']} style={styles.logoBox}>
          <Text style={styles.logoEmoji}>💰</Text>
          <Text style={styles.logoTitle}>FinEd</Text>
          <Text style={styles.logoSub}>Educación financiera para tu vida</Text>
        </LinearGradient>

        <View style={styles.form}>
          <Text style={styles.title}>Inicia sesión</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="tucorreo@ejemplo.com"
            placeholderTextColor="#9E9E9E"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••"
            placeholderTextColor="#9E9E9E"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotRow}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.buttonText}>Entrar</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkRow}>
            <Text style={styles.linkText}>¿No tienes cuenta? </Text>
            <Text style={styles.linkBold}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, backgroundColor: '#f5f5f5' },
  logoBox: { paddingTop: 80, paddingBottom: 40, alignItems: 'center',
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  logoEmoji: { fontSize: 56 },
  logoTitle: { fontSize: 34, fontWeight: 'bold', color: '#fff', marginTop: 6 },
  logoSub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  form: { padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#212121', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#616161', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 15,
    borderWidth: 1, borderColor: '#E0E0E0', color: '#212121',
  },
  error: { color: '#C62828', marginTop: 14, fontSize: 14 },
  forgotRow: { alignSelf: 'flex-end', marginTop: 14 },
  forgotText: { color: '#1a237e', fontSize: 13, fontWeight: '600' },
  button: {
    backgroundColor: '#1a237e', borderRadius: 12, padding: 16,
    alignItems: 'center', marginTop: 24,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  linkText: { color: '#616161', fontSize: 14 },
  linkBold: { color: '#1a237e', fontWeight: 'bold', fontSize: 14 },
});
