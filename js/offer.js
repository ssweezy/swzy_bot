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

    if (payment == undefined){
        tg.showAlert('выберите способ оплаты')
        return
    } 
    if (shipping == undefined){
        tg.showAlert('выберите доставки')
        return
    }
    

    if (payment == "card-payment"){
        tg.showAlert('на данный момент доступна только оплата переводом')
        return
    }
    
    // if (payment == "card-transfer"){
    //     return
    // }
    let item = [payment, shipping]
    tg.sendData(item)
})
