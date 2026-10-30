const totalCaracteres = document.getElementById("totalCaracteres");
const totalPalavras = document.getElementById("totalPalavras");
const totalFrases = document.getElementById("totalFrases");

const campoTexto = document.getElementById("comentario");
const checkEspaco = document.getElementById("check");

const tempoLeitura = document.getElementById("tempoLeitura");
const unidadeLeitura = document.getElementById("unidadeLeitura");

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
}

campoTexto.addEventListener("input", atualizarCaracteres);
checkEspaco.addEventListener("change", atualizarCaracteres);