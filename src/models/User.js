// src/models/User.js
import db from '../database/database'; // Importa a conexão ativa com o SQLite local

export class User {
  #email;    // Encapsulamento: impede o acesso direto ao email
  #password; // Encapsulamento: impede o acesso direto à senha

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

  // =========================================================================
  // NOVO MÉTODO: Persistência do objeto no SQLite local
  // =========================================================================
  saveLocal() {
    try {
      // 1. Prepara a query parametrizada (evita ataques de SQL Injection)
      const statement = db.prepareSync(
        'INSERT INTO users (name, email, password) VALUES ($name, $email, $password)'
      );
      
      // 2. Executa a inserção passando as propriedades encapsuladas do objeto
      const result = statement.executeSync({
        $name: this.name,
        $email: this.#email,
        $password: this.#password,
      });

      // Retorna o ID gerado automaticamente na tabela
      return result.lastInsertRowId;
    } catch (error) {
      // 3. Captura o erro do banco de dados e converte para uma mensagem amigável
      const errString = error?.message || String(error);
      if (errString.includes('UNIQUE constraint failed')) {
        throw new Error('Este e-mail já está cadastrado.');
      }
      throw new Error('Erro ao salvar no banco de dados local.');
    }
  }

  // =========================================================================
  // NOVO MÉTODO ESTÁTICO: Autenticação direta no banco SQLite
  // =========================================================================
  static authenticateLocal(email, password) {
    const normalized = (email || '').trim().toLowerCase();
    if (!normalized || !password) {
      throw new Error('Preencha e-mail e senha.');
    }

    // Busca na tabela 'users' por um registo correspondente
    const row = db.getFirstSync(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [normalized, password]
    );

    // Se a consulta não retornar nenhuma linha, a credencial está incorreta
    if (!row) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // Retorna uma nova instância válida de User com os dados do banco
    return new User(row.name, row.email, row.password);
  }

  // Converte a instância para um objeto simples (JSON) seguro para o React Navigation
  toObject() {
    return {
      name: this.name,
      email: this.#email,
    };
  }
}
