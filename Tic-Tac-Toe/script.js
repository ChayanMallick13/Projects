const boxes = [];
for(let i = 1;i<=9;i++){
    const box = document.querySelector(`.box-${i}`);
    boxes.push(box);
}
const newGameBtn = document.querySelector('.newGameBtn');

const currentPlayerCont = document.querySelector('[data-currentPlayer]');
const playerType = document.querySelector('[data-player]');



let currentPlayer = 'X';
let valuesListed = 0;
let gameCompleted = false;
const color = 'rgba(117, 176, 117, 0.85)';
displayCurrentPlayerinUi();


function displayCurrentPlayerinUi(){
    currentPlayerCont.textContent=currentPlayer;
}

boxes.forEach((ele) => {
    ele.addEventListener('click',fillValue);
});

function fillValue(e){
    if((!e.target.textContent) && (!gameCompleted)){
        e.target.textContent=currentPlayer;
        e.target.classList.add('filled');
        valuesListed++;
        checkWinning();
    }
}

function switchPlayer(){
    if(currentPlayer==='X'){
        currentPlayer='O';
    }
    else{
        currentPlayer='X';
    }
}

function checkWinning(){
    let won = winningLogic();
    
    if(won){
        playerType.textContent = 'Winner - ';
        currentPlayerCont.textContent = currentPlayer;
        newGameBtn.classList.add('active');
        gameCompleted = true;
        makeOtherBoxInactive();
        
    }
    else if(valuesListed===9){ //draw
        gameCompleted = true;
        playerType.textContent = 'Game Draw';
        newGameBtn.classList.add('active');
        currentPlayerCont.classList.add('remove');
        makeOtherBoxInactive();
    }
    else{ //nothing
        switchPlayer();
        displayCurrentPlayerinUi();
    }

}

function makeOtherBoxInactive(){
    boxes.forEach((ele) => {
        if(!ele.classList.contains('filled')){
            ele.classList.add('filled');
        }
    });
}

function winningLogic(){
    let won = false;
    for(let i = 0;i<3;i++){
        for(let j = 0;j<3;j++){
            let ind = 3*i+j;            
            let val = boxes[ind].textContent;
            if(val===''){
                continue;
            }
            //rightSide 
            let cnt = 0;
            for(let k = 0;k<3;k++){
                if(j+k>=3){
                    break;
                }
                else{
                    let newInd = 3*i + j+k;
                    if(boxes[newInd].textContent===val){
                        cnt++;
                    }
                    else{
                        break;
                    }
                }
            }
            if(cnt===3){
                won = true;
                for(let k = 0;k<3;k++){
                    let newInd = 3*i + j+k;
                    boxes[newInd].style.backgroundColor = color;
                }
            }
            cnt=0;

            //diagonal
            for(let k = 0;k<3;k++){
                if(j+k>=3 || i+k>=3){
                    break;
                }
                else{
                    let newInd = 3*(i+k) + j+k;
                    if(boxes[newInd].textContent===val){
                        cnt++;
                    }
                    else{
                        break;
                    }
                }
            }
            if(cnt===3){
                won = true;
                for(let k = 0;k<3;k++){
                    let newInd = 3*(i+k) + j+k;
                    boxes[newInd].style.backgroundColor = color;
                }
            }
            cnt=0;

            //reverse dia 
            for(let k = 0;k<3;k++){
                if(j-k<0 || i+k>=3){
                    break;
                }
                else{
                    let newInd = 3*(i+k) + j-k;
                    if(boxes[newInd].textContent===val){
                        cnt++;
                    }
                    else{
                        break;
                    }
                }
            }
            if(cnt===3){
                won = true;
                for(let k = 0;k<3;k++){
                    let newInd = 3*(i+k) + j-k;
                    boxes[newInd].style.backgroundColor = color;
                }
            }
            cnt=0;

            //downside
            for(let k = 0;k<3;k++){
                if(i+k>=3){
                    break;
                }
                else{
                    let newInd = 3*(i+k) + j;
                    if(boxes[newInd].textContent===val){
                        cnt++;
                    }
                    else{
                        break;
                    }
                }
            }
            if(cnt===3){
                won = true;
                for(let k = 0;k<3;k++){
                    let newInd = 3*(i+k) + j;
                    boxes[newInd].style.backgroundColor = color;
                }
            }
            cnt=0;

            
        }
    }

    return won;
}

newGameBtn.addEventListener('click',makeNewGameChanges);

function makeNewGameChanges(){
    gameCompleted = false;
    valuesListed = 0;
    newGameBtn.classList.remove('active');
    currentPlayerCont.classList.remove('remove');
    playerType.textContent = 'Current Player - ';
    currentPlayer = 'X';
    displayCurrentPlayerinUi();
    boxes.forEach((ele) => {
        ele.textContent = '';
        ele.classList.remove('filled');
        ele.style.backgroundColor = 'transparent';
    });
}