import { Negociacao } from '../models/negociacao.js';

// Formato de cada item retornado pela API
interface DadoDaApi {
    montante: number;
    vezes: number;
}

export class NegociacoesService {
    async obterNegociacoes(): Promise<Negociacao[]> {
        const resposta = await fetch('http://localhost:8080/dados');
        // O fetch não lança erro em respostas como 404 ou 500, por isso a verificação
        if (!resposta.ok) {
            throw new Error(`A API respondeu com o status ${resposta.status}`);
        }
        const dados: DadoDaApi[] = await resposta.json();
        // A API não envia data, então as negociações recebem a data de hoje
        return dados.map(({ vezes, montante }) => new Negociacao(new Date(), vezes, montante));
    }
}
