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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
import { domInjector } from '../decorators/dom-injector.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
let NegociacaoController = (() => {
    var _a, _NegociacaoController_inputData_accessor_storage, _NegociacaoController_inputQuantidade_accessor_storage, _NegociacaoController_inputValor_accessor_storage;
    let _instanceExtraInitializers = [];
    let _inputData_decorators;
    let _inputData_initializers = [];
    let _inputData_extraInitializers = [];
    let _inputQuantidade_decorators;
    let _inputQuantidade_initializers = [];
    let _inputQuantidade_extraInitializers = [];
    let _inputValor_decorators;
    let _inputValor_initializers = [];
    let _inputValor_extraInitializers = [];
    let _adiciona_decorators;
    return _a = class NegociacaoController {
            get inputData() { return __classPrivateFieldGet(this, _NegociacaoController_inputData_accessor_storage, "f"); }
            set inputData(value) { __classPrivateFieldSet(this, _NegociacaoController_inputData_accessor_storage, value, "f"); }
            get inputQuantidade() { return __classPrivateFieldGet(this, _NegociacaoController_inputQuantidade_accessor_storage, "f"); }
            set inputQuantidade(value) { __classPrivateFieldSet(this, _NegociacaoController_inputQuantidade_accessor_storage, value, "f"); }
            get inputValor() { return __classPrivateFieldGet(this, _NegociacaoController_inputValor_accessor_storage, "f"); }
            set inputValor(value) { __classPrivateFieldSet(this, _NegociacaoController_inputValor_accessor_storage, value, "f"); }
            constructor() {
                _NegociacaoController_inputData_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _inputData_initializers, void 0)));
                _NegociacaoController_inputQuantidade_accessor_storage.set(this, (__runInitializers(this, _inputData_extraInitializers), __runInitializers(this, _inputQuantidade_initializers, void 0)));
                _NegociacaoController_inputValor_accessor_storage.set(this, (__runInitializers(this, _inputQuantidade_extraInitializers), __runInitializers(this, _inputValor_initializers, void 0)));
                this.negociacoes = (__runInitializers(this, _inputValor_extraInitializers), new Negociacoes());
                this.negociacoesView = new NegociacoesView('#negociacoesView');
                this.mensagemView = new MensagemView('#mensagemView');
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
        _NegociacaoController_inputData_accessor_storage = new WeakMap(),
        _NegociacaoController_inputQuantidade_accessor_storage = new WeakMap(),
        _NegociacaoController_inputValor_accessor_storage = new WeakMap(),
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _inputData_decorators = [domInjector('#data')];
            _inputQuantidade_decorators = [domInjector('#quantidade')];
            _inputValor_decorators = [domInjector('#valor')];
            _adiciona_decorators = [logarTempoDeExecucao()];
            __esDecorate(_a, null, _inputData_decorators, { kind: "accessor", name: "inputData", static: false, private: false, access: { has: obj => "inputData" in obj, get: obj => obj.inputData, set: (obj, value) => { obj.inputData = value; } }, metadata: _metadata }, _inputData_initializers, _inputData_extraInitializers);
            __esDecorate(_a, null, _inputQuantidade_decorators, { kind: "accessor", name: "inputQuantidade", static: false, private: false, access: { has: obj => "inputQuantidade" in obj, get: obj => obj.inputQuantidade, set: (obj, value) => { obj.inputQuantidade = value; } }, metadata: _metadata }, _inputQuantidade_initializers, _inputQuantidade_extraInitializers);
            __esDecorate(_a, null, _inputValor_decorators, { kind: "accessor", name: "inputValor", static: false, private: false, access: { has: obj => "inputValor" in obj, get: obj => obj.inputValor, set: (obj, value) => { obj.inputValor = value; } }, metadata: _metadata }, _inputValor_initializers, _inputValor_extraInitializers);
            __esDecorate(_a, null, _adiciona_decorators, { kind: "method", name: "adiciona", static: false, private: false, access: { has: obj => "adiciona" in obj, get: obj => obj.adiciona }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { NegociacaoController };
