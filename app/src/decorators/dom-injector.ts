export function domInjector(seletor: string) {
    return function <This, Elemento extends Element>(
        alvo: ClassAccessorDecoratorTarget<This, Elemento>,
        contexto: ClassAccessorDecoratorContext<This, Elemento>
    ): ClassAccessorDecoratorResult<This, Elemento> {
        return {
            // Este get substitui o original e roda a cada leitura da propriedade
            get(this: This): Elemento {
                let elemento = alvo.get.call(this);
                // Só busca no DOM na primeira leitura; depois reaproveita o elemento guardado
                if (!elemento) {
                    elemento = document.querySelector(seletor) as Elemento;
                    if (!elemento) {
                        throw new Error(
                            `Nenhum elemento encontrado com o seletor "${seletor}" para a propriedade ${String(contexto.name)}`
                        );
                    }
                    alvo.set.call(this, elemento);
                }
                return elemento;
            }
        };
    };
}
