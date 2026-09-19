// HomeScreen.js
// Tela principal exibida depois do login.
//
// Esta tela demonstra:
// - leitura de parametros recebidos pela navegacao;
// - componentes reutilizaveis;
// - eventos de botao;
// - atualizacao visual com useState.
import { TaskCardModel, TimeCardModel } from '../models/CardModel';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InfoCard from '../components/InfoCard';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../styles/colors';

export default function HomeScreen({ route, navigation }) {
    // O nome foi enviado pela tela de Login por meio dos parametros da rota.
    // Caso nenhum nome seja recebido, usamos "Estudante" como valor padrao.
   const user = route.params?.user ?? { name: 'Estudante', email: '' };

    const taskCard = new TaskCardModel('Tarefas concluidas', 4);
    const timeCard = new TimeCardModel('Tempo estudado', 120); // 120 minutos -> converte para 2h 

    // Estado simples para demonstrar interacao com um botao.
    // false significa que a sessao ainda nao comecou.
    // true significa que a sessao esta em andamento.
    const [sessionStarted, setSessionStarted] = useState(false);

    function handleStudySession() {
        // Alterna entre verdadeiro e falso.
        // Usamos a forma com currentValue porque o novo valor depende do valor anterior.
        setSessionStarted((currentValue) => !currentValue);
    }

    function handleLogout() {
        // Volta para o Login e remove a Home do historico.
        navigation.replace('Login');
    }

    return (
        // SafeAreaView vem de react-native-safe-area-context.
        // Ele respeita as areas seguras do aparelho.
        <SafeAreaView style={styles.safeArea}>
            {/* ScrollView permite rolar o conteudo se a tela for pequena. */}
            <ScrollView contentContainerStyle={styles.container}>
             <View style={styles.header}>
        <View>
            {/* Usa as propriedades vindas do objeto */}
            <Text style={styles.greeting}>Ola, {user.name}!</Text>
            <Text style={styles.subtitle}>
                Conectado com: {user.email || 'Conta local'}
            </Text>
            <Text onPress={handleLogout} style={styles.logoutText}>
                Sair
            </Text>
        </View>
    </View>


                <View style={styles.highlightCard}>
                    <Text style={styles.highlightLabel}>Proxima atividade</Text>
                    <Text style={styles.highlightTitle}>Revisar fundamentos de React Native</Text>
                    <Text style={styles.highlightTime}>Hoje - 19h</Text>
                </View>

                {/* InfoCard evita repetir a mesma estrutura para cada card. */}
                <View style={styles.cardsRow}>
                       <InfoCard cardModel={taskCard} />
    <InfoCard cardModel={timeCard} />

                </View>

                <View style={styles.messageCard}>
                    <Text style={styles.messageTitle}>
                        {/* Operador ternario: escolhe um texto de acordo com o estado. */}
                        {sessionStarted ? 'Sessao iniciada!' : 'Pronto para estudar?'}
                    </Text>
                    <Text style={styles.messageText}>
                        {sessionStarted
                            ? 'Mantenha o foco e avance um passo de cada vez.'
                            : 'Uma pequena sessao hoje ajuda a construir um grande resultado amanha.'}
                    </Text>
                </View>

                <PrimaryButton
                    title={sessionStarted ? 'Encerrar sessao' : 'Comecar estudo'}
                    onPress={handleStudySession}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

// StyleSheet agrupa todos os estilos da Home.
// Isso separa estrutura visual (JSX) da aparencia (styles).
const styles = StyleSheet.create({
    safeArea: {
        // Ocupa a tela inteira respeitando as areas seguras do celular.
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        // Faz o conteudo ocupar pelo menos a altura da tela.
        flexGrow: 1,
        // Espaco interno geral da Home.
        padding: 24,
        // Espaco vertical entre os blocos principais da tela.
        gap: 22,
    },
    header: {
        // Organiza os itens do cabecalho em linha.
        flexDirection: 'row',
        // Alinha os itens pelo topo.
        alignItems: 'flex-start',
        // Distribui o espaco entre os elementos do cabecalho.
        justifyContent: 'space-between',
        gap: 16,
    },
    greeting: {
        // Texto de saudacao com maior destaque.
        color: colors.text,
        fontSize: 26,
        fontWeight: '800',
    },
    subtitle: {
        // Pequena margem para separar o subtitulo da saudacao.
        marginTop: 5,
        color: colors.textLight,
        fontSize: 14,
    },
    logoutText: {
        // Texto clicavel para sair da Home.
        color: colors.primary,
        fontSize: 14,
        fontWeight: '700',
        // Aumenta a area de toque vertical.
        paddingVertical: 6,
    },
    highlightCard: {
        // Card principal da tela, destacando a proxima atividade.
        gap: 8,
        borderRadius: 22,
        backgroundColor: colors.primary,
        padding: 22,
    },
    highlightLabel: {
        // Rotulo pequeno dentro do card principal.
        color: colors.surface,
        fontWeight: '600',
        opacity: 0.85,
    },
    highlightTitle: {
        // Texto mais importante do card principal.
        color: colors.surface,
        fontSize: 22,
        fontWeight: '800',
        lineHeight: 29,
    },
    highlightTime: {
        // Usa a cor secundaria para chamar atencao para o horario.
        color: colors.secondary,
        fontSize: 14,
        fontWeight: '700',
    },
    cardsRow: {
        // Coloca os cards de informacao lado a lado.
        flexDirection: 'row',
        // Espaco horizontal entre os cards.
        gap: 14,
    },
    messageCard: {
        // Card com a mensagem que muda conforme o estado sessionStarted.
        gap: 8,
        borderRadius: 18,
        backgroundColor: colors.surface,
        padding: 20,
    },
    messageTitle: {
        // Titulo da mensagem dinamica.
        color: colors.text,
        fontSize: 18,
        fontWeight: '800',
    },
    messageText: {
        // Texto explicativo da mensagem dinamica.
        color: colors.textLight,
        fontSize: 14,
        lineHeight: 21,
    },
});
