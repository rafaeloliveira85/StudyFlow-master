// AppRoutes.js
// Centraliza a navegacao do aplicativo.
//
// A ideia deste arquivo e separar a regra de navegacao das telas.
// Assim, LoginScreen, HomeScreen e SplashScreen cuidam apenas do visual
// e das acoes de cada tela, enquanto AppRoutes decide como elas se conectam.
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';

// Cria o objeto que gerencia uma pilha de telas.
// Uma pilha funciona como paginas empilhadas: podemos abrir uma nova tela,
// voltar para a anterior ou substituir a tela atual por outra.
const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    // NavigationContainer guarda o estado geral da navegacao.
    // Ele precisa envolver todos os navegadores do app.
    <NavigationContainer>
      <Stack.Navigator
        // A primeira tela exibida quando o app abre.
        initialRouteName="Splash"
        screenOptions={{
          // Oculta o cabecalho padrao para usarmos o layout criado nas telas.
          headerShown: false,
        }}
      >
        {/* O atributo name e o nome usado em navigation.navigate/replace. */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
