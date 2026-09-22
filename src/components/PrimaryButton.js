// PrimaryButton.js
// Componente reutilizavel de botao principal.
//
// Criamos este componente para nao repetir o mesmo codigo de botao em varias telas.
// Quando quisermos mudar o visual do botao principal, alteramos apenas este arquivo.

import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../styles/colors';

export default function PrimaryButton({ title, onPress, disabled = false }) {
  // Props recebidas:
  // - title: texto exibido dentro do botao.
  // - onPress: funcao executada quando o usuario toca no botao.
  // - disabled: bloqueia o toque quando for true.
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      // Pressable permite mudar o estilo de acordo com o estado do toque.
      // pressed fica true enquanto o usuario esta pressionando o botao.
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    // O botao ocupa toda a largura disponivel do formulario.
    width: '100%',
    // Altura minima para ficar confortavel ao toque no celular.
    minHeight: 52,
    // Centraliza o texto no eixo horizontal.
    alignItems: 'center',
    // Centraliza o texto no eixo vertical.
    justifyContent: 'center',
    // Arredonda as bordas do botao.
    borderRadius: 14,
    // Cor principal do app.
    backgroundColor: colors.primary,
    // Espaco interno horizontal para o texto nao encostar nas bordas.
    paddingHorizontal: 20,
  },
  buttonPressed: {
    // Feedback visual enquanto o botao esta sendo pressionado.
    opacity: 0.8,
  },
  buttonDisabled: {
    // Deixa o botao mais claro quando estiver desativado.
    opacity: 0.5,
  },
  buttonText: {
    // Texto branco para contrastar com o fundo azul.
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
});
