var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
let NegociacaoController = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _adiciona_decorators;
    return _a = class NegociacaoController {
            constructor() {
                this.inputData = __runInitializers(this, _instanceExtraInitializers);
                this.negociacoes = new Negociacoes();
                this.negociacoesView = new NegociacoesView('#negociacoesView');
                this.mensagemView = new MensagemView('#mensagemView');
                this.inputData = document.querySelector('#data');
                this.inputQuantidade = document.querySelector('#quantidade');
                this.inputValor = document.querySelector('#valor');
                this.negociacoesView.update(this.negociacoes);
            }
            adiciona() {
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
            // Retorna a mensagem de erro do primeiro campo inválido, ou null se tudo estiver certo
            validaCampos() {
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
            ehDiaUtil(data) {
                return data.getDay() > DiasDaSemana.DOMINGO
                    && data.getDay() < DiasDaSemana.SABADO;
            }
            criaNegociacao() {
                // Monta a data no fuso local (new Date('yyyy-mm-dd') seria interpretado como UTC)
                const [ano, mes, dia] = this.inputData.value.split('-').map(Number);
                const date = new Date(ano, mes - 1, dia);
                const quantidade = parseInt(this.inputQuantidade.value);
                const valor = parseFloat(this.inputValor.value);
                return new Negociacao(date, quantidade, valor);
            }
            limparFormulario() {
                this.inputData.value = '';
                this.inputQuantidade.value = '';
                this.inputValor.value = '';
                this.inputData.focus();
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _adiciona_decorators = [logarTempoDeExecucao()];
            __esDecorate(_a, null, _adiciona_decorators, { kind: "method", name: "adiciona", static: false, private: false, access: { has: obj => "adiciona" in obj, get: obj => obj.adiciona }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { NegociacaoController };
