// src/models/Task.js
// =============================================================================
// MODELO DE DOMÍNIO DA TAREFA (POO + DML SQLite)
// Centraliza as regras de negócio e executa as instruções SQL locais.
// =============================================================================

import db from '../database/database';

export class Task {
  // Atributos privados da POO (Encapsulamento ES6)
  #id;
  #title;
  #category;
  #completed;

  constructor(title, category, completed = 0, id = null) {
    this.#id = id;
    this.setTitle(title);      // Executa validações de entrada
    this.setCategory(category);  // Executa validações de entrada
    this.#completed = completed ? 1 : 0;
  }

  // Getters para leitura controlada
  getId() { return this.#id; }
  getTitle() { return this.#title; }
  getCategory() { return this.#category; }
  isCompleted() { return this.#completed === 1; }

  // Setters com validações
  setTitle(title) {
    const formatted = (title || '').trim();
    if (!formatted || formatted.length < 3) {
      throw new Error('O título da tarefa deve ter pelo menos 3 caracteres.');
    }
    this.#title = formatted;
  }

  setCategory(category) {
    const formatted = (category || '').trim();
    if (!formatted) {
      throw new Error('Informe uma categoria para a tarefa.');
    }
    this.#category = formatted;
  }

  // =========================================================================
  // DML 1: INSERÇÃO (CREATE / INSERT INTO)
  // Grava uma nova instância do objeto diretamente na tabela 'tasks'
  // =========================================================================
  saveLocal() {
    try {
      // Prepared Statement: Previne SQL Injection utilizando $parâmetros
      const statement = db.prepareSync(
        'INSERT INTO tasks (title, category, completed) VALUES ($title, $category, $completed)'
      );

      // Executa a inserção passando os valores encapsulados
      const result = statement.executeSync({
        $title: this.#title,
        $category: this.#category,
        $completed: this.#completed,
      });

      return result.lastInsertRowId; // Retorna o ID autogerado
    } catch (error) {
      throw new Error('Erro ao executar o INSERT da tarefa no banco local.');
    }
  }

  // =========================================================================
  // DML 2: ALTERAÇÃO (UPDATE + WHERE)
  // Alterna o status da coluna 'completed' filtrando pelo 'id'
  // =========================================================================
  toggleStatusLocal() {
    if (!this.#id) throw new Error('Tarefa sem ID para atualização.');

    try {
      const newStatus = this.#completed === 1 ? 0 : 1;

      const statement = db.prepareSync(
        'UPDATE tasks SET completed = $completed WHERE id = $id'
      );
      statement.executeSync({
        $completed: newStatus,
        $id: this.#id,
      });

      this.#completed = newStatus;
    } catch (error) {
      throw new Error('Erro ao executar o UPDATE do status no banco.');
    }
  }

  // =========================================================================
  // DML 3: REMOÇÃO (DELETE + WHERE)
  // Apaga a linha correspondente ao 'id'
  // =========================================================================
  deleteLocal() {
    if (!this.#id) throw new Error('Tarefa sem ID para exclusão.');

    try {
      const statement = db.prepareSync('DELETE FROM tasks WHERE id = $id');
      statement.executeSync({ $id: this.#id });
    } catch (error) {
      throw new Error('Erro ao executar o DELETE no banco local.');
    }
  }

  // =========================================================================
  // DML 4: CONSULTA E ORDENAÇÃO (SELECT + ORDER BY)
  // Retorna todos os registros ordenados do mais recente ao mais antigo
  // =========================================================================
  static listAllLocal() {
    try {
      return db.getAllSync('SELECT * FROM tasks ORDER BY id DESC');
    } catch (error) {
      throw new Error('Erro ao executar a consulta SELECT das tarefas.');
    }
  }

  // =========================================================================
  // DML 5: CONSULTA COM FILTRO (SELECT + WHERE + ORDER BY)
  // Filtra as tarefas dependendo do estado da coluna 'completed'
  // =========================================================================
  static filterByStatusLocal(isCompleted) {
    try {
      const statusValue = isCompleted ? 1 : 0;

      return db.getAllSync(
        'SELECT * FROM tasks WHERE completed = ? ORDER BY id DESC',
        [statusValue]
      );
    } catch (error) {
      throw new Error('Erro ao filtrar tarefas com a cláusula WHERE.');
    }
  }
}