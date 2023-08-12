class CaixaDaLanchonete {
    //Declarando menu em forma de chave-valor
    menu = {
        "cafe": 3.0,
        "chantily": 1.5,
        "suco": 6.2,
        "sanduiche": 6.5,
        "queijo": 2.0,
        "salgado": 7.25,
        "combo1": 9.5,
        "combo2": 7.5
    };
    //Formas de pagamento a serem verificadas
    pagamento = ["dinheiro", "debito", "credito"];
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        let total = 0;      //Total do pedido
        let pedido = [];    //Array para armazenar os pedidos

        //Checa se array é vazio
        if (itens.length === 0) { 
            return "Não há itens no carrinho de compra!";
        }
        //Iterando sobre os itens para arrumar os dados e torná-los utilizáveis
        for (const pedidoString of itens) {
            const arrayStrings = pedidoString.split(',');
            const quantidade = parseInt(arrayStrings[1], 10);
            
            //Checando código produto incorreto
            if (!this.menu[arrayStrings[0]]) {
                return "Item inválido!";
            }
            //Checando quantidade igual a zero (adicionado caso de menor que 0)
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }
            //Armazenando os codigos para futura checagem de adicionais
            pedido.push(arrayStrings[0]);

            //Atualizando o total
            total += this.menu[arrayStrings[0]] * quantidade;
        }
        //Checando pelos respectivos itens principais quando solicitados adicionais
        if (pedido.includes("chantily") && !pedido.includes("cafe")) {
            return "Item extra não pode ser pedido sem o principal";
        }
        if (pedido.includes("queijo") && !pedido.includes("sanduiche")) {
            return "Item extra não pode ser pedido sem o principal";
        }
        //Checando se método de pagamento fornecido é valido
        if (!this.pagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        //Aplicando descontos e taxas se necessário
        switch (metodoDePagamento) {
            case "dinheiro":
                total *= 0.95;
                break;
                
            case "credito":
                total *= 1.03;
                break;
        }
        //Valor da compra calculado e retornado na formatação desejada
        //R$ + valor com 2 floating points e vírgula
        return "R$ " + total.toFixed(2).replace(".", ",");
    }
}
export { CaixaDaLanchonete };