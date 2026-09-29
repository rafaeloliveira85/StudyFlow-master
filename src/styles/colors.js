// colors.js
// Centraliza as cores do aplicativo.
//
// Em vez de escrever "#3157D5" em varios lugares, usamos colors.primary.
// Isso deixa o codigo mais facil de ler e permite mudar o tema em um unico arquivo.
//
// Exemplo de uso:
// backgroundColor: colors.primary
export const colors = {
    // Cores principais da identidade visual.
    primary: '#3157D5',
    primaryDark: '#203C9E',
    secondary: '#F4B942',

    // Cores usadas para fundos e cartoes.
    background: '#F5F7FB',
    surface: '#FFFFFF',

    // Cores usadas em textos e bordas.
    text: '#1F2937',
    textLight: '#6B7280',
    border: '#D9DFEA',

    // Cores de mensagens de feedback.
    error: '#C62828',
    success: '#2E7D32',
};
