export function domInjector(seletor) {
    return function (alvo, contexto) {
        return {
            // Este get substitui o original e roda a cada leitura da propriedade
            get() {
                let elemento = alvo.get.call(this);
                // Só busca no DOM na primeira leitura; depois reaproveita o elemento guardado
                if (!elemento) {
                    elemento = document.querySelector(seletor);
                    if (!elemento) {
                        throw new Error(`Nenhum elemento encontrado com o seletor "${seletor}" para a propriedade ${String(contexto.name)}`);
                    }
                    alvo.set.call(this, elemento);
                }
                return elemento;
            }
        };
    };
}
