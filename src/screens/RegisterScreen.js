import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { validatePassword } from '../services/auth';

function Rule({ ok, label }) {
  return (
    <Text style={[styles.rule, { color: ok ? '#2E7D32' : '#9E9E9E' }]}>
      {ok ? '✓' : '○'} {label}
    </Text>
  );
}

export default function RegisterScreen({ navigation }) {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const pw = validatePassword(password);
  const has = (r) => !pw.errors.includes(r);

  const handleRegister = async () => {
    setError('');
    if (password !== confirm) { setError('Las contraseñas no coinciden.'); return; }
    if (!pw.valid) { setError('La contraseña no cumple los requisitos.'); return; }
    if (!consent) { setError('Debes aceptar los Términos y la Política de Privacidad.'); return; }
    setLoading(true);
    const res = await signUp({ name, email, password, consent });
    setLoading(false);
    if (res.error) { setError(res.error); return; }
    if (res.needsConfirmation) { setSent(true); return; }
    // Si no requiere confirmación, AuthContext ya detecta la sesión y navega solo.
  };

  // Pantalla de "revisa tu correo".
  if (sent) {
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#1a237e', '#283593']} style={styles.logoBox}>
          <Text style={styles.logoEmoji}>📧</Text>
          <Text style={styles.logoTitle}>Revisa tu correo</Text>
        </LinearGradient>
        <View style={styles.form}>
          <Text style={styles.confirmText}>
            Te enviamos un enlace de verificación a{'\n'}<Text style={{ fontWeight: 'bold' }}>{email.trim()}</Text>.
            {'\n\n'}Ábrelo para confirmar tu cuenta y luego inicia sesión. Si no lo ves, revisa la carpeta de spam.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Ir a iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={['#1a237e', '#283593']} style={styles.logoBox}>
          <Text style={styles.logoEmoji}>🚀</Text>
          <Text style={styles.logoTitle}>Crea tu cuenta</Text>
          <Text style={styles.logoSub}>Empieza a aprender sobre tu dinero</Text>
        </LinearGradient>

        <View style={styles.form}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} placeholder="Tu nombre" placeholderTextColor="#9E9E9E"
            value={name} onChangeText={setName} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="tucorreo@ejemplo.com" placeholderTextColor="#9E9E9E"
            keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput style={styles.input} placeholder="Crea una contraseña segura" placeholderTextColor="#9E9E9E"
            secureTextEntry value={password} onChangeText={setPassword} />

          {password.length > 0 && (
            <View style={styles.rulesBox}>
              <Rule ok={has('Al menos 8 caracteres')} label="Al menos 8 caracteres" />
              <Rule ok={has('Una letra mayúscula')} label="Una mayúscula" />
              <Rule ok={has('Una letra minúscula')} label="Una minúscula" />
              <Rule ok={has('Un número')} label="Un número" />
            </View>
          )}

          <Text style={styles.label}>Repite la contraseña</Text>
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#9E9E9E"
            secureTextEntry value={confirm} onChangeText={setConfirm} />

          <TouchableOpacity style={styles.consentRow} onPress={() => setConsent(!consent)} activeOpacity={0.7}>
            <View style={[styles.checkbox, consent && styles.checkboxOn]}>
              {consent && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.consentText}>
              Acepto los{' '}
              <Text style={styles.link} onPress={() => navigation.navigate('Terms')}>Términos</Text>
              {' '}y la{' '}
              <Text style={styles.link} onPress={() => navigation.navigate('Privacy')}>Política de Privacidad</Text>.
            </Text>
          </TouchableOpacity>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Crear cuenta</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkRow}>
            <Text style={styles.linkText}>¿Ya tienes cuenta? </Text>
            <Text style={styles.linkBold}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, backgroundColor: '#f5f5f5' },
  logoBox: { paddingTop: 70, paddingBottom: 36, alignItems: 'center',
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  logoEmoji: { fontSize: 50 },
  logoTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginTop: 6 },
  logoSub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  form: { padding: 24 },
  label: { fontSize: 13, fontWeight: '600', color: '#616161', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 15,
    borderWidth: 1, borderColor: '#E0E0E0', color: '#212121' },
  rulesBox: { marginTop: 10, backgroundColor: '#fff', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#EEE' },
  rule: { fontSize: 13, marginVertical: 1 },
  consentRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 20 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#1a237e',
    alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 1 },
  checkboxOn: { backgroundColor: '#1a237e' },
  checkmark: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  consentText: { flex: 1, fontSize: 13, color: '#616161', lineHeight: 20 },
  link: { color: '#1a237e', fontWeight: 'bold', textDecorationLine: 'underline' },
  error: { color: '#C62828', marginTop: 14, fontSize: 14 },
  button: { backgroundColor: '#1a237e', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 20 },
  linkText: { color: '#616161', fontSize: 14 },
  linkBold: { color: '#1a237e', fontWeight: 'bold', fontSize: 14 },
  confirmText: { fontSize: 15, color: '#424242', lineHeight: 24, marginBottom: 24, textAlign: 'center' },
});
