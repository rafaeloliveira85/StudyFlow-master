# StudyFlow 📚

Um projeto educacional desenvolvido com React Native e Expo para ensinar alunos a criar um aplicativo mobile com navegação entre telas, login local, componentes reutilizáveis, estado, props, animação simples e estilos organizados.

## 📚 Sobre o Projeto

Este projeto foi criado como material didático para demonstrar conceitos fundamentais do React Native em uma aplicação simples de rotina de estudos.

Os alunos aprendem na prática como:

✅ Criar um app mobile com React Native e Expo  
✅ Organizar o projeto em pastas e arquivos separados  
✅ Criar navegação entre telas com React Navigation  
✅ Usar `useState` para controlar campos e mensagens  
✅ Usar `useEffect` para executar ações ao abrir uma tela  
✅ Criar uma Splash Screen com animação  
✅ Validar um formulário de login simples  
✅ Enviar parâmetros de uma tela para outra  
✅ Separar a interface em componentes reutilizáveis  
✅ Passar dados entre componentes usando `props`  
✅ Criar estilos com `StyleSheet`  
✅ Centralizar cores em um arquivo compartilhado  

## 🚀 Tecnologias Utilizadas

- React Native - Framework para desenvolvimento mobile
- Expo SDK 57 - Plataforma para executar e testar o app com facilidade
- JavaScript - Linguagem utilizada no projeto
- React Hooks - Uso de `useState`, `useEffect` e `useRef`
- React Navigation - Navegação entre Splash, Login e Home
- react-native-safe-area-context - Ajuste de área segura da tela
- react-native-screens - Otimização de telas nativas

## 📋 Funcionalidades

### ✨ Splash Screen

- Tela inicial exibida ao abrir o app
- Mostra a marca `StudyFlow`
- Usa `Animated` para criar efeito de opacidade e escala
- Após alguns segundos, navega automaticamente para o Login
- Usa `navigation.replace()` para remover a Splash do histórico

### 🔐 Login Local

- Campos de e-mail e senha
- Validação para impedir campos vazios
- Validação com credenciais fixas no código
- Mensagem de erro quando os dados estão incorretos
- Navegação para a Home quando o login está correto

Credenciais de teste:

```txt
E-mail: aluno@senac.com
Senha: 1234
```

### 🏠 Tela Home

- Saudação personalizada com nome recebido pela navegação
- Card de próxima atividade
- Cards com resumo de progresso
- Botão para começar ou encerrar sessão de estudo
- Texto dinâmico que muda conforme o estado `sessionStarted`
- Opção de sair e voltar para o Login

### 🧩 Componentização

- `InputField` cria campos de formulário reutilizáveis
- `PrimaryButton` cria o botão principal do app
- `InfoCard` exibe informações resumidas na Home
- `AppRoutes` centraliza a navegação entre telas
- `colors.js` centraliza as cores usadas no projeto

## 🛠️ Como Usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar o projeto

```bash
npm start
```

Depois disso, você pode abrir no Expo Go pelo QR Code ou escolher uma das opções do terminal.

### 3. Executar em plataformas específicas

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### 4. Executar limpando o cache

Se o app não atualizar ou o emulador ficar estranho, use:

```bash
npx expo start --clear --android
```

## 📁 Estrutura do Projeto

```txt
StudyFlow/
├── App.js                                      # Ponto de entrada visual do app
├── index.js                                    # Registro do app no Expo
├── app.json                                    # Configurações do aplicativo Expo
├── package.json                                # Dependências e scripts do projeto
├── assets/                                     # Ícones e imagens do app
└── src/
    ├── components/
    │   ├── InfoCard.js                         # Card de informação reutilizável
    │   ├── InputField.js                       # Campo de formulário reutilizável
    │   └── PrimaryButton.js                    # Botão principal reutilizável
    ├── navigation/
    │   └── AppRoutes.js                        # Configuração das rotas do app
    ├── screens/
    │   ├── HomeScreen.js                       # Tela principal após o login
    │   ├── LoginScreen.js                      # Tela de login local
    │   └── SplashScreen.js                     # Tela de abertura animada
    └── styles/
        └── colors.js                           # Cores centralizadas do projeto
```

## 🔍 Conceitos-Chave Abordados

### 1. `useState`

Hook usado para guardar informações que mudam na tela.

```js
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
```

Neste projeto, o `useState` controla:

- valor digitado no campo de e-mail;
- valor digitado no campo de senha;
- mensagem de erro do login;
- estado da sessão de estudo na Home.

### 2. `useEffect`

Hook usado para executar uma ação depois que a tela aparece.

```js
useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace('Login');
  }, 2200);

  return () => clearTimeout(timer);
}, [navigation]);
```

No StudyFlow, ele é usado na Splash Screen para aguardar alguns segundos e trocar para a tela de Login.

### 3. `useRef`

Hook usado para guardar valores que continuam existindo entre renderizações.

```js
const opacity = useRef(new Animated.Value(0)).current;
const scale = useRef(new Animated.Value(0.8)).current;
```

Neste projeto, o `useRef` guarda os valores animados da Splash Screen.

### 4. `props`

As `props` permitem enviar dados de um componente pai para um componente filho.

```js
<InputField
  label="E-mail"
  value={email}
  onChangeText={setEmail}
  placeholder="digite seu email"
/>
```

Aqui, o componente `InputField` recebe o texto do label, o valor atual do campo e a função que atualiza o estado.

### 5. Navegação

O projeto usa React Navigation para trocar de tela.

```js
navigation.replace('Home', { studentName: 'Estudante' });
```

O método `replace()` substitui a tela atual por outra. Isso impede que o usuário volte para a tela anterior pelo botão de voltar.

### 6. Parâmetros de Rota

Uma tela pode enviar dados para outra.

```js
navigation.replace('Home', { studentName: 'Estudante' });
```

Na Home, o dado é lido assim:

```js
const studentName = route.params?.studentName ?? 'Estudante';
```

### 7. Renderização Condicional

A tela muda de acordo com o valor do estado.

```js
{errorMessage ? (
  <Text style={styles.errorText}>{errorMessage}</Text>
) : null}
```

Esse padrão é usado para mostrar a mensagem de erro somente quando ela existe.

### 8. Operador Ternário

O operador ternário escolhe entre dois valores.

```js
{sessionStarted ? 'Encerrar sessao' : 'Comecar estudo'}
```

Na Home, ele muda o texto do botão e da mensagem conforme a sessão de estudo está ativa ou não.

### 9. Componentes Reutilizáveis

Componentes evitam repetição de código.

```js
<PrimaryButton title="Entrar" onPress={handleLogin} />
```

Em vez de criar um botão novo em cada tela, o app usa `PrimaryButton`.

### 10. StyleSheet

O `StyleSheet` organiza os estilos dos componentes.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
```

Ele funciona de forma parecida com CSS, mas usando objetos JavaScript.

## 🎨 Interface

O app usa uma identidade visual simples e educacional:

- fundo claro;
- cor principal azul;
- cards para organizar informações;
- botão principal reutilizável;
- tela de abertura com marca do app;
- formulário centralizado;
- espaçamentos consistentes;
- cores centralizadas no arquivo `colors.js`.

## 💡 Pontos de Aprendizagem

- Estado local com `useState`
- Efeitos com `useEffect`
- Valores persistentes com `useRef`
- Comunicação entre componentes com `props`
- Separação de responsabilidades
- Criação de componentes reutilizáveis
- Navegação entre telas
- Envio de parâmetros por rota
- Validação simples de formulário
- Renderização condicional
- Eventos de toque com `Pressable` e `Text`
- Animações básicas com `Animated`
- Estilização com `StyleSheet`
- Organização de arquivos em uma aplicação React Native

## 📚 Recursos Educacionais

- Documentação do Expo SDK 57: https://docs.expo.dev/versions/v57.0.0/
- Documentação do React Native: https://reactnative.dev/docs/getting-started
- Documentação do React: https://react.dev/learn
- Documentação do React Navigation: https://reactnavigation.org/
- Expo Go: https://expo.dev/go
- Safe Area Context: https://github.com/AppAndFlow/react-native-safe-area-context

## ✏️ Comentários no Código

O código contém comentários explicando o papel de cada parte da aplicação.

Recomenda-se que os alunos leiam principalmente:

- `App.js` para entender o ponto de entrada visual do app
- `src/navigation/AppRoutes.js` para entender a navegação
- `src/screens/SplashScreen.js` para entender `useEffect`, `useRef` e animação
- `src/screens/LoginScreen.js` para entender formulário, estado e validação
- `src/screens/HomeScreen.js` para entender parâmetros de rota e estado dinâmico
- `src/components/InputField.js` para entender `props`
- `src/components/PrimaryButton.js` para entender componente reutilizável e `Pressable`
- `src/components/InfoCard.js` para entender reutilização de layout
- `src/styles/colors.js` para entender centralização de estilos

## 🎯 Próximos Passos (Desafios)

- Criar uma tela de cadastro
- Adicionar campo de nome no login
- Enviar o nome digitado para a Home
- Criar uma lista de tarefas de estudo
- Permitir marcar tarefas como concluídas
- Criar novos cards de progresso
- Alterar as cores do app em `colors.js`
- Trocar a marca textual `SF` por uma imagem
- Adicionar animação ao botão principal
- Criar uma tela de perfil do estudante
- Salvar dados usando armazenamento local
- Consumir dados de uma API

## 📝 Notas Importantes

- Este projeto não consome API; o login usa dados fixos no código
- As credenciais são apenas para estudo
- O objetivo principal é ensinar lógica de interface, estado, componentes e navegação
- O projeto usa Expo SDK 57, React 19 e React Native 0.86
- A documentação do Expo SDK 57 recomenda Node.js 22.13.x ou superior
- Os componentes foram separados para facilitar a leitura durante a aula
- O código foi comentado com foco em alunos iniciantes
- O app usa `SafeAreaView` de `react-native-safe-area-context` para evitar o aviso de depreciação

## 🧯 Problemas Comuns

### Tela preta no emulador

Tente fechar e abrir o emulador novamente.

Se não resolver:

1. Pare o Expo no terminal com `Ctrl + C`
2. Abra o Android Studio
3. Vá em `Device Manager`
4. No emulador, tente `Cold Boot Now`
5. Rode novamente:

```bash
npx expo start --clear --android
```

Se continuar, tente `Wipe Data` no emulador.

### App não atualizou depois de alterar o código

Use o comando com cache limpo:

```bash
npx expo start --clear
```

Depois recarregue o app no emulador ou no Expo Go.

### Erro de dependências

Instale novamente as dependências:

```bash
npm install
```

Se necessário, use o instalador do Expo para corrigir versões compatíveis:

```bash
npx expo install --fix
```

## 👨‍🏫 Para Instrutores

Este projeto foi projetado para ser:

- Simples - Usa poucas telas e conceitos diretos
- Visual - Mostra resultado rápido na tela
- Didático - Contém comentários explicativos no código
- Modular - Cada componente tem uma responsabilidade clara
- Extensível - Permite adicionar novos desafios aos poucos

Sugestão de sequência para aula:

1. Mostrar a estrutura de pastas do projeto
2. Explicar o papel do `index.js` e do `App.js`
3. Explicar a navegação em `AppRoutes.js`
4. Apresentar a Splash Screen e a animação
5. Explicar `useState` usando os campos do Login
6. Criar a validação do formulário
7. Navegar para a Home enviando parâmetros
8. Explicar `props` usando `InputField`, `PrimaryButton` e `InfoCard`
9. Alterar cores em `colors.js`
10. Propor desafios para os alunos modificarem o app

Sinta-se livre para modificar e adaptar este projeto às suas necessidades de ensino.

Desenvolvido como material educacional para ensino de React Native, Expo, componentes, props, estado e navegação.
