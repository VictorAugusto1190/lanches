const carrinho = document.querySelector("#carrinho");
const lista = document.querySelector(".lista");
const botaoX = document.querySelector("#x");
const itens = document.getElementById("itens");
const comidas = document.querySelector(".comidas");
const totalCarrinho = document.querySelector("#total-carrinho");
const botaoFinalizar = document.querySelector(".finalizar");

// Elementos do Modal de Observação
const modalObs = document.querySelector("#modal-obs");
const campoObs = document.querySelector("#campo-obs");
const btnSemObs = document.querySelector("#btn-sem-obs");
const btnComObs = document.querySelector("#btn-com-obs");

// Variável temporária para armazenar o produto selecionado
let produtoTemporario = null;

// Lanches e porções
const produtos = [
  {
    id: 1,
    nome: "Mini X-Burguer",
    preco: 19.00,
    descricao: "Pão egg sponge, hambúrguer artesanal, mussarela e molho rose. Acompanha 4 batatas smile."
  },
  {
    id: 2,
    nome: "X-Egg Burguer",
    preco: 25.00,
    descricao: "Pão de hambúrguer, hambúrguer artesanal de 180g, queijo, ovo, maionese, tomate e molho rose. Acompanha batata palito."
  },
  {
    id: 3,
    nome: "Bauru Burguer",
    preco: 30.00,
    descricao: "Pão de hambúrguer, hambúrguer artesanal (180g), presunto, queijo, alface, tomate, maionese, bacon e molho rose. Acompanha batata palito."
  },
  {
    id: 4,
    nome: "Americano Burguer",
    preco: 30.00,
    descricao: "Pão de leite, burger, queijo, presunto, tomate, alface, picles e molho especial. Acompanha batata palito."
  },
  {
    id: 5,
    nome: "X-Salada Burguer",
    preco: 25.00,
    descricao: "Pão de hambúrguer, hambúrguer artesanal de 180g, queijo, tomate, alface, cebola e molho rose. Acompanha batata palito."
  },
  {
    id: 6,
    nome: "X-Egg Duplo Burguer",
    preco: 30.00,
    descricao: "Pão egg sponge, 2 hambúrgueres artesanais, mussarela e molho rose. Acompanha 4 batatas smile."
  },
  {
    id: 7,
    nome: "X-Bacon",
    preco: 25.00,
    descricao: "Pão de hambúrguer, hambúrguer artesanal de 180g, cheddar, bacon, queijo e molho rose. Acompanha batata palito."
  },
  {
    id: 8,
    nome: "X-Salada Master",
    preco: 30.00,
    descricao: "Pão de hambúrguer, hambúrguer artesanal de 180g, cheddar, bacon, queijo, tomate, alface, cebola e molho rose. Acompanha batata palito."
  },
  {
    id: 9,
    nome: "Out Duplo Burguer",
    preco: 40.00,
    descricao: "Pão de hambúrguer, 2 hambúrgueres artesanais de 180g, linguiça, cheddar cremoso, queijo, maionese, bacon, anéis de cebola e ovo. Acompanha batata palito."
  },
  {
    id: 10,
    nome: "Mrs Jefferson Burguer",
    preco: 30.00,
    descricao: "Pão australiano, hambúrguer artesanal 180g, bacon, cheddar cremoso, queijo e anéis de cebola."
  },
  {
    id: 11,
    nome: "Martins Duplo Burguer",
    preco: 40.00,
    descricao: "Pão de hambúrguer, 2 hambúrgueres artesanais de 180g, queijo, presunto, ovo, bacon, cebola, alface, tomate e molho rose. Acompanha batata palito."
  },
  {
    id: 12,
    nome: "Porção de Batata Frita com Molho de Alho",
    preco: 24.00,
    descricao: "Porção de batata frita acompanhada de molho de alho."
  }
];

// Fechar carrinho pelo botão X
botaoX.addEventListener('click', () => {
  lista.style.display = "none";
});

// Abrir carrinho
carrinho.addEventListener("click", () => {
  if (getComputedStyle(lista).display === "none") {
    lista.style.display = "flex";
  } 
});

// Função para calcular e atualizar o valor total no H2
function atualizarTotal() {
  const precosElementos = itens.querySelectorAll(".pedidos h4:last-child");
  let total = 0;

  precosElementos.forEach(elemento => {
    const precoTexto = elemento.textContent.replace("R$", "").trim();
    const precoNumero = parseFloat(precoTexto);
    
    if (!isNaN(precoNumero)) {
      total += precoNumero;
    }
  });

  totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
  return total.toFixed(2);
}

// Remover pedido do carrinho
itens.addEventListener("click", (e) => {
  if (e.target.classList.contains("remover")) {
    e.target.closest(".item").remove();
    atualizarTotal();
  }
});

// Renderizar produtos na vitrine
function adicionarProdutoNaSecaoComida() {
  comidas.innerHTML = produtos.map(produto => `
    <div class="produto">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <span>R$ ${produto.preco.toFixed(2)} <button class="add" data-id="${produto.id}">ADD</button></span>
    </div>
  `).join("");

  // Monitora o clique no botão ADD para disparar o Modal personalizado
  comidas.addEventListener("click", (e) => {
    if (e.target.classList.contains("add")) {
      const produtoId = parseInt(e.target.getAttribute("data-id"));
      produtoTemporario = produtos.find(p => p.id === produtoId);

      // Bloqueia se o botão já estiver animando o sucesso
      if (e.target.classList.contains("add-sucesso")) return;

      if (produtoTemporario) {
        campoObs.value = ""; // Reseta o campo de texto
        modalObs.style.display = "flex"; // Abre o modal
        
        // Atribui o botão diretamente a uma propriedade do elemento modal
        modalObs.targetButton = e.target;
      }
    }
  });
}

// Função para fechar o modal com segurança
function fecharModal() {
  modalObs.style.display = "none";
  produtoTemporario = null;
}

// Função para gerenciar os feedbacks visuais de sucesso com escopo isolado
function dispararAnimacoesSucesso(botaoDoMomento) {
  // 1. Faz o ícone do carrinho pulsar no header
  const iconeCarrinho = document.querySelector("#carrinho");
  iconeCarrinho.classList.add("animar-carrinho");
  
  setTimeout(() => {
    iconeCarrinho.classList.remove("animar-carrinho");
  }, 500);

  // 2. Transforma o botão específico em um check verde temporário
  if (botaoDoMomento) {
    const textoOriginal = "ADD"; 
    botaoDoMomento.textContent = "✓"; 
    botaoDoMomento.classList.add("add-sucesso");

    // O cronômetro agora prende a referência exata deste botão individual
    setTimeout(() => {
      botaoDoMomento.textContent = textoOriginal;
      botaoDoMomento.classList.remove("add-sucesso");
    }, 1200);
  }
}

// Inserção real da estrutura no carrinho de compras
function inserirNoCarrinho(textoObservacao) {
  itens.insertAdjacentHTML(
    "beforeend",
    `
    <div class="item">
      <section class="pedidos">
        <h4>1x ${produtoTemporario.nome}</h4>
        <h4>R$ ${produtoTemporario.preco.toFixed(2)}</h4>
      </section>

      <section class="ob">
        <p>OBSERVAÇÃO</p>
        <p>${textoObservacao}</p>
      </section>

      <button class="remover">Remover</button>
      <div class="linha"></div>
    </div>
    `
  );
  
  atualizarTotal();
  
  // Resgata o botão que abriu este fluxo e passa para a animação dedicada
  const botaoParaAnimar = modalObs.targetButton;
  dispararAnimacoesSucesso(botaoParaAnimar); 
  
  fecharModal();
}

// --- CONFIGURAÇÃO DOS BOTÕES DO MODAL ---
btnSemObs.addEventListener("click", () => {
  inserirNoCarrinho("Sem observações");
});

btnComObs.addEventListener("click", () => {
  const textoDigitado = campoObs.value.trim();
  if (textoDigitado === "") {
    inserirNoCarrinho("Sem observações");
  } else {
    inserirNoCarrinho(textoDigitado);
  }
});

// Fecha se clicar fora da caixinha branca
modalObs.addEventListener("click", (e) => {
  if (e.target === modalObs) {
    fecharModal();
  }
});

// --- ENVIAR PEDIDO PARA O WHATSAPP ---
botaoFinalizar.addEventListener("click", () => {
  const itensCarrinho = itens.querySelectorAll(".item");

  if (itensCarrinho.length === 0) {
    alert("Seu carrinho está vazio! Adicione pelo menos um item.");
    return;
  }

  let mensagem = "🍔 *Novo Pedido!* 🍔\n\n";
  mensagem += "=========================\n";

  itensCarrinho.forEach((item) => {
    const nomeEQuantidade = item.querySelector(".pedidos h4:first-child").textContent;
    const preco = item.querySelector(".pedidos h4:last-child").textContent;
    const obs = item.querySelector(".ob p:last-child").textContent;

    mensagem += `*Item:* ${nomeEQuantidade}\n`;
    mensagem += `*Preço:* ${preco}\n`;
    mensagem += `*Obs:* ${obs}\n`;
    mensagem += "-------------------------\n";
  });

  const valorTotal = totalCarrinho.textContent;
  mensagem += `\n💰 *${valorTotal}*`;

  const numeroTelefone = "5519996894181";
  const mensagemFormatada = encodeURIComponent(mensagem);
  const linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagemFormatada}`;
  window.open(linkWhatsapp, "_blank");
});

// Inicializa o app
adicionarProdutoNaSecaoComida();