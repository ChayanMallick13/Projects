

const  hidenbox= document.querySelector('.hidden-share-box');
const overlay = document.querySelector('.overlay-screen');

const show = () => {
    hidenbox.style.scale = 1;
    hidenbox.style.visibility = 'visible';
    overlay.style.scale = 1;
}

const closing = () => {
    hidenbox.style.scale = 0;
    hidenbox.style.visibility = 'hidden';
    overlay.style.scale = 0;
}