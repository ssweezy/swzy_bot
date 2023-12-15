const btn1 = document.getElementById('button1')
const btn2 = document.getElementById('button2')
const btn3 = document.getElementById('button3')

const topic1 = document.getElementById('topic1')
const topic2 = document.getElementById('topic2')
const topic3 = document.getElementById('topic3')

function scroll1(topic1){
    topic1.scrollIntoView({block: "center", behavior: "smooth"})
    console.log(topic1)
}

function scroll2(topic2){
    topic2.scrollIntoView({block: "center", behavior: "smooth"})
    console.log(topic2)
}

function scroll3(topic3){
    topic3.scrollIntoView({block: "center", behavior: "smooth"})
    console.log(topic3)
}



btn1.onclick = scroll(btn1, topic1)
// btn2.onclick = scroll(btn2, topic2)
// btn3.onclick = scroll(btn3, topic3)


btn1.addEventListener("click", scroll1);
// btn2.addEventListener("click", scroll(topic2));
// btn3.addEventListener("click", scroll(topic3));
