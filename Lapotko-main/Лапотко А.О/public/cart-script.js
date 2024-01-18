document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');

   
    fetch('/api/cart')
        .then(response => response.json())
        .then(cartItems => {
        
            cartItems.forEach(item => {
                const cartItemCard = createCartItemCard(item);
                cartContainer.appendChild(cartItemCard);
            });
        });

    
    function createCartItemCard(item) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const title = document.createElement('h2');
        title.textContent = item.name;

        const price = document.createElement('p');
        price.textContent = `Цена: $${item.price}`;

        const quantity = document.createElement('p');
        quantity.textContent = `Количество: ${item.quantity}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить из корзины';
        removeButton.addEventListener('click', () => removeFromCart(item));

        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(quantity);
        card.appendChild(removeButton);

        return card;
    }

   
    function removeFromCart(item) {
        fetch('/api/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: item.id }),
        })
        .then(response => response.json())
        .then(updatedCart => {
            console.log('Товар удален из корзины:', item);
            location.reload();
        })
        
    }
        
    const orderSummary = document.getElementById('order-summary');
    const orderForm = document.getElementById('order-form');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const totalAmountElement = document.getElementById('total-amount');

    function updateTotalAmount() {
        const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        totalAmountElement.textContent = `$${totalAmount}`; 
       }

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        clearCart();

        updateTotalAmount();

        alert(`Заказ оформлен!\nИмя: ${name}\nАдрес: ${address}\nEmail: ${email}`);
    });

    checkoutBtn.addEventListener('click', () => {
        orderSummary.style.display = 'none';
        orderForm.style.display = 'block';
    });

    function clearCart() {
    fetch('/api/cart/clear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Не удалось очистить корзину');
        }
        return {};
    })
    .then(() => {
        location.reload(); 
    })
    .catch(error => {
        console.error('Ошибка при очистке корзины:', error);
    });
}

});