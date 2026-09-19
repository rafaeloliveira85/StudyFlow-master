// LoginScreen.js
// Tela de login local.
//
// Nesta primeira versao, os dados sao comparados com valores fixos no codigo.
// Nao existe banco de dados nem autenticacao real nesta etapa.
// A ideia e praticar estado, eventos, validacao simples e navegacao.

import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../styles/colors';

// Credenciais usadas somente para a atividade local.
// Em um app real, a autenticacao normalmente seria feita por uma API ou servico externo.
const VALID_EMAIL = 'aluno@senac.com';
const VALID_PASSWORD = '1234';

export default function LoginScreen({ navigation }) {
    // Cada useState cria uma informacao que pode mudar na tela.
    // Quando setEmail, setPassword ou setErrorMessage sao chamados,
    // o React renderiza a tela novamente com os valores atualizados.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleLogin() {
        // Esta funcao roda quando o usuario toca no botao Entrar.

        // trim remove espacos extras no inicio e no final do e-mail.
        // toLowerCase evita erro caso o usuario digite letras maiusculas.
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            setErrorMessage('Preencha o e-mail e a senha.');
            return;
        }

        if (normalizedEmail !== VALID_EMAIL || password !== VALID_PASSWORD) {
            setErrorMessage('E-mail ou senha incorretos.');
            return;
        }

        // Limpa o erro antes de navegar.
        setErrorMessage('');

        // replace impede que o usuario volte para o login pelo botao de voltar.
        // O segundo argumento envia parametros para a tela Home.
        navigation.replace('Home', { studentName: 'Estudante' });
    }

    return (
        // KeyboardAvoidingView ajuda a tela a se ajustar quando o teclado abre.
        <KeyboardAvoidingView
            style={styles.keyboardArea}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* ScrollView evita que o formulario fique cortado em telas menores. */}
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Text style={styles.logo}>SF</Text>
                    <Text style={styles.title}>Bem-vindo ao StudyFlow</Text>
                    <Text style={styles.subtitle}>Entre para acompanhar sua rotina de estudos.</Text>
                </View>

                <View style={styles.form}>
                    {/* InputField e um componente reutilizavel criado em components/InputField.js. */}
                    <InputField
                        label="E-mail"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="digite seu email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <InputField
                        label="Senha"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha"
                        secureTextEntry
                        autoCapitalize="none"
                    />

                    {/* Renderizacao condicional: so mostra o erro quando existe mensagem. */}
                    {errorMessage ? (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ) : null}

                    {/* PrimaryButton recebe a funcao handleLogin pela prop onPress. */}
                    <PrimaryButton title="Entrar" onPress={handleLogin} />

                    <Text style={styles.hint}>
                        Acesso de teste: aluno@senac.com | senha: 1234
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// Os estilos ficam no final para manter o JSX mais limpo.
// Cada chave deste objeto vira um estilo usado com styles.nomeDoEstilo.
const styles = StyleSheet.create({
    keyboardArea: {
        // Ocupa toda a tela e serve como base para o ajuste do teclado.
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        // flexGrow permite que o ScrollView cresca ate preencher a tela.
        flexGrow: 1,
        // Centraliza o formulario verticalmente quando ha espaco sobrando.
        justifyContent: 'center',
        // Espaco interno nas laterais e no topo/baixo.
        padding: 24,
        // Distancia entre o cabecalho e o formulario.
        gap: 36,
    },
    header: {
        // Centraliza logo, titulo e subtitulo.
        alignItems: 'center',
        gap: 1,
    },
    logo: {
        // Marca textual simples do aplicativo.
        color: colors.primary,
        fontSize: 58,
        fontWeight: '800',
    },
    title: {
        // Titulo da tela de login.
        color: colors.text,
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
    },
    subtitle: {
        // Limita a largura para melhorar a leitura em telas grandes.
        maxWidth: 320,
        color: colors.textLight,
        fontSize: 15,
        // lineHeight deixa textos de mais de uma linha mais confortaveis.
        lineHeight: 22,
        textAlign: 'center',
    },
    form: {
        // Distancia vertical entre campos, mensagem e botao.
        gap: 18,
    },
    errorText: {
        // Cor de feedback negativo definida no arquivo colors.js.
        color: colors.error,
        fontSize: 14,
        fontWeight: '600',
    },
    hint: {
        // Texto auxiliar menor, usado para mostrar o acesso de teste.
        color: colors.textLight,
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
    },
});
