// src/models/CardModel.js
// Demostração de POO Avançada: Herança, Polimorfismo e Métodos Abstratos.

// ==============================================================================
// 1. SUPERCLASSE (Classe Base / Abstrata)
// Servira de molde para todos os cards informativos do aplicativo.
// ==============================================================================
export class CardModel {
    // Propriedade privada (Encapsulamento)
    #title;

    constructor(title) {
        // Simulação de Classe Abstrata: impede que CardModel seja instanciada diretamente com 'new CardModel()'
        if (this.constructor === CardModel) {
            throw new Error('CardModel e uma classe abstrata e nao pode ser instanciada diretamente.');
        }
        this.#title = title;
    }

    // Getter encapsulado para o titulo
    getTitle() {
        return this.#title;
    }

    // METODO POLIMÓRFICO (Base):
    // Deve ser obrigatoriamente sobrescrito (overridden) nas subclasses filhas.
    getFormattedValue() {
        throw new Error('O metodo getFormattedValue() deve ser implementado pela subclasse.');
    }

    // METODO POLIMÓRFICO (Base):
    // Fornece um ícone padrão, mas permite que as subclasses sobrescrevam.
    getIcon() {
        return 'info';
    }
}

// ==============================================================================
// 2. SUBCLASSE 1: TaskCardModel (Herança via 'extends')
// Especializada para exibir contagem de tarefas.
// ==============================================================================
export class TaskCardModel extends CardModel {
    constructor(title, completedTasks) {
        // 'super(title)' chama o construtor da superclasse CardModel
        super(title);
        // Propriedade especifica desta subclasse
        this.completedTasks = completedTasks;
    }

    // POLIMORFISMO (Sobrescrita do método getFormattedValue)
    getFormattedValue() {
        return `${this.completedTasks}`;
    }

    // POLIMORFISMO (Sobrescrita do ícone)
    getIcon() {
        return 'OK';
    }
}

// ==============================================================================
// 3. SUBCLASSE 2: TimeCardModel (Herança via 'extends')
// Especializada para converter minutos em formato de horas.
// ==============================================================================
export class TimeCardModel extends CardModel {
    constructor(title, minutes) {
        super(title);
        this.minutes = minutes;
    }

    // POLIMORFISMO: Converte os minutos e formata o texto exibido no card
    getFormattedValue() {
        const hours = Math.floor(this.minutes / 60);
        return `${hours}h`;
    }

    // POLIMORFISMO (Sobrescrita do ícone)
    getIcon() {
        return 'h';
    }
}

