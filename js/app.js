"use strict"

const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');
const countItemsInCart = document.querySelector('.count-items-in-cart');
const cartItems = document.querySelector('.cart-items');
const clearCart = document.querySelector('.clear-cart');


let cart = [];


function subtotals(){
    let itemsInCart = document.querySelectorAll('.cart-item');
    
    for (let item of itemsInCart){
        let price = item.querySelector('.product-price').textContent;
        let quantity = item.querySelector('.amount').textContent;
        item.querySelector('.product-subtotal').textContent = quantity*price;
    }
};

function createCartItem(item){
    const div = document.createElement('div');
    div.className = "cart-item";
    div.setAttribute('id', item.id);
    div.innerHTML = `
        <div class="picture product-img">
            <img src="${item.image}" alt="${item.name}" class="img-fluid w=100">
        </div>
            <div class="product-name">${item.name}</div>
            <div class="remove-btn text-right">
                <a href="#" class="reset-anchor m-auto"><i class="fas fa-trash-alt" data-id="${item.id}"></i></a>
            </div>
            <div class="quantity">
                <div class="border d-flex justify-content-around mx-auto">
                    <i class="fas fa-caret-left" data-id="${item.id}"></i>
                        <span class="border-1 p-1 amount">${item.amount}</span>
                    <i class="fas fa-caret-right" data-id="${item.id}"></i>
                </div>
            </div>
            <div class="prices">
                <span class="price">&#8372<spa class="product-price">${item.price}</spa></span> 
                &#8372<span class="subtotal"><spa class="product-subtotal"></spa></span> 
        </div>             
    `;
    cartItems.append(div);
};


function getProduct(id) {
    return products.find(product => product.id === +(id));
};

function addProductToCart(){
    const addToCartButtons = [...document.querySelectorAll('.add-to-cart')];
    addToCartButtons.forEach(button => {
        button.addEventListener('click',event => {
            let cartItem = {...getProduct(event.target.closest('.product').getAttribute('data-id')), amount: 1};
            cart =[...cart, cartItem];

            createCartItem(cartItem);
            +countItemsInCart.textContent++;
        
        if (countItemsInCart.textContent>0){
            countItemsInCart.classList.add('notempty');
        } else{
            countItemsInCart.classList.remove('notempty');
        }
        subtotals();
        });
    });
};

function createProduct(data){
    return `
    <div class="col-xl-3 col-lg-4 col-sm-6">
        <div class="product text-center" data-id="${data.id}">
                <div class="position-relative mb-3">
                    <a class="d-block" href="#"><img src="${data.image}" class="img-fluid w-100" alt="${data.name}"></a>
                    <div class="product-overlay">
                        <ul class="mb-0 list-inline">
                            <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark choose" href="#"><i class="fab fa-gratipay"></i></a></li>
                            <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark add-to-cart" href="#">Buy book</a></li>
                            <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#"><i class="fas fa-book-reader"></i></a></li>
                        </ul>
                    </div>
                </div>
            <section>
                <h3><a class="reset-anchor product-name" href="#">${data.name}</a></h3>
                &#8372<span class="small text-muted product-price">${data.price}</span>
            </section>
        </div>
    </div>
    `;
};


function clearAll(){
    cart = [];
    while(cartItems.children.length>0){
        cartItems.removeChild(cartItems.children[0]);
    }
    subtotals();
}

const filterItem = (cart, filteredItem) => cart.filter(item => item.id !== +(filteredItem.dataset.id));
const findItem = (cart, findingItem) => cart.find(item => item.id === + (findingItem.dataset.id));

function renderCart(){

    clearCart.addEventListener('click', () => clearAll());

    cartItems.addEventListener('click', (event) => {
        if(event.target.classList.contains('fa-trash-alt')){
            cart = filterItem(cart, event.target);
            cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
            subtotals();
        } else if (event.target.classList.contains('fa-caret-right')){
            let tmp = findItem(cart, event.target);
            tmp.amount = tmp.amount +1;
            event.target.previousElementSibling.innerText = tmp.amount;
            subtotals();
        } else if (event.target.classList.contains('fa-caret-left')){
            let tmp = findItem(cart, event.target);
            tmp.amount = tmp.amount -1;
            if (tmp.amount >0){
                event.target.nextElementSibling.innerText = tmp.amount;
            } else {
                cart = filterItem(cart, event.target);
                cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
            }
            subtotals();    
        }
    })

};

cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-caret-right')){
        +event.target.previousElementSibling.innerText++;
        subtotals();
    } else if (event.target.classList.contains('fa-caret-left')){
        +event.target.nextElementSibling.innerText--;
    }
});

(function(){

    sidebarToggle.addEventListener('click', () => {
        document.querySelector('.over').classList.add('active');
        sidebar.classList.toggle('show-sidebar');
        subtotals();
    });
    
    closeBtn.addEventListener('click', () => {
        sidebar.classList.toggle('show-sidebar');
        document.querySelector('.over').classList.remove('active');
    });
        
    let result = "";
    products.forEach(function(item){
        result+=createProduct(item);
    });
    document.querySelector('.showcase').innerHTML=result;

    addProductToCart()
    renderCart();

})();


const countWishItems = document.querySelector('.count-wish-items');
const closenBtn = document.querySelector('.closen-btn');
const wish = document.querySelector('.wish');
const wishToggle = document.querySelector('.wish-toggle')
const wishItems = document.querySelector('.wish-items');
const wishClear = document.querySelector('.wish-clear');
let listDesires = [];

function createWish(item){
    const div = document.createElement('div');
    div.className = "wish-item";
    div.setAttribute('id', item.id);
    div.innerHTML = `
    <div class="wish-item" id = "${item.id}">
        <div class="picture product-img">
        <img src="${item.image}" alt="${item.name}" class="img-fluid w=100">
            </div>
            <div class="product-name">${item.name}</div>
                <div class="add-btn text-right">            
                    <a href="#" class="reset-anchor m-auto"><i class="fas fa-cart-plus"></i></a>
                </div>
            <div class="prices">
            <span class="price">&#8372 <spa class="product-price">${item.price}</spa></span> 
        </div>
    </div>
    `
    wishItems.append(div);
};

function getProduct(id) {
    return products.find(product => product.id === +(id));
};

function productChoose(){

    const chooseButtons = [...document.querySelectorAll('.choose')];
    chooseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let wishItem = {...getProduct(event.target.closest('.product').getAttribute('data-id'))};
            listDesires = [...listDesires, wishItem];
            
            createWish(wishItem);
            countWishItems.textContent++;

            if (countWishItems.textContent>0){
                countWishItems.classList.add('notempty'); 
            } else{
                countWishItems.classList.remove('notempty');
            };
        });
    });

};

function clearWish(){
    listDesires = [];
    while(wishItems.children.length>0){
        wishItems.removeChild(wishItems.children[0]);
    }
}

const filterWishItems = (listDesires, curentItem) => listDesires.filter(item => item.id !==+(curentItem.dataset.id))

function renderWish(){
     wishClear.addEventListener('click', () => clearWish());

     wishItems.addEventListener('click', (event) => {
         if(event.target.classList.contains('fa-cart-plus')){
            listDesires =  filterWishItems(listDesires, event.target);
         }
     })

}

(function(){
    wishToggle.addEventListener('click', () => {
        document.querySelector('.over').classList.add('active');
        wish.classList.toggle('show-wish');
    });
    closenBtn.addEventListener('click', () => {
        wish.classList.toggle('show-wish');
        document.querySelector('.over').classList.remove('active');
    });

    productChoose();
    renderWish()

})();



