"use strict"
//==========================================

// Вывод ошибки
export function showErrorMessage(message) {
    const minibody = document.querySelector('.minibody')
    const msg = 
        `<div class="error">
            <p>${message}</p>
            <p><a href="index.html">Перейти к списку товаров!</a></p>
        </div>`;
    minibody.insertAdjacentHTML('afterend', msg);
}

// Получение id из LS
// export function getBasketLocalStorage() {
//     const cartDataJSON = localStorage.getItem('basket');
//     return cartDataJSON ? JSON.parse(cartDataJSON) : [];
// }

// Запись id товаров в LS
// export function setBasketLocalStorage(basket) {
//     const basketCount = document.querySelector('.basket__count');
//     localStorage.setItem('basket', JSON.stringify(basket));
//     basketCount.textContent = basket.length;
// }

// Проверка, существует ли товар указанный в LS 
//(если например пару дней не заходил юзер, а товар, который у него в корзине, уже не существует)
// export function checkingRelevanceValueBasket(productsData) {
//     const basket = getBasketLocalStorage();

//     basket.forEach((basketId, index) => {
//         const existsInProducts = productsData.some(item => item.id === Number(basketId));
//         if (!existsInProducts) {
//             basket.splice(index, 1);
//         }
//     });

//     setBasketLocalStorage(basket);
// }