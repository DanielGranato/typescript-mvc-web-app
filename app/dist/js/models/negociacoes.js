export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    contem(negociacao) {
        return this.negociacoes.some(existente => existente.ehIgual(negociacao));
    }
    lista() {
        return this.negociacoes;
    }
}
