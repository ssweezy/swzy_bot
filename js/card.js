"use strict"
//==========================================
import { ERROR_SERVER, PRODUCT_INFORMATION_NOT_FOUND } from './constants.js';
import { 
    showErrorMessage
    // checkingRelevanceValueBasket
} from './utils.js';

const minibody = document.querySelector('.minibody');
let productsData = [];


getProducts();


async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }
        
        loadProductDetails(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }
}


function getParameterFromURL(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}


function loadProductDetails(data) {

    if (!data || !data.length) {
        showErrorMessage(ERROR_SERVER)
        return;
    }

    // checkingRelevanceValueBasket(data);

    const productId = Number(getParameterFromURL('id'));

    if (!productId) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
        return;
    }

    const findProduct = data.find(card => card.id === productId);

    if(!findProduct) {
        showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND)
        return;
    }
    renderInfoProduct(findProduct);
}

// карусель и фотки
function renderInfoProduct(product) {
    const {img1, img2, title, price, color, material} = product;
    // const priceDiscount = price - ((price * discount) / 100);
    const productItem = 
        `
    <div class="photo">
        <img class="production" src="./card_photos/${img1}">
        <img class="production" src="./card_photos/${img2}">
        <img class="production" src="./card_photos/${img1}">
        <img class="production" src="./card_photos/${img2}">
    </div>

    <div class="name">${title}</div>

    <div class="container">
        <div class="radio-tile-group">

            <div class="input-container">
                <input id="S" type="radio" name="radio" value="S">
                <div class="radio-tile">
                  <label for="S">S</label>
                </div>
            </div>
            
            <div class="input-container">
                <input id="M" type="radio" name="radio" value="M">
                <div class="radio-tile">
                  <label for="M">M</label>
                </div>
            </div> 

            <div class="input-container">
                <input id="L" type="radio" name="radio" value="L">
                <div class="radio-tile">
                  <label for="L">L</label>
                </div>
            </div> 

            <div class="input-container">
                <input id="XL" type="radio" name="radio" value="Xl">
                <div class="radio-tile">
                  <label for="XL">XL</label>
                </div>
            </div> 

        </div>
    </div>

    <div class="price-settings">
        <div class="price" id="chena">${price} RUB</div>
        <!-- <div class="howmuch">
            <button class="pluses" id="plusik">+</button>
            <div class="amount">0</div>
            <button class="pluses" id="minusik">-</button>
        </div> -->
    </div>

    <div class="about">
        материал: ${material}
        <br>
        цвет: ${color}
    </div>
        `
    minibody.insertAdjacentHTML('beforeend', productItem);
}


//WEBAPP ЧАСТЬ
let tg = window.Telegram.WebApp

//массив из кнопок размеров
tg.MainButton.show()

tg.BackButton.show()