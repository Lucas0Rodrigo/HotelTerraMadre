// 1. Variáveis Globais
var listaImagens = [];
var listaTextos = [];
var indiceAtual = 0;

// 2. Preparação
document.addEventListener('DOMContentLoaded', function() {
    console.log("--- INICIANDO SCRIPT COM MINIATURAS ---");

    var imgPrincipal = document.getElementById("minhaImagem");
    var divOculta = document.getElementById("galeria-oculta");
    var containerMiniaturas = document.getElementById("barra-miniaturas"); // O lugar novo

    // A. Coleta Imagem Principal
    if (imgPrincipal) {
        listaImagens.push(imgPrincipal.src);
        listaTextos.push(imgPrincipal.alt);
        
        imgPrincipal.onclick = function() {
            abrirModal();
            slideAtual(0);
        };
    }

    // B. Coleta Imagens Ocultas
    if (divOculta) {
        var imgsOcultas = divOculta.getElementsByTagName("img");
        for (var i = 0; i < imgsOcultas.length; i++) {
            listaImagens.push(imgsOcultas[i].src);
            listaTextos.push(imgsOcultas[i].alt);
        }
    }

    // C. GERA AS MINIATURAS NO MODAL (A Mágica Nova)
    if (containerMiniaturas) {
        // Limpa caso tenha algo
        containerMiniaturas.innerHTML = ""; 

        // Para cada imagem na lista, cria uma tag <img> pequena
        listaImagens.forEach(function(src, index) {
            var imgMini = document.createElement("img");
            imgMini.src = src;
            imgMini.className = "mini-modal"; // Classe do CSS
            
            // Quando clicar na miniatura, vai para aquela foto
            imgMini.onclick = function() {
                slideAtual(index);
            };

            containerMiniaturas.appendChild(imgMini);
        });
    }
});

// 3. Funções de Controle

function abrirModal() {
    var modal = document.getElementById("meuModal");
    if(modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}

function fecharModal() {
    document.getElementById("meuModal").style.display = "none";
    document.body.style.overflow = "auto";
}

function mudarSlide(n) {
    slideAtual(indiceAtual + n);
}

function slideAtual(n) {
    var imagemGrande = document.getElementById("imgGrande");
    var textoLegenda = document.getElementById("legenda");
    var todasMiniaturas = document.getElementsByClassName("mini-modal");

    if (!imagemGrande) return;

    // Loop infinito
    if (n >= listaImagens.length) indiceAtual = 0;
    else if (n < 0) indiceAtual = listaImagens.length - 1;
    else indiceAtual = n;

    // Atualiza Imagem Grande
    imagemGrande.src = listaImagens[indiceAtual];
    if (textoLegenda) textoLegenda.innerHTML = listaTextos[indiceAtual];

    // --- ATUALIZA O DESTAQUE NAS MINIATURAS ---
    // 1. Tira a classe 'ativo' de todas
    for (var i = 0; i < todasMiniaturas.length; i++) {
        todasMiniaturas[i].className = todasMiniaturas[i].className.replace(" ativo", "");
    }
    // 2. Coloca a classe 'ativo' só na atual
    if (todasMiniaturas[indiceAtual]) {
        todasMiniaturas[indiceAtual].className += " ativo";
    }
}

// Fecha ao clicar fora
window.onclick = function(event) {
    var modal = document.getElementById("meuModal");
    if (event.target == modal) {
        fecharModal();
    }
}