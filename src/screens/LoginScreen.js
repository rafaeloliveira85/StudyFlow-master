// src/screens/LoginScreen.js
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity, // ALTERAÇÃO 1: Importado para tornar a opção de cadastro clicável
  View,
} from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { User } from '../models/User';
import { colors } from '../styles/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleLogin() {
    try {
      setErrorMessage('');
      
      // ALTERAÇÃO 2: Chama a consulta dinâmica no SQLite em vez de validar strings fixas
      const authenticatedUser = User.authenticateLocal(email, password);
      
      // Direciona para a Home enviando os dados validados do banco local
      navigation.replace('Home', { user: authenticatedUser.toObject() });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.keyboardArea} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.logo}>SF</Text>
          <Text style={styles.title}>Bem-vindo ao StudyFlow</Text>
          <Text style={styles.subtitle}>Entre para acompanhar sua rotina de estudos.</Text>
        </View>

        <View style={styles.form}>
          <InputField label="E-mail" value={email} onChangeText={setEmail} placeholder="digite seu e-mail" keyboardType="email-address" autoCapitalize="none" />
          <InputField label="Senha" value={password} onChangeText={setPassword} placeholder="Digite sua senha" secureTextEntry autoCapitalize="none" />

          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <PrimaryButton title="Entrar" onPress={handleLogin} />

          {/* ALTERAÇÃO 3: Link de redirecionamento para o ecrã de cadastro */}
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardArea: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 36 },
  header: { alignItems: 'center', gap: 1 },
  logo: { color: colors.primary, fontSize: 58, fontWeight: '800' },
  title: { color: colors.text, fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: colors.textLight, fontSize: 15, lineHeight: 22, textAlign: 'center' },
  form: { gap: 18 },
  errorContainer: { backgroundColor: '#FFEBEB', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.error },
  errorText: { color: colors.error, fontSize: 14, fontWeight: '600', textAlign: 'center' },
  // ALTERAÇÃO 4: Estilo atribuído ao botão de cadastro
  linkText: { color: colors.primary, fontSize: 14, textAlign: 'center', marginTop: 4 },
});
