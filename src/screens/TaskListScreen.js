// src/screens/TaskListScreen.js
// =============================================================================
// TELA DE CONSULTA, FILTRAGEM E MANIPULAÇÃO DE DADOS (DML VISUAL)
// =============================================================================

import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import { Task } from '../models/Task';
import { colors } from '../styles/colors';

export default function TaskListScreen({ navigation }) {
  const [taskList, setTaskList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [errorMessage, setErrorMessage] = useState('');

  // Reconsulta o banco SQLite com base no filtro ativo
  function loadTasks() {
    try {
      setErrorMessage('');
      let rows = [];

      // 1. SELECT * FROM tasks WHERE completed = 0
      if (activeFilter === 'PENDING') {
        rows = Task.filterByStatusLocal(false);
      } 
      // 2. SELECT * FROM tasks WHERE completed = 1
      else if (activeFilter === 'COMPLETED') {
        rows = Task.filterByStatusLocal(true);
      } 
      // 3. SELECT * FROM tasks ORDER BY id DESC
      else {
        rows = Task.listAllLocal();
      }

      setTaskList(rows);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [activeFilter]);

  // Altera o status da tarefa no banco (UPDATE)
  function handleToggleTask(item) {
    try {
      const taskInstance = new Task(item.title, item.category, item.completed, item.id);
      taskInstance.toggleStatusLocal();
      loadTasks();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // Remove o registro do banco de dados (DELETE)
  function handleDeleteTask(item) {
    Alert.alert(
      'Remover Tarefa',
      `Deseja realmente excluir "${item.title}" do banco local?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            try {
              const taskInstance = new Task(item.title, item.category, item.completed, item.id);
              taskInstance.deleteLocal();
              loadTasks();
            } catch (error) {
              setErrorMessage(error.message);
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciador de Tarefas</Text>

      {/* Navega até a tela de formulário (INSERT) */}
      <PrimaryButton
        title="+ Nova Tarefa (INSERT)"
        onPress={() => navigation.navigate('TaskForm')}
      />

      {/* BARRA DE FILTROS: Altera a cláusula WHERE no banco */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'ALL' && styles.filterChipActive]}
          onPress={() => setActiveFilter('ALL')}
        >
          <Text style={styles.filterText}>Todas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'PENDING' && styles.filterChipActive]}
          onPress={() => setActiveFilter('PENDING')}
        >
          <Text style={styles.filterText}>Pendentes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'COMPLETED' && styles.filterChipActive]}
          onPress={() => setActiveFilter('COMPLETED')}
        >
          <Text style={styles.filterText}>Concluídas</Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* LISTAGEM DOS DADOS (SELECT) */}
      <FlatList
        data={taskList}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <TouchableOpacity
              style={styles.taskInfo}
              onPress={() => handleToggleTask(item)}
            >
              <Text style={[styles.taskTitle, item.completed && styles.completedText]}>
                {item.completed ? '✓ ' : '○ '} {item.title}
              </Text>
              <Text style={styles.taskCategory}>{item.category}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(item)}
            >
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backText}>Voltar para a Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background, gap: 16 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, marginTop: 20 },
  filterRow: { flexDirection: 'row', gap: 8, marginVertical: 8 },
  filterChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  filterChipActive: { backgroundColor: colors.primary },
  filterText: { color: colors.surface, fontWeight: '700', fontSize: 12 },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  completedText: { textDecorationLine: 'line-through', opacity: 0.5 },
  taskCategory: { fontSize: 12, color: colors.textLight, marginTop: 4 },
  deleteButton: { padding: 8 },
  deleteText: { fontSize: 18 },
  errorText: { color: colors.error || '#FF3B30', textAlign: 'center' },
  backButton: { paddingVertical: 12, alignItems: 'center' },
  backText: { color: colors.primary, fontWeight: '700', fontSize: 14 },
});