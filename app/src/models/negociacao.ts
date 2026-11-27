export class Negociacao {
    constructor(
        private _data: Date, 
        public readonly quantidade: number, 
        public readonly valor: number
    ) {}

    // Compara o dia (sem a hora), a quantidade e o valor
    ehIgual(outra: Negociacao): boolean {
        return this.data.toDateString() === outra.data.toDateString()
            && this.quantidade === outra.quantidade
            && this.valor === outra.valor;
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }
}