"use strict"
//==========================================
import { ERROR_SERVER, NO_ITEMS_CART } from './constants.js';
import { 
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket
} from './utils.js';

const cart = document.querySelector('.cart');
let productsData = [];


getProducts();
cart.addEventListener('click', delProductBasket);


async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }
        
        loadProductBasket(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }
}

function loadProductBasket(data) {
    cart.textContent = '';

    if (!data || !data.length) {
        showErrorMessage(ERROR_SERVER)
        return;
    }

    // checkingRelevanceValueBasket(data);
    const basket = getBasketLocalStorage(); 

    if(!basket || !basket.length) {
        showErrorMessage(NO_ITEMS_CART)
        return;
    }

    const findProducts = data.filter(item => basket.includes(String(item.id)));

    if(!findProducts.length) {
        showErrorMessage(NO_ITEMS_CART)
        return;
    }

    renderProductsBasket(findProducts);
}

function delProductBasket(event) {
    const targetButton = event.target.closest('.del-block');
    if (!targetButton) return;

    const card = targetButton.closest('.offer');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    const newBasket = basket.filter(item => item !== id);
    setBasketLocalStorage(newBasket);

    getProducts()
}

function renderProductsBasket(arr) {
    arr.forEach(card => {
        const {id, img1, title, color, price} = card;
        const basket = getBasketLocalStorage();
        const size = basket[basket.indexOf(id) + 1]
        console.log(size)
        const cardItem = 
        `
        <div class="offer" data-product-id="${id}">
            <img src="./card_photos/${img1}">
            <div class="info-container">
                <span class="name">${title}</span>
                <span class="size">размер: ${size}</span>
                <span class="color">цвет: ${color}</span>
                <span class="price">${price} rub</span>
            </div>
            <div class="del-block">
                <button class="del-btn"><ion-icon name="trash-outline" class="trash"></ion-icon></button> 
            </div>
        </div>
        `;

        cart.insertAdjacentHTML('beforeend', cardItem);
    });
}


//WEBAPP часть

let tg = window.Telegram.WebApp

tg.MainButton.setText('купить')

tg.MainButton.show()

tg.BackButton.show()

tg.enableClosingConfirmation()

//главная кнопка
tg.MainButton.onClick(function(){
    return
})

tg.BackButton.onClick(function(){
    window.location.href = 'index.html'
})