// Cart script
const allPage = document.querySelector('.wrapper');
const cart = document.querySelector('.shop-cart');
const openCartButton = document.querySelector('.header-cart-button');
const cartList = document.querySelector('.shop-cart-container');
const addToCartButton = document.querySelectorAll('.products-grid-button');
const productList = document.querySelector('.products-type-wrapper')


openCartButton.addEventListener('click', () => {
    if (cart.classList.toggle('open')) {
        allPage.style.opacity = 0.2;
    } else {
        allPage.style.opacity = 1;
    };
});

window.addEventListener('click', (e) => {
    if (!cart.contains(e.target) && !openCartButton.contains(e.target)) {
        cart.classList.remove('open');
        allPage.style.opacity = 1;
    }
});

const addProductToCard = () => {
    productList.addEventListener('click', function (event) {
        if (event.target.classList.contains('products-grid-button')) {
            const productElement = event.target.closest('.products-grid-item');
    
            if (!productElement) return; 

            const titleCard = productElement.querySelector('.products-grid-item-title');
            const subtitleCard = productElement.querySelector('.products-grid-item-subtitle');
            const priceCard = productElement.querySelector('.products-grid-price');
            const imageCard = productElement.querySelector('.products-grid-item-img');

            productInfo = {
                id: productElement.id,
                title: titleCard ? titleCard.textContent : '',
                subtitle: subtitleCard ? subtitleCard.textContent : '',
                price: priceCard ? priceCard.textContent : '',
                image: imageCard ? imageCard.src : ''
            };
            
            const productInCart = cartList.querySelector(`#${productInfo.id}`);
            console.log('productInfo:', productInfo);

            if (productInCart) {
                const currentItemsProduct = productInCart.querySelector('.shop-cart-count');
                const minusButton = productInCart.querySelector('.shop-cart-delete')
                currentItemsProduct.textContent = parseInt(currentItemsProduct.textContent) + 1;
                minusButton.classList.remove('disabled')
            } else {
                renderProductInCart(productInfo);
            };
        }
    });
};
addProductToCard();


const renderProductInCart = () => {
    const div = document.createElement('div');
    div.classList.add('shop-cart-div');

    const nothingMessage = document.querySelector('.nothing-cart');

    nothingMessage.style.display = 'none';

    div.innerHTML = `
    <div class="shop-cart-list">
        <div class="shop-cart-item">
            <img src="${productInfo.image}" alt="${productInfo.title}" class="shop-cart-img">
            
            <div class="shop-cart-texts">
                <p class="shop-cart-title">${productInfo.title}</p>
                <p class="shop-cart-description">${productInfo.subtitle}</p>
                
                
                <div class="shop-cart-bottom">
                    <div class="shop-cart-counter">
                        <span class="shop-cart-delete">-</span>
                        <span class="shop-cart-count">1</span>
                        <span class="shop-cart-add">+</span>
                    </div>

                    <span class="shop-cart-price" data-price = "${productInfo.price}">${productInfo.price}</span>
                </div>
            </div>
        </div>
    </div>
    `;

    cartList.append(div);
};

const calculateTotalCartValue = () => {
    const cartItems = document.querySelector('.shop-cart-item');
    const cartTotalPrice = document.querySelector('.shop-card-finish-price');

    let totalCartValue = 0;

    cartItems.forEach((item) => {
        const itemCount = item.querySelector('.shop-cart-count');

        const itemPrice = item.querySelector('.shop-cart-price');

        const itemTotalPrice = parseInt(itemCount.textContent) * parseInt(itemPrice.textContent.split(' ').join(''));
        
        totalCartValue += itemTotalPrice;
    });

    cartTotalPrice.textContent = totalCartValue;
};
calculateTotalCartValue();


// Cart script