// InfoCard.js
// Componente de card usado para exibir uma informacao resumida na Home.
//
// A Home usa dois cards parecidos: tarefas concluidas e tempo estudado.
// Com este componente, mudamos apenas as props em vez de copiar o mesmo JSX.

import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../styles/colors';

export default function InfoCard({ cardModel }) {
    // POLIMORFISMO EM AÇÃO:
    // O componente invoca getIcon(), getFormattedValue() e getTitle() sem saber
    // se o objeto e um TaskCardModel ou um TimeCardModel.
    return (
        <View style={styles.card}>
            <Text style={styles.icon}>{cardModel.getIcon()}</Text>
            <Text style={styles.value}>{cardModel.getFormattedValue()}</Text>
            <Text style={styles.title}>{cardModel.getTitle()}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
  card: {
    // flex: 1 faz os cards da mesma linha dividirem o espaco igualmente.
    flex: 1,
    // Altura minima para manter os cards visualmente consistentes.
    minHeight: 132,
    // Centraliza o conteudo do card.
    alignItems: 'center',
    justifyContent: 'center',
    // Espaco entre icone, valor e titulo.
    gap: 6,
    // Bordas arredondadas do card.
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 16,
    // shadow* cria sombra no iOS.
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // elevation cria sombra no Android.
    elevation: 3,
  },
  icon: {
    // Pequeno destaque no topo do card.
    color: colors.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  value: {
    // Valor principal do card.
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  title: {
    // Descricao menor do que o valor.
    color: colors.textLight,
    fontSize: 13,
    textAlign: 'center',
  },
});
