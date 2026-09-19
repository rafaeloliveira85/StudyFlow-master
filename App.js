// Importa o Hook useEffect do React.
// Esse Hook executa uma função quando o componente é carregado.
import { useEffect } from 'react';

// Importa a função responsável por criar e inicializar o banco SQLite.
import { initDatabase } from './src/database/database';

// Importa as rotas (telas) da aplicação.
import AppRoutes from './src/navigation/AppRoutes';

// Componente principal da aplicação.
export default function App() {

  // Executa apenas uma vez quando o aplicativo é iniciado.
  useEffect(() => {

    // Inicializa o banco de dados local (SQLite).
    // Cria as tabelas e insere dados iniciais, se necessário.
    initDatabase();

  }, []); // Array vazio = executa somente na primeira abertura do app.

  // Exibe a navegação da aplicação (Login, Cadastro, Home, etc.).
  return <AppRoutes />;

}
