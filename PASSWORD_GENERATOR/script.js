const inputSlider = document.querySelector('[data-lengthSlider]');
const lengthDisplay = document.querySelector('[data-lengthNumber]');
const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const copyBtn = document.querySelector('[data-copy]');
const copyMsg = document.querySelector('[data-copyMsg]');
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercse');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
const indicator = document.querySelector('[data-indicator]');
const generateBtn = document.querySelector('.generateButton');
const allCheckBox = document.querySelectorAll('input[type=checkbox]');

let password = "";
let passwordLength = 10;
let checkCount = 1;
let symbolString = "`~!@#$%^&*()_+-={}|[]\\:";'<>?,./';


//set circle indicator colcor to grey


const handleCheckboxChange = () => {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condn
    if(checkCount > passwordLength){
        passwordLength = checkCount;
        handleSlider();
    }
};

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckboxChange);
});

const handleSlider = () => {
    inputSlider.value = passwordLength;
    lengthDisplay.textContent=passwordLength;
    setIndicator('#ccc');
    const min = inputSlider.min;
    const max = inputSlider.max;
    const sliderWidth = ((passwordLength-min)/(max-min))*100;
    inputSlider.style.backgroundSize = `${sliderWidth}% 100%`;
};handleSlider();

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
};

function getRndInt(min,max){
    return Math.floor(Math.random()*(max-min))+min;
};

const generateRandomNumber = () => {
    return getRndInt(0,10);
};

const generateUppercase = () => {
    return String.fromCharCode(getRndInt(65,91));
};

const generateLowercase = () => {
    return String.fromCharCode(getRndInt(97,123));
};

const generateSymbol = () => {
    return symbolString.charAt(getRndInt(0,symbolString.length));
};

const checkStrength = () => {
    let cnt = 0;
    let val = 0;
    if(uppercaseCheck.checked){cnt++;}
    if(lowercaseCheck.checked) {cnt++;}
    if(numbersCheck.checked){ cnt++;}
    if(symbolsCheck.checked) { cnt++;}
    if(cnt===4){
        if(passwordLength>=6) val = 1;
        else if(passwordLength>=4) val = 2;

    }
    else if(cnt===3){
        if(passwordLength>=9) val = 1;
        else if(passwordLength>=7) val = 2;
    }
    else if(cnt===2){
        if(passwordLength>=13) val = 1;
        else if(passwordLength>=10) val = 2;
    }
    else{
        if(passwordLength>=16) val = 1;
        else if(passwordLength>=13) val = 2;
    }

    if(val===2){
        setIndicator('#ff0');
    }
    else if(val===1){
        setIndicator('#0f0');
    }
    else{
        setIndicator('#f00');
    }

};

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.textContent = 'Copied';
    }
    catch(e){
        copyMsg.textContent='Failed';
    }

    //make the span visible
    copyMsg.classList.add('active');

    setTimeout(() => {
        copyMsg.classList.remove('active');
    },2000);


}

inputSlider.addEventListener('input',() => {
    passwordLength = inputSlider.value;
    handleSlider();
});

copyBtn.addEventListener('click',() => {
    if(passwordDisplay.value)
        copyContent();
});

function shufflePassword(password){
    //Fisher Yate Methods
    for(let i = password.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = password[i];
        password[i]=password[j];
        password[j]=temp;
    }
    let str = "";
    password.forEach((el) => {
        str+=el;
    });
    return str;
}

generateBtn.addEventListener('click',() => {
    //no checkbox selected
    if(checkCount<=0)
        return;

    if(checkCount>passwordLength){
        passwordLength = checkCount;
        handleSlider();
    }

    //finding new password

    //remove old pass
    password="";

    let funcArray = [];

    //add the required functions aacording to check nboxes
    if(uppercaseCheck.checked)
        funcArray.push(generateUppercase);
    if(lowercaseCheck.checked)
        funcArray.push(generateLowercase);
    if(numbersCheck.checked)
        funcArray.push(generateRandomNumber);
    if(symbolsCheck.checked)
        funcArray.push(generateSymbol);

    //add the compulsory items
    for(let i = 0;i<funcArray.length;i++){
        password+=funcArray[i]();
    }

    //add the remaning items
    for(let i = 0;i<passwordLength-funcArray.length;i++){
        password+=funcArray[getRndInt(0,funcArray.length)]();
    }

    //shuffle the password
    password = shufflePassword(Array.from(password));

    //show the password
    passwordDisplay.value = password;

    //set the indicator
    checkStrength();


});