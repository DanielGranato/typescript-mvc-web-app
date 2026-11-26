export function logarTempoDeExecucao(emSegundos = false) {
    return function <This, Args extends unknown[], Retorno>(
        metodoOriginal: (this: This, ...args: Args) => Retorno,
        contexto: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Retorno>
    ) {
        const nome = String(contexto.name);
        const unidade = emSegundos ? 's' : 'ms';
        const divisor = emSegundos ? 1000 : 1;

        // Esta função substitui o método decorado
        return function (this: This, ...args: Args): Retorno {
            const inicio = performance.now();
            try {
                return metodoOriginal.apply(this, args);
            } finally {
                // O finally garante o log mesmo se o método lançar um erro
                const tempo = (performance.now() - inicio) / divisor;
                console.log(`${nome} executou em ${tempo} ${unidade}`);
            }
        };
    };
}
