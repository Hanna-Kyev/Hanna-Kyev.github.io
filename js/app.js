"use strict"

const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');
// console.dir(sidebarToggle);
const countItemsInCart = document.querySelector('.count-items-in-cart');
const countWishItems = document.querySelector('.count-wish-items');
const closenBtn = document.querySelector('.closen-btn');
const wish = document.querySelector('.wish');
const wishToggle = document.querySelector('.wish-toggle')

sidebarToggle.addEventListener('click', function(){
    // if (!sidebar.classList.contains('show-sidebar')){
    // sidebar.classList.add('show-sidebar');
    // }
    sidebar.classList.toggle('show-sidebar');
});

closeBtn.addEventListener('click', function(){
    // if (!sidebar.classList.contains('show-sidebar')){
    // sidebar.classList.remove('show-sidebar');
    // }
    sidebar.classList.toggle('show-sidebar');
});

let addToCart = document.querySelectorAll('.add-to-cart');

for (let i=0; i<addToCart.length;i++){
    addToCart[i].addEventListener('click', function(){
        countItemsInCart.textContent++;
        
        if (countItemsInCart.textContent>0){
            countItemsInCart.classList.add('notempty');
        } else{
            countItemsInCart.classList.remove('notempty');
        }
    })
};

wishToggle.addEventListener('click', function(){
    wish.classList.toggle('show-wish');
});

closenBtn.addEventListener('click', function(){
    wish.classList.toggle('show-wish');
});

let choose = document.querySelectorAll('.choose');

for (let i = 0; i<choose.length; i++){
    choose[i].addEventListener('click', function(){
        countWishItems.textContent++;
        if (countWishItems.textContent>0){
            countWishItems.classList.add('notempty'); 
        } else{
            countWishItems.classList.remove('notempty');
        }
    })
}

