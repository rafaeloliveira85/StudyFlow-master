// src/models/User.js
// =============================================================================
// MODELO DE DOMÍNIO DO USUÁRIO
// Gerencia a persistência e a consulta de autenticação no SQLite.
// =============================================================================

import db from '../database/database';

export class User {
  #email;
  #password;

  constructor(name, email, password) {
    this.name = name || 'Estudante';
    this.setEmail(email);
    this.setPassword(password);
  }

  setEmail(email) {
    const normalized = (email || '').trim().toLowerCase();
    if (!normalized || !normalized.includes('@') || !normalized.includes('.')) {
      throw new Error('Informe um e-mail válido.');
    }
    this.#email = normalized;
  }

  setPassword(password) {
    if (!password || password.length < 4) {
      throw new Error('A senha deve ter pelo menos 4 caracteres.');
    }
    this.#password = password;
  }

  getEmail() {
    return this.#email;
  }

  // DML INSERT: Grava um novo cadastro de usuário
  saveLocal() {
    try {
      const statement = db.prepareSync(
        'INSERT INTO users (name, email, password) VALUES ($name, $email, $password)'
      );
      const result = statement.executeSync({
        $name: this.name,
        $email: this.#email,
        $password: this.#password,
      });
      return result.lastInsertRowId;
    } catch (error) {
      const errString = error?.message || String(error);
      if (errString.includes('UNIQUE constraint failed')) {
        throw new Error('Este e-mail já está cadastrado.');
      }
      throw new Error('Erro ao salvar no banco de dados local.');
    }
  }

  // DML SELECT + WHERE: Valida o e-mail e senha no banco local
  static authenticateLocal(email, password) {
    const normalized = (email || '').trim().toLowerCase();
    if (!normalized || !password) {
      throw new Error('Preencha e-mail e senha.');
    }

    const row = db.getFirstSync(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [normalized, password]
    );

    if (!row) {
      throw new Error('E-mail ou senha incorretos.');
    }

    return new User(row.name, row.email, row.password);
  }

  toObject() {
    return {
      name: this.name,
      email: this.#email,
    };
  }
}