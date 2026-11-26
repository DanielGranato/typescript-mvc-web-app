import { NegociacaoController } from './controllers/negociacao-controller.js';

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (!form) {
    throw new Error('Não foi possível inicializar a aplicação: nenhum elemento com a classe "form" foi encontrado');
}

form.addEventListener('submit', event => {
    event.preventDefault();
    controller.adiciona();
});

const botaoImportar = document.querySelector('#botao-importar');

if (!botaoImportar) {
    throw new Error('Não foi possível inicializar a aplicação: o botão "#botao-importar" não foi encontrado');
}

botaoImportar.addEventListener('click', () => {
    controller.importaDados();
});