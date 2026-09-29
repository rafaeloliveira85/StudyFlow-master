// src/screens/TaskFormScreen.js
// =============================================================================
// TELA DE CADASTRO DE TAREFAS (FORMULÁRIO DML INSERT)
// =============================================================================

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
import { Task } from '../models/Task';
import { colors } from '../styles/colors';

export default function TaskFormScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Executa a inserção no banco de dados local
  function handleSaveTask() {
    try {
      setErrorMessage('');

      // Instancia e valida a tarefa
      const newTask = new Task(title, category);
      
      // Executa o INSERT INTO no SQLite
      newTask.saveLocal();

      // Retorna para a listagem
      navigation.goBack();
    } catch (error) {
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
          <Text style={styles.title}>Nova Tarefa</Text>
          <Text style={styles.subtitle}>Cadastre uma atividade no banco local SQLite.</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Título da Tarefa"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Estudar comandos DML no SQLite"
          />

          <InputField
            label="Categoria"
            value={category}
            onChangeText={setCategory}
            placeholder="Ex: Faculdade, Trabalho, Pessoal"
          />

          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <PrimaryButton title="Salvar Tarefa" onPress={handleSaveTask} />

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardArea: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 24 },
  header: { alignItems: 'center', gap: 6 },
  title: { color: colors.text, fontSize: 26, fontWeight: '800' },
  subtitle: { color: colors.textLight, fontSize: 14, textAlign: 'center' },
  form: { gap: 16 },
  errorContainer: {
    backgroundColor: '#FFEBEB',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error || '#FF3B30',
  },
  errorText: { color: colors.error || '#FF3B30', fontSize: 14, textAlign: 'center' },
  cancelButton: { paddingVertical: 10, alignItems: 'center' },
  cancelText: { color: colors.primary, fontWeight: '700', fontSize: 14 },
});