"use strict"
//==========================================

// Вывод ошибки
export function showErrorMessage(message) {
    const categories = document.querySelector('.categories')
    const msg = 
        `<div class="error">
            <p>${message}</p>
            <p><a href="index.html">Перейти к списку товаров!</a></p>
        </div>`;
    categories.insertAdjacentHTML('afterend', msg);
}

// Получение id из LS
export function getBasketLocalStorage() {
    const cartDataJSON = localStorage.getItem('basket');
    return cartDataJSON ? JSON.parse(cartDataJSON) : [];
}

// Получение size из LS
export function getSizeLocalStorage() {
    const sizeDataJSON = localStorage.getItem('sizes');
    return sizeDataJSON ? JSON.parse(sizeDataJSON) : [];
}

// Запись id товаров в LS
export function setBasketLocalStorage(basket) {
    const basketCount = document.querySelector('.amount');
    localStorage.setItem('basket', JSON.stringify(basket));
    basketCount.textContent = `кол-во: ${basket.length}`;
}

// Запись size товаров в LS
export function setSizeLocalStorage(sizes) {
    localStorage.setItem('sizes', JSON.stringify(sizes));
}

// Проверка, существует ли товар указанный в LS 
// (если например пару дней не заходил юзер, а товар, который у него в корзине, уже не существует)
export function checkingRelevanceValueBasket(productsData) {
    const basket = getBasketLocalStorage();

    basket.forEach((basketId, index) => {
        const existsInProducts = productsData.some(item => item.id === Number(basketId));
        if (!existsInProducts) {
            basket.splice(index, 1);
        }
    });

    setBasketLocalStorage(basket);
}