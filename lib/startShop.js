startShop = () => {
    const containerProducts = document.getElementById('products');
    itemsQtd.map((item) => {
        containerProducts.innerHTML += `
            <div class="product-item col-md-3 text-center float-left">
                <div class="border mb-5">
                        <h4 class="p-2">`+item.name+`</h4>
                        <p>Price: `+item.price+`</p>
                        <a key="`+item.id+`" href="#" class="btn btn-raised btn-success mb-2"><i class="fas fa-cart-plus"></i> Add to Cart</a>
                </div>
            </div>
        `;
    })
}