// Importa a biblioteca SQLite do Expo
import * as SQLite from 'expo-sqlite';

// Cria (ou abre, se já existir) um banco de dados local chamado studyflow.db
const db = SQLite.openDatabaseSync('studyflow.db');

// Função responsável por criar a estrutura inicial do banco
export function initDatabase() {

  try {

    // Cria a tabela "users" apenas se ela ainda não existir
    db.execSync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    // Verifica quantos usuários existem na tabela
    const userCount = db.getFirstSync(
      'SELECT COUNT(*) as count FROM users'
    );

    // Se o banco estiver vazio, insere um usuário padrão
    if (userCount && userCount.count === 0) {

      db.execSync(`
        INSERT INTO users (name, email, password)
        VALUES ('Estudante', 'aluno@senac.com', '1234');
      `);

      console.log('Banco inicializado: Usuário padrão inserido.');
    }

  } catch (error) {

    // Exibe uma mensagem caso ocorra algum erro durante a criação do banco
    console.error('Erro ao inicializar SQLite:', error);

  }
}

// Exporta a conexão para ser utilizada em outras telas da aplicação
export default db;
