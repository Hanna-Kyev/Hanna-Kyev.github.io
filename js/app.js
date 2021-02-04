"use strict"

class App {
    cart = [];
    cartItems = document.querySelector('.cart-items');
    clearCart = document.querySelector('.clear-cart');

    listDesires = [];
    wishItems = document.querySelector('.wish-items');
    wishClear = document.querySelector('.wish-clear');
    
    constructor(){

        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');
        const closeBtn = document.querySelector('.close-btn');

        sidebarToggle.addEventListener('click', () => {
            document.querySelector('.over').classList.add('active');
            sidebar.classList.toggle('show-sidebar');
            this.subtotals();
        });
        
        closeBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show-sidebar');
            document.querySelector('.over').classList.remove('active');
        });

        const wishToggle = document.querySelector('.wish-toggle')
        const wish = document.querySelector('.wish');
        const closenBtn = document.querySelector('.closen-btn');

        wishToggle.addEventListener('click', () => {
            document.querySelector('.over').classList.add('active');
            wish.classList.toggle('show-wish');
        });

        closenBtn.addEventListener('click', () => {
            wish.classList.toggle('show-wish');
            document.querySelector('.over').classList.remove('active');
        });

        this.makeShowcase(products);

    };

    getProduct = id => products.find(product => product.id === +(id));

    filterItem = (cart, filteredItem) => cart.filter(item => item.id !== +(filteredItem.dataset.id));
    findItem = (cart, findingItem) => cart.find(item => item.id === + (findingItem.dataset.id));
    
    filterWishItems = (listDesires, filterWishtItem) => listDesires.filter(item => item.id !==+(filterWishtItem.dataset.id));
    findWishItem = (listDesires , findingItem) => listDesires .find(item => item.id === + (findingItem.dataset.id));

    makeShowcase(products) {  
        let result = "";
        products.forEach((item) => result+=this.createProduct(item));
        document.querySelector('.showcase').innerHTML=result;
    }
        
    createProduct(data){
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
   
    subtotals(){
    let itemsInCart = document.querySelectorAll('.cart-item');
    
    for (let item of itemsInCart){
        let price = item.querySelector('.product-price').textContent;
        let quantity = item.querySelector('.amount').textContent;
        item.querySelector('.product-subtotal').textContent = quantity*price;
    }
    };

    createCartItem(item){
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
        this.cartItems.append(div);
    };
    
    createWish(item){
    const div = document.createElement('div');
    div.className = "wish-item";
    div.setAttribute('id', item.id);
    div.innerHTML = `
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
    `
    this.wishItems.append(div);
};

    addProductToCart(){
    const countItemsInCart = document.querySelector('.count-items-in-cart');
    const addToCartButtons = [...document.querySelectorAll('.add-to-cart')];
    addToCartButtons.forEach(button => {
        button.addEventListener('click',event => {
            let cartItem = {...this.getProduct(event.target.closest('.product').getAttribute('data-id')), amount: 1};
            this.cart = [...this.cart, cartItem];

            this.createCartItem(cartItem);
            +countItemsInCart.textContent++;
        
            if (countItemsInCart.textContent>0){
                countItemsInCart.classList.add('notempty');
            } else{
                countItemsInCart.classList.remove('notempty');
            }
            this.subtotals();
            });
        });
    };
    
    productChoose(){
    const countWishItems = document.querySelector('.count-wish-items');    
    const chooseButtons = [...document.querySelectorAll('.choose')];
    chooseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let wishItem = {...this.getProduct(event.target.closest('.product').getAttribute('data-id'))};
            this.listDesires = [...this.listDesires, wishItem];
            
            this.createWish(wishItem);
            countWishItems.textContent++;

            if (countWishItems.textContent>0){
                countWishItems.classList.add('notempty'); 
            } else{
                countWishItems.classList.remove('notempty');
            };
        });
    });

};
        
    clearAll(){
        this.cart = [];
        while(this.cartItems.children.length>0){
            this.cartItems.removeChild(this.cartItems.children[0]);
        }
        this.subtotals();
    };
    
    clearWish(){
    this.listDesires = [];
    while(this.wishItems.children.length>0){
        this.wishItems.removeChild(this.wishItems.children[0]);
    }
};

    renderCart(){
    this.clearCart.addEventListener('click', () => this.clearAll());
    this.cartItems.addEventListener('click', (event) => {
        if(event.target.classList.contains('fa-trash-alt')){
            this.cart = this.filterItem(this.cart, event.target);
            this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
            this.subtotals();
        } else if (event.target.classList.contains('fa-caret-right')){
            let tmp = this.findItem(this.cart, event.target);
            tmp.amount = tmp.amount +1;
            event.target.previousElementSibling.innerText = tmp.amount;
            this.subtotals();
        } else if (event.target.classList.contains('fa-caret-left')){
            let tmp = this.findItem(this.cart, event.target);
            tmp.amount = tmp.amount -1;
            if (tmp.amount >0){
                event.target.nextElementSibling.innerText = tmp.amount;
            } else {
                this.cart = this.filterItem(this.cart, event.target);
                this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
            }
            this.subtotals();    
            }
        })

    };
    
    renderWish(){
    this.wishClear.addEventListener('click', () => this.clearWish());

   // написать функцию переноса товара из ListDesires в Cart
    this.wishItems.addEventListener('click', (event) => {
        if(event.target.classList.contains('fa-cart-plus')){
           this.listDesires =  this.filterWishItems(this.listDesires, event.target);
           this.wishItems.removeChild(event.target.parentElement.parentElement.parentElement);
        } else {
           this.listDesires = this.filterWishItems(this.listDesires, event.target);            
           this.wishItems.removeChild(event.target.parentElement.parentElement.parentElement);
        }
    });

};

    renderDesires(){
        const Desires = document.querySelector('.list-Desires');
        let choose = [...document.querySelectorAll('.choose')];
        choose.forEach(Desires=>{addEventListener('.click', () =>{
            Desires.textContent++;
            if (+Desires.textContent>0){
            Desires.classList.add('notempty');   
            } else {listDesires.classList.remove('notempty'); 
            }
        });
    });
    };

};

(function(){
    const app = new App();
    app.addProductToCart()
    app.productChoose();
    app.renderCart();
    app.renderWish();
    app.renderDesires();
})();

