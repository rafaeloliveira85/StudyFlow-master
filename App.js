// App.js
// =============================================================================
// PONTO DE ENTRADA PRINCIPAL DO APLICATIVO
// Executa a inicialização do banco embarcado e renderiza as rotas da aplicação.
// =============================================================================

import { useEffect } from 'react';
import { initDatabase } from './src/database/database';
import AppRoutes from './src/navigation/AppRoutes';

export default function App() {
  // Hook useEffect: Disparado uma única vez durante a montagem do componente principal
  useEffect(() => {
    // Garante a criação/verificação das tabelas DDL (users e tasks) e inserções DML iniciais
    initDatabase();
  }, []);

  // Renderiza a estrutura de navegação do React Navigation (Splash, Login, Home, CRUD, etc.)
  return <AppRoutes />;
}