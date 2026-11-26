export function logarTempoDeExecucao(emSegundos = false) {
    return function (metodoOriginal, contexto) {
        const nome = String(contexto.name);
        const unidade = emSegundos ? 's' : 'ms';
        const divisor = emSegundos ? 1000 : 1;
        // Esta função substitui o método decorado
        return function (...args) {
            const inicio = performance.now();
            try {
                return metodoOriginal.apply(this, args);
            }
            finally {
                // O finally garante o log mesmo se o método lançar um erro
                const tempo = (performance.now() - inicio) / divisor;
                console.log(`${nome} executou em ${tempo} ${unidade}`);
            }
        };
    };
}
