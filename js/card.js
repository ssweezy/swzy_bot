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
            const res = await fetch('./data/products.json');
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


function renderInfoProduct(product) {
    const {img2, title, price, descr } = product;
    // const priceDiscount = price - ((price * discount) / 100);
    // var minibody = document.getElementById("minibody");
    const productItem = 
        `
    <div class="photo">
        <img class="production" src="./card_photos/${img2}" alt="${descr}"> 
    </div>

        <div class="name">${title}</div>

        <div class="sizes">
            <button class="button">S</button>
            <button class="button">M</button>
            <button class="button">L</button>
            <button class="button">XL</button>
            <!-- <button class="button">XXL</button> -->
        </div>

        <div class="price-settings">
            <div class="price" id="chena">${price} RUB</div>

            <div class="howmuch">
                <button class="pluses" id="plusik">+</button>
                <div class="amount">0</div>
                <button class="pluses" id="minusik">-</button>
            </div>
        </div>    
    </div>
        `
    minibody.insertAdjacentHTML('beforeend', productItem);
}