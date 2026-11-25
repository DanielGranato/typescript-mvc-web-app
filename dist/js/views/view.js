export class View {
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
    // Escapa caracteres especiais de HTML em textos que serão interpolados no template
    escapar(texto) {
        return texto
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    update(model) {
        this.elemento.innerHTML = this.template(model);
    }
}
