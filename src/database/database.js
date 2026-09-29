// src/database/database.js
// =============================================================================
// MÓDULO DE BANCO DE DADOS EMBARCADO (SQLite)
// Gerencia a abertura da conexão local e a estrutura física das tabelas (DDL/DML).
// =============================================================================

import * as SQLite from 'expo-sqlite';

// 1. CONEXÃO LOCAL: Abre (ou cria) o arquivo privado "studyflow.db" no dispositivo
const db = SQLite.openDatabaseSync('studyflow.db');

export function initDatabase() {
  try {
    // -------------------------------------------------------------------------
    // DDL (Data Definition Language) - Criação das Tabelas
    // -------------------------------------------------------------------------

    // Tabela de Usuários
    db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    // Tabela de Tarefas (Estrutura do CRUD)
    db.execSync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        completed INTEGER DEFAULT 0  -- 0 = Pendente, 1 = Concluída
      );
    `);

    // -------------------------------------------------------------------------
    // DML (Data Manipulation Language) - Inserção Inicial de Dados (Seed)
    // -------------------------------------------------------------------------

    // Verifica a quantidade de registros existentes
    const userCount = db.getFirstSync('SELECT COUNT(*) as count FROM users');

    // DML INSERT: Insere o usuário padrão de testes se a tabela estiver vazia
    if (userCount && userCount.count === 0) {
      db.execSync(`
        INSERT INTO users (name, email, password)
        VALUES ('Estudante', 'aluno@senac.com', '1234');
      `);
      console.log('Banco inicializado: Usuário padrão inserido via DML.');
    }
  } catch (error) {
    console.error('Erro de DDL/DML na inicialização do SQLite:', error);
  }
}

// Exporta a instância da conexão ativa
export default db;