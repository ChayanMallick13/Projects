//global value for count
let curr_val = 0;

//incr
function inc(){
    curr_val++;
    show();
}

//decc
function dec(){
    curr_val--;
    show();
}

//showing in doc
function show(){
    let val = document.querySelector('.value');
    val.textContent=curr_val;
}

//event listener
document.querySelector('.switch').addEventListener('click',dec);
document.querySelector('.switch1').addEventListener('click',inc);