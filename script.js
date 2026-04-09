let total = 0;
let lista = "";


function carrinho() {
    let produto = document.querySelector('input[name="produto"]:checked');
    let quantidade = document.getElementById("quantidade").value;

    if (!produto || quantidade === "" || quantidade <= 0) {
        alert("Selecione um produto e informe a quantidade!");
        return;
    }

    let nomeProduto = "";
    let preco = 0;

    switch (produto.value) {
        case "1":
            nomeProduto = "Pizza de Pepperoni";
            preco = 30;
            break;
        case "2":
            nomeProduto = "Pizza de Queijo";
            preco = 25;
            break;
        case "3":
            nomeProduto = "Pizza de Frango";
            preco = 28;
            break;
        case "4":
            nomeProduto = "Refrigerante Lata";
            preco = 6;
            break;
        case "5":
            nomeProduto = "Chica Cupcake";
            preco = 10;
            break;
    }

    let subtotal = preco * quantidade;
    total += subtotal;

    lista += `${nomeProduto} x${quantidade} = R$ ${subtotal.toFixed(2)}<br>`;

    document.getElementById("carrinho").innerHTML = lista + `<br><strong>Total: R$ ${total.toFixed(2)}</strong>`;
}
document.getElementById("pagamento").addEventListener("change", function() {
    let parcelas = document.getElementById("parcelas");

    if (this.value === "Credito") {
        parcelas.style.display = "block";
    } else {
        parcelas.style.display = "none";
    }
});

function finalizar() {
    let pagamento = document.getElementById("pagamento").value;
    let resultado = document.getElementById("resultado");
    let parcelas = document.getElementById("parcelas").value;

    if (total === 0) {
        resultado.innerHTML = "Seu carrinho está vazio!";
        return;
    }

    if (!pagamento || pagamento === "Selecione a forma de pagamento...") {
        resultado.innerHTML = "Escolha a forma de pagamento!";
        return;
    }

    let totalFinal = total;
    let taxa = 0;

    // TAXAS
    if (pagamento === "Debito") {
        taxa = total * 0.02;
    } else if (pagamento === "Credito") {
        taxa = total * 0.04;
    }

    totalFinal += taxa;

    let mensagem = `
        ✅ Compra finalizada! <br>
        Total: R$ ${total.toFixed(2)} <br>
        Taxa: R$ ${taxa.toFixed(2)} <br>
        Total final: <strong>R$ ${totalFinal.toFixed(2)}</strong> <br>
        Pagamento: ${pagamento}
    `;

    // PARCELAMENTO
    if (pagamento === "Credito") {
        let valorParcela = totalFinal / parcelas;

        mensagem += `<br>Parcelado em ${parcelas}x de R$ ${valorParcela.toFixed(2)}`;
    }

    resultado.innerHTML = mensagem;

    // RESET
    total = 0;
    lista = "";
    document.getElementById("carrinho").innerHTML = "";
    document.getElementById("quantidade").value = "";
}