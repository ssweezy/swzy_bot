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

//переменная куда помещается информация с json файла с товаром
let data = []
let tg = window.Telegram.WebApp

try{
    tg.ThemeParams.secondary_bg_color = "#2C2C2C"
    } catch(err) {console.log(err.message)}
    tg.MainButton.color = "#7A5FFF"
    tg.MainButton.textColor = "#FFF9F9"

tg.MainButton.setText("купить")
tg.MainButton.show()

tg.MainButton.onClick(async function(){
    // способ покупки
    let radioPayment = document.querySelectorAll(".radio-button-payment")
    let payment = undefined
    for (let i = 0; i < radioPayment.length; i++){
        if(radioPayment[i].checked){
            payment = radioPayment[i].value
            break
        }
    }
    // спсоб доставки
    let radioShipping = document.querySelectorAll(".radio-button-shipping")
    let shipping = undefined
    for (let i = 0; i < radioShipping.length; i++){
        if(radioShipping[i].checked){
            shipping = radioShipping[i].value
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

    
    // проверки на пустые поля
    if (payment == undefined){
        tg.showAlert('выберите способ оплаты')
        return
    } 
    if (shipping == undefined){
        tg.showAlert('выберите доставки')
        return
    }
    if (!name.length){
        tg.showAlert('введите имя')
        return
    }
    if (address == "shipping" && !address.length){
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
    const res = await fetch('../data/products.json');
    
    data = await res.json();

    const basket = getBasketLocalStorage()
    const findProducts = data.filter(item => basket.includes(String(item.id)));
    
    // отгрузка товаров в backend
    data = []
    findProducts.forEach(card => {
        const {id, title, price, color, material} = card;
        const basket = getBasketLocalStorage();
        const sizes = getSizeLocalStorage()
        const size = sizes[basket.indexOf(String(id))]
        data.push([{
           "id":id,
           "title": title,
           "price": price,
           "color": color,
           "material": material,
           "size": size
        }])
    })

    let order = [{
        "payment": payment,
        "shipping": shipping,
        "name": name,
        "address": address,
        "phone": phone,
        "items": data
    }]

    let clear = []
    setBasketLocalStorage(clear)
    setSizeLocalStorage(clear)
    tg.sendData(order)
})

tg.BackButton.onClick(() => {
    window.location.href = 'basket.html'
    return
})