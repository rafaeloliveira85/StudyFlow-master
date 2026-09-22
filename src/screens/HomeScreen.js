// src/screens/HomeScreen.js
import { TaskCardModel, TimeCardModel, GoalCardModel } from '../models/CardModel'; 
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InfoCard from '../components/InfoCard';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../styles/colors';

export default function HomeScreen({ route, navigation }) {
    const user = route.params?.user ?? { name: 'Estudante', email: '' }; 

    // Instanciação de modelos de cards válidos
    const taskCard = new TaskCardModel('Tarefas concluidas', 4); 
    const timeCard = new TimeCardModel('Tempo estudado', 120); 
    const goalValid = new GoalCardModel('Meta Semanal', 80);

    // =========================================================================
    // MUDANÇA: O bloco try/catch com 'invalidGoal' que gerava os logs de erro
    // na instrução anterior foi removido daqui para limpar o terminal.
    // =========================================================================

    const [sessionStarted, setSessionStarted] = useState(false);

    function handleStudySession() {
        setSessionStarted((currentValue) => !currentValue);
    }

    function handleLogout() {
        navigation.replace('Login');
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}> 
                    <View> 
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

                <View style={styles.cardsRow}> 
                    <InfoCard cardModel={taskCard} /> 
                    <InfoCard cardModel={timeCard} /> 
                    <InfoCard cardModel={goalValid}/> 
                </View> 

                <View style={styles.messageCard}>
                    <Text style={styles.messageTitle}>
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flexGrow: 1,
        padding: 24,
        gap: 22,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
    },
    greeting: {
        color: colors.text,
        fontSize: 26,
        fontWeight: '800',
    },
    subtitle: {
        marginTop: 5,
        color: colors.textLight,
        fontSize: 14,
    },
    logoutText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '700',
        paddingVertical: 6,
    },
    highlightCard: {
        gap: 8,
        borderRadius: 22,
        backgroundColor: colors.primary,
        padding: 22,
    },
    highlightLabel: {
        color: colors.surface,
        fontWeight: '600',
        opacity: 0.85,
    },
    highlightTitle: {
        color: colors.surface,
        fontSize: 22,
        fontWeight: '800',
        lineHeight: 29,
    },
    highlightTime: {
        color: colors.secondary,
        fontSize: 14,
        fontWeight: '700',
    },
    cardsRow: {
        flexDirection: 'row',
        gap: 14,
    },
    messageCard: {
        gap: 8,
        borderRadius: 18,
        backgroundColor: colors.surface,
        padding: 20,
    },
    messageTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '800',
    },
    messageText: {
        color: colors.textLight,
        fontSize: 14,
        lineHeight: 21,
    },
});
