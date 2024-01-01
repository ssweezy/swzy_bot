"use strict"
//==========================================
import { ERROR_SERVER, PRODUCT_INFORMATION_NOT_FOUND } from './constants.js';
import { 
    getBasketLocalStorage,
    setBasketLocalStorage,
    showErrorMessage
    // checkingRelevanceValueBasket
} from './utils.js';

const minibody = document.querySelector('.minibody');
let productsData = [];


getProducts();

// получение продукта из бд
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

// находит айди из ссылки
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
                <input class="radio-button" id="S" type="radio" name="radio" value="S">
                <div class="radio-tile">
                  <label for="S">S</label>
                </div>
            </div>
            
            <div class="input-container">
                <input class="radio-button" id="M" type="radio" name="radio" value="M">
                <div class="radio-tile">
                  <label for="M">M</label>
                </div>
            </div> 

            <div class="input-container">
                <input class="radio-button" id="L" type="radio" name="radio" value="L">
                <div class="radio-tile">
                  <label for="L">L</label>
                </div>
            </div> 

            <div class="input-container">
                <input class="radio-button" id="XL" type="radio" name="radio" value="Xl">
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

tg.MainButton.setText('добавить')

// tg.MainButton.onClick(window.location.href = 'index.html')

tg.BackButton.show()

tg.enableClosingConfirmation()

//кнопка назад
tg.BackButton.onClick(function(){
    window.location.href = 'index.html'
})

//главная кнопка
tg.MainButton.onClick(function(){
    let radio = document.querySelectorAll(".radio-button")
    let size = undefined
    for (let i = 0; i < radio.length; i++){
        if(radio[i].checked){
            size = radio[i].value
            console.log(size)
            break
        }
    }
    //если не выбран размер выводит сообщение что нужно выбрать
    if(size == undefined){
        console.log ('didnt choose size')
        tg.showAlert("выберите размер")
        return
    }
    //меняет название кнопки
    if (tg.MainButton.text != 'в корзину'){
        const id = getParameterFromURL('id')
        const basket = getBasketLocalStorage()
        
        if(basket.includes(id)) return;
        basket.push(id)
        basket.push(size)
        setBasketLocalStorage(basket)

        tg.MainButton.setText('в корзину')
        return
    }
    //переход в корзину
    if(tg.MainButton.text == 'в корзину'){
        
        //сам переход
        window.location.href = 'basket.html'
        return
    }

})

