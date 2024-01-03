"use strict"
//==========================================
import { 
    showErrorMessage,
    // setBasketLocalStorage,
    // getBasketLocalStorage,        
    checkingRelevanceValueBasket
} from './utils.js';

import { 
    COUNT_SHOW_CARDS_CLICK, 
    ERROR_SERVER,
    NO_PRODUCTS_IN_THIS_CATEGORY
} from './constants.js';

// const cards = document.querySelector('.cards');
// const btnShowCards = document.querySelector('.show-cards');
// let shownCards = COUNT_SHOW_CARDS_CLICK;
// let countClickBtnShowCards = 1;
let productsData = [];

// Загрузка товаров
getProducts()
    
// // Обработка клика по кнопке "Показать еще"
// btnShowCards.addEventListener('click', sliceArrCards);
// // Обработка клика по кнопке "В корзину"
// cards.addEventListener('click', handleCardClick);


// Получение товаров
async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();    
        }
        
        renderStartPage(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }
    
}

function renderStartPage(data) {
    if (!data || !data.length) {
        showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
        return 
    };

    const arrCards = data.slice(0, COUNT_SHOW_CARDS_CLICK);
    createCards(arrCards);

    // checkingRelevanceValueBasket(data);

    // const basket = getBasketLocalStorage();
    // checkingActiveButtons(basket);
}

// кнопка показать еще
// function sliceArrCards() {
//     if(shownCards >= productsData.length) return;

//     countClickBtnShowCards++;
//     const countShowCards = COUNT_SHOW_CARDS_CLICK * countClickBtnShowCards;

//     const arrCards = productsData.slice(shownCards, countShowCards);
//     createCards(arrCards);
//     shownCards = cards.children.length;

//     if(shownCards >= productsData.length) {
//         btnShowCards.classList.add('none');
//     }
// }

// обработчик кнопки добавить в корзину
// function handleCardClick(event) {
//     const targetButton = event.target.closest('.card__add');
//     if (!targetButton) return;

//     const card = targetButton.closest('.card');
//     const id = card.dataset.productId;
//     const basket = getBasketLocalStorage();

//     if (basket.includes(id)) return;

//     basket.push(id);
//     setBasketLocalStorage(basket);
//     checkingActiveButtons(basket);
// }


// меняет кнопку добавить в корзину на добавлено в корзину
// function checkingActiveButtons(basket) {
//     const buttons = document.querySelectorAll('.card__add');

//     buttons.forEach(btn => {
//         const card = btn.closest('.card');
//         const id = card.dataset.productId;
//         const isInBasket = basket.includes(id);

//         btn.disabled = isInBasket;
//         btn.classList.toggle('active', isInBasket);
//         btn.textContent = isInBasket ? 'В корзине' : 'В корзину';
//     });
// }


// Рендер карточки
function createCards(data) {
    data.forEach(card => {
        const {id, cardimg, title, type} = card;
        var pants = document.getElementById('pants')
        var zip = document.getElementById('zip')
        var long = document.getElementById('long')
		const cardItem = 
			`
                <div class="card" data-product-id="${id}">
                    <div class="card__top">
                        <a href="/card.html?id=${id}" class="card__image">
                            <img
                                src="./card_photos/${cardimg}"
                                alt="${title}"
                            />
                        </a>
                    </div>
                </div>
            `
        if(type === "pants") {
            pants.insertAdjacentHTML('beforeend', cardItem);}
        if(type === "zip") {
            zip.insertAdjacentHTML('beforeend', cardItem);}
        if(type === "long") {
            long.insertAdjacentHTML('beforeend', cardItem);}
	});
}



//WEBAPP ЧАСТЬ
let tg = window.Telegram.WebApp

tg.expand()

try{
    tg.ThemeParams.secondary_bg_color = "#2C2C2C"
    } catch(err) {console.log(err.message)}
tg.MainButton.color = "#7A5FFF"
tg.MainButton.textColor = "#FFF9F9"

tg.enableClosingConfirmation()

if (tg.MainButton.isVisible){
    tg.MainButton.hide()
}

tg.BackButton.hide()



