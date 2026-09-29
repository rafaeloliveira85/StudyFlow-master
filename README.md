StudyFlow 📚Um projeto educacional desenvolvido com React Native e Expo para ensinar alunos a criar um aplicativo mobile completo. O app aborda desde a navegação entre telas, componentização e gerenciamento de estado até a persistência de dados em banco embarcado (SQLite) com manipulação de dados (DML/DDL) e conceitos avançados de Programação Orientada a Objetos (POO).   📚 Sobre o ProjetoO StudyFlow foi estruturado como material didático para disciplinas de desenvolvimento mobile e banco de dados embarcado. Ele simula uma plataforma de acompanhamento de rotinas de estudo onde o aluno aprende na prática a evoluir uma aplicação local do zero, integrando autenticação e gerenciamento de tarefas offline.   O que os alunos aprendem na prática:✅ Criar e estruturar uma aplicação mobile com React Native e Expo SDK.   ✅ Organizar a arquitetura em camadas (components, screens, models, database, navigation).   ✅ Configurar a navegação por pilha utilizando o React Navigation (Native Stack).   ✅ Gerenciar estados locais e feedbacks visuais na UI (useState, useEffect).   ✅ Aplicar Programação Orientada a Objetos (POO) com Encapsulamento (atributos privados #email, #password, getters e setters).   ✅ Aplicar Herança e Polimorfismo na criação de modelos visuais (CardModel).   ✅ Integrar e manipular um Banco de Dados Embarcado (SQLite Local) com expo-sqlite.   ✅ Executar comandos DDL (CREATE TABLE) e DML (INSERT, SELECT, WHERE, ORDER BY, UPDATE, DELETE).   ✅ Tratar exceções e erros de runtime (try/catch, validação de UNIQUE constraint).   ✅ Implementar formulários de Login, Cadastro (RegisterScreen) e Gerenciador de Tarefas (CRUD).   🚀 Tecnologias e BibliotecasReact Native & Expo (SDK 52+) - Plataforma e framework para desenvolvimento mobile.   Expo SQLite (expo-sqlite) - Banco de dados SQL embarcado e síncrono para armazenamento offline privado no dispositivo.   React Navigation (@react-navigation/native & native-stack) - Gerenciamento de rotas e fluxo entre telas.   JavaScript (ES6+) - Atributos privados (#), métodos estáticos, herança (extends), super() e Prepared Statements.   react-native-safe-area-context - Garantia de área segura em diferentes telas e entalhes de dispositivos.   EAS Build (eas-cli) - Ferramenta para geração e compilação de binários nativos (.apk).📋 Funcionalidades do Aplicativo🚀 1. Splash ScreenTela inicial de carregamento exibida ao abrir a aplicação.   Utiliza Animated para efeitos visuais sutis no logo SF.   Inicializa o banco de dados SQLite (initDatabase()) criando as tabelas users e tasks.   Redireciona automaticamente para o Login usando navigation.replace().   🔐 2. Autenticação Local (SQLite)Consulta a tabela users do SQLite local utilizando o método estático User.authenticateLocal(email, password).   Exibe mensagens amigáveis em caso de credenciais incorretas ou campos vazios.   Transmite o objeto do usuário serializado (user.toObject()) para a tela principal (HomeScreen).   📝 3. Cadastro de Novos Usuários (RegisterScreen)Formulário com campos de Nome, E-mail, Senha e Confirmação de Senha.   Valida na interface se as duas senhas fornecidas coincidem.   Instancia a classe User, executando validações internas via setters.   Salva o registo no SQLite local executando a instrução DML INSERT INTO users via método saveLocal().   🏠 4. Tela Home & Cards PolimórficosExibe uma saudação personalizada utilizando os dados retornados do banco local.   POO em Ação: Renderiza cards informativos (TaskCardModel, TimeCardModel) estendendo a classe abstrata CardModel.   Botão de navegação para o Gerenciador de Tarefas (CRUD).Opção de início/término de sessão e botão de logout.   📋 5. Gerenciador de Tarefas (TaskListScreen & TaskFormScreen) — NOVOInclusão (INSERT INTO): O formulário TaskFormScreen permite cadastrar novas atividades com título e categoria, acionando o método Task.saveLocal().Consulta e Ordenação (SELECT + ORDER BY): Lista todas as tarefas cadastradas no banco ordenadas do registo mais recente ao mais antigo.Filtragem Dinâmica (SELECT + WHERE): Barra de filtros para alternar a exibição entre "Todas", "Pendentes" e "Concluídas" utilizando a cláusula WHERE completed = ?.Atualização (UPDATE): Toque no card para alternar dinamicamente o status da tarefa entre concluída e pendente no banco.Exclusão (DELETE): Botão de lixeira com diálogo de confirmação (Alert.alert) que remove a linha correspondente da tabela tasks.🛠️ Como Executar o Projeto1. Clonar e instalar as dependênciasBash# Clone o repositório
git clone https://github.com/seu-usuario/studyflow.git

# Acesse a pasta do projeto
cd studyflow

# Instale as dependências
npm install
2. Garantir que as dependências do SQLite e Navegação estão ativasBashnpx expo install expo-sqlite @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
3. Executar o servidor de desenvolvimentoBash# Executar no Expo com limpeza de cache (Recomendado)
npx expo start -c
📱 Como Gerar o Arquivo APK (Instalação no Celular)Para compilar o projeto e gerar o binário de instalação do Android (.apk):Instalar a CLI do EAS globalmente:Bashnpm install -g eas-cli
Fazer login na conta do Expo:Basheas login
Configurar o build do projeto:Basheas build:configure
Garantir que a opção de build do eas.json no perfil preview está definida como "buildType": "apk":JSON{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
Gerar a APK na nuvem do Expo:Basheas build -p android --profile preview
Ao final do processo, o terminal exibirá o link direto para download do arquivo .apk e um QR Code para instalação direta no celular.📁 Estrutura do ProjetoPlaintextStudyFlow/
├── App.js                         # Ponto de entrada (Inicializa o SQLite e a navegação)
├── index.js                       # Registro principal do Expo
├── app.json                       # Configurações do projeto Expo
├── eas.json                       # Configurações de compilação da APK (EAS Build)
├── package.json                   # Dependências e scripts
└── src/
    ├── components/
    │   ├── InfoCard.js            # Componente genérico que consome a POO de CardModel
    │   ├── InputField.js          # Campo de entrada de texto reutilizável
    │   └── PrimaryButton.js       # Botão padronizado do aplicativo
    ├── database/
    │   └── database.js            # Criação do banco (.db), DDL (CREATE) e Seed DML
    ├── models/
    │   ├── CardModel.js           # Classe Abstrata Base + Subclasses (Polimorfismo e Herança)
    │   ├── User.js                # Modelo de Usuário (Validações + Autenticação no SQLite)
    │   └── Task.js                # Modelo de Tarefas (Encapsulamento de DML: INSERT, UPDATE, DELETE, SELECT)
    ├── navigation/
    │   └── AppRoutes.js           # Centralização de rotas (Splash, Login, Register, Home, TaskList, TaskForm)
    ├── screens/
    │   ├── HomeScreen.js          # Dashboard e atalho para o CRUD
    │   ├── LoginScreen.js         # Tela de autenticação consultando o banco local
    │   ├── RegisterScreen.js      # Tela de criação de nova conta
    │   ├── TaskListScreen.js      # Tela de listagem, filtragem (WHERE) e exclusão (DELETE)
    │   ├── TaskFormScreen.js      # Tela de cadastro de novas tarefas (INSERT)
    │   └── SplashScreen.js        # Tela de carregamento com animação
    └── styles/
        └── colors.js              # Paleta de cores centralizada
🔍 Conceitos-Chave de POO e Banco Embarcado1. Encapsulamento e Atributos Privados (#)Atributos como e-mail, senha e dados da tarefa não podem ser alterados diretamente por código externo sem passar pelas regras dos setters e validações:   JavaScriptexport class User {
  #email;
  #password;

  setEmail(email) {
    if (!email.includes('@')) throw new Error('E-mail inválido.');
    this.#email = email;
  }
}
2. Comandos DML no SQLite Embarcado (expo-sqlite)Inclusão segura de dados utilizando instruções preparadas síncronas (prepareSync e executeSync) para evitar SQL Injection:   JavaScriptsaveLocal() {
  const statement = db.prepareSync(
    'INSERT INTO tasks (title, category, completed) VALUES ($title, $category, $completed)'
  );
  return statement.executeSync({
    $title: this.#title,
    $category: this.#category,
    $completed: this.#completed,
  });
}
3. Consultas com Filtros (SELECT + WHERE + ORDER BY)Filtragem dinâmica dos registros diretamente no motor SQL local:JavaScriptstatic filterByStatusLocal(isCompleted) {
  const statusValue = isCompleted ? 1 : 0;
  return db.getAllSync(
    'SELECT * FROM tasks WHERE completed = ? ORDER BY id DESC',
    [statusValue]
  );
}
4. Herança e Polimorfismo nos Cards VisuaisSubclasses personalizam o comportamento de exibição de dados sobrescrevendo o método getFormattedValue():   JavaScriptexport class TimeCardModel extends CardModel {
  getFormattedValue() {
    return `${Math.floor(this.minutes / 60)}h`;
  }
}
👨‍🏫 Dicas para o Instrutor / ProfessorEste projeto serve como um plano de aulas completo para disciplinas de desenvolvimento mobile e banco de dados: 1: Fundamentos de React Native, componentes reutilizáveis e navegação com Native Stack.   2: Validação de formulários e tratamento de erros com try/catch.   3: Introdução à Programação Orientada a Objetos em JavaScript (Classes, Encapsulamento, Herança e Polimorfismo).   4: Banco de Dados Embarcado — DDL (CREATE TABLE) e inserção de dados iniciais com expo-sqlite.   5: DML na Prática — Consultas (SELECT, WHERE, ORDER BY), Atualização (UPDATE) e Remoção (DELETE). 6: Compilação e Geração do arquivo APK para distribuição e teste em dispositivos físicos.
