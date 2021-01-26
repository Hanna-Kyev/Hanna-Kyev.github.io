"use strict"

const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');

const countItemsInCart = document.querySelector('.count-items-in-cart');
const cartItems = document.querySelector('.cart-items');

const countWishItems = document.querySelector('.count-wish-items');
const closenBtn = document.querySelector('.closen-btn');
const wish = document.querySelector('.wish');
const wishToggle = document.querySelector('.wish-toggle')
const wishItems = document.querySelector('.wish-items');
// console.dir(sidebarToggle);

function subtotals(){
    let itemsInCart = document.querySelectorAll('.cart-item');
    
    for (let item of itemsInCart){
        let price = item.querySelector('.product-price').textContent;
        let quantity = item.querySelector('.amount').textContent;
        item.querySelector('.subtotal').textContent = quantity*price;
    }
};

sidebarToggle.addEventListener("click", function () {
    document.querySelector('.over').classList.add('active')
    sidebar.classList.toggle("show-sidebar");
    subtotals();
    let itemsInCart = document.querySelectorAll('.cart-item');

    for (let item of itemsInCart) {
        const price = item.querySelector('.product-price').textContent;
        item.querySelector('.fa-caret-right').addEventListener('click', function(e){
            let val = e.target.previousElementSibling.textContent;
            +(val)++;
            e.target.previousElementSibling.textContent = val;
            subtotals();
        });

        item.querySelector('.fa-caret-left').addEventListener('click', function(e){
            let val = e.target.nextElementSibling.textContent;
            if(+(val) > 1) {
                val--;
                e.target.nextElementSibling.textContent = val;
                subtotals();
            }
        });
    }
});

closeBtn.addEventListener('click', function(){
    // if (!sidebar.classList.contains('show-sidebar')){
    // sidebar.classList.remove('show-sidebar');
    // }
    sidebar.classList.toggle('show-sidebar');
    document.querySelector('.over').classList.remove('active');
});

function addProductToCart(template,item){
    template.querySelector('.product-name').textContent = item.querySelector('.product-name').textContent;
    template.querySelector('.product-price').textContent = item.querySelector('.product-price').textContent;
    template.querySelector('.product-img img').setAttribute('src',item.querySelector('.img-fluid').getAttribute('src'));
    return template;
}

function createProduct(data){
    return `
    <div class="col-xl-3 col-lg-4 col-sm-6">
        <div class="product text-center">
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
}

let result = "";
product.forEach(function(item){
    result+=createProduct(item);
});
document.querySelector('.showcase').innerHTML=result;

let addToCart = document.querySelectorAll('.add-to-cart');
const template = document.getElementById('cartItem').content;

for (let i=0; i<addToCart.length;i++){
    addToCart[i].addEventListener('click', function(e){

        let item = e.target.closest('.product');
        let content = addProductToCart(template,item);
        document.querySelector('.cart-items').append(document.importNode(content, true));
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

function productChoose(wishtemplate,item){
    wishtemplate.querySelector('.product-name').textContent = item.querySelector('.product-name').textContent;
    wishtemplate.querySelector('.product-price').textContent = item.querySelector('.product-price').textContent;
    wishtemplate.querySelector('.product-img img').setAttribute('src',item.querySelector('.img-fluid').getAttribute('src'));
    return wishtemplate;
}



let choose = document.querySelectorAll('.choose');
const wishtemplate = document.getElementById('wishItem').content;

for (let i = 0; i<choose.length; i++){
    choose[i].addEventListener('click', function(e){

        let item = e.target.closest('.product');
        let content = productChoose(wishtemplate,item);
        document.querySelector('.wish-items').append(document.importNode(content, true));
        countWishItems.textContent++;

        if (countWishItems.textContent>0){
            countWishItems.classList.add('notempty'); 
        } else{
            countWishItems.classList.remove('notempty');
        }
    })
}

wishItems.addEventListener('click', function(event){
    if (event.target.classList.contains('fa-caret-right')){
        +event.target.previousElementSibling.innerText++;         
    } else if (event.target.classList.contains('fa-caret-left')){
        +event.target.nextElementSibling.innerText--;
    }
    // console.dir(event.target);
})

