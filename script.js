const carrinho = document.querySelector("#carrinho");
const lista = document.querySelector(".lista");
const botaoX = document.querySelector("#x");
const itens = document.getElementById("itens");
const comidas = document.querySelector(".comidas");
const totalCarrinho = document.querySelector("#total-carrinho");
const botaoFinalizar = document.querySelector(".finalizar");

// Elemento de seleção de região integrado
const selectRegiao = document.querySelector("#select-regiao");

// Elementos do Modal de Observação
const modalObs = document.querySelector("#modal-obs");
const campoObs = document.querySelector("#campo-obs");
const btnSemObs = document.querySelector("#btn-sem-obs");
const btnComObs = document.querySelector("#btn-com-obs");

// Elementos do Modal do Pix
const modalPix = document.querySelector("#modal-pix");
const imgQrCode = document.querySelector("#img-qrcode");
const valorPixModal = document.querySelector("#valor-pix-modal");
const textoPixCopia = document.querySelector("#texto-pix-copia");
const btnCopiarPix = document.querySelector("#btn-copiar-pix");
const avisoCopiado = document.querySelector("#aviso-copiado");
const btnCancelarPix = document.querySelector("#btn-cancelar-pix");

// Variável temporária para armazenar o produto selecionado
let produtoTemporario = null;

// ==========================================
// CONFIGURAÇÃO DA SUA CHAVE PIX ESTÁTICA
// ==========================================
const MINHA_CHAVE_PIX = "74ddb5bc-4f78-4ce3-ac1f-d00ecf882051"; 

// Lanches e porções
const produtos = [
  {
    id: 1,
    nome: "Mini X-Burguer",
    preco: 18.00,
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

// Função modificada para calcular e atualizar o valor total com a taxa de entrega
function atualizarTotal() {
  const precosElementos = itens.querySelectorAll(".pedidos h4:last-child");
  let subtotal = 0;

  precosElementos.forEach(elemento => {
    const precoTexto = elemento.textContent.replace("R$", "").trim();
    const precoNumero = parseFloat(precoTexto);
    
    if (!isNaN(precoNumero)) {
      subtotal += precoNumero;
    }
  });

  // Captura a taxa de entrega selecionada (se for vazio, considera 0 para o cálculo inicial)
  const taxaEntrega = parseFloat(selectRegiao.value) || 0;
  const totalComTaxa = subtotal + taxaEntrega;

  totalCarrinho.textContent = `Total: R$ ${totalComTaxa.toFixed(2)}`;
  return totalComTaxa.toFixed(2);
}

// Recalcular o total sempre que o usuário alterar a região de entrega
selectRegiao.addEventListener("change", atualizarTotal);

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

      if (e.target.classList.contains("add-sucesso")) return;

      if (produtoTemporario) {
        campoObs.value = ""; 
        modalObs.style.display = "flex"; 
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

// Função para gerenciar os feedbacks visuais de sucesso
function dispararAnimacoesSucesso(botaoDoMomento) {
  const iconeCarrinho = document.querySelector("#carrinho");
  iconeCarrinho.classList.add("animar-carrinho");
  
  setTimeout(() => {
    iconeCarrinho.classList.remove("animar-carrinho");
  }, 500);

  if (botaoDoMomento) {
    const textoOriginal = "ADD"; 
    botaoDoMomento.textContent = "✓"; 
    botaoDoMomento.classList.add("add-sucesso");

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
  
  const botaoParaAnimar = modalObs.targetButton;
  dispararAnimacoesSucesso(botaoParaAnimar); 
  
  fecharModal();
}

// CONFIGURAÇÃO DOS BOTÕES DO MODAL DE OBSERVAÇÃO
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

modalObs.addEventListener("click", (e) => {
  if (e.target === modalObs) {
    fecharModal();
  }
});

// =================================================================
// PROCESSO DO MODAL PIX ESTÁTICO COM TRAVA DE SEGURANÇA POR REGIÃO
// =================================================================
botaoFinalizar.addEventListener("click", () => {
  const itensCarrinho = itens.querySelectorAll(".item");

  // 1. Validação se o carrinho possui algum item
  if (itensCarrinho.length === 0) {
    alert("Seu carrinho está vazio! Adicione pelo menos um item.");
    return;
  }

  // 2. Trava de segurança: Bloqueia a finalização se a região estiver vazia
  if (selectRegiao.value === "") {
    alert("Por favor, selecione a sua Região de Entrega antes de finalizar o pedido!");
    selectRegiao.focus();
    return;
  }

  // Captura o valor total atualizado do carrinho (que já inclui a taxa calculada)
  const valorTotalNumerico = parseFloat(atualizarTotal());

  if (imgQrCode) {
    imgQrCode.style.display = "none";
    const containerQr = document.querySelector(".qr-code-container");
    if (containerQr) {
      containerQr.innerHTML = "<p style='color:#333; font-weight:600; padding:10px;'>Utilize a Chave Pix abaixo</p>";
    }
  }

  // Alimenta o modal com as informações reais
  valorPixModal.textContent = `R$ ${valorTotalNumerico.toFixed(2)}`;
  textoPixCopia.value = MINHA_CHAVE_PIX;
  btnCopiarPix.innerHTML = "📋 Copiar Chave Pix";

  document.querySelector(".pix-sub").textContent = "Copie a chave Pix abaixo para fazer o pagamento no aplicativo do seu banco:";
  
  const statusContainer = document.querySelector(".status-pagamento");
  statusContainer.innerHTML = `
    <div class="spinner"></div>
    <span>Faça a transferência e envia o comprovante.</span>
  `;

  btnCancelarPix.textContent = "Voltar ao Carrinho";

  let btnConfirmar = document.querySelector("#btn-confirmar-pagamento");
  if (!btnConfirmar) {
    btnConfirmar = document.createElement("button");
    btnConfirmar.id = "btn-confirmar-pagamento";
    btnConfirmar.className = "btn-pix-acao";
    btnConfirmar.style.backgroundColor = "#27ae60";
    btnConfirmar.style.marginTop = "12px";
    btnConfirmar.textContent = "🟢 ENVIAR COMPROVANTE";
    
    btnCancelarPix.parentNode.insertBefore(btnConfirmar, btnCancelarPix);
  }

  const novoBtnConfirmar = btnConfirmar.cloneNode(true);
  btnConfirmar.parentNode.replaceChild(novoBtnConfirmar, btnConfirmar);

  novoBtnConfirmar.addEventListener("click", () => {
    novoBtnConfirmar.textContent = "Enviando Pedido...";
    novoBtnConfirmar.disabled = true;

    statusContainer.innerHTML = "✅ <span style='color: #2ecc71; font-weight:bold;'>PEDIDO CONFIRMADO! REDIRECIONANDO...</span>";

    setTimeout(() => {
      modalPix.style.display = "none";
      enviarPedidoWhatsApp(); 
      novoBtnConfirmar.textContent = "🟢 Já realizei o Pagamento";
      novoBtnConfirmar.disabled = false;
    }, 1500);
  });

  modalPix.style.display = "flex";
});

// Ação de copiar o texto da chave Pix
btnCopiarPix.addEventListener("click", () => {
  textoPixCopia.select();
  textoPixCopia.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(textoPixCopia.value);

  avisoCopiado.style.display = "block";
  setTimeout(() => {
    avisoCopiado.style.display = "none";
  }, 2000);
});

// Ação de fechar o Modal do Pix e voltar
btnCancelarPix.addEventListener("click", () => {
  modalPix.style.display = "none";
});

// Envio estruturado de informações direto para o WhatsApp do Dono (com relatório de taxas)
function enviarPedidoWhatsApp() {
  const itensCarrinho = itens.querySelectorAll(".item");
  
  // Coleta as informações textuais da região escolhida
  const opcaoSelecionada = selectRegiao.options[selectRegiao.selectedIndex];
  const nomeRegiao = opcaoSelecionada.getAttribute("data-nome");
  const valorTaxa = parseFloat(opcaoSelecionada.value);

  // Calcula exclusivamente a soma dos produtos para o relatório
  let valorProdutos = 0;
  itensCarrinho.forEach(item => {
    const precoTexto = item.querySelector(".pedidos h4:last-child").textContent.replace("R$", "").trim();
    valorProdutos += parseFloat(precoTexto);
  });

  let mensagem = "🍔 *Novo Pedido - ENVIADO PELO SITE!* 🍔\n\n";
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

  // Relatório de valores estruturado conforme solicitado
  mensagem += `\n📍 *Região de Entrega:* ${nomeRegiao}`;
  mensagem += `\n💵 *Valor do Pedido:* R$ ${valorProdutos.toFixed(2)}`;
  mensagem += `\n🛵 *Taxa da Região:* R$ ${valorTaxa.toFixed(2)}`;
  mensagem += `\n💰 *Total (Pedido + Valor):* R$ ${(valorProdutos + valorTaxa).toFixed(2)}`;
  mensagem += `\n\n🟩 *PAGAMENTO: Informado como Realizado via Pix pelo cliente.*`;

  const numeroTelefone = "5519996894181";
  const linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}`;
  window.open(linkWhatsapp, "_blank");
}

// Inicializa o app
adicionarProdutoNaSecaoComida();