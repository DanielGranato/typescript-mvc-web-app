export class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    // Compara o dia (sem a hora), a quantidade e o valor
    ehIgual(outra) {
        return this.data.toDateString() === outra.data.toDateString()
            && this.quantidade === outra.quantidade
            && this.valor === outra.valor;
    }
    get volume() {
        return this.quantidade * this.valor;
    }
    get data() {
        const data = new Date(this._data.getTime());
        return data;
    }
}
