"use strict"
//==========================================
import { ERROR_SERVER, NO_ITEMS_CART } from './constants.js';
import { 
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    checkingRelevanceValueBasket,
    getSizeLocalStorage,
    setSizeLocalStorage
} from './utils.js';

let tg = window.Telegram.WebApp

try{
    tg.ThemeParams.secondary_bg_color = "#2C2C2C"
    } catch(err) {console.log(err.message)}
    tg.MainButton.color = "#7A5FFF"
    tg.MainButton.textColor = "#FFF9F9"

tg.MainButton.setText("купить")
tg.MainButton.show()

tg.MainButton.onClick(function(){
    // способ покупки
    let radioPayment = document.querySelectorAll(".radio-button-payment")
    let payment = undefined
    for (let i = 0; i < radioPayment.length; i++){
        if(radioPayment[i].checked){
            payment = radioPayment[i].value
            console.log(payment)
            break
        }
    }
    // спсоб доставки
    let radioShipping = document.querySelectorAll(".radio-button-shipping")
    let shipping = undefined
    for (let i = 0; i < radioShipping.length; i++){
        if(radioShipping[i].checked){
            shipping = radioShipping[i].value
            console.log(shipping)
            break
        }
    }
    // имя
    let inputName = document.getElementById('name')
    let name = inputName.value
    // адрес
    let inputAddress = document.getElementById('address')
    let address = inputAddress.value
    // номер телефона
    let inputPhone = document.getElementById('phone')
    let phone = inputPhone.value

    console.log(phone)

    // проверки на пустые поля
    if (payment == undefined){
        tg.showAlert('выберите способ оплаты')
        return
    } 
    if (shipping == undefined){
        tg.showAlert('выберите доставки')
        return
    }
    if (name == undefined){
        tg.showAlert('введите имя')
        return
    }
    if (shipping != undefined || address == undefined){
        tg.showAlert('укажите адрес куда доставить')
        return
    }
    if (phone == undefined){
        tg.showAlert('введите номер телефона')
        return
    }

    
    // если вдруг смогли выбрать оплату через тг
    if (payment == "card-payment"){
        tg.showAlert('на данный момент доступна только оплата переводом')
        return
    }
    
    // получение списка товаров
    const findProducts = data.filter(item => basket.includes(String(item.id)));
    // отгрузка товаров в backend
    let item = []
    function renderProductsBasket(arr) {
        arr.forEach(card => {
            const {id, img1, title, color, price} = card;
            const basket = getBasketLocalStorage();
            const sizes = getSizeLocalStorage()
            console.log(basket)
            console.log(sizes)
            const size = sizes[basket.indexOf(String(id))]
            console.log(size)
    
            item.push(JSON.stringify({
                "id":id,
                "title":title,
                "color":color,
                "size":size,
                "price":price
            }))
        })}    
    renderProductsBasket(findProducts)


    
    let order = JSON.stringify({
        "payment": payment,
        "shipping": shipping,
        "name": name,
        "address": address,
        "phone": phone,
        "items": item
    })
    
    tg.sendData(order)
})
