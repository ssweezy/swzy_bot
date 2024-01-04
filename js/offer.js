"use strict"
//==========================================
import { ERROR_SERVER, NO_ITEMS_CART } from './constants.js';
import { 
    showErrorMessage,
    setBasketLocalStorage,
    getBasketLocalStorage,
    getSizeLocalStorage,
    setSizeLocalStorage
} from './utils.js';


function renderProductsBasket(arr) {
    arr.forEach(card => {
        const {id, title, color, price} = card;
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

    console.log(name)
    console.log(address)
    console.log(phone)
    
    // проверки на пустые поля
    if (!payment.length){
        tg.showAlert('выберите способ оплаты')
        return
    } 
    if (!shipping.length){
        tg.showAlert('выберите доставки')
        return
    }
    if (!name.length){
        tg.showAlert('введите имя')
        return
    }
    if (!address.length){
        tg.showAlert('укажите адрес куда доставить')
        return
    }
    if (!phone.length){
        tg.showAlert('введите номер телефона')
        return
    }

    
    // если вдруг смогли выбрать оплату через тг
    if (payment == "card-payment"){
        tg.showAlert('на данный момент доступна только оплата переводом')
        return
    }
    
    // получение списка товаров
    const res = fetch('../data/products.json');
    
    data = res.json();

    const findProducts = data.filter(item => basket.includes(String(item.id)));
    console.log(findProducts)
    // отгрузка товаров в backend
    let items = []
    console.log(items)
    
    renderProductsBasket(findProducts)

    console.log(items)
    
    let order = JSON.stringify({
        "payment": payment,
        "shipping": shipping,
        "name": name,
        "address": address,
        "phone": phone,
        "items": items
    })
    console.log(order)
    tg.sendData(order)
})

tg.BackButton.onClick(() => {
    window.location.href = 'basket.html'
    return
})