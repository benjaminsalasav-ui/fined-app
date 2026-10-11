import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthContext';

export default function ForgotPasswordScreen({ navigation }) {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    setError('');
    setLoading(true);
    const res = await resetPassword(email);
    setLoading(false);
    if (res.error) setError(res.error);
    else setSent(true);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={['#1a237e', '#283593']} style={styles.logoBox}>
          <Text style={styles.logoEmoji}>🔑</Text>
          <Text style={styles.logoTitle}>Recuperar contraseña</Text>
        </LinearGradient>

        <View style={styles.form}>
          {sent ? (
            <>
              <Text style={styles.info}>
                Si existe una cuenta con <Text style={{ fontWeight: 'bold' }}>{email.trim()}</Text>, te
                enviamos un enlace para restablecer tu contraseña. Revisa tu correo (y la carpeta de spam).
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Volver a iniciar sesión</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.info}>
                Ingresa tu email y te enviaremos un enlace para crear una nueva contraseña.
              </Text>
              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.input} placeholder="tucorreo@ejemplo.com" placeholderTextColor="#9E9E9E"
                keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar enlace</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkRow}>
                <Text style={styles.linkBold}>← Volver</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, backgroundColor: '#f5f5f5' },
  logoBox: { paddingTop: 80, paddingBottom: 40, alignItems: 'center',
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  logoEmoji: { fontSize: 52 },
  logoTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 6 },
  form: { padding: 24 },
  info: { fontSize: 15, color: '#424242', lineHeight: 23, marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#616161', marginBottom: 6 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 15,
    borderWidth: 1, borderColor: '#E0E0E0', color: '#212121' },
  error: { color: '#C62828', marginTop: 14, fontSize: 14 },
  button: { backgroundColor: '#1a237e', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 22 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkRow: { alignItems: 'center', marginTop: 20 },
  linkBold: { color: '#1a237e', fontWeight: 'bold', fontSize: 14 },
});
