// src/screens/RegisterScreen.js
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { User } from '../models/User';
import { colors } from '../styles/colors';

export default function RegisterScreen({ navigation }) {
  // NOVO: Estados locais para capturar as entradas do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // NOVO: Estados para exibição de mensagens de erro ou sucesso
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleRegister() {
    try {
      setErrorMessage('');
      setSuccessMessage('');

      // PASSO 1: Validação visual no formulário (se as senhas coincidem)
      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem.');
      }

      // PASSO 2: Instanciação do modelo (aciona as validações internas da classe User)
      const newUser = new User(name, email, password);

      // PASSO 3: Executa o método de inserção no banco de dados SQLite
      newUser.saveLocal();

      // PASSO 4: Exibe mensagem de confirmação e redireciona para o Login
      setSuccessMessage('Conta criada com sucesso! Redirecionando...');

      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);

    } catch (error) {
      // Captura e apresenta os erros de validação ou do SQLite na interface
      setErrorMessage(error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardArea}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.logo}>SF</Text>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Cadastre-se para usar o banco local do StudyFlow.</Text>
        </View>

        <View style={styles.form}>
          <InputField label="Nome" value={name} onChangeText={setName} placeholder="Digite seu nome" />
          <InputField label="E-mail" value={email} onChangeText={setEmail} placeholder="seu.email@exemplo.com" keyboardType="email-address" autoCapitalize="none" />
          <InputField label="Senha" value={password} onChangeText={setPassword} placeholder="Senha (mín. 4 caracteres)" secureTextEntry autoCapitalize="none" />
          <InputField label="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Repita a senha" secureTextEntry autoCapitalize="none" />

          {/* Renderização condicional de erros e alertas */}
          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {successMessage ? (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          ) : null}

          <PrimaryButton title="Cadastrar" onPress={handleRegister} />

          {/* Navegação de regresso ao Login */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Já tem uma conta? Faça Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardArea: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 24 },
  header: { alignItems: 'center', gap: 4 },
  logo: { color: colors.primary, fontSize: 48, fontWeight: '800' },
  title: { color: colors.text, fontSize: 26, fontWeight: '800' },
  subtitle: { color: colors.textLight, fontSize: 14, textAlign: 'center' },
  form: { gap: 14 },
  errorContainer: { backgroundColor: '#FFEBEB', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.error || '#FF3B30' },
  errorText: { color: colors.error || '#FF3B30', fontSize: 14, textAlign: 'center' },
  successContainer: { backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#2E7D32' },
  successText: { color: '#2E7D32', fontSize: 14, textAlign: 'center', fontWeight: '600' },
  linkText: { color: colors.primary, fontSize: 14, textAlign: 'center', marginTop: 8 },
});
