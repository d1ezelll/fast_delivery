// Cart script
const cart = document.querySelector('.shop-cart');
const openCartButton = document.querySelector('.header-cart-button');
const cartList = document.querySelector('.shop-cart-list');
const totalSumDisplay = document.querySelector('.shop-card-finish-price');
const cartButtonText = document.querySelector('.cart-button-text');

let totalSum = 0;

console.log("Cart elements:", cart, openCartButton, cartList);

openCartButton.addEventListener('click', () => {
    cart.classList.toggle('open');
});

window.addEventListener('click', (e) => {
    if (!cart.contains(e.target) && !openCartButton.contains(e.target)) {
        cart.classList.remove('open');
    }
});

function updateCartButtonText(sum) {
    if (sum === 0) {
        cartButtonText.textContent = 'Корзина пуста';
    } else {
        cartButtonText.textContent = `${sum.toFixed(2)} ₽`;
    }
}

function updateTotalSum(newAmount) {
    totalSum += newAmount;
    totalSumDisplay.textContent = `${totalSum.toFixed(2)} ₽`;
    updateCartButtonText(totalSum);
}

function addProductToCard(productElement) {
    const titleCard = productElement.querySelector('.products-grid-item-title');
    const subtitleCard = productElement.querySelector('.products-grid-item-subtitle');
    const priceCard = productElement.querySelector('.products-grid-price');
    const imageCard = productElement.querySelector('.products-grid-item-img');

    const productInfo = {
        id: productElement.id,
        title: titleCard ? titleCard.textContent : '',
        subtitle: subtitleCard ? subtitleCard.textContent : '',
        price: parseFloat(priceCard ? priceCard.textContent.replace(/[^0-9.,]/g, '') : '0'),
        image: imageCard ? imageCard.src : ''
    };
   
    const existingItem = cartList.querySelector(`#${productInfo.id}`);
    if (existingItem) {
        updateExistingCartItem(existingItem, productInfo);
    } else {
        renderProductInCart(productInfo);
    }
}

document.querySelectorAll('.products-grid-button').forEach(button => {
    const nothingMessage = document.querySelector('.nothing-cart');
    button.addEventListener('click', function() {
        const productElement = this.closest('.products-grid-item');
        if (productElement) {
            console.log("Found product element", productElement);
            addProductToCard(productElement);
            nothingMessage.style.display = 'none';
        } else {
            console.log("No product element found");
        }
    });
});

function renderProductInCart(productInfo) {
    const div = document.createElement('div');
    div.classList.add('shop-cart-item');
    div.innerHTML = `
        <img src="${productInfo.image}" alt="${productInfo.title}" class="shop-cart-img">
        
        <div class="shop-cart-texts">
            <p class="shop-cart-title">${productInfo.title}</p>
            <p class="shop-cart-description">${productInfo.subtitle}</p>
            
            <div class="shop-cart-bottom">
                <div class="shop-cart-counter">
                    <div class="shop-cart-delete" data-action="minus">-</div>
                    <div class="shop-cart-count" data-counter>1</div>
                    <div class="shop-cart-add" data-action="plus">+</div>
                </div>

                <span class="shop-cart-price" data-price="${productInfo.price}">${productInfo.price}</span>
            </div>
        </div>
    `;

    cartList.append(div);
    updateTotalSum(productInfo.price);
    
    addCartItemHandlers(div);
}

function addCartItemHandlers(cartItem) {
    const countDeleteButton = cartItem.querySelector('[data-action="minus"]');
    const countAddButton = cartItem.querySelector('[data-action="plus"]');
    const productCount = cartItem.querySelector('[data-counter]');
    const nothingMessage = document.querySelector('.nothing-cart');
    const productPrice = cartItem.querySelector('[data-price]').textContent;

    if (!countDeleteButton || !countAddButton || !productCount) {
        console.error("One or more required elements not found in cart item");
        return;
    }

    countDeleteButton.addEventListener('click', function () {
        let count = parseInt(productCount.innerText);
        if (count > 1) {
            count--;
            productCount.innerText = count.toString();
            updateTotalSum(-parseFloat(productPrice));
        } else {
            cartItem.remove();
            updateTotalSum(-parseFloat(productPrice));
        }
    });

    countAddButton.addEventListener('click', function () {
        let count = parseInt(productCount.innerText);
        count++;
        productCount.innerText = count.toString();
        updateTotalSum(parseFloat(productPrice));
    });
}

cartList.addEventListener('DOMSubtreeModified', function() {
    updateTotalSum(0); 
});

updateCartButtonText(totalSum);
