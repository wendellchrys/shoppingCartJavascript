updateCart = () => {
    const containerCart = document.getElementById('cart-list');
    const containerCartTotal = document.getElementById('cart-list-total');
    const containerCartTotalPayable = document.getElementById('cart-list-total-payable');
    containerCart.innerHTML = "";
    itemsQtd.map((item) => {
        if(item.qtd > 0) {   
            const type = getNormalize(item);
            console.log(type.length);
            if (type.length == 0) {
                item.finalPrice = (item.qtd * item.price);
                containerCart.innerHTML +=`                    
                    <tr>
                        <td>`+item.qtd+`</td>
                        <td>`+item.name+`</td>
                        <td>`+(item.price * item.qtd)+`</td>
                        <td>Sem Promoção</td>
                        <td>`+(item.price * item.qtd)+`</td>

                    </tr>
                `;
            }
            else {
                type.map((item2) => {
                    let newPrice = 0;
                    if (item2.type === 'BUY_X_GET_Y_FREE' && item2.required_qty <= item.qtd ) {
                        newPrice = ((item.qtd * item.price) - ( Math.floor( item.qtd / item2.required_qty ) * item.price) );
                        item.finalPrice = newPrice;
                    }
                    else if (item2.type === 'QTY_BASED_PRICE_OVERRIDE' && item2.required_qty <= item.qtd ) {
                        newPrice = ( item.qtd >= item2.required_qty ? ( (Math.floor( item.qtd / item2.required_qty ) * item2.price) + ( (item.qtd % item2.required_qty)  == 0 ? 0 : (1 * item.price) ) ): item.price);
                        item.finalPrice = newPrice;
                    }
                    else if (item2.type === 'FLAT_PERCENT' ) {
                        newPrice = ( (item.price * item.qtd) - ( ((item.price * item.qtd) / 100 ) * (item2.amount)) );
                        item.finalPrice = newPrice;
                    }
                    else {
                        newPrice = (item.qtd * item.price);
                        item.finalPrice = newPrice;
                    }

                    containerCart.innerHTML +=`                    
                    <tr>
                        <td>`+item.qtd+`</td>
                        <td>`+item.name+`</td>
                        <td>R$ `+(item.price * item.qtd)+`</td>
                        <td>`+(item2.type === 'BUY_X_GET_Y_FREE' && item2.required_qty <= item.qtd ? 'Ganha ' +item2.free_qty+ ' item a cada '+item2.required_qty+ ' produtos' : 
                        item2.type === 'QTY_BASED_PRICE_OVERRIDE' && item2.required_qty <= item.qtd ? 'Substitui Preço para R$ ' + item2.price +' a cada ' +item2.required_qty+ ' produtos' : 
                        item2.type === 'FLAT_PERCENT' ? 'Desconto de ' + item2.amount + '%' : 
                        'Sem Promoção')+`</td>
                        <td>R$ `+newPrice+`</td>

                    </tr>`;
                });
            }
        }
    })
    itemsQtd.map((item) => {
        if(item.qtd > 0) { 
            let rawTotal = 0;
            let totalPayable = 0;
            for (var i = 0; i < itemsQtd.length; i++) {
                if(item.qtd > 0) { 
                    rawTotal += (itemsQtd[i].price * itemsQtd[i].qtd);
                    totalPayable += itemsQtd[i].finalPrice;
                }
            }
            containerCartTotal.innerHTML = "";
            containerCartTotalPayable.innerHTML = "";

                containerCartTotal.innerHTML += `  
                <tr>
                    <td>R$ `+rawTotal+`</td>
                </tr>
            `;
            containerCartTotalPayable.innerHTML += `  
                <tr class="table-success">
                    <td><h4>R$ `+totalPayable+`</h4></td>
                </tr>
            `;
        }
    })
}