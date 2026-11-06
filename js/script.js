const totalCaracteres = document.getElementById("totalCaracteres");
const totalPalavras = document.getElementById("totalPalavras");
const totalFrases = document.getElementById("totalFrases");

const campoTexto = document.getElementById("comentario");
const checkEspaco = document.getElementById("check");

const tempoLeitura = document.getElementById("tempoLeitura");
const unidadeLeitura = document.getElementById("unidadeLeitura");
const verMais = document.getElementById("verMais");

let linhaExpandida = false;
verMais.addEventListener("click", () => {
    linhaExpandida = !linhaExpandida;

    atualizarCaracteres();
});

function atualizarCaracteres() {
    const texto = campoTexto.value;

    const textoParaCortar =
     checkEspaco.checked 
        ? texto.replace(/\s/g, "")
        : texto;

    totalCaracteres.textContent = textoParaCortar.length;

    const palavras = texto.trim().split(/\s+/).filter(Boolean);
    const quantidadeDePalavras = palavras.length;
    const minutos = quantidadeDePalavras === 0
        ? 0
        : Math.ceil(quantidadeDePalavras / 200);

    tempoLeitura.textContent = minutos;
    unidadeLeitura.textContent = minutos === 1 ? "minuto" : "minutos";
    totalPalavras.textContent = quantidadeDePalavras;

    const frase = texto.match(/[^.!?]+[.!?]+/g) || [];
    totalFrases.textContent = frase.length;

    const frequencias = contarLetra(texto);
    const letrasOrdenadas = Object.entries(frequencias).sort((a, b) => b[1] - a[1]);

    if (letrasOrdenadas.length <= 5) {
        linhaExpandida = false;
    }
    
    mensagemDensidade.hidden = letrasOrdenadas.length > 0;

    listaLetras.innerHTML = "";

    const letrasExibidas = linhaExpandida
        ? letrasOrdenadas
        : letrasOrdenadas.slice(0, 5);

    const maiorFrequencia = letrasOrdenadas[0]?.[1] || 1;
    const totalDeLetras = letrasOrdenadas.reduce((total, [, quantidade]) => total + quantidade, 0);

    letrasExibidas.forEach(([letra, quantidade]) => {
        const linha = document.createElement("div");
        const linhaLetra = document.createElement("span");
        const linhaQuantidade = document.createElement("span");
        const trilho = document.createElement("span");
        const preenchimento = document.createElement("span");
        const percentual = (quantidade / totalDeLetras) * 100;

        preenchimento.style.width = `${(quantidade / maiorFrequencia) * 100}%`;

        linhaLetra.textContent = `${letra}`;
        linhaQuantidade.textContent = `${quantidade} (${percentual.toFixed(2)}%)`;

        trilho.appendChild(preenchimento);

        linha.appendChild(linhaLetra);
        linha.appendChild(trilho);
        linha.appendChild(linhaQuantidade);
        listaLetras.appendChild(linha);

        linha.classList.add("linhaDensidade");
        linhaLetra.classList.add("letraDensidade");
        trilho.classList.add("trilhoDensidade");
        linhaQuantidade.classList.add("quantidadeDensidade");
        preenchimento.classList.add("preenchimentoDensidade");
    });

    verMais.hidden = letrasOrdenadas.length <= 5;
    verMais.textContent = linhaExpandida ? "Ver menos" : "Ver mais";
}

campoTexto.addEventListener("input", atualizarCaracteres);
checkEspaco.addEventListener("change", atualizarCaracteres);

const listaLetras = document.getElementById("listaLetras");
const mensagemDensidade = document.getElementById("mensagemDensidade");

function contarLetra(texto) {
    const normalizado = texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const frequencias = {};

    for(const letra of normalizado) {
        if(letra >= "a" && letra <= "z") {
            frequencias[letra] = (frequencias[letra] || 0) + 1;
        }
    }

    return frequencias;
}