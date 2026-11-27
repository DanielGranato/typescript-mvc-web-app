import { Negociacao } from './negociacao.js';

export class Negociacoes {
    private negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    contem(negociacao: Negociacao): boolean {
        return this.negociacoes.some(existente => existente.ehIgual(negociacao));
    }

    lista(): readonly Negociacao[] {
        return this.negociacoes;
    }
}
