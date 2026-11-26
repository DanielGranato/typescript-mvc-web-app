import { domInjector } from '../decorators/dom-injector.js';
import { logarTempoDeExecucao }from '../decorators/logar-tempo-de-execucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';

// Formato de cada item retornado pela API
interface DadoDaApi {
    montante: number;
    vezes: number;
}

export class NegociacaoController {
    @domInjector('#data')
    private accessor inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private accessor inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private accessor inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @logarTempoDeExecucao()
    adiciona(): void {
        const erro = this.validaCampos();
        if (erro) {
            this.mensagemView.update(erro);
            return;
        }
        const negociacao = this.criaNegociacao();
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
        this.limparFormulario();
    }

    async importaDados(): Promise<void> {
        try {
            const resposta = await fetch('http://localhost:8080/dados');
            // O fetch não lança erro em respostas como 404 ou 500, por isso a verificação
            if (!resposta.ok) {
                throw new Error(`A API respondeu com o status ${resposta.status}`);
            }
            const dados: DadoDaApi[] = await resposta.json();
            // A API não envia data, então as negociações importadas recebem a data de hoje
            for (const { vezes, montante } of dados) {
                this.negociacoes.adiciona(new Negociacao(new Date(), vezes, montante));
            }
            this.negociacoesView.update(this.negociacoes);
            this.mensagemView.update('Negociações importadas com sucesso');
        } catch (erro) {
            console.error(erro);
            this.mensagemView.update('Não foi possível importar as negociações');
        }
    }

    // Retorna a mensagem de erro do primeiro campo inválido, ou null se tudo estiver certo
    private validaCampos(): string | null {
        const [ano, mes, dia] = this.inputData.value.split('-').map(Number);
        const data = new Date(ano, mes - 1, dia);
        if (!this.inputData.value || isNaN(data.getTime())) {
            return 'Informe uma data válida';
        }
        const quantidade = parseInt(this.inputQuantidade.value);
        if (isNaN(quantidade) || quantidade < 1) {
            return 'A quantidade deve ser um número inteiro maior que zero';
        }
        const valor = parseFloat(this.inputValor.value);
        if (isNaN(valor) || valor <= 0) {
            return 'O valor deve ser maior que zero';
        }
        return null;
    }

    private ehDiaUtil(data: Date): boolean {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }

    criaNegociacao(): Negociacao {
        // Monta a data no fuso local (new Date('yyyy-mm-dd') seria interpretado como UTC)
        const [ano, mes, dia] = this.inputData.value.split('-').map(Number);
        const date = new Date(ano, mes - 1, dia);
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }

    limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
}
