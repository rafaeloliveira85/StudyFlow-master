// Importa a conexão com o banco SQLite criada anteriormente
import db from '../database/database';

// Classe que representa um usuário da aplicação
export class User {

  // Atributos privados (Encapsulamento)
  #email;
  #password;

  // Construtor: executado quando um novo objeto User é criado
  constructor(name, email, password) {

    // Define um nome padrão caso nenhum seja informado
    this.name = name || 'Estudante';

    // Valida e salva o e-mail
    this.setEmail(email);

    // Valida e salva a senha
    this.setPassword(password);
  }

  // Método responsável por validar o e-mail
  setEmail(email) {

    const normalized = (email || '').trim().toLowerCase();

    // Verifica se possui formato básico de e-mail
    if (!normalized || !normalized.includes('@') || !normalized.includes('.')) {
      throw new Error('E-mail inválido.');
    }

    this.#email = normalized;
  }

  // Método responsável por validar a senha
  setPassword(password) {

    // Senha deve possuir no mínimo 4 caracteres
    if (!password || password.length < 4) {
      throw new Error('A senha deve ter pelo menos 4 caracteres.');
    }

    this.#password = password;
  }

  // Getter: permite acessar o e-mail de forma controlada
  getEmail() {
    return this.#email;
  }

  // Salva o usuário no banco SQLite
  saveLocal() {

    try {

      // Prepara o comando SQL
      const statement = db.prepareSync(
        'INSERT INTO users (name, email, password) VALUES ($name, $email, $password)'
      );

      // Executa o INSERT enviando os valores da classe
      const result = statement.executeSync({
        $name: this.name,
        $email: this.#email,
        $password: this.#password,
      });

      // Retorna o ID criado automaticamente
      return result.lastInsertRowId;

    } catch (error) {

      // Trata erro de e-mail duplicado
      if (error.message && error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Este e-mail já está cadastrado.');
      }

      // Outros erros do banco
      throw new Error('Erro ao salvar no banco de dados local.');
    }
  }

  // Método estático para autenticação do usuário
  static authenticateLocal(email, password) {

    const normalized = (email || '').trim().toLowerCase();

    // Verifica se os campos foram preenchidos
    if (!normalized || !password) {
      throw new Error('Preencha e-mail e senha.');
    }

    // Procura um usuário com e-mail e senha informados
    const row = db.getFirstSync(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [normalized, password]
    );

    // Caso não encontre o usuário
    if (!row) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // Retorna um objeto User com os dados encontrados
    return new User(row.name, row.email, row.password);
  }

  // Converte o objeto em um formato simples (JSON)
  toObject() {
    return {
      name: this.name,
      email: this.#email,
    };
  }
}
